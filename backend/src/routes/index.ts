import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import menuRoutes from './menu.routes';
import couponRoutes from './coupon.routes';
import reservationRoutes from './reservation.routes';
import orderRoutes from './order.routes';
import adminRoutes from './admin.routes';

const rootRouter = Router();

// Base System Health
rootRouter.use('/health', healthRoutes);

// Authentication & Profile Routes
rootRouter.use('/auth', authRoutes);

// Menu Categories & Items Routes
rootRouter.use('/categories', categoryRoutes);
rootRouter.use('/menu', menuRoutes);

// Ordering, Checkout & Coupons
rootRouter.use('/coupons', couponRoutes);
rootRouter.use('/orders', orderRoutes);

// Table Reservations
rootRouter.use('/reservations', reservationRoutes);

// Admin Executive Management Portal
rootRouter.use('/admin', adminRoutes);

export default rootRouter;
