package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout,
                        Model model) {
        if (error != null) {
            model.addAttribute("error", "Invalid username or password. Please try again.");
        }

        if (logout != null) {
            model.addAttribute("message", "You have been logged out successfully.");
        }

        return "login"; // trả về trang login.html
    }

    @GetMapping("/register")
    public String register(Model model) {
        // Optionally, add any model attributes required for registration
        return "register"; // trả về trang register.html
    }

    @GetMapping("/profile")
    public String profile() {
        return "profile"; // trả về trang profile.html
    }

    @GetMapping("/forgot-password")
    public String forgotPassword() {
        return "forgot-password"; // trả về trang forgot-password.html
    }
}
