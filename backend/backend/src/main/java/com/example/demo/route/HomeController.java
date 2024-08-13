package com.example.demo.route;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/")
public class HomeController {

    private final UserService userService;

    // Constructor injection for UserService
    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to the Home Page!");
    }
    
    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Please login to access your account.");
    }

    @GetMapping("/register")
    public ResponseEntity<String> register() {
        return ResponseEntity.ok("Please register to create a new account.");
    }

    @GetMapping("/profile")
    public ResponseEntity<String> profile(Model model) {
        // Lấy thông tin người dùng hiện tại từ SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Lấy tên người dùng từ Authentication

        // Tìm người dùng từ cơ sở dữ liệu
        User user = userService.findByUsername(username).orElse(null);

        // Thêm thông tin người dùng vào mô hình để hiển thị trên trang profile
        model.addAttribute("user", user);

        return ResponseEntity.ok("Profile Page for " + username);
    }
}
