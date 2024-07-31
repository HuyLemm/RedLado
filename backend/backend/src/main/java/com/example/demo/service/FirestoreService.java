package com.example.demo.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FirestoreService {


    private final Firestore firestore;

    @Autowired
    public FirestoreService(Firestore firestore) {
        this.firestore = firestore;
    }

    public String addDocument(String collectionName, Map<String, Object> data) throws ExecutionException, InterruptedException {
        try {
            DocumentReference documentReference = firestore.collection(collectionName).document();
            ApiFuture<WriteResult> result = documentReference.set(data);
            String updateTime = result.get().getUpdateTime().toString();
            return updateTime;
        } catch (Exception e) {
            throw e;
        }
    }
}
