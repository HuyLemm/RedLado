import { Schema, model, Document } from 'mongoose';

import { PostVisibility } from './post';

interface CommentSubdocument {
  _id: Schema.Types.ObjectId;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface PostDocument extends Document {
  title?: string;
  content: string;
  tags: string[];
  game?: string;
  visibility: PostVisibility;
  authorId: string;
  image?: string;
  likes: string[];
  comments: CommentSubdocument[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<CommentSubdocument>(
  {
    authorId: { type: String, required: true },
    content: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

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
    likes: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true },
);

export const PostModel = model<PostDocument>('Post', postSchema);

