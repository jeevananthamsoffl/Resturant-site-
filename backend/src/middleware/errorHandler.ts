import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config/env';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors: any = undefined;

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }

  // Log in non-production
  if (config.nodeEnv !== 'test') {
    console.error(`[Error] ${req.method} ${req.url}:`, err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};
