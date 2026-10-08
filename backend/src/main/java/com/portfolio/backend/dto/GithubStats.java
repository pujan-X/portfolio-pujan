package com.portfolio.backend.dto;
import lombok.Data;
import java.util.List;
@Data
public class GithubStats {
    private int publicRepos;
    private int followers;
    private List<String> topLanguages;
    private List<RepoInfo> recentRepos;

    @Data
    public static class RepoInfo {
        private String name;
        private String description;
        private String url;
        private String language;
        private int stars;
    }
}
