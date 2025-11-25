import bcrypt from 'bcryptjs';

import { UserModel } from '../models/user.model';

export const seedUsers = async () => {
  const existingUser = await UserModel.findOne({ email: 'demo@redlado.com' }).exec();

  if (existingUser) {
    return;
  }

  const passwordHash = await bcrypt.hash('Password123!', 10);

  await UserModel.create({
    email: 'demo@redlado.com',
    name: 'Demo Trader',
    username: 'demotrader',
    passwordHash,
    role: 'buyer',
  });
};

