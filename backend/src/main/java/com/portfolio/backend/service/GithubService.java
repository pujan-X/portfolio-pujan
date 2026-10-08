package com.portfolio.backend.service;
import com.portfolio.backend.dto.GithubStats;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GithubService {
    @Value("${github.api.url}")
    private String githubUrl;
    @Value("${github.api.token:}")
    private String token;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private static final Logger logger = LoggerFactory.getLogger(GithubService.class);
    
    @Cacheable(value = "githubStats")
    public GithubStats getStats() {
        try {
            HttpHeaders headers = new HttpHeaders();
            if (!token.isEmpty()) headers.setBearerAuth(token);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            
            // Get User Profile
            ResponseEntity<Map> userResponse = restTemplate.exchange(githubUrl, HttpMethod.GET, entity, Map.class);
            Map<String, Object> userBody = userResponse.getBody();
            
            int publicRepos = userBody != null && userBody.containsKey("public_repos") ? (Integer) userBody.get("public_repos") : 0;
            int followers = userBody != null && userBody.containsKey("followers") ? (Integer) userBody.get("followers") : 0;
            
            // Get Repos
            ResponseEntity<List> reposResponse = restTemplate.exchange(githubUrl + "/repos?sort=updated&per_page=100", HttpMethod.GET, entity, List.class);
            List<Map<String, Object>> reposBody = reposResponse.getBody();
            
            Map<String, Integer> languageCounts = new HashMap<>();
            List<GithubStats.RepoInfo> recentRepos = new ArrayList<>();
            
            if (reposBody != null) {
                for (Map<String, Object> repo : reposBody) {
                    String lang = (String) repo.get("language");
                    if (lang != null) {
                        languageCounts.put(lang, languageCounts.getOrDefault(lang, 0) + 1);
                    }
                }
                recentRepos = reposBody.stream()
                    .limit(5)
                    .map(repo -> {
                        GithubStats.RepoInfo r = new GithubStats.RepoInfo();
                        r.setName((String) repo.get("name"));
                        r.setDescription((String) repo.get("description"));
                        r.setUrl((String) repo.get("html_url"));
                        r.setLanguage((String) repo.get("language"));
                        r.setStars(repo.containsKey("stargazers_count") ? (Integer) repo.get("stargazers_count") : 0);
                        return r;
                    }).collect(Collectors.toList());
            }
            
            List<String> topLanguages = languageCounts.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
                .limit(4)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
                
            GithubStats stats = new GithubStats();
            stats.setPublicRepos(publicRepos);
            stats.setFollowers(followers);
            stats.setTopLanguages(topLanguages);
            stats.setRecentRepos(recentRepos);
            return stats;
        } catch (Exception e) {
            logger.warn("GitHub API failed: " + e.getMessage());
            return getFallbackStats();
        }
    }
    
    private GithubStats getFallbackStats() {
        GithubStats stats = new GithubStats();
        stats.setPublicRepos(10);
        stats.setFollowers(5);
        stats.setTopLanguages(List.of("Java", "TypeScript", "Python"));
        stats.setRecentRepos(new ArrayList<>());
        return stats;
    }
}
