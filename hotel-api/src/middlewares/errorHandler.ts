import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
    logger.warn(`Validation error: ${err.message}`);
    res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request data',
      issues: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    const label =
      err.statusCode === 404
        ? 'Not Found'
        : err.statusCode === 400
        ? 'Bad Request'
        : 'Error';

    logger.warn(`AppError ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({ error: label, message: err.message });
    return;
  }

  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong',
  });
};