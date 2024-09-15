package com.example.demo.model;

import java.util.Collection;
import java.util.Collections;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private String id;
    private String username;
    private String password;
    private String email;

    

    // Constructor không tham số
    public User() {}

    // Constructor với tham số
    public User(String id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Không có quyền cụ thể, bạn có thể thêm nếu cần
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Trạng thái tài khoản hết hạn
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Trạng thái tài khoản bị khóa
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Trạng thái thông tin đăng nhập hết hạn
    }

    @Override
    public boolean isEnabled() {
        return true; // Trạng thái tài khoản kích hoạt
    }

    // Getters và Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
