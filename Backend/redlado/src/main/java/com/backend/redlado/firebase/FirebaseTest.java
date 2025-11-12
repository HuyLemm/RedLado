package com.backend.redlado.firebase;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class FirebaseTest implements CommandLineRunner {
    @Override
    public void run(String... args) {
        System.out.println("🚀 FirebaseTest runner started!");
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("test");
        ref.setValueAsync("Hello Firebase from Spring Boot!");
        System.out.println("✅ Data pushed to Firebase!");
    }
}
