import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Image URL must be valid').optional().or(z.literal('')),
  displayOrder: z.number().int().default(0),
});

export const updateCategorySchema = createCategorySchema.partial();

export const createMenuItemSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
  name: z.string().min(2, 'Dish name must be at least 2 characters'),
  slug: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  ingredients: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  isVegetarian: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  prepTimeMinutes: z.number().int().positive().default(20),
  imageUrl: z.string().url('Image URL must be valid').optional().or(z.literal('')),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();
