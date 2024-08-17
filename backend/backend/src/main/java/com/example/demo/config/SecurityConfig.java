package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/", "/login", "/register", "/forgot-password").permitAll()
                    .anyRequest().authenticated()
            )
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login")
                    .defaultSuccessUrl("/profile", true)
                    .failureUrl("/login?error=true")
            )
            .oauth2Login(oauth2Login ->
                oauth2Login
                    .loginPage("/login")
                    .defaultSuccessUrl("/profile", true)
                    .failureUrl("/login?error=true")
            )
            .logout(logout ->
                logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/login?logout=true")
            )
            .exceptionHandling(exceptionHandling ->
                exceptionHandling
                    .accessDeniedPage("/403")
            )
            .csrf(csrf ->
                csrf.disable() // Disable CSRF protection for simplicity; enable it for production
            );
        return http.build();
    }
}
