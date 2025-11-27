import { apiClient } from "./client";
import { CreatePostPayload, Post } from "@/types/post";

export interface CreatePostResponse {
  message: string;
  post: Post;
}

export interface FetchPostsResponse {
  posts: Post[];
}

export async function createPost(payload: CreatePostPayload & { authorId: string }): Promise<CreatePostResponse> {
  return apiClient.post<CreatePostResponse>("/posts", payload);
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await apiClient.get<FetchPostsResponse>(`/posts?ts=${Date.now()}`);
  return response.posts;
}

