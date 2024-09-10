// Controller điều khiển các route HTTP (GET và POST) cho trang chính, đăng nhập, đăng ký và trang hồ sơ người dùng. Nó kết nối với UserService để xử lý logic liên quan đến người dùng.
/* home(): Xử lý yêu cầu GET đến trang chủ, trả về thông báo chào mừng.
 * login() (GET): Trả về một thông báo yêu cầu người dùng đăng nhập.
 * login() (POST): Xử lý yêu cầu đăng nhập, kiểm tra tên đăng nhập và mật khẩu.
 * register() (GET): Trả về thông báo yêu cầu người dùng đăng ký tài khoản.
 * register() (POST): Xử lý yêu cầu đăng ký tài khoản, tạo và lưu người dùng mới.
 * profile(): Xử lý yêu cầu xem hồ sơ cá nhân của người dùng dựa trên tên đăng nhập.
 */
package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/")
public class HomeController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection for UserService and PasswordEncoder
    @Autowired
    public HomeController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to the Home Page!");
    }

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Please login to access your account.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        User user = userService.findByUsername(username).orElse(null);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
        return ResponseEntity.ok("Login successful");
    }

    @GetMapping("/register")
    public ResponseEntity<String> register() {
        return ResponseEntity.ok("Please register to create a new account.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String password, @RequestParam String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        userService.save(user);
        return ResponseEntity.ok("Registration successful");
    }

    @GetMapping("/profile")
    public ResponseEntity<String> profile(@RequestParam(required = false) String username) {
        if (username == null) {
            return ResponseEntity.badRequest().body("Username is required");
        }

        User user = userService.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        return ResponseEntity.ok("Profile Page for " + username);
    }
}
