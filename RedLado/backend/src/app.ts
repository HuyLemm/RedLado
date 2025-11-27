import cors from 'cors';
import express from 'express';

import { config } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error/errorHandler';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  }),
);
app.use(
  express.json({
    limit: '5mb',
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

