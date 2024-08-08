package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AuthController {

    @GetMapping("/home")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to the Home Page!");
    }

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Login page. You can log in using Facebook, Google, or username/password.");
    }

    @GetMapping("/signup")
    public ResponseEntity<String> signup() {
        return ResponseEntity.ok("Signup page. Please register with your details.");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String email, @RequestParam String confirmEmail, @RequestParam String password) {
        // Validate the registration data
        if (!email.equals(confirmEmail)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email addresses do not match.");
        }
        if (!isPasswordValid(password)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password does not meet the criteria.");
        }

        // Save the user data (You need to implement the actual saving logic)
        return ResponseEntity.ok("Registration successful.");
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 16 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[!@#].*");
    }
}
