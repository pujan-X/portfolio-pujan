package com.portfolio.backend.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Experience {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    private String company;
    private String duration;
    @Column(columnDefinition = "TEXT")
    private String description;
}
