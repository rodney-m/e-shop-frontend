import { OrderItem } from './order-item';
import { User } from '@bluebits/users';

export interface Order {
  id?: string;
  orderItems?: any[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}
