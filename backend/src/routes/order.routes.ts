import { Router } from 'express';
import {
  checkout,
  verifyPayment,
  trackOrder,
  getUserOrders,
} from '../controllers/order.controller';
import { validate } from '../middleware/validate';
import { checkoutSchema, verifyPaymentSchema } from '../validators/order.validator';

const router = Router();

router.post('/checkout', validate(checkoutSchema), checkout);
router.post('/verify-payment', validate(verifyPaymentSchema), verifyPayment);
router.get('/:orderNumber/track', trackOrder);
router.get('/my-orders', getUserOrders);

export default router;
