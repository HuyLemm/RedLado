# API Layer Documentation

## Overview

This directory contains the API layer for the RedLado application. Authentication now connects to the Express backend (`NEXT_PUBLIC_API_URL`), while other modules can still be mocked until their endpoints exist.

## Structure

```
lib/api/
├── auth.ts          # Authentication API (login, signup, logout)
├── profile.ts       # Profile operations (update profile)
├── posts.ts         # Post operations (create post, fetch feed, likes/comments)
├── client.ts        # Base API client (for future real backend)
└── README.md        # This file
```

## Authentication API (Live)

- `lib/api/auth.ts` now sends real requests to the backend.
- Default base URL: `http://localhost:4000/api` (override via `NEXT_PUBLIC_API_URL`).
- Available endpoints:
  - `POST /auth/login` – authenticates users seeded on the backend.
  - `POST /auth/signup` – creates new users (persisted in-memory until server restarts).
- Responses contain `user` info plus a mock token returned by the backend.

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

- Non-auth modules may still rely on mock implementations—migrate them gradually (posts module already calls backend).
- `getCurrentUser`/`logout` are placeholders until backend endpoints exist.
- `profile.ts` exposes `updateProfile(userId, data)` which calls `PATCH /profile/:id`.
- `posts.ts` exposes:
  - `createPost({ authorId, ... })` → `POST /posts`
  - `fetchPosts({ page, limit })` → `GET /posts?page=1&limit=20`
  - `toggleLike(postId, userId)` → `POST /posts/:id/like`
  - `createComment(postId, userId, content)` → `POST /posts/:id/comments`
- All API functions remain async and throw `Error` objects with backend messages for consistency.

