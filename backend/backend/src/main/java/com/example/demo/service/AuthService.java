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
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String COLLECTION_NAME = "accounts";

    public String register(User user) throws ExecutionException, InterruptedException {
        // Kiểm tra độ dài username
        validateUsername(user.getUsername());

        // Kiểm tra trùng lặp username và email
        checkUsernameAndEmailAvailability(user);

        // Kiểm tra mật khẩu
        validatePassword(user.getPassword());

        // Tạo document ID và gán cho đối tượng User
        String documentId = firestore.collection(COLLECTION_NAME).document().getId();
        user.setId(documentId);

        // Tạo OTP và gửi qua email
        String otp = generateOtp();
        emailService.sendOtpEmail(user.getEmail(), "Mã xác nhận OTP", "Mã OTP của bạn là: " + otp);

        // Lưu thông tin người dùng và OTP vào Firestore
        saveUserWithOtp(user, otp);

        return "Đã gửi mã OTP đến email. Vui lòng xác nhận OTP.";
    }

    private void validateUsername(String username) {
        if (username.length() < 5 || username.length() > 12) {
            throw new IllegalArgumentException("Username phải có độ dài từ 5 đến 12 ký tự.");
        }
    }

    private void checkUsernameAndEmailAvailability(User user) throws ExecutionException, InterruptedException {
        QuerySnapshot usernameQuerySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", user.getUsername())
                .get().get();
        if (!usernameQuerySnapshot.isEmpty()) {
            throw new RuntimeException("Username đã tồn tại.");
        }

        if (!user.getEmail().contains("@")) {
            throw new IllegalArgumentException("Email không hợp lệ. Vui lòng kiểm tra lại.");
        }

        QuerySnapshot emailQuerySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", user.getEmail())
                .get().get();
        if (!emailQuerySnapshot.isEmpty()) {
            throw new RuntimeException("Email đã tồn tại.");
        }
    }

    private void validatePassword(String password) {
        if (password.length() < 5 || password.length() > 12) {
            throw new IllegalArgumentException("Mật khẩu phải có độ dài từ 5 đến 12 ký tự.");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
        }
    }

    private void saveUserWithOtp(User user, String otp) throws ExecutionException, InterruptedException {
        Map<String, Object> docData = new HashMap<>();
        docData.put("id", user.getId());
        docData.put("email", user.getEmail());
        docData.put("username", user.getUsername());
        docData.put("password", passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu
        docData.put("otp", otp); // Lưu OTP vào Firestore
        docData.put("isVerified", false); // Đánh dấu tài khoản chưa xác thực

        firestore.collection(COLLECTION_NAME).document(user.getId()).set(docData).get();
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Tạo mã OTP 6 chữ số
        return String.valueOf(otp);
    }

    public String verifyOtp(String email, String otpInput) throws ExecutionException, InterruptedException {
        // Tìm tài khoản dựa trên email
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", email)
                .get()
                .get();
    
        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Không tìm thấy tài khoản với email này.");
        }
    
        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        String storedOtp = document.getString("otp");
    
        // Kiểm tra OTP
        if (!storedOtp.equals(otpInput)) {
            throw new RuntimeException("OTP không chính xác.");
        }
    
        // Xác minh thành công, cập nhật tài khoản
        Map<String, Object> updates = new HashMap<>();
        updates.put("isVerified", true); // Cập nhật trạng thái tài khoản đã xác thực
        firestore.collection(COLLECTION_NAME).document(document.getId()).update(updates).get();
    
        return "Xác minh OTP thành công. Tài khoản của bạn đã được kích hoạt!";
    }
    

    public String login(LoginRequestDto loginRequest) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", loginRequest.getUsername())
                .get().get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Username không tồn tại.");
        }

        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        User user = document.toObject(User.class);

        Boolean isVerified = document.getBoolean("isVerified");
        if (isVerified == null || !isVerified) {
            throw new RuntimeException("Tài khoản chưa được xác thực. Vui lòng xác nhận OTP qua email.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu.");
        }

        return jwtTokenProvider.generateToken(user);
    }
}
