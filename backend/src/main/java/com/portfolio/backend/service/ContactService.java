package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {
    private final ContactMessageRepository repository;
    private final JavaMailSender mailSender;

    @Value("${contact.mail.from}")
    private String mailFrom;

    @Value("${contact.mail.recipient}")
    private String mailRecipient;

    public void submitContact(ContactRequest request) {
        ContactMessage msg = new ContactMessage();
        msg.setName(request.getName());
        msg.setEmail(request.getEmail());
        msg.setMessage(request.getMessage());
        msg.setCreatedAt(LocalDateTime.now());
        repository.save(msg);

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(mailFrom);
            mailMessage.setTo(mailRecipient);
            mailMessage.setSubject("New Contact from " + request.getName());
            mailMessage.setText("Email: " + request.getEmail() + "\n\n" + request.getMessage());
            mailSender.send(mailMessage);
        } catch (Exception e) {
            log.error("Failed to send contact email for request from: {}", request.getEmail(), e);
            // Ignore failure so frontend still gets success message
        }
    }
}
