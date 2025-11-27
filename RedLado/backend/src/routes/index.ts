import { Router } from 'express';

import authRouter from './auth/auth.routes';
import postsRouter from './posts/posts.routes';
import profileRouter from './profile/profile.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/posts', postsRouter);

export default apiRouter;

