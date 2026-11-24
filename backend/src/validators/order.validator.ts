import { z } from 'zod';

export const validateCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  subtotal: z.number().positive('Subtotal must be positive'),
});

export const createReservationSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  guestEmail: z.string().email('Valid email is required'),
  guestPhone: z.string().min(8, 'Valid phone number is required'),
  reservationDate: z.string().min(1, 'Reservation date is required'),
  reservationTime: z.string().min(1, 'Reservation time slot is required'),
  guestCount: z.number().int().min(1).max(30),
  seatingArea: z.string().default('Main Dining Hall'),
  specialRequests: z.string().optional(),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(8, 'Valid phone number is required'),
  orderType: z.enum(['DELIVERY', 'TAKEAWAY', 'DINE_IN']).default('DELIVERY'),
  address: z
    .object({
      street: z.string().min(5, 'Street address is required'),
      city: z.string().min(2, 'City is required'),
      state: z.string().default('Delhi NCR'),
      postalCode: z.string().min(4, 'Postal code is required'),
      landmark: z.string().optional(),
    })
    .optional(),
  items: z
    .array(
      z.object({
        menuItemId: z.string().min(1),
        name: z.string().min(1),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        customization: z
          .object({
            spiceLevel: z.string().optional(),
            notes: z.string().optional(),
          })
          .optional(),
      })
    )
    .min(1, 'Order must contain at least one item'),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(['ONLINE_RAZORPAY', 'CASH_ON_DELIVERY', 'CASH_AT_COUNTER']),
  notes: z.string().optional(),
});

export const verifyPaymentSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  razorpayOrderId: z.string().min(1, 'Razorpay order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Razorpay payment ID is required'),
  razorpaySignature: z.string().min(1, 'Razorpay signature is required'),
});
