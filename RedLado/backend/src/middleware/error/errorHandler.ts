import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, `Route ${req.originalUrl} not found`));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status ?? 500;
  const payload = {
    status,
    message: err.message ?? 'Unexpected error',
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    Object.assign(payload, { stack: err.stack });
  }

  res.status(status).json(payload);
};

