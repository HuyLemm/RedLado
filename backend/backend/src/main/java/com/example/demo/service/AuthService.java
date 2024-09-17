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

    private static final String COLLECTION_NAME = "accounts";
    private static final String RESET_PASSWORD_URL = "localhost:6969/auth/reset-password"; // Đường dẫn để reset mật khẩu

    @Autowired
    private Firestore firestore;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService; // Service để xử lý OTP

    @Autowired
    private EmailService emailService; // Service gửi email

    @Autowired
    private TokenService tokenService; // Service quản lý token

    // Tạo mã OTP ngẫu nhiên
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // OTP 6 chữ số
        return String.valueOf(otp);
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


    // Đăng ký tài khoản
    public String register(User user) throws ExecutionException, InterruptedException {
        validateUserDetails(user);

        // Tạo mã OTP và lưu trong OtpService
        String otp = generateOtp();
        otpService.storeOtp(user.getEmail(), otp);

        // Gửi OTP qua email
        emailService.sendOtpEmail(user.getEmail(), "Your OTP Code", "Your OTP code is: " + otp);

        // Tạm thời chưa lưu thông tin vào Firestore cho đến khi xác nhận OTP
        return "Your OTP code has been sent to your email. Please check your email.";
    }

    // Xác nhận OTP và tạo tài khoản sau khi xác nhận thành công
    public String confirmOtp(String email, String otp, User user) throws ExecutionException, InterruptedException {
        if (!otpService.validateOtp(email, otp)) {
            throw new IllegalArgumentException("OTP is invalid or expired.");
        }

        // Tạo document và lưu thông tin người dùng vào Firestore
        saveUserToFirestore(user);
        return "Verified successfully! Your account has been created.";
    }

    // Gửi email quên mật khẩu
    public String forgotPassword(String email) throws ExecutionException, InterruptedException {
        User user = getUserByEmail(email);

        // Tạo token reset mật khẩu và gửi liên kết qua email
        String resetToken = tokenService.createResetToken(email, 120); // Token có hạn 120 giây
        String resetPasswordLink = RESET_PASSWORD_URL + "?token=" + resetToken;

        emailService.sendOtpEmail(email, "Reset Password", "Please use the following link to reset your password: " + resetPasswordLink);
        return "A link to reset your password has been sent to your email.";
    }

    // Đặt lại mật khẩu
    public String resetPassword(String token, String newPassword) throws ExecutionException, InterruptedException {
        String email = tokenService.verifyResetToken(token);

        if (email == null) {
            throw new IllegalArgumentException("Reset password link has expired or is invalid.");
        }

        validatePassword(newPassword);

        User user = getUserByEmail(email);

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("New password cannot be the same as the old password.");
        }

        // Cập nhật mật khẩu mới
        Map<String, Object> updatedData = new HashMap<>();
        updatedData.put("password", passwordEncoder.encode(newPassword));

        firestore.collection(COLLECTION_NAME).document(user.getId()).update(updatedData).get();
        return "Password has been reset successfully.";
    }

    // Kiểm tra tính hợp lệ của chi tiết người dùng (email và username)
    private void validateUserDetails(User user) throws ExecutionException, InterruptedException {
        // Kiểm tra email hợp lệ
        if (!user.getEmail().contains("@")) {
            throw new IllegalArgumentException("Email is invalid. It must contain '@'.");
        }

        if (isFieldExists("email", user.getEmail())) {
            throw new RuntimeException("Email existed.");
        }

        // Kiểm tra độ dài username
        if (user.getUsername().length() < 5 || user.getUsername().length() > 12) {
            throw new IllegalArgumentException("Username is invalid. Please enter a username within 5 to 12 characters.");
        }

        if (isFieldExists("username", user.getUsername())) {
            throw new RuntimeException("Username existed.");
        }
    }

    // Kiểm tra mật khẩu hợp lệ
    private void validatePassword(String password) {
        if (password.length() < 5 || password.length() > 12) {
            throw new IllegalArgumentException("Password must be between 5 and 12 characters.");
        }

        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter.");
        }
    }

    // Lưu người dùng vào Firestore
    private void saveUserToFirestore(User user) throws ExecutionException, InterruptedException {
        String documentId = firestore.collection(COLLECTION_NAME).document().getId();
        user.setId(documentId);

        Map<String, Object> docData = new HashMap<>();
        docData.put("id", user.getId());
        docData.put("email", user.getEmail());
        docData.put("username", user.getUsername());
        docData.put("password", passwordEncoder.encode(user.getPassword()));

        firestore.collection(COLLECTION_NAME).document(user.getId()).set(docData).get();
    }

    // Lấy thông tin người dùng từ email
    private User getUserByEmail(String email) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME).whereEqualTo("email", email).get().get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Email not found.");
        }

        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        return document.toObject(User.class);
    }

    // Kiểm tra trường hợp đã tồn tại
    private boolean isFieldExists(String fieldName, String fieldValue) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME).whereEqualTo(fieldName, fieldValue).get().get();
        return !querySnapshot.isEmpty();
    }
}
