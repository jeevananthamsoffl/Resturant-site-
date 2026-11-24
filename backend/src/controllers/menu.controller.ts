import { Request, Response } from 'express';
import { MenuService } from '../services/menu.service';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const { category, search, isVegetarian, isBestseller, sortBy, page, limit } = req.query;

    const filters = {
      category: category as string,
      search: search as string,
      isVegetarian:
        isVegetarian === 'true' ? true : isVegetarian === 'false' ? false : undefined,
      isBestseller:
        isBestseller === 'true' ? true : isBestseller === 'false' ? false : undefined,
      sortBy: sortBy as any,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    };

    const result = await MenuService.getItems(filters);
    return sendSuccess(res, 'Menu items retrieved successfully', result.items, 200, result.pagination);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to retrieve menu items', 500);
  }
};

export const getMenuItem = async (req: Request, res: Response) => {
  try {
    const item = await MenuService.getItemById(req.params.id);
    return sendSuccess(res, 'Menu item retrieved successfully', item);
  } catch (error: any) {
    return sendError(res, error.message || 'Menu item not found', 404);
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const item = await MenuService.create(req.body);
    return sendSuccess(res, 'Menu item created successfully', item, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to create menu item', 400);
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const updated = await MenuService.update(req.params.id, req.body);
    return sendSuccess(res, 'Menu item updated successfully', updated);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update menu item', 400);
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    await MenuService.delete(req.params.id);
    return sendSuccess(res, 'Menu item removed successfully', null);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to delete menu item', 400);
  }
};
