/*
 * Dịch vụ người dùng dùng để thao tác với cơ sở dữ liệu quan hệ
 */
package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;

@Service
public class UserService {

    private final Firestore firestore;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(Firestore firestore) {
        this.firestore = firestore;
    }

    //Lưu người dùng vào Firestore và mã hóa mật khẩu.
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        firestore.collection("accounts").document(user.getUsername()).set(user);
    }

    //Tìm người dùng theo tên người dùng trong Firestore.
    public Optional<User> findByUsername(String username) {
        try {
            DocumentReference docRef = firestore.collection("accounts").document(username);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot snapshot = future.get();
            if (snapshot.exists()) {
                User user = snapshot.toObject(User.class);
                return Optional.ofNullable(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    //Xóa người dùng theo tên người dùng từ Firestore.
    public void deleteUser(String username) {
        try {
            firestore.collection("accounts").document(username).delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //Lấy tất cả người dùng từ Firestore.
    public Iterable<User> findAll() {
        try {
            CollectionReference users = firestore.collection("accounts");
            ApiFuture<QuerySnapshot> querySnapshot = users.get();
            return querySnapshot.get().toObjects(User.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
