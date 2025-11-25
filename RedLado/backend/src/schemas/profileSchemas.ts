import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(120).optional(),
  favoriteGenres: z.string().max(120).optional(),
  steamProfile: z.string().max(120).optional(),
  discordTag: z.string().max(37).optional(),
  avatar: z.string().url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

