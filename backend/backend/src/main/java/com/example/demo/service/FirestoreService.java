package com.example.demo.service;

import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
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

    public boolean isUsernameOrEmailExists(String collection, String username, String email) throws ExecutionException, InterruptedException {
        CollectionReference users = firestore.collection(collection);

        // Create a query that checks if the username or email exists
        Query query = users.whereEqualTo("username", username)
                           .whereEqualTo("email", email);

        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        return !documents.isEmpty();
    }

    public void addUser(Map<String, Object> data) throws ExecutionException, InterruptedException {
        firestore.collection("accounts").add(data).get();
    }
}
