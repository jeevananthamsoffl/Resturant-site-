import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { config } from '../config/env';
import { AuthUserPayload, UserRole } from '../types';

// Pre-seeded fallback memory store for initial runs before DB connection
interface MemoryUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const memoryUsers: MemoryUser[] = [
  {
    id: 'usr-admin-1',
    name: 'Royal Feast Super Admin',
    email: 'admin@royalfeast.com',
    phone: '+91 98765 00001',
    passwordHash: bcrypt.hashSync('RoyalAdmin#2026', 10),
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'usr-mgr-1',
    name: 'Vikramaditya Rathore',
    email: 'manager@royalfeast.com',
    phone: '+91 98765 00002',
    passwordHash: bcrypt.hashSync('RoyalManager#2026', 10),
    role: 'RESTAURANT_MANAGER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'usr-chef-1',
    name: 'Antoine Laurent',
    email: 'chef@royalfeast.com',
    phone: '+91 98765 00003',
    passwordHash: bcrypt.hashSync('RoyalChef#2026', 10),
    role: 'KITCHEN_STAFF',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'usr-recep-1',
    name: 'Concierge Reception',
    email: 'reception@royalfeast.com',
    phone: '+91 98765 00004',
    passwordHash: bcrypt.hashSync('RoyalStaff#2026', 10),
    role: 'RECEPTION_STAFF',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'usr-cust-1',
    name: 'Lord Arthur Sterling',
    email: 'customer@royalfeast.com',
    phone: '+91 98765 11111',
    passwordHash: bcrypt.hashSync('RoyalCustomer#2026', 10),
    role: 'CUSTOMER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class AuthService {
  private static generateToken(user: { id: string; email: string; role: UserRole; name: string }): string {
    const payload: AuthUserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as any,
    });
  }

  static async register(data: { name: string; email: string; password: string; phone?: string }) {
    const normalizedEmail = data.email.toLowerCase().trim();

    try {
      // 1. Try PostgreSQL via Prisma
      const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        throw new Error('An account with this email address already exists');
      }

      const passwordHash = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          name: data.name.trim(),
          email: normalizedEmail,
          phone: data.phone?.trim(),
          passwordHash,
          role: 'CUSTOMER',
        },
      });

      const token = this.generateToken(user as any);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
      };
    } catch (err: any) {
      // Fallback to in-memory store if DB is offline during dev
      if (err.message && err.message.includes('already exists')) {
        throw err;
      }

      const memoryExisting = memoryUsers.find((u) => u.email === normalizedEmail);
      if (memoryExisting) {
        throw new Error('An account with this email address already exists');
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const newUser: MemoryUser = {
        id: `usr-${Date.now()}`,
        name: data.name.trim(),
        email: normalizedEmail,
        phone: data.phone?.trim(),
        passwordHash,
        role: 'CUSTOMER',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryUsers.push(newUser);

      const token = this.generateToken(newUser);
      return {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
        token,
      };
    }
  }

  static async login(data: { email: string; password: string }) {
    const normalizedEmail = data.email.toLowerCase().trim();

    try {
      // 1. Try PostgreSQL via Prisma
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (user) {
        if (!user.isActive) {
          throw new Error('Your account has been deactivated. Please contact concierge support.');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        const token = this.generateToken(user as any);

        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
          },
          token,
        };
      }
    } catch (err: any) {
      if (err.message === 'Invalid email or password' || err.message.includes('deactivated')) {
        throw err;
      }
    }

    // 2. Memory store check
    const memUser = memoryUsers.find((u) => u.email === normalizedEmail);
    if (!memUser) {
      throw new Error('Invalid email or password');
    }

    if (!memUser.isActive) {
      throw new Error('Your account has been deactivated. Please contact concierge support.');
    }

    const isMatch = await bcrypt.compare(data.password, memUser.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(memUser);

    return {
      user: {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email,
        phone: memUser.phone,
        role: memUser.role,
        createdAt: memUser.createdAt,
      },
      token,
    };
  }

  static async getProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          addresses: true,
        },
      });
      if (user) return user;
    } catch {}

    const memUser = memoryUsers.find((u) => u.id === userId);
    if (memUser) {
      return {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email,
        phone: memUser.phone,
        role: memUser.role,
        isActive: memUser.isActive,
        createdAt: memUser.createdAt,
        addresses: [],
      };
    }

    throw new Error('User profile not found');
  }

  static async updateProfile(
    userId: string,
    data: { name?: string; phone?: string; currentPassword?: string; newPassword?: string }
  ) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        let passwordHash = user.passwordHash;
        if (data.newPassword) {
          if (!data.currentPassword) {
            throw new Error('Current password is required to update to a new password');
          }
          const isMatch = await bcrypt.compare(data.currentPassword, user.passwordHash);
          if (!isMatch) throw new Error('Incorrect current password');
          passwordHash = await bcrypt.hash(data.newPassword, 10);
        }

        const updated = await prisma.user.update({
          where: { id: userId },
          data: {
            ...(data.name && { name: data.name.trim() }),
            ...(data.phone && { phone: data.phone.trim() }),
            passwordHash,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            updatedAt: true,
          },
        });
        return updated;
      }
    } catch (err: any) {
      if (err.message.includes('password')) throw err;
    }

    const memUser = memoryUsers.find((u) => u.id === userId);
    if (!memUser) throw new Error('User not found');

    if (data.newPassword) {
      if (!data.currentPassword) throw new Error('Current password is required');
      const isMatch = await bcrypt.compare(data.currentPassword, memUser.passwordHash);
      if (!isMatch) throw new Error('Incorrect current password');
      memUser.passwordHash = await bcrypt.hash(data.newPassword, 10);
    }

    if (data.name) memUser.name = data.name.trim();
    if (data.phone) memUser.phone = data.phone.trim();
    memUser.updatedAt = new Date();

    return {
      id: memUser.id,
      name: memUser.name,
      email: memUser.email,
      phone: memUser.phone,
      role: memUser.role,
      updatedAt: memUser.updatedAt,
    };
  }
}
