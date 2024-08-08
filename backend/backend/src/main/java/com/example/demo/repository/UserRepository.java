package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm người dùng theo tên người dùng
    User findByUsername(String username);
    
    // Tìm người dùng theo email
    User findByEmail(String email);
}
