import { User, UserRole } from '../models/user';
import { UserDocument, UserModel } from '../models/user.model';

const mapDocumentToUser = (doc: UserDocument): User => ({
  id: doc.id,
  email: doc.email,
  name: doc.name,
  username: doc.username,
  passwordHash: doc.passwordHash,
  role: doc.role,
});

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).exec();
  return user ? mapDocumentToUser(user) : null;
};

interface CreateUserInput {
  email: string;
  name: string;
  username: string;
  passwordHash: string;
  role?: UserRole;
}

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const user = await UserModel.create({
    email: input.email.toLowerCase(),
    name: input.name,
    username: input.username,
    passwordHash: input.passwordHash,
    role: input.role ?? 'buyer',
  });

  return mapDocumentToUser(user);
};

