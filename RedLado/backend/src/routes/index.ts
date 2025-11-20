import { Router } from 'express';

import authRouter from './auth/auth.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;

