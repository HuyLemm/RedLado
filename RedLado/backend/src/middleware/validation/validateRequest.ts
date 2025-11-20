import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { AnyZodObject } from 'zod';

export const validateRequest =
  (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const message = parsed.error.issues.map((issue) => issue.message).join(', ');
      return next(createHttpError(400, message));
    }

    req.body = parsed.data;
    return next();
  };

