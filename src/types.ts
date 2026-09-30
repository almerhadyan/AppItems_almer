export type OrderStatus = 'Completed' | 'Processing' | 'On Hold' | 'Cancelled' | 'Pending';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded' | 'Partially Paid';
export type ShippingStatus = 'Delivered' | 'In Transit' | 'Packing' | 'Out for Delivery' | 'Courier Pickup' | 'Pending' | 'Returned';
export type OrderPriority = 'High' | 'Medium' | 'Low';
export type CourierName = 'FedEx Express' | 'DHL Express' | 'UPS Worldwide' | 'USPS Priority';

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  totalOrders: number;
  lifetimeValue: number;
  segment: 'VIP' | 'Repeat' | 'New' | 'At Risk';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface OrderTimelineStep {
  title: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderComment {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #ORD-9842
  customer: Customer;
  items: OrderItem[];
  orderDate: string; // e.g., 2026-07-22 14:30
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  orderStatus: OrderStatus;
  priority: OrderPriority;
  courier: CourierName;
  trackingNumber: string;
  expectedDelivery: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  grandTotal: number;
  notes?: string;
  assignedStaff?: {
    name: string;
    avatar: string;
    role: string;
  };
  timeline: OrderTimelineStep[];
  comments: OrderComment[];
  kanbanStage: 'New Orders' | 'Pending Payment' | 'Processing' | 'Packing' | 'Ready to Ship' | 'Shipping' | 'Delivered' | 'Returned';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  warehouseLocation: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  image: string;
  salesCount: number;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  country: string;
  capacityPercentage: number;
  totalProducts: number;
  manager: string;
  contactEmail: string;
  status: 'Optimal' | 'High Load' | 'Maintenance';
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  leadTimeDays: number;
  reliabilityScore: number;
  categories: string[];
  activeOrdersCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'inventory' | 'shipment' | 'finance';
  read: boolean;
}

export interface DiscountCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Scheduled';
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerAvatar: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Flagged';
}
