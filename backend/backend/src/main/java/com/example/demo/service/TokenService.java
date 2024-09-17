package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.threeten.bp.LocalDateTime;

@Service
public class TokenService {
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
