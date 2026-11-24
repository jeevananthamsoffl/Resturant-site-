import { prisma } from '../config/prisma';

export interface ReservationData {
  id: string;
  reservationCode: string;
  userId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  seatingArea: string;
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

const memoryReservations: ReservationData[] = [
  {
    id: 'res-demo-1',
    reservationCode: 'RF-RES-928174',
    userId: 'usr-cust-1',
    guestName: 'Lord Arthur Sterling',
    guestEmail: 'customer@royalfeast.com',
    guestPhone: '+91 98765 11111',
    reservationDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    reservationTime: '19:30',
    guestCount: 2,
    seatingArea: 'Imperial Dining Hall',
    specialRequests: 'Window seat, anniversary celebration with vintage champagne.',
    status: 'CONFIRMED',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const MAX_TABLES_PER_SLOT = 6;

export class ReservationService {
  static async checkAvailability(date: string, timeSlot: string) {
    try {
      const dbCount = await prisma.reservation.count({
        where: {
          reservationTime: timeSlot,
          status: { in: ['CONFIRMED', 'PENDING'] },
        },
      });
      return dbCount < MAX_TABLES_PER_SLOT;
    } catch {}

    const count = memoryReservations.filter(
      (r) =>
        r.reservationDate === date &&
        r.reservationTime === timeSlot &&
        r.status !== 'CANCELLED' &&
        r.status !== 'REJECTED'
    ).length;

    return count < MAX_TABLES_PER_SLOT;
  }

  static async create(data: {
    userId?: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    reservationDate: string;
    reservationTime: string;
    guestCount: number;
    seatingArea?: string;
    specialRequests?: string;
  }) {
    // 1. Enforce availability and prevent double booking / overbooking
    const isAvailable = await this.checkAvailability(data.reservationDate, data.reservationTime);
    if (!isAvailable) {
      throw new Error(
        `The requested time slot ${data.reservationTime} on ${data.reservationDate} is completely booked. Please select another slot.`
      );
    }

    const reservationCode = `RF-RES-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const newRes = await prisma.reservation.create({
        data: {
          reservationCode,
          userId: data.userId,
          guestName: data.guestName.trim(),
          guestEmail: data.guestEmail.toLowerCase().trim(),
          guestPhone: data.guestPhone.trim(),
          reservationDate: new Date(data.reservationDate),
          reservationTime: data.reservationTime,
          guestCount: data.guestCount,
          specialRequests: data.specialRequests,
          status: 'CONFIRMED',
        },
      });

      return {
        ...newRes,
        seatingArea: data.seatingArea || 'Main Dining Hall',
      };
    } catch {}

    const newMemoryRes: ReservationData = {
      id: `res-${Date.now()}`,
      reservationCode,
      userId: data.userId,
      guestName: data.guestName.trim(),
      guestEmail: data.guestEmail.toLowerCase().trim(),
      guestPhone: data.guestPhone.trim(),
      reservationDate: data.reservationDate,
      reservationTime: data.reservationTime,
      guestCount: data.guestCount,
      seatingArea: data.seatingArea || 'Main Dining Hall',
      specialRequests: data.specialRequests,
      status: 'CONFIRMED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryReservations.unshift(newMemoryRes);
    return newMemoryRes;
  }

  static async getByCode(code: string) {
    try {
      const dbRes = await prisma.reservation.findUnique({
        where: { reservationCode: code.toUpperCase().trim() },
      });
      if (dbRes) return dbRes;
    } catch {}

    const res = memoryReservations.find(
      (r) => r.reservationCode.toUpperCase() === code.toUpperCase().trim()
    );
    if (!res) throw new Error('Reservation not found');
    return res;
  }

  static async getUserReservations(userId?: string, email?: string) {
    try {
      if (userId) {
        const list = await prisma.reservation.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });
        if (list.length > 0) return list;
      }
    } catch {}

    return memoryReservations.filter(
      (r) => (userId && r.userId === userId) || (email && r.guestEmail.toLowerCase() === email.toLowerCase())
    );
  }

  static async cancel(reservationCode: string, reason?: string) {
    try {
      const updated = await prisma.reservation.update({
        where: { reservationCode },
        data: { status: 'CANCELLED' },
      });
      return updated;
    } catch {}

    const res = memoryReservations.find((r) => r.reservationCode === reservationCode);
    if (!res) throw new Error('Reservation not found');

    res.status = 'CANCELLED';
    res.updatedAt = new Date();
    if (reason) res.specialRequests = `${res.specialRequests || ''} [Cancelled: ${reason}]`;
    return res;
  }

  static getAll() {
    return memoryReservations;
  }
}
