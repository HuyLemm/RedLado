import { Post, PostComment } from '../../models/post';
import {
  addComment as addCommentRepository,
  createPost as createPostRepository,
  listPosts,
  toggleLike as toggleLikeRepository,
} from '../../repositories/postRepository';
import { findUserById, findUsersByIds } from '../../repositories/userRepository';
import { CreatePostCommentInput, CreatePostInput, ToggleLikeInput } from '../../schemas/postSchemas';

type UserMap = Awaited<ReturnType<typeof findUsersByIds>>;

export interface PostAuthor {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
}

export interface FeedComment extends PostComment {
  author: PostAuthor;
}

export interface FeedPost extends Post {
  author: PostAuthor;
  comments: FeedComment[];
}

const mapAuthor = (userId: string, userMap: UserMap): PostAuthor => {
  const user = userMap[userId];
  if (!user) {
    return {
      id: userId,
      name: 'Unknown Trader',
      username: 'unknown',
      avatar: undefined,
    };
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
  };
};

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

export const fetchPosts = async (page = 1, limit = 20): Promise<FeedPost[]> => {
  const posts = await listPosts(page, limit);
  const authorIds = new Set<string>();

  posts.forEach((post) => {
    authorIds.add(post.authorId);
    post.comments.forEach((comment) => authorIds.add(comment.authorId));
  });

  const users = await findUsersByIds(Array.from(authorIds));

  return posts.map((post) => ({
    ...post,
    author: mapAuthor(post.authorId, users),
    comments: post.comments.map((comment) => ({
      ...comment,
      author: mapAuthor(comment.authorId, users),
    })),
  }));
};

export const toggleLike = async (postId: string, input: ToggleLikeInput) => {
  const post = await toggleLikeRepository(postId, input.userId);
  return post.likes;
};

export const addComment = async (postId: string, input: CreatePostCommentInput) => {
  const post = await addCommentRepository(postId, {
    authorId: input.userId,
    content: input.content,
  });

  const author = await findUserById(input.userId);
  const newComment = post.comments[post.comments.length - 1];

  return {
    ...newComment,
    author: {
      id: author?.id ?? input.userId,
      name: author?.name ?? 'Unknown Trader',
      username: author?.username,
      avatar: author?.avatar,
    },
  };
};
