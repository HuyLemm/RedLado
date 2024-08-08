package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.model.UserDTO;
import com.example.demo.service.BlockchainService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private BlockchainService blockchainService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDTO userDTO) {
        // Kiểm tra và lưu thông tin tài khoản
        User user = userService.registerUser(userDTO);

        // Cập nhật thông tin tài khoản lên blockchain
        blockchainService.updateAccountOnBlockchain(user.getUsername(), user.getEmail(), user.getPassword());

        return ResponseEntity.ok("Đăng ký thành công");
    }
}
