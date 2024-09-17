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
    public ResponseEntity<String> resetPassword(@RequestParam("email") String email, @RequestParam("otp") String otp, @RequestParam("newPassword") String newPassword) {
        try {
            // Xác nhận OTP và kiểm tra mật khẩu mới
            String result = authService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok(result); // Trả về thông báo thành công
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Trả về lỗi nếu OTP không hợp lệ hoặc mật khẩu không hợp lệ
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra. Vui lòng thử lại sau."); // Lỗi không mong muốn
        }
    }

    // Quên mật khẩu - gửi OTP qua email
    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam("email") String email) {
        try {
            // Kiểm tra email và gửi OTP nếu tồn tại
            String result = authService.forgotPassword(email);
            return ResponseEntity.ok(result); // OTP đã được gửi qua email
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Báo lỗi nếu email không tồn tại
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra. Vui lòng thử lại sau."); // Lỗi không mong muốn
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
