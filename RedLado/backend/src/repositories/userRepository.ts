import { User } from '../models/user';
import { seedUsers } from '../seeders/userSeeder';

const users: User[] = [...seedUsers];

export const findUserByEmail = (email: string): User | undefined =>
  users.find((user) => user.email.toLowerCase() === email.toLowerCase());

