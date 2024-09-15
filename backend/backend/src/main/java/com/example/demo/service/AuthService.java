package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
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

    private static final String COLLECTION_NAME = "accounts";

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(User user) throws ExecutionException, InterruptedException {
        // Kiểm tra độ dài của username (từ 5 đến 12 ký tự)
        String username = user.getUsername();
        if (username.length() < 5 || username.length() > 12) {
            throw new IllegalArgumentException("Username phải có độ dài từ 5 đến 12 ký tự.");
        }

        // Kiểm tra xem username có trùng lặp không
        QuerySnapshot usernameQuerySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", user.getUsername())
                .get()
                .get();
    
        if (!usernameQuerySnapshot.isEmpty()) {
            throw new RuntimeException("Username đã tồn tại.");
        }

        // Kiểm tra email hợp lệ
        if (!user.getEmail().contains("@")) {
            throw new IllegalArgumentException("Email không hợp lệ. Vui lòng kiểm tra lại.");
        }

        // Kiểm tra xem email có trùng lặp không
        QuerySnapshot emailQuerySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", user.getEmail())
                .get()
                .get();

        if (!emailQuerySnapshot.isEmpty()) {
            throw new RuntimeException("Email đã tồn tại.");
        }

        // Kiểm tra mật khẩu: từ 5 đến 12 ký tự và chứa ít nhất 1 chữ viết hoa
        String password = user.getPassword();
        if (password.length() < 5 || password.length() > 12) {
            throw new IllegalArgumentException("Mật khẩu phải có độ dài từ 5 đến 12 ký tự.");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
        }

        // Tạo document ID
        String documentId = firestore.collection(COLLECTION_NAME).document().getId();
    
        // Gán ID cho đối tượng User
        user.setId(documentId);
    
        // Tạo dữ liệu cần lưu
        Map<String, Object> docData = new HashMap<>();
        docData.put("id", user.getId());
        docData.put("email", user.getEmail());
        docData.put("username", user.getUsername());
        docData.put("password", passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu
    
        // Lưu tài liệu với ID đã tạo
        firestore.collection(COLLECTION_NAME).document(documentId).set(docData).get();
    
        return "Đăng ký thành công!";
    }
    

    public String login(LoginRequestDto loginRequest) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("username", loginRequest.getUsername())
                .get()
                .get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Username không tồn tại. Quên mật khẩu ?");
        }

        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        User user = document.toObject(User.class);

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu.");
        }

        return jwtTokenProvider.generateToken(user);
    }
}
