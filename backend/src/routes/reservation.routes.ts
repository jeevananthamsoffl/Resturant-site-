import { Router } from 'express';
import {
  checkAvailability,
  createReservation,
  getReservationByCode,
  getUserReservations,
  cancelReservation,
} from '../controllers/reservation.controller';
import { validate } from '../middleware/validate';
import { createReservationSchema } from '../validators/order.validator';

const router = Router();

router.get('/availability', checkAvailability);
router.post('/', validate(createReservationSchema), createReservation);
router.get('/my-bookings', getUserReservations);
router.get('/:code', getReservationByCode);
router.post('/:code/cancel', cancelReservation);

export default router;
