export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  bio?: string;
  location?: string;
  favoriteGenres?: string;
  steamProfile?: string;
  discordTag?: string;
  avatar?: string;
}

