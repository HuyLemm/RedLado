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

export const getRecentPosts = async (limit = 20): Promise<Post[]> => {
  const posts = await PostModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  return posts.map(mapPost);
};

