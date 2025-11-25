import { NextFunction, Request, Response } from 'express';

import { SignupInput } from '../../schemas/authSchemas';
import { registerUser } from '../../services/auth/authService';
import { createMockToken } from '../../utils/token';

export const signupController = async (
  req: Request<unknown, unknown, SignupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, username, name } = req.body;
    const { user } = await registerUser({ email, password, username, name });
    const token = createMockToken(user.id);

    res.status(201).json({
      message: 'Signup successful',
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

