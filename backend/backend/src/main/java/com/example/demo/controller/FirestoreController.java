package com.example.demo.controller;

import com.example.demo.service.FirestoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class FirestoreController {

    @Autowired
    private FirestoreService firestoreService;

    @PostMapping("/addDocument")
    public String addDocument(@RequestBody Map<String, Object> data) {
        try {
            return firestoreService.addDocument("accounts", data);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return "Lỗi khi thêm tài liệu";
        }
    }
}
