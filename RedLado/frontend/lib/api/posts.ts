import { apiClient } from "./client";
import { CreatePostPayload, Post, PostComment } from "@/types/post";

export interface CreatePostResponse {
  message: string;
  post: Post;
}

export interface FetchPostsResponse {
  posts: Post[];
}

export interface ToggleLikeResponse {
  likes: string[];
  likesCount: number;
}

export interface CreateCommentResponse {
  comment: PostComment;
}

export async function createPost(payload: CreatePostPayload & { authorId: string }): Promise<CreatePostResponse> {
  return apiClient.post<CreatePostResponse>("/posts", payload);
}

export async function fetchPosts(params?: { page?: number; limit?: number }): Promise<Post[]> {
  const query = new URLSearchParams();
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  query.append("ts", String(Date.now()));
  const response = await apiClient.get<FetchPostsResponse>(`/posts?${query.toString()}`);
  return response.posts;
}

export async function toggleLike(postId: string, userId: string): Promise<ToggleLikeResponse> {
  return apiClient.post<ToggleLikeResponse>(`/posts/${postId}/like`, { userId });
}

export async function createComment(postId: string, userId: string, content: string): Promise<CreateCommentResponse> {
  return apiClient.post<CreateCommentResponse>(`/posts/${postId}/comments`, { userId, content });
}

