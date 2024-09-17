package com.example.demo.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequestDto;
import com.example.demo.model.User;
import com.example.demo.service.AuthService;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            String result = authService.register(user);
            return ResponseEntity.ok(result);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body("Internal server error");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage()); 
        }
    }

    @PostMapping("/reset-password") 
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token, @RequestParam("newPassword") String newPassword) {
        try {
            String result = authService.resetPassword(token, newPassword);
            return ResponseEntity.ok(result); // Successful password reset response
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Invalid token or password error
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again later.");
        }
    }

    // Quên mật khẩu - gửi OTP qua email
    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam("email") String email) {
        try {
            String result = authService.forgotPassword(email);
            return ResponseEntity.ok(result); // Reset password link sent to email
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Email not found error
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again later.");
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            String token = authService.login(loginRequest);
            return ResponseEntity.ok(token);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(500).body("Internal server error");
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
