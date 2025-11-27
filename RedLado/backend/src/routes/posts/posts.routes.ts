import { Router } from 'express';

import { createPostController } from '../../controllers/posts/createPostController';
import { getPostsController } from '../../controllers/posts/getPostsController';
import { validateRequest } from '../../middleware/validation/validateRequest';
import { createPostSchema } from '../../schemas/postSchemas';

const postsRouter = Router();

postsRouter.post('/', validateRequest(createPostSchema), createPostController);
postsRouter.get('/', getPostsController);

export default postsRouter;

