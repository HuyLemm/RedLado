package com.example.demo.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.cloud.firestore.DocumentSnapshot;



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

    public Map<String, Object> getDocument(String collection, String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(id);
        DocumentSnapshot snapshot = docRef.get().get();
        if (snapshot.exists()) {
            return snapshot.getData();
        } else {
            return null;
        }
    }

    public String updateDocument(String collection, String id, Map<String, Object> data) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(collection).document(id);
        docRef.update(data).get();
        return "Tài liệu đã được cập nhật";
    }
}
