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
    public void addUser(Map<String, Object> userData) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("users").document();
        ApiFuture<WriteResult> result = docRef.set(userData);
        result.get(); // Wait for the save to complete
    }
}
