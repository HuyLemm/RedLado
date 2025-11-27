import { NextFunction, Request, Response } from 'express';

import { addComment } from '../../services/posts/postService';
import { CreatePostCommentInput } from '../../schemas/postSchemas';

export const commentPostController = async (
  req: Request<{ id: string }, unknown, CreatePostCommentInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comment = await addComment(req.params.id, req.body);
    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

