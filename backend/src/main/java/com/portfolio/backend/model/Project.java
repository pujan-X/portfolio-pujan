package com.portfolio.backend.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
@Entity
@Data
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String slug;
    private String title;
    private String summary;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String problem;
    @Column(columnDefinition = "TEXT")
    private String solution;
    @Column(columnDefinition = "TEXT")
    private String architecture;
    @Column(columnDefinition = "TEXT")
    private String outcome;
    @ElementCollection
    private List<String> tags;
    private String repoUrl;
    private String liveUrl;
    private boolean featured;
    private String imagePath;
}
