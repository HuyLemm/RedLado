export type PostVisibility = 'public' | 'followers' | 'private';

export interface Post {
  id: string;
  title?: string;
  content: string;
  tags: string[];
  game?: string;
  visibility: PostVisibility;
  authorId: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

