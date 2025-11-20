import bcrypt from 'bcryptjs';

import { User } from '../models/user';

const seedPassword = bcrypt.hashSync('Password123!', 10);

export const seedUsers: User[] = [
  {
    id: 'u1',
    email: 'demo@redlado.com',
    name: 'Demo Trader',
    passwordHash: seedPassword,
    role: 'buyer',
  },
];

