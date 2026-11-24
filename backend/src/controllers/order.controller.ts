import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../types';

export const checkout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await OrderService.checkout({
      ...req.body,
      userId: req.user?.id,
    });
    return sendSuccess(res, 'Order placed successfully', order, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Checkout failed', 400);
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.verifyPayment(req.body);
    return sendSuccess(res, 'Payment verified and order confirmed', result);
  } catch (error: any) {
    return sendError(res, error.message || 'Payment verification failed', 400);
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.getOrderByNumber(req.params.orderNumber);
    return sendSuccess(res, 'Order tracking details retrieved', order);
  } catch (error: any) {
    return sendError(res, error.message || 'Order not found', 404);
  }
};

export const getUserOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await OrderService.getUserOrders(
      req.user?.id,
      req.user?.email || (req.query.email as string)
    );
    return sendSuccess(res, 'User orders retrieved', orders);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to retrieve orders', 500);
  }
};
