import createHttpError from 'http-errors';

import { createUser, findUserByEmail } from '../../repositories/userRepository';
import { User } from '../../models/user';
import { hashPassword, verifyPassword } from '../../utils/password';

export interface AuthenticatedUser {
  user: User;
}

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<AuthenticatedUser> => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return { user };
};

interface RegisterUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (input: RegisterUserInput): Promise<AuthenticatedUser> => {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw createHttpError(409, 'Email already registered');
  }

  const passwordHash = await hashPassword(input.password);
  const user = await createUser({
    email: input.email,
    username: input.username,
    name: input.name,
    passwordHash,
  });

  return { user };
};

