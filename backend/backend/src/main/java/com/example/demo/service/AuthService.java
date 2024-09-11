package com.example.demo.service;

import com.example.demo.dto.LoginRequestDto;
import com.example.demo.model.User;
import com.example.demo.util.JwtUtil;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {

    @Autowired
    private Firestore firestore;

    @Autowired
    private JwtUtil jwtUtil;

    private static final String COLLECTION_NAME = "accounts";

    
    public String register(User user) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", user.getEmail())
                .get()
                .get();

        if (!querySnapshot.isEmpty()) {
            throw new RuntimeException("Email đã tồn tại.");
        }

        Map<String, Object> docData = new HashMap<>();
        docData.put("email", user.getEmail());
        docData.put("username", user.getUsername());
        docData.put("password", user.getPassword());  // Bạn nên mã hóa mật khẩu trước khi lưu

        firestore.collection(COLLECTION_NAME).add(docData).get();
        return "Đăng ký thành công!";
    }

    public String login(LoginRequestDto loginRequest) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", loginRequest.getEmail())
                .get()
                .get();

        if (querySnapshot.isEmpty()) {
            throw new RuntimeException("Email không tồn tại.");
        }

        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        User user = document.toObject(User.class);

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Sai mật khẩu.");
        }

        // Nếu thông tin đăng nhập hợp lệ, sinh JWT
        return jwtUtil.generateToken(user.getEmail());
    }
}
