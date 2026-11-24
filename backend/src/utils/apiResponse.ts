import { Response } from 'express';

export interface ApiResponseData<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, any>;
  errors?: any;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
  meta?: Record<string, any>
): Response => {
  const payload: ApiResponseData<T> = {
    success,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
  };

  return res.status(statusCode).json(payload);
};

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
  meta?: Record<string, any>
): Response => {
  return sendResponse(res, statusCode, true, message, data, meta);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: any
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
