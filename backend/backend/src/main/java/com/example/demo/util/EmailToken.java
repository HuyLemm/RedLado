package com.example.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.threeten.bp.LocalDateTime;

@Service
public class EmailToken {

    @Autowired
    private JavaMailSender mailSender;

    // Gửi OTP qua email
    public void sendOtpEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    private final Map<String, TokenData> tokenStorage = new HashMap<>();

    public String createResetToken(String email, int expirationInSeconds) {
        String token = UUID.randomUUID().toString();  // Tạo một token ngẫu nhiên
        LocalDateTime expirationTime = LocalDateTime.now().plusSeconds(expirationInSeconds);

        tokenStorage.put(token, new TokenData(email, expirationTime));

        return token;
    }

    public String verifyResetToken(String token) {
        TokenData tokenData = tokenStorage.get(token);

        if (tokenData == null || tokenData.getExpirationTime().isBefore(LocalDateTime.now())) {
            return null;  // Token đã hết hạn hoặc không hợp lệ
        }

        // Xóa token sau khi sử dụng để đảm bảo chỉ sử dụng một lần
        tokenStorage.remove(token);

        return tokenData.getEmail();
    }

    private static class TokenData {
        private String email;
        private LocalDateTime expirationTime;

        public TokenData(String email, LocalDateTime expirationTime) {
            this.email = email;
            this.expirationTime = expirationTime;
        }

        public String getEmail() {
            return email;
        }

        public LocalDateTime getExpirationTime() {
            return expirationTime;
        }
    }
}
