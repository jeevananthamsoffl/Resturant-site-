import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { sendError } from '../utils/apiResponse';

export const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return sendError(res, 'Request validation failed', 400, validationErrors);
      }
      return sendError(res, 'Validation error', 400);
    }
  };
