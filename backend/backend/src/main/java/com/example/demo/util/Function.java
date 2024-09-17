package com.example.demo.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.model.User;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

@Component
public class Function {

    @Autowired
    private Firestore firestore;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String COLLECTION_NAME = "accounts";

    // Tạo mã OTP ngẫu nhiên
    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // OTP 6 chữ số
        return String.valueOf(otp);
    }

    // Kiểm tra mật khẩu hợp lệ
    public void validatePassword(String password) {
        if (password.length() < 5 || password.length() > 12) {
            throw new IllegalArgumentException("Password must be between 5 and 12 characters.");
        }

        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter.");
        }
    }

    public void validateEmail(String email) {
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Email is invalid. It must contain '@'.");
        }
    }
    
    // Kiểm tra tính hợp lệ của chi tiết người dùng (email và username)
    public void validateUserDetails(User user) throws ExecutionException, InterruptedException {
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

    // Lưu người dùng vào Firestore
    public void saveUserToFirestore(User user) throws ExecutionException, InterruptedException {
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
     public User getUserByEmail(String email) throws ExecutionException, InterruptedException {
        try {
            QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                    .whereEqualTo("email", email)
                    .get().get();
            
            if (querySnapshot.isEmpty()) {
                System.out.println("Email not found: " + email);
                throw new RuntimeException("Email not found.");
            }
            
            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            return document.toObject(User.class);
        } catch (Exception e) {
            e.printStackTrace();  // Log lỗi Firestore chi tiết
            throw new RuntimeException("Firestore connection issue: " + e.getMessage());
        }
    }
    
    

    // Kiểm tra trường hợp đã tồn tại
    public boolean isFieldExists(String fieldName, String fieldValue) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME).whereEqualTo(fieldName, fieldValue).get().get();
        return !querySnapshot.isEmpty();
    }
}
