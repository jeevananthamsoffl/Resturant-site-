import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAll();
    return sendSuccess(res, 'Categories retrieved successfully', categories);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to retrieve categories', 500);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.getById(req.params.id);
    return sendSuccess(res, 'Category details retrieved successfully', category);
  } catch (error: any) {
    return sendError(res, error.message || 'Category not found', 404);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const created = await CategoryService.create(req.body);
    return sendSuccess(res, 'Category created successfully', created, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to create category', 400);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await CategoryService.update(req.params.id, req.body);
    return sendSuccess(res, 'Category updated successfully', updated);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update category', 400);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await CategoryService.delete(req.params.id);
    return sendSuccess(res, 'Category removed successfully', null);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to delete category', 400);
  }
};
