export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
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
}

