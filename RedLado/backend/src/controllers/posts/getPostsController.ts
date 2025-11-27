import { Request, Response, NextFunction } from 'express';

import { fetchRecentPosts } from '../../services/posts/postService';

export const getPostsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await fetchRecentPosts();
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

