import { apiClient } from "./client";
import { ProfileUpdatePayload, User } from "@/types/auth";

export interface ProfileResponse {
  message: string;
  user: User;
}

export async function updateProfile(userId: string, data: ProfileUpdatePayload): Promise<ProfileResponse> {
  return apiClient.patch<ProfileResponse>(`/profile/${userId}`, data);
}

