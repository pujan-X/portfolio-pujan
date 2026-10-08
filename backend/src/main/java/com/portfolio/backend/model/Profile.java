package com.portfolio.backend.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private String tagline;
    @Column(columnDefinition = "TEXT")
    private String bio;
    private String email;
    private String linkedin;
    private String github;
    private String resumeUrl;
}
