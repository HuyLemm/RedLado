import app from './app';
import { config } from './config/env';

const PORT = Number(config.port);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});

