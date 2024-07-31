package com.example.demo.service;

import com.google.cloud.firestore.Firestore;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseService {

    @Autowired
    private Firestore firestore;

    public String saveData(String collection, String document, Map<String, Object> data) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(document);
        ApiFuture<WriteResult> result = docRef.set(data);
        return result.get().getUpdateTime().toString();
    }

    // public Map<String, Object> getData(String collection, String document) throws ExecutionException, InterruptedException {
    //     DocumentReference docRef = firestore.collection(collection).document(document);
    //     ApiFuture<DocumentSnapshot> future = docRef.get();
    //     DocumentSnapshot documentSnapshot = future.get();
    //     if (documentSnapshot.exists()) {
    //         return documentSnapshot.getData();
    //     } else {
    //         return null;
    //     }
    // }
}
