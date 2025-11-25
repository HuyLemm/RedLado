import { Schema, model, Document } from 'mongoose';

import { UserRole } from './user';

export interface UserDocument extends Document {
  email: string;
  name: string;
  username: string;
  passwordHash: string;
  role: UserRole;
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
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', userSchema);


