import { prisma } from '../config/prisma';

export interface CouponItem {
  id: string;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  validUntil: Date;
}

const memoryCoupons: CouponItem[] = [
  {
    id: 'cpn-1',
    code: 'ROYAL20',
    description: '20% Royal Gastronomy discount up to ₹500',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrderValue: 1200,
    maxDiscount: 500,
    isActive: true,
    validUntil: new Date('2028-12-31'),
  },
  {
    id: 'cpn-2',
    code: 'WELCOME100',
    description: '₹100 flat welcome courtesy on orders above ₹500',
    discountType: 'FIXED',
    discountValue: 100,
    minOrderValue: 500,
    isActive: true,
    validUntil: new Date('2028-12-31'),
  },
  {
    id: 'cpn-3',
    code: 'IMPERIAL50',
    description: '50% off tasting banquets up to ₹1500 on orders above ₹3000',
    discountType: 'PERCENTAGE',
    discountValue: 50,
    minOrderValue: 3000,
    maxDiscount: 1500,
    isActive: true,
    validUntil: new Date('2028-12-31'),
  },
];

export class CouponService {
  static async validate(code: string, subtotal: number) {
    const normalizedCode = code.toUpperCase().trim();

    try {
      const dbCoupon = await prisma.coupon.findUnique({
        where: { code: normalizedCode },
      });

      if (dbCoupon) {
        if (!dbCoupon.isActive || new Date() > dbCoupon.validUntil) {
          throw new Error('This coupon code has expired or is inactive');
        }

        const minOrder = Number(dbCoupon.minOrderValue);
        if (subtotal < minOrder) {
          throw new Error(`Minimum order of ₹${minOrder} required for code ${normalizedCode}`);
        }

        let discount = 0;
        if (dbCoupon.discountType === 'PERCENTAGE') {
          discount = Math.round((subtotal * Number(dbCoupon.discountValue)) / 100);
          if (dbCoupon.maxDiscount && discount > Number(dbCoupon.maxDiscount)) {
            discount = Number(dbCoupon.maxDiscount);
          }
        } else {
          discount = Number(dbCoupon.discountValue);
        }

        return {
          code: dbCoupon.code,
          discount,
          discountType: dbCoupon.discountType,
          description: dbCoupon.description,
        };
      }
    } catch (err: any) {
      if (err.message.includes('expired') || err.message.includes('Minimum order')) {
        throw err;
      }
    }

    // Memory Store lookup
    const coupon = memoryCoupons.find((c) => c.code === normalizedCode);
    if (!coupon || !coupon.isActive || new Date() > coupon.validUntil) {
      throw new Error('Invalid or expired coupon code');
    }

    if (subtotal < coupon.minOrderValue) {
      throw new Error(`Minimum order of ₹${coupon.minOrderValue} required for code ${coupon.code}`);
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    return {
      code: coupon.code,
      discount,
      discountType: coupon.discountType,
      description: coupon.description,
    };
  }

  static getAll() {
    return memoryCoupons;
  }

  static getAllActive() {
    return memoryCoupons.filter((c) => c.isActive);
  }

  static create(data: {
    code: string;
    description: string;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
    minOrderValue: number;
    maxDiscount?: number;
    validUntil?: string;
  }) {
    const existing = memoryCoupons.find((c) => c.code === data.code.toUpperCase().trim());
    if (existing) {
      throw new Error(`Coupon with code ${data.code} already exists`);
    }

    const newCoupon: CouponItem = {
      id: `cpn-${Date.now()}`,
      code: data.code.toUpperCase().trim(),
      description: data.description,
      discountType: data.discountType,
      discountValue: Number(data.discountValue),
      minOrderValue: Number(data.minOrderValue),
      maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : undefined,
      isActive: true,
      validUntil: data.validUntil ? new Date(data.validUntil) : new Date('2028-12-31'),
    };

    memoryCoupons.unshift(newCoupon);
    return newCoupon;
  }

  static toggleStatus(id: string) {
    const coupon = memoryCoupons.find((c) => c.id === id);
    if (!coupon) throw new Error('Coupon not found');
    coupon.isActive = !coupon.isActive;
    return coupon;
  }
}
