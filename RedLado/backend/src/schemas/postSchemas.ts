import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().max(120).optional(),
  content: z.string().min(10).max(2000),
  tags: z.array(z.string().min(1).max(20)).max(5).optional(),
  game: z.string().max(60).optional(),
  visibility: z.enum(['public', 'followers', 'private']).default('public'),
  authorId: z.string().min(1),
  image: z.string().max(1_000_000).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

