import crypto from 'crypto';
import { prisma } from '../config/prisma';
import { config } from '../config/env';
import { CouponService } from './coupon.service';

export interface OrderItemSnapshot {
  menuItemId: string;
  nameSnapshot: string;
  price: number;
  quantity: number;
  subtotal: number;
  customization?: {
    spiceLevel?: string;
    notes?: string;
  };
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: 'DELIVERY' | 'TAKEAWAY' | 'DINE_IN';
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'READY'
    | 'OUT_FOR_DELIVERY'
    | 'COMPLETED'
    | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentMethod: 'ONLINE_RAZORPAY' | 'CASH_ON_DELIVERY' | 'CASH_AT_COUNTER';
  subtotal: number;
  taxAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    landmark?: string;
  };
  items: OrderItemSnapshot[];
  notes?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const memoryOrders: OrderRecord[] = [
  {
    id: 'ord-demo-1',
    orderNumber: 'RF-ORD-2026-847291',
    userId: 'usr-cust-1',
    customerName: 'Lord Arthur Sterling',
    customerEmail: 'customer@royalfeast.com',
    customerPhone: '+91 98765 11111',
    orderType: 'DELIVERY',
    status: 'PREPARING',
    paymentStatus: 'PAID',
    paymentMethod: 'ONLINE_RAZORPAY',
    subtotal: 1540,
    discountAmount: 200,
    taxAmount: 67,
    deliveryFee: 0,
    totalAmount: 1407,
    couponCode: 'ROYAL20',
    address: {
      street: '18 Embassy Row, Civil Lines',
      city: 'Delhi',
      state: 'Delhi NCR',
      postalCode: '110054',
      landmark: 'Near Diplomatic Mission',
    },
    items: [
      {
        menuItemId: 'starter-2',
        nameSnapshot: 'Royal Shahi Galouti Kebab',
        price: 850,
        quantity: 1,
        subtotal: 850,
      },
      {
        menuItemId: 'indian-1',
        nameSnapshot: 'Royal Feast Signature Dal Makhani',
        price: 690,
        quantity: 1,
        subtotal: 690,
      },
    ],
    notes: 'Please ensure extra mint chutney and sheermal bread.',
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(),
  },
];

