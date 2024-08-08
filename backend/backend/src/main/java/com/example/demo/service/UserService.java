package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.model.UserDTO;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserDTO userDTO) {
        // Kiểm tra email trùng lặp
        if (!userDTO.getEmail().equals(userDTO.getConfirmEmail())) {
            throw new IllegalArgumentException("Email và xác nhận email không khớp");
        }

        // Kiểm tra định dạng mật khẩu
        if (!isValidPassword(userDTO.getPassword())) {
            throw new IllegalArgumentException("Mật khẩu không hợp lệ");
        }

        // Mã hóa mật khẩu
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());

        // Tạo và lưu người dùng
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    private boolean isValidPassword(String password) {
        // Độ dài tối thiểu 16 ký tự, có ít nhất 1 ký tự đặc biệt và 1 chữ hoa
        return password.length() >= 16 && 
               password.matches(".*[!@#].*") && 
               password.matches(".*[A-Z].*");
    }
}
