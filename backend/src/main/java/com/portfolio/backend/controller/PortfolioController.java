package com.portfolio.backend.controller;
import com.portfolio.backend.model.*;
import com.portfolio.backend.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService service;
    
    @GetMapping("/profile")
    public Profile getProfile() { return service.getProfile(); }
    
    @GetMapping("/projects")
    public List<Project> getProjects(@RequestParam(required = false) String tag, 
                                     @RequestParam(required = false) Boolean featured) {
        return service.getProjects(tag, featured);
    }
    
    @GetMapping("/projects/{slug}")
    public Project getProjectBySlug(@PathVariable String slug) {
        return service.getProjectBySlug(slug);
    }
    
    @GetMapping("/skills")
    public List<Skill> getSkills() { return service.getSkills(); }
    
    @GetMapping("/experience")
    public List<Experience> getExperience() { return service.getExperience(); }

    @GetMapping("/certifications")
    public List<Certification> getCertifications() { return service.getCertifications(); }
}
