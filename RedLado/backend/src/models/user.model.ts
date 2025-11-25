import { Schema, model, Document } from 'mongoose';

import { UserRole } from './user';

export interface UserDocument extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      default: 'buyer',
    },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    favoriteGenres: { type: String, default: '' },
    steamProfile: { type: String, default: '' },
    discordTag: { type: String, default: '' },
    avatar: { type: String, default: '' },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', userSchema);


