import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ?? '4000',
  clientOrigin: process.env.CLIENT_ORIGIN ?? '*',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: process.env.MONGODB_URI ?? '',
};

