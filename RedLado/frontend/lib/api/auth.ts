import { apiClient } from "./client";
import { AuthResponse, LoginRequest, SignupRequest, User } from "@/types/auth";

interface BackendAuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    username?: string;
    role?: string;
  };
  token?: string;
  message?: string;
}

const adaptUser = (user: BackendAuthResponse["user"]): User => ({
  id: user.id,
  email: user.email,
  username: user.username || user.name || user.email.split("@")[0],
  name: user.name,
  role: user.role as User["role"],
});

const attachToken = (payload: BackendAuthResponse): AuthResponse => ({
  user: adaptUser(payload.user),
  token: payload.token ?? "mock-token",
  message: payload.message,
});

export async function login(email: string, password: string): Promise<AuthResponse> {
  const body: LoginRequest = { email, password };
  const response = await apiClient.post<BackendAuthResponse>("/auth/login", body);
  return attachToken(response);
}

export async function signup(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const body: SignupRequest & { name: string } = {
    username,
    email,
    password,
    name: username,
  };
  const response = await apiClient.post<BackendAuthResponse>("/auth/signup", body);
  return attachToken(response);
}

export async function logout(): Promise<void> {
  // TODO: call backend invalidate endpoint when available
  return Promise.resolve();
}

export async function getCurrentUser(token: string): Promise<User> {
  // TODO: fetch profile from backend when endpoint exists
  throw new Error("getCurrentUser is not implemented with backend yet.");
}
