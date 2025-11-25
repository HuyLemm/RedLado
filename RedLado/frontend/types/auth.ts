export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  role?: UserRole;
  avatar?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

