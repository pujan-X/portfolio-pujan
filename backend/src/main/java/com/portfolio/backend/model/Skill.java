package com.portfolio.backend.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Skill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private String name;
    private Integer proficiency; // 1 to 100
}
