import { Router } from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { validate } from '../middleware/validate';
import { createCategorySchema, updateCategorySchema } from '../validators/menu.validator';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public Category Endpoints
router.get('/', getCategories);
router.get('/:id', getCategory);

// Protected Admin/Manager Category Endpoints
router.post(
  '/',
  authenticate as any,
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  validate(createCategorySchema),
  createCategory
);

router.put(
  '/:id',
  authenticate as any,
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  validate(updateCategorySchema),
  updateCategory
);

router.delete(
  '/:id',
  authenticate as any,
  authorize('SUPER_ADMIN') as any,
  deleteCategory
);

export default router;
