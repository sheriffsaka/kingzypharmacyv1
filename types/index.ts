export enum UserRole {
  ADMIN = 'ADMIN',
  WHOLESALE_BUYER = 'WHOLESALE_BUYER',
  GENERAL_PUBLIC = 'GENERAL_PUBLIC',
  LOGISTICS_STAFF = 'LOGISTICS_STAFF'
}

export enum StockStatus {
  IN_STOCK = 'In Stock',
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock'
}

export enum OrderStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  PACKED = 'Packed',
  DISPATCHED = 'Dispatched',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loyaltyTier?: string; // For wholesale buyers
}

export interface Product {
  id: string;
  name:string;
  category: string;
  description: string;
  dosage: string; // e.g., "500mg"
  packSize: string; // e.g., "30 Tablets"
  price: number; // Price for general public
  wholesalePrice?: number; // Price for wholesale buyers
  stockStatus: StockStatus;
  imageUrl: string;
  minOrderQuantity?: number; // For wholesale
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  orderDate: string;
  deliveryAddress: string;
  paymentMethod: 'online' | 'manual';
  paymentProofUrl?: string;
  trackingNumber?: string;
}
