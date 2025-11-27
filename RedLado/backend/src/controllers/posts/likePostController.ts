import { NextFunction, Request, Response } from 'express';

import { toggleLike } from '../../services/posts/postService';
import { ToggleLikeInput } from '../../schemas/postSchemas';

export const likePostController = async (
  req: Request<{ id: string }, unknown, ToggleLikeInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const likes = await toggleLike(req.params.id, req.body);
    res.json({ likes, likesCount: likes.length });
  } catch (error) {
    next(error);
  }
};

