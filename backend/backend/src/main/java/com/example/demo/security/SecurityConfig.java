package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.authentication.AuthenticationManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

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
                    .permitAll()
            )
            .oauth2Login(oauth2Login ->
                oauth2Login
                    .loginPage("/login")
                    .defaultSuccessUrl("/profile", true)
                    .failureUrl("/login?error=true")
            )
            .logout(logout ->
                logout
                    .logoutSuccessUrl("/login?logout=true")
                    .permitAll()
            )
            .exceptionHandling(exceptionHandling ->
                exceptionHandling
                    .accessDeniedPage("/403")
            )
            .csrf(csrf ->
                csrf
                    .disable() // Disable CSRF protection for simplicity; enable it for production
            );
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
            response.sendRedirect("/profile");
        };
    }

    @Bean
    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return (request, response, exception) -> {
            response.sendRedirect("/login?error=true");
        };
    }

    @Bean
    public LogoutSuccessHandler customLogoutSuccessHandler() {
        return (request, response, authentication) -> {
            response.sendRedirect("/login?logout=true");
        };
    }
}

