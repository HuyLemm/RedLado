import app from './app';
import { connectDatabase } from './config/database';
import { config } from './config/env';
import { seedUsers } from './seeders/userSeeder';

const PORT = Number(config.port);

const startServer = async () => {
  await connectDatabase();
  await seedUsers();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${PORT}`);
  });
};

startServer();

