import { NextFunction, Request, Response } from 'express';

import createHttpError from 'http-errors';

import { UpdateProfileInput } from '../../schemas/profileSchemas';
import { updateUserProfile } from '../../services/profile/profileService';

export const updateProfileController = async (
  req: Request<{ id: string }, unknown, UpdateProfileInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    if (!Object.keys(updates).length) {
      throw createHttpError(400, 'At least one field must be provided');
    }

    const user = await updateUserProfile(userId, updates);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
        bio: user.bio,
        location: user.location,
        favoriteGenres: user.favoriteGenres,
        steamProfile: user.steamProfile,
        discordTag: user.discordTag,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

