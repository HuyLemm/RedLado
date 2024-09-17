package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequestDto;
import com.example.demo.model.User;
import com.example.demo.util.JwtTokenProvider;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

@Service
public class AuthService {

    @Autowired
    private Firestore firestore;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService;  // Sử dụng OtpService để lưu OTP tạm thời

    @Autowired
    private EmailService emailService;  // Gửi email OTP

    private static final String COLLECTION_NAME = "accounts";

     // Tạo mã OTP ngẫu nhiên
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Tạo mã OTP 6 chữ số
        return String.valueOf(otp);
    }

    // Hàm register 
    public String register(User user) throws ExecutionException, InterruptedException {
        // Kiểm tra trùng lặp email
        if (!user.getEmail().contains("@")) {
            throw new IllegalArgumentException("Email is invalid. It must contain '@'.");
        }

        QuerySnapshot emailQuerySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", user.getEmail())
                .get().get();
        if (!emailQuerySnapshot.isEmpty()) {
            throw new RuntimeException("Email existed.");
        }

        // Kiểm tra độ dài username
        if (user.getUsername().length() < 5 || user.getUsername().length() > 12) {
            throw new IllegalArgumentException("Username is invalid. Please enter a username within 5 to 12 characters.");
        }

        // Kiểm tra trùng lặp username
        QuerySnapshot usernameQuerySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", user.getUsername())
                .get().get();
        if (!usernameQuerySnapshot.isEmpty()) {
            throw new RuntimeException("Username existed.");
        }

        // Kiểm tra mật khẩu
        if (user.getPassword().length() < 5 || user.getPassword().length() > 12) {
            throw new IllegalArgumentException("Password is invalid. Please enter a username within 5 to 12 characters.");
        }
        if (!user.getPassword().matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter.");
        }

        // Tạo document ID và gán cho đối tượng User
        String documentId = firestore.collection(COLLECTION_NAME).document().getId();
        user.setId(documentId);

        String otp = generateOtp();

        // Lưu OTP tạm thời vào OtpService
        otpService.storeOtp(user.getEmail(), otp);

        // Gửi OTP qua email
        emailService.sendOtpEmail(user.getEmail(), "Your OTP Code", "Your OTP code is: " + otp);

        // Tạm thời chưa lưu thông tin người dùng vào Firestore cho đến khi xác nhận OTP
        return "Your OTP code has been sent to your email. Please check your email.";
    }

    // Xác nhận OTP và lưu thông tin người dùng vào Firestore sau khi xác nhận thành công
    public String confirmOtp(String email, String otp, User user) throws ExecutionException, InterruptedException {
        // Kiểm tra OTP qua OtpService
        if (!otpService.validateOtp(email, otp)) {
            throw new IllegalArgumentException("Your OTP is invalid or expired.");
        }

        // Tạo document ID và gán cho đối tượng User
        String documentId = firestore.collection(COLLECTION_NAME).document().getId();
        user.setId(documentId);

        // Lưu thông tin người dùng vào Firestore sau khi xác nhận OTP thành công
        Map<String, Object> docData = new HashMap<>();
        docData.put("id", user.getId());
        docData.put("email", user.getEmail());
        docData.put("username", user.getUsername());
        docData.put("password", passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu

        firestore.collection(COLLECTION_NAME).document(user.getId()).set(docData).get();

        return "Verified successfully! Your account has been created.";
    }

    // Hàm reset mật khẩu qua email và gửi OTP
    public String forgotPassword(String email) throws ExecutionException, InterruptedException {
        User user = getUserByEmail(email); // Lấy thông tin người dùng bằng email

        // Nếu người dùng không tồn tại, ném ra ngoại lệ
        if (user == null) {
            throw new IllegalArgumentException("Email không tồn tại trong hệ thống.");
        }

        // Tạo mã OTP và lưu vào OtpService
        String otp = generateOtp();
        otpService.storeOtp(email, otp);

        // Gửi OTP qua email
        emailService.sendOtpEmail(email, "Reset Password OTP", "Your OTP code is: " + otp);

        return "OTP đã được gửi tới email của bạn. Vui lòng kiểm tra email để xác nhận.";
    }

     // Xác nhận OTP và cập nhật mật khẩu mới
     public String resetPassword(String email, String otp, String newPassword) throws ExecutionException, InterruptedException {
        if (!otpService.validateOtp(email, otp)) {
            throw new IllegalArgumentException("Invalid or expired OTP.");
        }

        if (newPassword.length() < 5 || newPassword.length() > 12) {
            throw new IllegalArgumentException("Password must be between 5 and 12 characters.");
        }

        if (!newPassword.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter.");
        }

        User user = getUserByEmail(email);
        // So sánh mật khẩu mới với mật khẩu cũ
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from the old password.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        // Cập nhật thông tin người dùng với mật khẩu mới
        Map<String, Object> updatedData = new HashMap<>();
        updatedData.put("password", user.getPassword());

        firestore.collection(COLLECTION_NAME).document(user.getId()).update(updatedData).get();

        return "Password has been reset successfully.";
    }
    


    // Hàm login kiểm tra thông tin đăng nhập và tạo JWT
    public String login(LoginRequestDto loginRequest) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", loginRequest.getUsername())
                .get().get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Username existed.");
        }

        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        User user = document.toObject(User.class);

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password. Please try again.");
        }

        return jwtTokenProvider.generateToken(user);
    }

     // Lấy user theo email
     private User getUserByEmail(String email) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", email).get().get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Email not found.");
        }

        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        return document.toObject(User.class);
    }
}
