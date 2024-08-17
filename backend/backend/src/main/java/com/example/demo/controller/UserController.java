package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.*;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/register")
public class UserController {

    @Autowired
    private UserService userService;

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
        newUser.setPassword(request.getPassword()); // Bạn nên mã hóa mật khẩu trước khi lưu trữ

        // Lưu người dùng vào cơ sở dữ liệu
        userService.save(newUser);

        return ResponseEntity.ok("User registered successfully");
    }
}
