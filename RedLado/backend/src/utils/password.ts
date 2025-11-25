import bcrypt from 'bcryptjs';

export const verifyPassword = async (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 10);

