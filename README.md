# RedLado
Build a Trading Account and Stuff Platform

## Authentication Diagrams (Mermaid)

Paste these into a Mermaid-compatible viewer (or GitHub will render them automatically if enabled) to visualize the flows.

### Register Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant A as AuthController (/api/auth/register)
    participant R as UserRepository
    participant P as PasswordEncoder (BCrypt)
    participant J as JwtService
    participant DB as H2 DB

    C->>A: POST /api/auth/register {username,email,password}
    A->>R: existsByUsername / existsByEmail
    R->>DB: Query
    DB-->>R: Booleans
    R-->>A: Results
    alt Unique
        A->>P: encode(password)
        P-->>A: hashedPassword
        A->>R: save(User{username,email,hashed,roles:[USER]})
        R->>DB: Insert
        DB-->>R: Saved User
        R-->>A: User
        A->>J: generateToken(UserDetails)
        J-->>A: JWT
        A-->>C: 201 Created { token }, Location: /api/users/{id}
    else Duplicate
        A-->>C: 400 Bad Request (username/email taken)
    end
```

### Login Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant A as AuthController (/api/auth/login)
    participant M as AuthenticationManager
    participant D as DaoAuthenticationProvider
    participant U as UserDetailsService
    participant R as UserRepository
    participant P as PasswordEncoder (BCrypt)
    participant J as JwtService
    participant S as SecurityContextHolder
    participant DB as H2 DB

    C->>A: POST /api/auth/login {username,password}
    A->>M: authenticate(UsernamePasswordAuthenticationToken)
    M->>D: authenticate(...)
    D->>U: loadUserByUsername(username)
    U->>R: findByUsername
    R->>DB: Query
    DB-->>R: User row
    R-->>U: UserDetails
    U-->>D: UserDetails
    D->>P: matches(raw, encoded)
    P-->>D: true/false
    alt Valid
        D-->>M: Authentication(success, principal=User)
        M-->>A: Authentication
        A->>S: setAuthentication(auth)
        A->>J: generateToken(UserDetails)
        J-->>A: JWT
        A-->>C: 200 OK { token }
    else Invalid
        D-->>M: throws BadCredentialsException
        M-->>A: Exception
        A-->>C: 401 Unauthorized
    end
```

## Firebase Federation (How-To)

- Overview
  - The client signs in with Firebase and receives an ID token.
  - The backend verifies that ID token via Firebase Admin and issues a local JWT.
  - Clients use the local JWT for all protected API calls (same as username/password).

- Dependencies
  - Added `com.google.firebase:firebase-admin` in `Backend/redlado/pom.xml:1`.

- Configuration
  - Generate a Firebase Service Account key (JSON) and set:
    - PowerShell: `\$env:GOOGLE_APPLICATION_CREDENTIALS="E:\\secrets\\firebase-sa.json"`
    - Bash: `export GOOGLE_APPLICATION_CREDENTIALS=/path/to/firebase-sa.json`
  - Optional CORS: set allowed origins in `Backend/redlado/src/main/resources/application.properties:1`
    - `app.cors.allowed-origins=http://localhost:3000,http://your-frontend.example`

- Backend Endpoints
  - `POST /api/auth/firebase` — body: `{ "idToken": "<firebase-id-token>" }`
    - Verifies token, finds/creates local user, returns `{ token }` (local JWT).
  - `GET /api/auth/firebase/debug?idToken=<token>` — decodes claims for debugging (dev-only; remove in prod).

- Client Example (Web)
  - After Firebase sign-in:
```
const idToken = await firebase.auth().currentUser.getIdToken(true);
const res = await fetch('/api/auth/firebase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idToken })
});
const { token } = await res.json();
// Use local JWT for API calls
await fetch('/api/users/me', { headers: { Authorization: `Bearer ${token}` } });
```

- cURL Test
```
curl -X POST http://localhost:8080/api/auth/firebase \
  -H "Content-Type: application/json" \
  -d '{"idToken":"ID_TOKEN"}'
```

- Internals
  - Firebase init: `Backend/redlado/src/main/java/com/backend/redlado/firebase/FirebaseConfig.java:1`.
  - Auth endpoint: `Backend/redlado/src/main/java/com/backend/redlado/auth/FirebaseAuthController.java:1`.
  - JWT generation unchanged: `Backend/redlado/src/main/java/com/backend/redlado/security/JwtService.java:1`.
  - CORS config bean: `Backend/redlado/src/main/java/com/backend/redlado/security/SecurityConfig.java:1`.

### Protected Request (JWT Filter)
```mermaid
sequenceDiagram
    participant C as Client
    participant F as JwtAuthFilter
    participant J as JwtService
    participant U as UserDetailsService
    participant R as UserRepository
    participant S as SecurityContextHolder
    participant DB as H2 DB
    participant UC as UserController (/api/users/me)

    C->>F: GET /api/users/me + Authorization: Bearer <jwt>
    F->>J: extractUsername(token)
    J-->>F: username or error
    alt Username extracted
        F->>U: loadUserByUsername(username)
        U->>R: findByUsername
        R->>DB: Query
        DB-->>R: User row
        R-->>U: UserDetails
        U-->>F: UserDetails
        F->>J: isTokenValid(token, UserDetails)
        J-->>F: true/false
        alt Valid
            F->>S: setAuthentication(UserDetails, authorities)
            F-->>UC: continue filter chain
            UC-->>C: 200 OK (current user)
        else Invalid
            F-->>C: 401/continues -> ultimately 401
        end
    else No/Bad token
        F-->>C: 401/continues -> ultimately 401
    end
```

### Security Rules
```mermaid
flowchart TD
    A[HttpSecurity] -->|permitAll| P[/api/auth/**/]
    A -->|permitAll| H[/actuator/health/]
    A -->|permitAll| C[/h2-console/**/]
    A -->|authenticated| X[any other request]
    A -->|stateless| S[(No HTTP Session)]
    A -->|BCrypt + DaoAuthProvider| D[Password verification]
    A -->|Add Before UsernamePasswordAuthenticationFilter| F[JwtAuthFilter]
```
