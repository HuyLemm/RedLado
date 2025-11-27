import { Request, Response, NextFunction } from 'express';

import { fetchPosts } from '../../services/posts/postService';

export const getPostsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const posts = await fetchPosts(page, limit);
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

