package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequestDto;
import com.example.demo.model.User;
import com.example.demo.util.EmailToken;
import com.example.demo.util.Function;
import com.example.demo.util.JWT;
import com.example.demo.util.OTP;
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
    private JWT jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OTP otpService; // Service để xử lý OTP

    @Autowired
    private EmailToken emailTokenService; // Service gửi email
    
    @Autowired
    private Function function; // Utility function class

    // Hàm login kiểm tra thông tin đăng nhập và tạo JWT
    public String login(LoginRequestDto loginRequest) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", loginRequest.getUsername())
                .get().get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Username doesn't exist.");
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
        function.validateUserDetails(user);

        // Tạo mã OTP và lưu trong OtpService
        String otp = function.generateOtp();
        otpService.storeOtp(user.getEmail(), otp);

        // Gửi OTP qua email
        emailTokenService.sendOtpEmail(user.getEmail(), "Your OTP Code", "Your OTP code is: " + otp);

        // Tạm thời chưa lưu thông tin vào Firestore cho đến khi xác nhận OTP
        return "Your OTP code has been sent to your email. Please check your email.";
    }

    // Xác nhận OTP và tạo tài khoản sau khi xác nhận thành công
    public String confirmOtp(User user, String otp) throws ExecutionException, InterruptedException {
        if (!otpService.validateOtp(user.getEmail(), otp)) {
            throw new IllegalArgumentException("OTP is invalid or expired.");
        }

        // Tạo document và lưu thông tin người dùng vào Firestore
        function.saveUserToFirestore(user);
        return "Verified successfully! Your account has been created.";
    }

    // Gửi email quên mật khẩu
     // Gửi email quên mật khẩu
     public String forgotPassword(String email) throws ExecutionException, InterruptedException {
        User user = function.getUserByEmail(email);

        // Tạo token reset mật khẩu và gửi liên kết qua email
        String resetToken = emailTokenService.createResetToken(email, 120); // Token có hạn 120 giây
        String resetPasswordLink = RESET_PASSWORD_URL + "?token=" + resetToken;

        emailTokenService.sendOtpEmail(email, "Reset Password", "Please use the following link to reset your password: " + resetPasswordLink);
        return "A link to reset your password has been sent to your email.";
    }

    // Đặt lại mật khẩu
    public String resetPassword(String token, String newPassword) throws ExecutionException, InterruptedException {
        String email = emailTokenService.verifyResetToken(token);

        if (email == null) {
            throw new IllegalArgumentException("Reset password link has expired or is invalid.");
        }

        function.validatePassword(newPassword);

        User user = function.getUserByEmail(email);

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("New password cannot be the same as the old password.");
        }

        // Cập nhật mật khẩu mới
        Map<String, Object> updatedData = new HashMap<>();
        updatedData.put("password", passwordEncoder.encode(newPassword));

        firestore.collection(COLLECTION_NAME).document(user.getId()).update(updatedData).get();
        return "Password has been reset successfully.";
    }
}
