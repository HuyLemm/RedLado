import { Router } from 'express';

import authRouter from './auth/auth.routes';
import profileRouter from './profile/profile.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/profile', profileRouter);

export default apiRouter;

