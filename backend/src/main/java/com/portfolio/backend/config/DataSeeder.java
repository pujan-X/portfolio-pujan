package com.portfolio.backend.config;
import com.portfolio.backend.model.*;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final ProfileRepository profileRepo;
    private final ProjectRepository projectRepo;
    private final SkillRepository skillRepo;
    private final ExperienceRepository experienceRepo;
    private final CertificationRepository certRepo;
    
    @Override
    public void run(String... args) throws Exception {
        if (profileRepo.count() == 0) {
            Profile profile = new Profile();
            profile.setName("Pujan Suthar");
            profile.setLocation("Mumbai, India");
            profile.setTagline("Backend & full-stack developer building AI-integrated applications with Java and Spring Boot.");
            profile.setBio("I'm a B.Sc. Computer Science student (graduating 2027) who specializes in backend and full-stack development with Java, Spring Boot, REST APIs, and MySQL. I build applications end to end, from API design and database architecture to containerized cloud deployment. I enjoy integrating third-party AI APIs, debugging complex systems on my own, and explaining technical ideas clearly, skills I've sharpened by working in hackathon teams.");
            profile.setEmail("pujansuthar345@gmail.com");
            profile.setLinkedin("http://linkedin.com/in/pujan-");
            profile.setGithub("https://github.com/pujan-x");
            profile.setResumeUrl("/resume.pdf");
            profileRepo.save(profile);
        }
        
        if (projectRepo.count() == 0) {
            Project p1 = new Project();
            p1.setSlug("nexus-ai");
            p1.setTitle("Nexus.AI: Smart Library Management System");
            p1.setSummary("Full-stack library management system with role-based access and AI-driven catalog insights.");
            p1.setDescription("Role-based access control with Spring Security, separating admin and student permissions for inventory and borrowing\n\nReal-time dashboard tracking total books, active borrows, overdue items, and new member registrations\n\nResponsive, mobile-optimized interface for catalog browsing and borrowing\n\nGoogle Gemini API integration for AI-driven catalog insights\n\nDockerized and deployed on Render with an Aiven-hosted MySQL database");
            p1.setTags(List.of("Java", "Spring Boot", "Spring Security", "MySQL", "Docker", "Gemini API"));
            p1.setRepoUrl("https://github.com/pujan-X/smart-library-app");
            p1.setLiveUrl("https://nexus-ai-lms.onrender.com");
            p1.setFeatured(true);
            p1.setImagePath("/projects/nexus-ai.png");
            projectRepo.save(p1);
            
            Project p2 = new Project();
            p2.setSlug("edupredict-ai");
            p2.setTitle("EduPredict: AI-Powered Student Academic Performance Dashboard");
            p2.setSummary("Academic analytics platform that flags at-risk students from performance data.");
            p2.setDescription("Spring Boot backend integrated with a Python-based ML service\n\nREST APIs with JSON communication between backend and ML service for real-time predictions on the dashboard\n\nContainerized with Docker and deployed to the cloud for a reproducible environment");
            p2.setTags(List.of("Java", "Spring Boot", "Python", "ML", "REST API", "Docker"));
            p2.setRepoUrl("https://github.com/pujan-X/edupredict-ai");
            p2.setLiveUrl("https://edupredict-ai-swd1.onrender.com");
            p2.setFeatured(true);
            p2.setImagePath("/projects/edupredict.png");
            projectRepo.save(p2);
            
            Project p3 = new Project();
            p3.setSlug("ai-code-mentor");
            p3.setTitle("AI Code Mentor: Intelligent AI-Driven Code Analysis Platform");
            p3.setSummary("AI developer assistant for contextual code analysis and optimization.");
            p3.setDescription("Spring Boot microservices integrated with the Google Gemini API\n\nInteractive debugging support, code explanations, and optimization suggestions\n\nAutomated Big-O time and space complexity analysis");
            p3.setTags(List.of("Java", "Spring Boot", "Microservices", "Gemini API", "Algorithms"));
            p3.setRepoUrl("https://github.com/pujan-X/AI-Code-Mentor");
            p3.setLiveUrl("https://ai-code-mentor.netlify.app");
            p3.setFeatured(true);
            p3.setImagePath("/projects/ai-code-mentor.png");
            projectRepo.save(p3);
            
            Project p4 = new Project();
            p4.setSlug("java-cli-library-manager");
            p4.setTitle("Java CLI Library Manager");
            p4.setSummary("Command-line library management system demonstrating OOP and data structures.");
            p4.setDescription("Command-line library management system demonstrating OOP and data structures.");
            p4.setTags(List.of("Java", "CLI", "OOP"));
            p4.setRepoUrl("https://github.com/pujan-X/java-cli-library-manager");
            p4.setLiveUrl("");
            p4.setFeatured(false);
            projectRepo.save(p4);
            
            Project p5 = new Project();
            p5.setSlug("dosha-advisor");
            p5.setTitle("Dosha Advisor");
            p5.setSummary("More on GitHub");
            p5.setDescription("");
            p5.setTags(List.of("TypeScript", "React", "Node")); 
            p5.setRepoUrl("https://github.com/pujan-X/dosha-advisor");
            p5.setLiveUrl("");
            p5.setFeatured(false);
            projectRepo.save(p5);
            
            Project p6 = new Project();
            p6.setSlug("ai-orchestron");
            p6.setTitle("AI Orchestron Selection Engine");
            p6.setSummary("More on GitHub");
            p6.setDescription("");
            p6.setTags(List.of("Python", "AI"));
            p6.setRepoUrl("https://github.com/pujan-X/ai-orchestron");
            p6.setLiveUrl("");
            p6.setFeatured(false);
            projectRepo.save(p6);
        }
        
        if (skillRepo.count() == 0) {
            String[] lang = {"Java", "Python", "SQL", "HTML5", "CSS3"};
            for (String s : lang) skillRepo.save(createSkill("Languages", s, 85));
            String[] frameworks = {"Spring Boot", "Spring Security", "Spring Data JPA (Hibernate)", "REST APIs"};
            for (String s : frameworks) skillRepo.save(createSkill("Frameworks & Libraries", s, 85));
            String[] dbs = {"MySQL", "Aiven Cloud SQL"};
            for (String s : dbs) skillRepo.save(createSkill("Databases", s, 80));
            String[] tools = {"Git", "GitHub", "Docker", "Maven", "Render", "Cloud Deployment"};
            for (String s : tools) skillRepo.save(createSkill("Tools & Platforms", s, 85));
            String[] concepts = {"OOP", "Full-Stack Development", "Microservices", "API Integration", "JSON-based Communication", "AI/ML Integration"};
            for (String s : concepts) skillRepo.save(createSkill("Concepts", s, 90));
        }
        

        if (experienceRepo.count() == 0) {
            Experience e1 = new Experience();
            e1.setRole("Junior Java Developer Intern");
            e1.setCompany("YuvaIntern · Internship");
            e1.setDuration("AUG 2026 – SEP 2026 · 2 MOS");
            // [PLACEHOLDER: remaining bullet text and 2 extra skills]
            e1.setDescription("• Developing and maintaining Java applications in a fully remote environment.\n• Writing clean, efficient code and performing active debugging and testing.");
            experienceRepo.save(e1);
            
            Experience e2 = new Experience();
            e2.setRole("Hackathons");
            e2.setCompany("Various Teams");
            e2.setDuration("ONGOING");
            e2.setDescription("Collaborated in hackathon teams, communicating technical ideas and shipping prototypes.");
            experienceRepo.save(e2);
            
            Experience e3 = new Experience();
            e3.setRole("B.Sc. in Computer Science");
            e3.setCompany("Thakur Ramnarayan College of Arts and Commerce, Mumbai");
            e3.setDuration("EXPECTED GRADUATION JUNE 2027");
            e3.setDescription("");
            experienceRepo.save(e3);
        }
        
        if (certRepo.count() == 0) {
            certRepo.save(createCert("Claude 101", "Anthropic"));
            certRepo.save(createCert("Claude Code in Action", "Anthropic"));
            certRepo.save(createCert("Git Training Completion", "EduPyramids, SINE, IIT Bombay"));
        }
    }
    
    private Skill createSkill(String cat, String name, int prof) {
        Skill s = new Skill();
        s.setCategory(cat);
        s.setName(name);
        s.setProficiency(prof);
        return s;
    }
    
    private Certification createCert(String name, String issuer) {
        Certification c = new Certification();
        c.setName(name);
        c.setIssuer(issuer);
        return c;
    }
}
