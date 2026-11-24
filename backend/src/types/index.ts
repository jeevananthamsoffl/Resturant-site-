import { Request } from 'express';

export type UserRole =
  | 'CUSTOMER'
  | 'RECEPTION_STAFF'
  | 'KITCHEN_STAFF'
  | 'RESTAURANT_MANAGER'
  | 'SUPER_ADMIN';

export interface AuthUserPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserPayload;
}
