import { Schema, model, Document } from 'mongoose';

import { PostVisibility } from './post';

export interface PostDocument extends Document {
  title?: string;
  content: string;
  tags: string[];
  game?: string;
  visibility: PostVisibility;
  authorId: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, trim: true },
    content: { type: String, required: true, minlength: 10, maxlength: 2000 },
    tags: { type: [String], default: [] },
    game: { type: String, trim: true },
    visibility: {
      type: String,
      enum: ['public', 'followers', 'private'],
      default: 'public',
    },
    authorId: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

export const PostModel = model<PostDocument>('Post', postSchema);

