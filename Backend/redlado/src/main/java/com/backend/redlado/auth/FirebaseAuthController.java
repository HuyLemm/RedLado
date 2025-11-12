package com.backend.redlado.auth;

import com.backend.redlado.auth.dto.AuthResponse;
import com.backend.redlado.auth.dto.FirebaseTokenRequest;
import com.backend.redlado.security.JwtService;
import com.backend.redlado.user.User;
import com.backend.redlado.user.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class FirebaseAuthController {

    private final FirebaseAuth firebaseAuth;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    // 👇 Remove PasswordEncoder — it’s no longer needed
    public FirebaseAuthController(FirebaseAuth firebaseAuth,
                                  UserRepository userRepository,
                                  JwtService jwtService) {
        this.firebaseAuth = firebaseAuth;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // 🔥 This is your main login/signup endpoint
    @PostMapping("/firebase")
    public ResponseEntity<?> loginWithFirebase(@Valid @RequestBody FirebaseTokenRequest req) {
        try {
            // 1️⃣ Verify Firebase ID token
            FirebaseToken decoded = firebaseAuth.verifyIdToken(req.getIdToken());
            String uid = decoded.getUid();
            String email = decoded.getEmail();
            String resolvedEmail = (email != null && !email.isBlank())
                    ? email.toLowerCase(Locale.ROOT)
                    : (uid + "@firebase.local");

            // 2️⃣ Find existing user by Firebase UID (preferred)
            Optional<User> existingUser = userRepository.findByFirebaseUid(uid);
            User user = existingUser.orElseGet(() -> {
                // 3️⃣ If not found, create a new local user record
                User u = new User();
                u.setFirebaseUid(uid);
                u.setEmail(resolvedEmail);
                u.setUsername(resolvedEmail);
                u.setRoles("USER"); // or List.of("USER") depending on your field type
                return userRepository.save(u);
            });

            // 4️⃣ Update user metadata in Firebase Realtime DB (optional but recommended)
            DatabaseReference userRef = FirebaseDatabase.getInstance()
                    .getReference("users")
                    .child(uid);
            userRef.updateChildrenAsync(Map.of(
                    "email", resolvedEmail,
                    "lastLogin", ServerValue.TIMESTAMP
            ));

            // 5️⃣ Generate backend JWT
            String token = jwtService.generateToken(user);

            // 6️⃣ Return JWT to frontend
            if (existingUser.isPresent()) {
                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                return ResponseEntity.created(URI.create("/api/users/" + user.getId()))
                        .body(new AuthResponse(token));
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid Firebase ID token");
        }
    }

    @GetMapping("/firebase/debug")
    public ResponseEntity<?> debugFirebaseToken(@RequestParam("idToken") String idToken) {
        try {
            FirebaseToken decoded = firebaseAuth.verifyIdToken(idToken);
            return ResponseEntity.ok(Map.of(
                    "uid", decoded.getUid(),
                    "email", decoded.getEmail(),
                    "name", decoded.getName(),
                    "claims", decoded.getClaims()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid Firebase ID token");
        }
    }
}
