/* Dùng để chứa thông tin khi người dùng thực hiện đăng ký tài khoản.
 * Các thuộc tính:
 * username: Tên người dùng.
 * email: Địa chỉ email của người dùng.
 * password: Mật khẩu của người dùng.
 */
package com.example.demo.model;

public class UserRegistrationRequest {

    private String username;
    private String email;
    private String password;

    // Getters and Setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
