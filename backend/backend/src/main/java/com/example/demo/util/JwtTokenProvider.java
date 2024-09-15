package com.example.demo.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.example.demo.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider {

    private String JWT_SECRET = "redlado23a1aredlado23a1aredlado23a1aredlado23a1a"; // Khóa bí mật để mã hóa token

    //Thời gian có hiệu lực của chuỗi jwt
    private final long JWT_EXPIRATION = 604800000L;

    // Tạo ra jwt từ thông tin user
    public String generateToken(User userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        
        if (userDetails.getId() == null) {
            throw new IllegalArgumentException("User ID cannot be null when generating token");
        }
    
        return Jwts.builder()
                .setSubject(userDetails.getId()) // ID của user
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

}