export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
}

