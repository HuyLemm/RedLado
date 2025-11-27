export type PostVisibility = "public" | "followers" | "private";

export interface PostAuthor {
  id: string;
  name: string;
  username?: string;
  avatar?: string | null;
}

export interface PostComment {
  id: string;
  content: string;
  createdAt: string;
  author: PostAuthor;
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  tags: string[];
  game?: string;
  visibility: PostVisibility;
  image?: string;
  author: PostAuthor;
  likes: string[];
  comments: PostComment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title?: string;
  content: string;
  tags?: string[];
  game?: string;
  visibility: PostVisibility;
  image?: string;
}

