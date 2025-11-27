import { Router } from 'express';

import { createPostController } from '../../controllers/posts/createPostController';
import { commentPostController } from '../../controllers/posts/commentPostController';
import { getPostsController } from '../../controllers/posts/getPostsController';
import { likePostController } from '../../controllers/posts/likePostController';
import { validateRequest } from '../../middleware/validation/validateRequest';
import { createCommentSchema, createPostSchema, toggleLikeSchema } from '../../schemas/postSchemas';

const postsRouter = Router();

postsRouter.post('/', validateRequest(createPostSchema), createPostController);
postsRouter.get('/', getPostsController);
postsRouter.post('/:id/like', validateRequest(toggleLikeSchema), likePostController);
postsRouter.post('/:id/comments', validateRequest(createCommentSchema), commentPostController);

export default postsRouter;

