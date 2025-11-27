import { Post } from '../../models/post';
import { createPost as createPostRepository, getRecentPosts } from '../../repositories/postRepository';
import { CreatePostInput } from '../../schemas/postSchemas';

export const createPost = async (input: CreatePostInput): Promise<Post> => {
  return createPostRepository({
    title: input.title,
    content: input.content,
    tags: input.tags,
    game: input.game,
    visibility: input.visibility,
    authorId: input.authorId,
    image: input.image,
  });
};

export const fetchRecentPosts = async (): Promise<Post[]> => {
  return getRecentPosts();
};

