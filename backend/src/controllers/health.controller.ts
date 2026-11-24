import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { config } from '../config/env';

export const getHealth = (req: Request, res: Response) => {
  return sendSuccess(res, 'ROYAL FEAST Backend API operational', {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: '1.0.0',
    service: 'royal-feast-core-api',
  });
};
