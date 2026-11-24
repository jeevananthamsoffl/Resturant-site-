import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthenticatedRequest, AuthUserPayload, UserRole } from '../types';
import { sendError } from '../utils/apiResponse';

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication required: No bearer token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as AuthUserPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 'Authentication token has expired. Please log in again.', 401);
    }
    return sendError(res, 'Invalid authentication token', 401);
  }
};

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied: Role '${req.user.role}' lacks permission for this resource`,
        403
      );
    }

    next();
  };
};
