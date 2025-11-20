import createHttpError from 'http-errors';

import { findUserByEmail } from '../../repositories/userRepository';
import { User } from '../../models/user';
import { verifyPassword } from '../../utils/password';

export interface AuthenticatedUser {
  user: User;
}

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<AuthenticatedUser> => {
  const user = findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return { user };
};

