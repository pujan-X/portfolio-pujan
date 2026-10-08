package com.portfolio.backend.service;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.*;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class PortfolioService {
    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final CertificationRepository certificationRepository;
    
    public Profile getProfile() {
        return profileRepository.findAll().stream().findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }
    public List<Project> getProjects(String tag, Boolean featured) {
        if (tag != null && !tag.isEmpty()) return projectRepository.findByTagsContainingIgnoreCase(tag);
        if (Boolean.TRUE.equals(featured)) return projectRepository.findByFeaturedTrue();
        return projectRepository.findAll();
    }
    public Project getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + slug));
    }
    public List<Skill> getSkills() { return skillRepository.findAll(); }
    public List<Experience> getExperience() { return experienceRepository.findAll(); }
    public List<Certification> getCertifications() { return certificationRepository.findAll(); }
}