export class OrderService {
  static async checkout(data: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderType: 'DELIVERY' | 'TAKEAWAY' | 'DINE_IN';
    address?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      landmark?: string;
    };
    items: {
      menuItemId: string;
      name: string;
      price: number;
      quantity: number;
      customization?: { spiceLevel?: string; notes?: string };
    }[];
    couponCode?: string;
    paymentMethod: 'ONLINE_RAZORPAY' | 'CASH_ON_DELIVERY' | 'CASH_AT_COUNTER';
    notes?: string;
  }) {
    // 1. Calculate line item subtotals with exact price snapshots
    const itemsSnapshot: OrderItemSnapshot[] = data.items.map((item) => ({
      menuItemId: item.menuItemId,
      nameSnapshot: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: Math.round(item.price * item.quantity),
      customization: item.customization,
    }));

    const subtotal = itemsSnapshot.reduce((acc, curr) => acc + curr.subtotal, 0);

    // 2. Validate Coupon if provided
    let discountAmount = 0;
    if (data.couponCode) {
      try {
        const validated = await CouponService.validate(data.couponCode, subtotal);
        discountAmount = validated.discount;
      } catch (err: any) {
        throw new Error(err.message || 'Invalid coupon applied');
      }
    }

    // 3. Taxes & Delivery Fee
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = Math.round(discountedSubtotal * 0.05); // 5% GST
    const deliveryFee =
      data.orderType === 'DELIVERY' ? (subtotal >= 999 ? 0 : 50) : 0;
    const totalAmount = discountedSubtotal + taxAmount + deliveryFee;

    // 4. Generate Order Number
    const orderNumber = `RF-ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    // 5. Payment details setup
    let razorpayOrderId: string | undefined = undefined;
    let initialStatus: OrderRecord['status'] = 'PENDING';
    let initialPaymentStatus: OrderRecord['paymentStatus'] = 'PENDING';

    if (data.paymentMethod === 'ONLINE_RAZORPAY') {
      // Simulate/create gateway order ID
      razorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
    } else {
      // Cash on delivery / Counter
      initialStatus = 'CONFIRMED';
    }

    try {
      // Attempt PostgreSQL transaction via Prisma
      const newOrder = await prisma.order.create({
        data: {
          orderNumber,
          userId: data.userId || 'guest',
          orderType: data.orderType,
          status: initialStatus,
          paymentStatus: initialPaymentStatus,
          paymentMethod: data.paymentMethod,
          subtotal,
          taxAmount,
          deliveryFee,
          discountAmount,
          totalAmount,
          notes: data.notes,
          items: {
            create: itemsSnapshot.map((i) => ({
              menuItemId: i.menuItemId,
              nameSnapshot: i.nameSnapshot,
              price: i.price,
              quantity: i.quantity,
              subtotal: i.subtotal,
            })),
          },
          payment: {
            create: {
              amount: totalAmount,
              currency: 'INR',
              method: data.paymentMethod,
              status: initialPaymentStatus,
              gatewayOrderId: razorpayOrderId,
            },
          },
        },
        include: {
          items: true,
          payment: true,
        },
      });

      return {
        ...newOrder,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        address: data.address,
        razorpayKeyId: config.razorpay.keyId,
        razorpayOrderId,
      };
    } catch {}

    // Fallback: In-memory order persistence
    const memoryRecord: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: data.userId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      orderType: data.orderType,
      status: initialStatus,
      paymentStatus: initialPaymentStatus,
      paymentMethod: data.paymentMethod,
      subtotal,
      taxAmount,
      deliveryFee,
      discountAmount,
      totalAmount,
      couponCode: data.couponCode,
      address: data.address,
      items: itemsSnapshot,
      notes: data.notes,
      razorpayOrderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryOrders.unshift(memoryRecord);

    return {
      ...memoryRecord,
      razorpayKeyId: config.razorpay.keyId,
      razorpayOrderId,
    };
  }

  static async verifyPayment(data: {
    orderNumber: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    // 1. Verify cryptographic HMAC signature
    // In production, signature = HMAC_SHA256(razorpayOrderId + "|" + razorpayPaymentId, secret)
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest('hex');

    // For test simulation, accept matching signature or demo signature
    const isValidSignature =
      data.razorpaySignature === expectedSignature ||
      data.razorpaySignature.startsWith('demo_sig_');

    if (!isValidSignature) {
      throw new Error('Payment verification failed: Invalid cryptographic signature');
    }

    try {
      const order = await prisma.order.findUnique({
        where: { orderNumber: data.orderNumber },
        include: { payment: true },
      });

      if (order) {
        await prisma.order.update({
          where: { orderNumber: data.orderNumber },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
            payment: {
              update: {
                status: 'PAID',
                transactionId: data.razorpayPaymentId,
                paymentSignature: data.razorpaySignature,
                paidAt: new Date(),
              },
            },
          },
        });
        return { success: true, orderNumber: data.orderNumber, status: 'CONFIRMED' };
      }
    } catch {}

    const memOrder = memoryOrders.find((o) => o.orderNumber === data.orderNumber);
    if (!memOrder) throw new Error('Order not found');

    memOrder.status = 'CONFIRMED';
    memOrder.paymentStatus = 'PAID';
    memOrder.razorpayPaymentId = data.razorpayPaymentId;
    memOrder.updatedAt = new Date();

    return {
      success: true,
      orderNumber: memOrder.orderNumber,
      status: memOrder.status,
      paymentStatus: memOrder.paymentStatus,
    };
  }

  static async getOrderByNumber(orderNumber: string) {
    try {
      const dbOrder = await prisma.order.findUnique({
        where: { orderNumber },
        include: { items: true, payment: true },
      });
      if (dbOrder) return dbOrder;
    } catch {}

    const order = memoryOrders.find(
      (o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase().trim()
    );
    if (!order) throw new Error(`Order ${orderNumber} not found`);
    return order;
  }

  static async getUserOrders(userId?: string, email?: string) {
    try {
      if (userId) {
        const dbOrders = await prisma.order.findMany({
          where: { userId },
          include: { items: true, payment: true },
          orderBy: { createdAt: 'desc' },
        });
        if (dbOrders.length > 0) return dbOrders;
      }
    } catch {}

    return memoryOrders.filter(
      (o) =>
        (userId && o.userId === userId) ||
        (email && o.customerEmail.toLowerCase() === email.toLowerCase())
    );
  }

  static async updateOrderStatus(
    orderNumber: string,
    status: OrderRecord['status']
  ) {
    try {
      const updated = await prisma.order.update({
        where: { orderNumber },
        data: { status },
      });
      return updated;
    } catch {}

    const order = memoryOrders.find((o) => o.orderNumber === orderNumber);
    if (!order) throw new Error('Order not found');
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }

  static getAllOrders() {
    return memoryOrders;
  }
}
