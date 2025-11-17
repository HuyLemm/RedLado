# API Layer Documentation

## Overview

This directory contains the API layer for the RedLado application. Currently, all API calls are **mocked** to simulate backend behavior without requiring a real server.

## Structure

```
lib/api/
├── auth.ts          # Authentication API (login, signup, logout)
├── client.ts        # Base API client (for future real backend)
└── README.md        # This file
```

## Mock Authentication API

### Test Users

The mock API includes the following test accounts:

| Email | Password | Username |
|-------|----------|----------|
| `test@example.com` | `password123` | testuser |
| `demo@example.com` | `demo123` | demo |
| `admin@redlado.com` | `admin123` | admin |

### Usage

```typescript
import * as authAPI from "@/lib/api/auth";

// Login
try {
  const response = await authAPI.login("test@example.com", "password123");
  console.log(response.user); // User object
  console.log(response.token); // JWT token
} catch (error) {
  console.error(error.message); // "Invalid email or password"
}

// Signup
try {
  const response = await authAPI.signup("newuser", "new@example.com", "password");
  console.log(response.user);
} catch (error) {
  console.error(error.message); // "Email already registered" or "Username already taken"
}
```

### Features

- **Network Delay Simulation**: All API calls include an 800ms delay to simulate real network latency
- **Error Handling**: Proper error messages for invalid credentials, duplicate emails, etc.
- **Token Generation**: Mock JWT tokens are generated for each successful login/signup
- **In-Memory Storage**: Mock users are stored in memory (resets on page refresh)

## Migration to Real Backend

When the real backend is ready:

1. **Replace `lib/api/auth.ts`** with actual API calls:
   ```typescript
   // Before (mock)
   export async function login(email: string, password: string) {
     await delay(800);
     // ... mock logic
   }

   // After (real)
   export async function login(email: string, password: string) {
     const response = await apiClient.post("/auth/login", { email, password });
     return response;
   }
   ```

2. **Update `lib/api/client.ts`** to use the real backend URL:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.redlado.com";
   ```

3. **No changes needed** in:
   - `contexts/AuthContext.tsx` - Already uses the API layer
   - UI components - Already handle errors properly

## Pattern for New Features

When adding new features (e.g., trading, profile, posts), follow this pattern:

1. Create API module: `lib/api/[feature].ts`
2. Export async functions that return Promises
3. Throw errors on failure
4. Use in context/hooks, not directly in components

Example:
```typescript
// lib/api/posts.ts
export async function createPost(data: CreatePostRequest): Promise<Post> {
  // Mock implementation
  await delay(500);
  return { id: "1", ...data };
}

// contexts/PostsContext.tsx
import * as postsAPI from "@/lib/api/posts";

const createPost = async (data: CreatePostRequest) => {
  try {
    const post = await postsAPI.createPost(data);
    // Update state
  } catch (error) {
    throw error; // Let UI handle
  }
};
```

## Notes

- Mock data resets on page refresh (users, posts, etc.)
- For persistent mock data, use `localStorage` (already implemented for auth)
- All API functions are async and return Promises
- Errors are thrown as `Error` objects with descriptive messages

