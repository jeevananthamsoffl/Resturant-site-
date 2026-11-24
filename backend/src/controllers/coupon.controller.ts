import { Request, Response } from 'express';
import { CouponService } from '../services/coupon.service';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;
    const result = await CouponService.validate(code, Number(subtotal));
    return sendSuccess(res, 'Coupon validated successfully', result);
  } catch (error: any) {
    return sendError(res, error.message || 'Invalid coupon', 400);
  }
};

export const getActiveCoupons = async (req: Request, res: Response) => {
  const coupons = CouponService.getAllActive();
  return sendSuccess(res, 'Active coupons retrieved', coupons);
};
