package com.example.demo.controller;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BlockchainService;

@RestController
@RequestMapping("/api")
public class BlockchainController {

    private BlockchainService blockchainService;

    @PostMapping("/simulateTransaction")
    public ResponseEntity<String> simulateTransaction(@RequestBody Map<String, Object> transactionData) {
        try {
            String transactionHash = blockchainService.simulateBlockchainTransaction(transactionData);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Transaction Hash: " + transactionHash);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Failed to simulate transaction");
        }
    }

    @PostMapping("/saveTransaction")
    public ResponseEntity<String> saveTransaction(@RequestParam String transactionHash, @RequestBody Map<String, Object> transactionData) {
        try {
            blockchainService.saveTransaction(transactionHash, transactionData);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Transaction saved successfully");
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body("Failed to save transaction");
        }
    }

    @GetMapping("/getTransaction/{transactionId}")
    public ResponseEntity<Map<String, Object>> getTransaction(@PathVariable String transactionId) throws ExecutionException, InterruptedException {
        Map<String, Object> transaction = blockchainService.getTransaction(transactionId);
        return ResponseEntity.ok(transaction);
    }

}
