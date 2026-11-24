import { Router } from 'express';
import { validateCoupon, getActiveCoupons } from '../controllers/coupon.controller';
import { validate } from '../middleware/validate';
import { validateCouponSchema } from '../validators/order.validator';

const router = Router();

router.post('/validate', validate(validateCouponSchema), validateCoupon);
router.get('/', getActiveCoupons);

export default router;
