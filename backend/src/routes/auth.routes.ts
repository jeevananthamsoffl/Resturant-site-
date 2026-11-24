import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  getSession,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/auth.validator';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public Authentication Endpoints
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected Authentication Endpoints
router.get('/profile', authenticate as any, getProfile as any);
router.put('/profile', authenticate as any, validate(updateProfileSchema), updateProfile as any);
router.get('/session', authenticate as any, getSession as any);

export default router;
