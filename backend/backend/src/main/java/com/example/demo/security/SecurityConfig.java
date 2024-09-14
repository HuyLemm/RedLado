package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import com.example.demo.util.JwtUtil;
import com.example.demo.util.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Tắt bảo vệ CSRF vì chúng ta sử dụng JWT
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Không lưu trạng thái phiên
            .and()
            .authorizeRequests()
                .requestMatchers("/login", "/register", "/forgot-password").permitAll()  // Các URL công khai không yêu cầu xác thực
                .anyRequest().authenticated()  // Các yêu cầu còn lại yêu cầu xác thực
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);  // Thêm bộ lọc JWT

        return http.build();
    }

    @Bean
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
            .requestMatchers("/h2-console/**");  // Cho phép truy cập vào H2 Console
    }
}
