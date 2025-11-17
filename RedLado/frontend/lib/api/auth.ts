import { User, AuthResponse } from "@/types/auth";

/**
 * Mock API Layer for Authentication
 * 
 * This module provides mock implementations of authentication API calls.
 * When the real backend is ready, replace these implementations with
 * actual fetch/axios calls to the backend API.
 * 
 * Pattern: All API functions return Promises and throw errors on failure
 */

// Mock users database (in-memory, resets on page refresh)
// In a real app, this would be stored in a database
const MOCK_USERS = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    username: "testuser",
    avatar: undefined,
  },
  {
    id: "2",
    email: "demo@example.com",
    password: "demo123",
    username: "demo",
    avatar: undefined,
  },
  {
    id: "3",
    email: "admin@redlado.com",
    password: "admin123",
    username: "admin",
    avatar: undefined,
  },
];

// Simulate network delay (800ms to feel realistic)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock Login API
 * 
 * @param email - User email
 * @param password - User password
 * @returns Promise<AuthResponse> - User data and JWT token
 * @throws Error if credentials are invalid
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate network delay
  await delay(800);

  // Find user by email and password
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Return user data and mock JWT token
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
  };
}

/**
 * Mock Signup API
 * 
 * @param username - Desired username
 * @param email - User email
 * @param password - User password
 * @returns Promise<AuthResponse> - User data and JWT token
 * @throws Error if email already exists or validation fails
 */
export async function signup(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  // Simulate network delay
  await delay(1000);

  // Check if email already exists
  const existingUser = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("Email already registered. Please use a different email.");
  }

  // Check if username already exists
  const existingUsername = MOCK_USERS.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );

  if (existingUsername) {
    throw new Error("Username already taken. Please choose a different username.");
  }

  // Create new user
  const newUser = {
    id: String(MOCK_USERS.length + 1),
    username,
    email: email.toLowerCase(),
    password, // In real app, this would be hashed
    avatar: undefined,
  };

  // Add to mock database
  MOCK_USERS.push(newUser);

  // Return user data and mock JWT token
  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
    },
    token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
  };
}

/**
 * Mock Logout API (for future use)
 * In a real app, this would invalidate the token on the server
 */
export async function logout(): Promise<void> {
  await delay(300);
  // In real app, would call backend to invalidate token
  // For mock, just return success
}

/**
 * Mock Get Current User API (for future use)
 * In a real app, this would validate token and return user data
 */
export async function getCurrentUser(token: string): Promise<User> {
  await delay(500);
  
  // Extract user ID from token (mock implementation)
  const userId = token.split("-")[3];
  const user = MOCK_USERS.find((u) => u.id === userId);

  if (!user) {
    throw new Error("Invalid token");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  };
}

