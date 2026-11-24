import { Router } from 'express';
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menu.controller';
import { validate } from '../middleware/validate';
import { createMenuItemSchema, updateMenuItemSchema } from '../validators/menu.validator';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public Menu Endpoints
router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

// Protected Admin/Manager Menu Endpoints
router.post(
  '/',
  authenticate as any,
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  validate(createMenuItemSchema),
  createMenuItem
);

router.put(
  '/:id',
  authenticate as any,
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  validate(updateMenuItemSchema),
  updateMenuItem
);

router.delete(
  '/:id',
  authenticate as any,
  authorize('SUPER_ADMIN') as any,
  deleteMenuItem
);

export default router;
