package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("gla1vesaigon@gmail.com");
    
            mailSender.send(message);
            System.out.println("Email đã được gửi đến: " + toEmail);
        } catch (Exception e) {
            // Ghi log lỗi hoặc xử lý lỗi
            System.out.println("Error sending email: " + e.getMessage());
        }
    }
}       