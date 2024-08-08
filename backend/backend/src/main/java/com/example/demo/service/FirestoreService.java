package com.example.demo.service;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;

@Service
public class FirestoreService {

    private final Firestore firestore;

    @Autowired
    public FirestoreService(Firestore firestore) {
        this.firestore = firestore;
    }

    public String addDocument(String collectionName, Map<String, Object> data) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = firestore.collection(collectionName).document();
        ApiFuture<WriteResult> result = documentReference.set(data);
        return result.get().getUpdateTime().toString();
    }

    public Map<String, Object> getDocument(String collection, String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot snapshot = future.get();
        return snapshot.exists() ? snapshot.getData() : null;
    }

    public String updateDocument(String collection, String id, Map<String, Object> data) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(id);
        ApiFuture<WriteResult> result = docRef.update(data);
        result.get(); // Wait for the update to complete
        return "Document updated successfully";
    }

    public void saveTransaction(String collection, String transactionHash, Map<String, Object> transactionData) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(transactionHash);
        ApiFuture<WriteResult> result = docRef.set(transactionData);
        result.get(); // Wait for the save to complete
    }

    public Map<String, Object> getTransaction(String collection, String transactionId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(transactionId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot snapshot = future.get();
        return snapshot.exists() ? snapshot.getData() : null;
    }
}
