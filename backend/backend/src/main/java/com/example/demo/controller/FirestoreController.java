package com.example.demo.controller;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.FirestoreService;

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
                    .body("Failed to add document");
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
                        .body("Document not found");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Failed to retrieve document");
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
                    .body("Failed to update document");
        }
    }
}