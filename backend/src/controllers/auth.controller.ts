import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../types';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.register(req.body);
    return sendSuccess(res, 'Account registered successfully', result, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Registration failed', 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body);
    return sendSuccess(res, 'Authentication successful', result, 200);
  } catch (error: any) {
    return sendError(res, error.message || 'Login failed', 401);
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'Unauthorized', 401);
    const profile = await AuthService.getProfile(req.user.id);
    return sendSuccess(res, 'User profile retrieved successfully', profile);
  } catch (error: any) {
    return sendError(res, error.message || 'Could not fetch profile', 404);
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'Unauthorized', 401);
    const updated = await AuthService.updateProfile(req.user.id, req.body);
    return sendSuccess(res, 'Profile updated successfully', updated);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update profile', 400);
  }
};

export const getSession = async (req: AuthenticatedRequest, res: Response) => {
  return sendSuccess(res, 'Current session active', { user: req.user });
};
