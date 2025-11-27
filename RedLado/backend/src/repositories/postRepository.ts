import { Post } from '../models/post';
import { PostDocument, PostModel } from '../models/post.model';

const mapPost = (doc: PostDocument): Post => ({
  id: doc._id.toString(),
  title: doc.title,
  content: doc.content,
  tags: doc.tags,
  game: doc.game,
  visibility: doc.visibility,
  authorId: doc.authorId,
  image: doc.image,
  likes: doc.likes ?? [],
  comments:
    doc.comments?.map((comment) => ({
      id: comment._id.toString(),
      authorId: comment.authorId,
      content: comment.content,
      createdAt: comment.createdAt,
    })) ?? [],
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

interface CreatePostInput {
  title?: string;
  content: string;
  tags?: string[];
  game?: string;
  visibility: Post['visibility'];
  authorId: string;
  image?: string;
}

export const createPost = async (input: CreatePostInput): Promise<Post> => {
  const post = await PostModel.create({
    title: input.title,
    content: input.content,
    tags: input.tags ?? [],
    game: input.game,
    visibility: input.visibility,
    authorId: input.authorId,
    image: input.image,
  });

  return mapPost(post);
};

export const listPosts = async (page: number, limit: number): Promise<Post[]> => {
  const posts = await PostModel.find({ visibility: 'public' })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return posts.map(mapPost);
};

export const toggleLike = async (postId: string, userId: string): Promise<Post> => {
  const post = await PostModel.findById(postId).exec();

  if (!post) {
    throw new Error('Post not found');
  }

  const hasLiked = post.likes.includes(userId);

  if (hasLiked) {
    post.likes = post.likes.filter((id) => id !== userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return mapPost(post);
};

export const addComment = async (
  postId: string,
  comment: { authorId: string; content: string },
): Promise<Post> => {
  const post = await PostModel.findById(postId).exec();

  if (!post) {
    throw new Error('Post not found');
  }

  post.comments.push({
    authorId: comment.authorId,
    content: comment.content,
  } as PostDocument['comments'][number]);

  await post.save();
  return mapPost(post);
};

