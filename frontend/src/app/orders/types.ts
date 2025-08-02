// Order status enum for type safety
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing", 
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

// Order filter options
export enum OrderFilterPeriod {
  ALL = "all",
  LAST_30_DAYS = "last_30_days",
  LAST_3_MONTHS = "last_3_months", 
  LAST_6_MONTHS = "last_6_months"
}

// Sort options for orders
export enum OrderSortBy {
  DATE_DESC = "date_desc",
  DATE_ASC = "date_asc",
  AMOUNT_DESC = "amount_desc",
  AMOUNT_ASC = "amount_asc"
}

// Types for orders page data structures with order creation
export interface User {
  id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date | null;
  products: Product;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  orderItems: OrderItem[];
}

// Props types (data passed to components)
export interface OrdersPageProps {
  user: User;
  orders: Order[];
}

export interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface OrderStatusBadgeProps {
  status: string;
}

export interface EmptyStateProps {
  onStartShopping: () => void;
}

// Order creation types
export interface CreateOrderData {
  userId: string;
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  cartItems: CartItem[];
}