export type PostVisibility = 'public' | 'followers' | 'private';

export interface PostComment {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  tags: string[];
  game?: string;
  visibility: PostVisibility;
  authorId: string;
  image?: string;
  likes: string[];
  comments: PostComment[];
  createdAt: Date;
  updatedAt: Date;
}

