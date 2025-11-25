import { Router } from 'express';

import { updateProfileController } from '../../controllers/profile/updateProfileController';
import { validateRequest } from '../../middleware/validation/validateRequest';
import { updateProfileSchema } from '../../schemas/profileSchemas';

const profileRouter = Router();

profileRouter.patch('/:id', validateRequest(updateProfileSchema), updateProfileController);

export default profileRouter;

