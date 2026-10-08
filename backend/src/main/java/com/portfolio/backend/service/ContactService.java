package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactMessageRepository repository;
    private final JavaMailSender mailSender;

    public void submitContact(ContactRequest request) {
        ContactMessage msg = new ContactMessage();
        msg.setName(request.getName());
        msg.setEmail(request.getEmail());
        msg.setMessage(request.getMessage());
        msg.setCreatedAt(LocalDateTime.now());
        repository.save(msg);

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo("pujansuthar345@gmail.com");
            mailMessage.setSubject("New Contact from " + request.getName());
            mailMessage.setText("Email: " + request.getEmail() + "\n\n" + request.getMessage());
            mailSender.send(mailMessage);
        } catch (Exception e) {
            // Ignored in dev if SMTP fails
        }
    }
}
