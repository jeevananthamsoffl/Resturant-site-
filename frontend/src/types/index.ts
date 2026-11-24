export type UserRole =
  | 'CUSTOMER'
  | 'RECEPTION_STAFF'
  | 'KITCHEN_STAFF'
  | 'RESTAURANT_MANAGER'
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  ingredients?: string;
  price: number;
  isVegetarian: boolean;
  isBestseller: boolean;
  isAvailable: boolean;
  prepTimeMinutes: number;
  imageUrl?: string;
  category?: Category;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface ReservationSlot {
  time: string;
  available: boolean;
}

export interface ReservationRequest {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequests?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}
