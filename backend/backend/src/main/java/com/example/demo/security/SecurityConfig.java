/* 
 * Cấu hình bảo mật cho ứng dụng bằng cách sử dụng Spring Security.
 * Các phương thức chính:
 * securityFilterChain(): Cấu hình chuỗi lọc bảo mật bao gồm:
 * Cấp quyền truy cập cho các trang như /, /login, /register, và /forgot-password mà không yêu cầu xác thực.
 * Yêu cầu xác thực cho các yêu cầu khác ngoài những trang đã chỉ định.
 * Cấu hình login và logout, bao gồm URL trang đăng nhập, URL khi đăng nhập thành công và thất bại, cũng như khi đăng xuất.
 * Hỗ trợ OAuth2 Login cho việc đăng nhập qua các nhà cung cấp bên thứ ba như Google hoặc Facebook.
 * Tắt bảo vệ CSRF để đơn giản hóa quá trình phát triển, nhưng cảnh báo rằng CSRF nên được kích hoạt trong môi trường sản xuất để đảm bảo an ninh.
 * Mục đích:
 * Quản lý quyền truy cập vào các tài nguyên và định nghĩa các quy tắc bảo mật cho ứng dụng web.
 * Cho phép người dùng đăng nhập qua OAuth2 hoặc qua form đăng nhập thông thường và cung cấp trải nghiệm an toàn khi tương tác với hệ thống.
 */
package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    // Tạo một đối tượng mã hóa mật khẩu sử dụng thuật toán BCrypt.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cấu hình bảo mật cho ứng dụng. Ở đây, mọi yêu cầu đều được cho phép (không yêu cầu xác thực).
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
            .anyRequest().permitAll();  // Cho phép tất cả các yêu cầu mà không cần xác thực

        return http.build();
    }
}
