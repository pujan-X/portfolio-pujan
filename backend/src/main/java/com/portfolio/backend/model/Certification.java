package com.portfolio.backend.model;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Certification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String issuer;
}
