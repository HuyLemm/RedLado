import mongoose from 'mongoose';

import { config } from './env';

export const connectDatabase = async () => {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    await mongoose.connect(config.mongoUri);
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};


