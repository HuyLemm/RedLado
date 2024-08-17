package com.example.demo.controller;

import java.util.HashMap;
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


import com.example.demo.model.UserRegistrationRequest;
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
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest request) {
        try {
            // Validate input data
            if (request.getUsername() == null || request.getEmail() == null || request.getPassword() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                        .body("Invalid input data");
            }

            // Check if username or email already exists
            boolean userExists = firestoreService.isUsernameOrEmailExists("accounts", request.getUsername(), request.getEmail());
            if (userExists) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                        .body("Username or email already exists");
            }

            // Create user data map
            Map<String, Object> userData = new HashMap<>();
            userData.put("username", request.getUsername());
            userData.put("email", request.getEmail());
            userData.put("password", request.getPassword()); // Note: Password should be hashed in a real application

            // Save user data to Firestore
            firestoreService.addUser(userData);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("User registered successfully");
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Failed to register user");
        }
    }

}