import createHttpError from 'http-errors';

import { User } from '../../models/user';
import { findUserByEmail, updateUserById } from '../../repositories/userRepository';

export type ProfileUpdateInput = Partial<
  Pick<User, 'username' | 'email' | 'bio' | 'location' | 'favoriteGenres' | 'steamProfile' | 'discordTag' | 'avatar'>
>;

export const updateUserProfile = async (userId: string, updates: ProfileUpdateInput): Promise<User> => {
  if (updates.email) {
    const existingUser = await findUserByEmail(updates.email);
    if (existingUser && existingUser.id !== userId) {
      throw createHttpError(409, 'Email already in use');
    }
  }

  const updatedUser = await updateUserById(userId, updates);

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};

