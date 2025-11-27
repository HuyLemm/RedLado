import { NextFunction, Request, Response } from 'express';

import { CreatePostInput } from '../../schemas/postSchemas';
import { createPost } from '../../services/posts/postService';

export const createPostController = async (
  req: Request<unknown, unknown, CreatePostInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await createPost(req.body);

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

