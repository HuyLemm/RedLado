package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.User;
import com.example.demo.model.UserRegistrationRequest;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/auth")
public class UserController {

 
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest request) {
        // Kiểm tra nếu người dùng đã tồn tại
        if (userService.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        if (userService.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Tạo đối tượng User mới từ UserRegistrationRequest
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa mật khẩu trước khi lưu trữ

        // Lưu người dùng vào cơ sở dữ liệu
        userService.save(newUser);

        return ResponseEntity.ok("User registered successfully");
        
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        // Tìm người dùng dựa trên tên người dùng
        User user = userService.findByUsername(username).orElse(null);
    
        // Kiểm tra người dùng và mật khẩu
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    
        // Xử lý thành công đăng nhập, ví dụ, tạo token hoặc session nếu cần
        // Ví dụ: return ResponseEntity.ok("Login successful");
    
        return ResponseEntity.ok("Login successful"); // Thay thế với logic xử lý sau khi đăng nhập thành công
    }
    
}
