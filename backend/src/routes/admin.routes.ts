import { Router } from 'express';
import {
  getOverviewAnalytics,
  getAllOrders,
  updateOrderStatus,
  getAllReservations,
  updateReservationStatus,
  getUsers,
  toggleUserStatus,
  createStaff,
  getSettings,
  updateSettings,
  getAllCoupons,
  createCoupon,
  toggleCouponStatus,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Secure all admin endpoints with authentication
router.use(authenticate as any);

// Analytics Overview
router.get(
  '/analytics/overview',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  getOverviewAnalytics
);

// Order Management
router.get(
  '/orders',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER', 'KITCHEN_STAFF') as any,
  getAllOrders
);

router.patch(
  '/orders/:orderNumber/status',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER', 'KITCHEN_STAFF') as any,
  updateOrderStatus
);

// Reservation Management
router.get(
  '/reservations',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER', 'RECEPTION_STAFF') as any,
  getAllReservations
);

router.patch(
  '/reservations/:code/status',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER', 'RECEPTION_STAFF') as any,
  updateReservationStatus
);

// Customer & Staff User Management
router.get(
  '/users',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  getUsers
);

router.patch(
  '/users/:id/status',
  authorize('SUPER_ADMIN') as any,
  toggleUserStatus
);

router.post(
  '/staff',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  createStaff
);

// Restaurant Settings
router.get(
  '/settings',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  getSettings
);

router.put(
  '/settings',
  authorize('SUPER_ADMIN') as any,
  updateSettings
);

// Coupon Management
router.get(
  '/coupons',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  getAllCoupons
);

router.post(
  '/coupons',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  createCoupon
);

router.patch(
  '/coupons/:id/status',
  authorize('SUPER_ADMIN', 'RESTAURANT_MANAGER') as any,
  toggleCouponStatus
);

export default router;
