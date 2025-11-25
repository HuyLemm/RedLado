export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  passwordHash: string;
  role: UserRole;
}

