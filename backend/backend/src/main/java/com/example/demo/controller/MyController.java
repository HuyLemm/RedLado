package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/api/hello")
    public String getHello() {
        return "Hello from Spring Boot";
    }

    @PostMapping("/api/data")
    public String postData(@RequestBody String data) {
        // Xử lý dữ liệu
        return "Received data: " + data;
    }
}
