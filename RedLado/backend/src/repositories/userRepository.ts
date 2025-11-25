import { User, UserRole } from '../models/user';
import { UserDocument, UserModel } from '../models/user.model';

const mapDocumentToUser = (doc: UserDocument): User => ({
  id: doc._id.toString(),
  email: doc.email,
  name: doc.name,
  username: doc.username,
  passwordHash: doc.passwordHash,
  role: doc.role,
  bio: doc.bio,
  location: doc.location,
  favoriteGenres: doc.favoriteGenres,
  steamProfile: doc.steamProfile,
  discordTag: doc.discordTag,
  avatar: doc.avatar,
});

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).exec();
  return user ? mapDocumentToUser(user) : null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById(id).exec();
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

type UpdateUserFields = Partial<
  Omit<User, 'id' | 'passwordHash' | 'role'> & { role?: UserRole; passwordHash?: string }
>;

export const updateUserById = async (id: string, updates: UpdateUserFields): Promise<User | null> => {
  const normalizedUpdates = { ...updates };

  if (normalizedUpdates.email) {
    normalizedUpdates.email = normalizedUpdates.email.toLowerCase();
  }

  const user = await UserModel.findByIdAndUpdate(id, normalizedUpdates, { new: true }).exec();
  return user ? mapDocumentToUser(user) : null;
};

