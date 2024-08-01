package com.example.demo.controller;

import com.example.demo.service.FirestoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.http.HttpHeaders;


import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class FirestoreController {

    @Autowired
    private FirestoreService firestoreService;

    
    @PostMapping("/addDocument")
    public ResponseEntity<String> addDocument(@RequestBody Map<String, Object> data) {
        try {
            String result = firestoreService.addDocument("accounts", data);
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body(result);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body("Lỗi khi thêm tài liệu");
        }
    }

    @GetMapping("/getDocument/{id}")
    public ResponseEntity<Object> getDocument(@PathVariable String id) {
        try {
            Map<String, Object> data = firestoreService.getDocument("accounts", id);
            if (data != null) {
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "application/json")
                    .body(data);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Tài liệu không tìm thấy");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body("Lỗi khi lấy tài liệu");
        }
    }
        
    @PutMapping("/updateDocument/{id}")
    public ResponseEntity<String> updateDocument(@PathVariable String id, @RequestBody Map<String, Object> data) {
        try {
            String result = firestoreService.updateDocument("accounts", id, data);
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body(result);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body("Lỗi khi cập nhật tài liệu");
        }
    }
}

