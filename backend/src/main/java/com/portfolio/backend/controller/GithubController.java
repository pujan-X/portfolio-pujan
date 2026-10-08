package com.portfolio.backend.controller;
import com.portfolio.backend.dto.GithubStats;
import com.portfolio.backend.service.GithubService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/github")
@CrossOrigin(origins = "${cors.allowed-origins:http://localhost:3000}")
@RequiredArgsConstructor
public class GithubController {
    private final GithubService service;
    
    @GetMapping("/stats")
    public GithubStats getStats() { return service.getStats(); }
}
