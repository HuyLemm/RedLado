import { Router } from 'express';

import { loginController } from '../../controllers/auth/loginController';
import { validateRequest } from '../../middleware/validation/validateRequest';
import { loginSchema } from '../../schemas/authSchemas';

const authRouter = Router();

authRouter.post('/login', validateRequest(loginSchema), loginController);

export default authRouter;

