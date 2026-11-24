import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { OrderService } from '../services/order.service';
import { ReservationService } from '../services/reservation.service';
import { CouponService } from '../services/coupon.service';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getOverviewAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await AdminService.getOverviewAnalytics();
    return sendSuccess(res, 'Overview analytics retrieved', data);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch analytics', 500);
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    let orders = OrderService.getAllOrders();

    if (status && status !== 'all') {
      orders = orders.filter((o) => o.status === status);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.customerPhone.includes(q)
      );
    }

    return sendSuccess(res, 'Orders list retrieved', orders);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch orders', 500);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;
    const updated = await OrderService.updateOrderStatus(orderNumber, status);
    return sendSuccess(res, `Order ${orderNumber} transitioned to ${status}`, updated);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update order status', 400);
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const { status, search, date } = req.query;
    let reservations = ReservationService.getAll();

    if (status && status !== 'all') {
      reservations = reservations.filter((r) => r.status === status);
    }

    if (date) {
      reservations = reservations.filter((r) => r.reservationDate === date);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      reservations = reservations.filter(
        (r) =>
          r.reservationCode.toLowerCase().includes(q) ||
          r.guestName.toLowerCase().includes(q) ||
          r.guestEmail.toLowerCase().includes(q)
      );
    }

    return sendSuccess(res, 'Reservations retrieved', reservations);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch reservations', 500);
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { status } = req.body;
    const reservation = await ReservationService.getByCode(code);
    (reservation as any).status = status;
    return sendSuccess(res, `Reservation ${code} status updated to ${status}`, reservation);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update reservation', 400);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, search } = req.query;
    const users = await AdminService.getUsers({
      role: role as string,
      search: search as string,
    });
    return sendSuccess(res, 'Users retrieved', users);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch users', 500);
  }
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const updated = await AdminService.toggleUserStatus(req.params.id);
    return sendSuccess(res, 'User status updated', updated);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to toggle user status', 400);
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staff = await AdminService.createStaff(req.body);
    return sendSuccess(res, 'Staff member onboarded successfully', staff, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to create staff', 400);
  }
};

let restaurantSettings = {
  restaurantName: 'ROYAL FEAST',
  tagline: 'An Extraordinary Dining Experience',
  phone: '+91 98765 43210',
  email: 'concierge@royalfeast.com',
  address: '42 Imperial Boulevard, Heritage Quarter, New Delhi',
  openingHours: 'Mon - Sun: 12:00 PM - 11:30 PM',
  taxPercentage: 5.0,
  deliveryFeeFlat: 50.0,
  freeDeliveryOver: 999.0,
};

export const getSettings = (req: Request, res: Response) => {
  return sendSuccess(res, 'Settings retrieved', restaurantSettings);
};

export const updateSettings = (req: Request, res: Response) => {
  restaurantSettings = { ...restaurantSettings, ...req.body };
  return sendSuccess(res, 'Settings updated successfully', restaurantSettings);
};

export const getAllCoupons = (req: Request, res: Response) => {
  try {
    const coupons = CouponService.getAll();
    return sendSuccess(res, 'Coupons list retrieved', coupons);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch coupons', 500);
  }
};

export const createCoupon = (req: Request, res: Response) => {
  try {
    const coupon = CouponService.create(req.body);
    return sendSuccess(res, 'Coupon created successfully', coupon, 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to create coupon', 400);
  }
};

export const toggleCouponStatus = (req: Request, res: Response) => {
  try {
    const coupon = CouponService.toggleStatus(req.params.id);
    return sendSuccess(res, 'Coupon status toggled', coupon);
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to toggle coupon status', 400);
  }
};
