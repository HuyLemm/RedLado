/*
 * Cấu hình Firebase cho ứng dụng Spring Boot để kết nối với cơ sở dữ liệu Firestore của Firebase.
 * Đảm bảo ứng dụng có thể sử dụng các chức năng của Firebase, đặc biệt là Firestore, để thực hiện các thao tác với cơ sở dữ liệu từ Google Cloud.
 */

package com.example.demo.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient; // Đảm bảo import @Configuration


@Configuration
public class FirebaseConfig {

    // Tạo và khởi tạo kết nối Firebase App bằng cách đọc file tài khoản dịch vụ JSON chứa thông tin xác thực và thiết lập ID của dự án Firebase (projectId).

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/redlado-23a1a-firebase-adminsdk-e0k7b-ff455bb2b7.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId("redlado-23a1a") // Thêm dòng này để thiết lập projectId
                .build();

        return FirebaseApp.initializeApp(options);
    }
    
    // Tạo một đối tượng Firestore từ Firebase App đã được khởi tạo để có thể tương tác với Firestore trong ứng dụng.
    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        return FirestoreClient.getFirestore(firebaseApp);
    }
}