package com.portfolio.backend.controller;
import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "${cors.allowed-origins:http://localhost:3000}")
public class ContactController {
    private final ContactService service;
    private final Bucket bucket;
    
    public ContactController(ContactService service) {
        this.service = service;
        // 5 requests per minute
        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder().addLimit(limit).build();
    }
    
    @PostMapping
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactRequest request) {
        if (bucket.tryConsume(1)) {
            service.submitContact(request);
            return ResponseEntity.ok(Map.of("message", "Contact submitted successfully"));
        }
        return ResponseEntity.status(429).body(Map.of("error", "Too many requests"));
    }
}
