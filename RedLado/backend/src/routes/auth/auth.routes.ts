import { Router } from 'express';

import { loginController } from '../../controllers/auth/loginController';
import { signupController } from '../../controllers/auth/signupController';
import { validateRequest } from '../../middleware/validation/validateRequest';
import { loginSchema, signupSchema } from '../../schemas/authSchemas';

const authRouter = Router();

authRouter.post('/login', validateRequest(loginSchema), loginController);
authRouter.post('/signup', validateRequest(signupSchema), signupController);

export default authRouter;

