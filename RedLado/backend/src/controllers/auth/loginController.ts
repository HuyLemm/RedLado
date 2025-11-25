import { NextFunction, Request, Response } from 'express';

import { LoginInput } from '../../schemas/authSchemas';
import { authenticateUser } from '../../services/auth/authService';
import { createMockToken } from '../../utils/token';

export const loginController = async (
  req: Request<unknown, unknown, LoginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const { user } = await authenticateUser(email, password);
    const token = createMockToken(user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

