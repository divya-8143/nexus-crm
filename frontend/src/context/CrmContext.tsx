import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type DeliveryStatus =
  | 'Ordered'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Not Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';

export type SatisfactionLevel = 'Satisfied' | 'Neutral' | 'Unsatisfied';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
  amount: number;
  orderDate: string; // YYYY-MM-DD
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  deliveryDate?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  satisfaction: SatisfactionLevel;
  rating: number; // 1 to 5
  feedback?: string;
  latestOrderStatus: DeliveryStatus;
  createdAt: string;
}

export interface FeedbackReview {
  id: string;
  customerId: string;
  customerName: string;
  orderId: string;
  product: string;
  rating: number;
  satisfaction: SatisfactionLevel;
  feedback: string;
  date: string;
}

export interface SalesPeriodData {
  label: string;
  sales: number;
  orderCount: number;
}

interface CrmContextType {
  customers: Customer[];
  orders: Order[];
  feedbacks: FeedbackReview[];
  currencySymbol: string;
  setCurrencySymbol: (sym: string) => void;
  // Metrics
  totalCustomersCount: number;
  totalOrdersCount: number;
  deliveredOrdersCount: number;
  overallSatisfactionPct: number;
  satisfiedCount: number;
  neutralCount: number;
  unsatisfiedCount: number;
  satisfiedPct: number;
  neutralPct: number;
  unsatisfiedPct: number;
  totalSalesAmount: number;
  averageOrderValue: number;
  // Sales Chart Data
  weeklySalesData: SalesPeriodData[];
  monthlySalesData: SalesPeriodData[];
  yearlySalesData: SalesPeriodData[];
  // Customer Actions
  addCustomer: (cust: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'latestOrderStatus' | 'createdAt'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  // Order Actions
  addOrder: (order: Omit<Order, 'id'>) => Order;
  updateOrderStatus: (orderId: string, deliveryStatus: DeliveryStatus, paymentStatus?: PaymentStatus) => void;
  deleteOrder: (orderId: string) => void;
  // Feedback Actions
  addFeedback: (fb: Omit<FeedbackReview, 'id' | 'date'>) => void;
  // Reset
  resetToSampleData: () => void;
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

// Initial Clean Seed Data
const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    phone: '+91 98765 43210',
    address: '42 MG Road, Indiranagar',
    city: 'Bengaluru, Karnataka',
    totalOrders: 3,
    totalSpent: 58000,
    lastOrderDate: '2026-08-25',
    satisfaction: 'Satisfied',
    rating: 5,
    feedback: 'Product quality is very good and delivery was on time.',
    latestOrderStatus: 'Delivered',
    createdAt: '2026-01-15',
  },
  {
    id: 'cust_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98111 22334',
    address: '15 Park Street, Flat 4B',
    city: 'Kolkata, West Bengal',
    totalOrders: 2,
    totalSpent: 24500,
    lastOrderDate: '2026-08-22',
    satisfaction: 'Neutral',
    rating: 3,
    feedback: 'Product is good but delivery was late by 2 days.',
    latestOrderStatus: 'Delivered',
    createdAt: '2026-02-10',
  },
  {
    id: 'cust_3',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91 99000 55443',
    address: '88 Ring Road, Satellite',
    city: 'Ahmedabad, Gujarat',
    totalOrders: 4,
    totalSpent: 92000,
    lastOrderDate: '2026-08-27',
    satisfaction: 'Satisfied',
    rating: 5,
    feedback: 'Excellent packaging and prompt customer service support.',
    latestOrderStatus: 'Out for Delivery',
    createdAt: '2026-03-05',
  },
  {
    id: 'cust_4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '+91 97444 88990',
    address: '102 Jubilee Hills, Road No. 36',
    city: 'Hyderabad, Telangana',
    totalOrders: 1,
    totalSpent: 12000,
    lastOrderDate: '2026-08-26',
    satisfaction: 'Satisfied',
    rating: 4,
    feedback: 'Smooth ordering experience. Will order again.',
    latestOrderStatus: 'Shipped',
    createdAt: '2026-04-12',
  },
  {
    id: 'cust_5',
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98222 77665',
    address: '24 Bandra West, Linking Road',
    city: 'Mumbai, Maharashtra',
    totalOrders: 2,
    totalSpent: 35000,
    lastOrderDate: '2026-08-20',
    satisfaction: 'Unsatisfied',
    rating: 2,
    feedback: 'Received damaged outer box packaging, though item was fine.',
    latestOrderStatus: 'Not Delivered',
    createdAt: '2026-05-18',
  },
  {
    id: 'cust_6',
    name: 'Ananya Roy',
    email: 'ananya.roy@example.com',
    phone: '+91 98333 11223',
    address: '77 Sector 18, Noida',
    city: 'Delhi NCR',
    totalOrders: 3,
    totalSpent: 47500,
    lastOrderDate: '2026-08-24',
    satisfaction: 'Satisfied',
    rating: 5,
    feedback: 'Loved the fast shipping and authentic warranty card!',
    latestOrderStatus: 'Delivered',
    createdAt: '2026-06-01',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    customerId: 'cust_1',
    customerName: 'Ravi Kumar',
    customerEmail: 'ravi.kumar@example.com',
    product: 'Pro Ultra Laptop 16-inch',
    quantity: 1,
    amount: 50000,
    orderDate: '2026-08-25',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-08-27',
    notes: 'Standard priority delivery',
  },
  {
    id: 'ORD-1002',
    customerId: 'cust_1',
    customerName: 'Ravi Kumar',
    customerEmail: 'ravi.kumar@example.com',
    product: 'Wireless Noise-Cancelling Headphones',
    quantity: 2,
    amount: 8000,
    orderDate: '2026-08-15',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-08-18',
    notes: 'Gift wrap requested',
  },
  {
    id: 'ORD-1003',
    customerId: 'cust_2',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    product: 'Ergonomic Office Chair',
    quantity: 1,
    amount: 14500,
    orderDate: '2026-08-22',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-08-26',
    notes: 'Assembly manual included',
  },
  {
    id: 'ORD-1004',
    customerId: 'cust_2',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    product: 'Mechanical Gaming Keyboard',
    quantity: 2,
    amount: 10000,
    orderDate: '2026-07-10',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-07-14',
  },
  {
    id: 'ORD-1005',
    customerId: 'cust_3',
    customerName: 'Amit Patel',
    customerEmail: 'amit.patel@example.com',
    product: '4K Ultra-HD Monitor 32-inch',
    quantity: 2,
    amount: 64000,
    orderDate: '2026-08-27',
    paymentStatus: 'Paid',
    deliveryStatus: 'Out for Delivery',
    notes: 'Handle with care - fragile display',
  },
  {
    id: 'ORD-1006',
    customerId: 'cust_3',
    customerName: 'Amit Patel',
    customerEmail: 'amit.patel@example.com',
    product: 'USB-C Universal Docking Station',
    quantity: 2,
    amount: 28000,
    orderDate: '2026-08-05',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-08-08',
  },
  {
    id: 'ORD-1007',
    customerId: 'cust_4',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha.reddy@example.com',
    product: 'Smart Fitness Watch Series 5',
    quantity: 1,
    amount: 12000,
    orderDate: '2026-08-26',
    paymentStatus: 'Paid',
    deliveryStatus: 'Shipped',
    notes: 'Air courier express',
  },
  {
    id: 'ORD-1008',
    customerId: 'cust_5',
    customerName: 'Vikram Malhotra',
    customerEmail: 'vikram.m@example.com',
    product: 'Bluetooth Conference Speaker',
    quantity: 2,
    amount: 20000,
    orderDate: '2026-08-20',
    paymentStatus: 'Paid',
    deliveryStatus: 'Not Delivered',
    notes: 'Address clarification pending with courier',
  },
  {
    id: 'ORD-1009',
    customerId: 'cust_5',
    customerName: 'Vikram Malhotra',
    customerEmail: 'vikram.m@example.com',
    product: 'Studio Condenser Microphone',
    quantity: 1,
    amount: 15000,
    orderDate: '2026-06-18',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-06-22',
  },
  {
    id: 'ORD-1010',
    customerId: 'cust_6',
    customerName: 'Ananya Roy',
    customerEmail: 'ananya.roy@example.com',
    product: 'Wireless Tablet & Stylus Pen',
    quantity: 1,
    amount: 32000,
    orderDate: '2026-08-24',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-08-27',
  },
  {
    id: 'ORD-1011',
    customerId: 'cust_6',
    customerName: 'Ananya Roy',
    customerEmail: 'ananya.roy@example.com',
    product: 'High-Speed External SSD 2TB',
    quantity: 1,
    amount: 15500,
    orderDate: '2026-07-28',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    deliveryDate: '2026-08-01',
  },
  {
    id: 'ORD-1012',
    customerId: 'cust_1',
    customerName: 'Ravi Kumar',
    customerEmail: 'ravi.kumar@example.com',
    product: 'Compact Thermal Receipt Printer',
    quantity: 1,
    amount: 6500,
    orderDate: '2026-08-28',
    paymentStatus: 'Pending',
    deliveryStatus: 'Processing',
    notes: 'Order placed today',
  },
];

const INITIAL_FEEDBACKS: FeedbackReview[] = [
  {
    id: 'fb_1',
    customerId: 'cust_1',
    customerName: 'Ravi Kumar',
    orderId: 'ORD-1001',
    product: 'Pro Ultra Laptop 16-inch',
    rating: 5,
    satisfaction: 'Satisfied',
    feedback: 'Product quality is very good and delivery was on time.',
    date: '2026-08-27',
  },
  {
    id: 'fb_2',
    customerId: 'cust_2',
    customerName: 'Priya Sharma',
    orderId: 'ORD-1003',
    product: 'Ergonomic Office Chair',
    rating: 3,
    satisfaction: 'Neutral',
    feedback: 'Product is good but delivery was late by 2 days.',
    date: '2026-08-26',
  },
  {
    id: 'fb_3',
    customerId: 'cust_3',
    customerName: 'Amit Patel',
    orderId: 'ORD-1006',
    product: 'USB-C Universal Docking Station',
    rating: 5,
    satisfaction: 'Satisfied',
    feedback: 'Excellent packaging and prompt customer service support.',
    date: '2026-08-09',
  },
  {
    id: 'fb_4',
    customerId: 'cust_6',
    customerName: 'Ananya Roy',
    orderId: 'ORD-1010',
    product: 'Wireless Tablet & Stylus Pen',
    rating: 5,
    satisfaction: 'Satisfied',
    feedback: 'Loved the fast shipping and authentic warranty card!',
    date: '2026-08-27',
  },
  {
    id: 'fb_5',
    customerId: 'cust_5',
    customerName: 'Vikram Malhotra',
    orderId: 'ORD-1008',
    product: 'Bluetooth Conference Speaker',
    rating: 2,
    satisfaction: 'Unsatisfied',
    feedback: 'Courier reported delivery issue without contacting me directly.',
    date: '2026-08-21',
  },
  {
    id: 'fb_6',
    customerId: 'cust_4',
    customerName: 'Sneha Reddy',
    orderId: 'ORD-1007',
    product: 'Smart Fitness Watch Series 5',
    rating: 4,
    satisfaction: 'Satisfied',
    feedback: 'Good item, quick customer communication on tracking link.',
    date: '2026-08-27',
  },
];

export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('nexus_simple_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nexus_simple_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [feedbacks, setFeedbacks] = useState<FeedbackReview[]>(() => {
    const saved = localStorage.getItem('nexus_simple_feedbacks');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  const [currencySymbol, setCurrencySymbol] = useState<string>('₹');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_simple_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('nexus_simple_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexus_simple_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Derived Core Metrics (Live Calculated)
  const totalCustomersCount = customers.length;
  const totalOrdersCount = orders.length;
  const deliveredOrdersCount = orders.filter((o) => o.deliveryStatus === 'Delivered').length;

  // Valid non-cancelled sales
  const validOrders = useMemo(() => {
    return orders.filter((o) => o.deliveryStatus !== 'Cancelled' && o.paymentStatus !== 'Failed');
  }, [orders]);

  const totalSalesAmount = useMemo(() => {
    return validOrders.reduce((sum, o) => sum + o.amount, 0);
  }, [validOrders]);

  const averageOrderValue = useMemo(() => {
    return validOrders.length > 0 ? Math.round(totalSalesAmount / validOrders.length) : 0;
  }, [totalSalesAmount, validOrders.length]);

  // Customer Satisfaction Metrics
  const satisfiedCount = useMemo(() => {
    return feedbacks.filter((f) => f.satisfaction === 'Satisfied' || f.rating >= 4).length;
  }, [feedbacks]);

  const neutralCount = useMemo(() => {
    return feedbacks.filter((f) => f.satisfaction === 'Neutral' || f.rating === 3).length;
  }, [feedbacks]);

  const unsatisfiedCount = useMemo(() => {
    return feedbacks.filter((f) => f.satisfaction === 'Unsatisfied' || f.rating <= 2).length;
  }, [feedbacks]);

  const totalFeedbackCount = feedbacks.length || 1;
  const overallSatisfactionPct = Math.round((satisfiedCount / totalFeedbackCount) * 1000) / 10;
  const satisfiedPct = Math.round((satisfiedCount / totalFeedbackCount) * 100);
  const neutralPct = Math.round((neutralCount / totalFeedbackCount) * 100);
  const unsatisfiedPct = Math.round((unsatisfiedCount / totalFeedbackCount) * 100);

  // Sales Chart Aggregations
  const weeklySalesData: SalesPeriodData[] = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dataMap: Record<string, { sales: number; count: number }> = {
      Mon: { sales: 24500, count: 2 },
      Tue: { sales: 50000, count: 1 },
      Wed: { sales: 12000, count: 1 },
      Thu: { sales: 64000, count: 2 },
      Fri: { sales: 38500, count: 3 },
      Sat: { sales: 42000, count: 2 },
      Sun: { sales: 28000, count: 1 },
    };

    // Dynamically incorporate valid orders
    validOrders.forEach((ord) => {
      const d = new Date(ord.orderDate);
      const dayIndex = (d.getDay() + 6) % 7; // Mon = 0
      const dayName = days[dayIndex] || 'Fri';
      dataMap[dayName].sales += Math.round(ord.amount * 0.1);
      dataMap[dayName].count += 1;
    });

    return days.map((day) => ({
      label: day,
      sales: dataMap[day].sales,
      orderCount: dataMap[day].count,
    }));
  }, [validOrders]);

  const monthlySalesData: SalesPeriodData[] = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseMonthly: Record<string, number> = {
      Jan: 120000,
      Feb: 145000,
      Mar: 180000,
      Apr: 165000,
      May: 210000,
      Jun: 240000,
      Jul: 295000,
      Aug: 310000 + totalSalesAmount,
      Sep: 190000,
      Oct: 225000,
      Nov: 280000,
      Dec: 340000,
    };

    return months.map((m) => ({
      label: m,
      sales: baseMonthly[m],
      orderCount: Math.round(baseMonthly[m] / 22000),
    }));
  }, [totalSalesAmount]);

  const yearlySalesData: SalesPeriodData[] = useMemo(() => {
    const years = ['2022', '2023', '2024', '2025', '2026'];
    const baseYearly: Record<string, number> = {
      '2022': 1450000,
      '2023': 2100000,
      '2024': 2850000,
      '2025': 3600000,
      '2026': 4250000 + totalSalesAmount,
    };

    return years.map((y) => ({
      label: y,
      sales: baseYearly[y],
      orderCount: Math.round(baseYearly[y] / 24000),
    }));
  }, [totalSalesAmount]);

  // Actions
  const addCustomer = (
    newCust: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'latestOrderStatus' | 'createdAt'>
  ): Customer => {
    const created: Customer = {
      ...newCust,
      id: `cust_${Date.now()}`,
      totalOrders: 0,
      totalSpent: 0,
      latestOrderStatus: 'Ordered',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [created, ...prev]);
    return created;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setOrders((prev) => prev.filter((o) => o.customerId !== id));
  };

  const addOrder = (newOrder: Omit<Order, 'id'>): Order => {
    const nextIdNum = 1000 + orders.length + 1;
    const created: Order = {
      ...newOrder,
      id: `ORD-${nextIdNum}`,
    };

    setOrders((prev) => [created, ...prev]);

    // Update customer stats
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === created.customerId || c.name.toLowerCase() === created.customerName.toLowerCase()) {
          return {
            ...c,
            totalOrders: c.totalOrders + 1,
            totalSpent: c.totalSpent + created.amount,
            lastOrderDate: created.orderDate,
            latestOrderStatus: created.deliveryStatus,
          };
        }
        return c;
      })
    );

    return created;
  };

  const updateOrderStatus = (
    orderId: string,
    deliveryStatus: DeliveryStatus,
    paymentStatus?: PaymentStatus
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated: Order = {
            ...o,
            deliveryStatus,
            paymentStatus: paymentStatus || o.paymentStatus,
            deliveryDate:
              deliveryStatus === 'Delivered' ? new Date().toISOString().split('T')[0] : o.deliveryDate,
          };
          // Also update customer latest order status
          setCustomers((cList) =>
            cList.map((c) =>
              c.id === o.customerId ? { ...c, latestOrderStatus: deliveryStatus } : c
            )
          );
          return updated;
        }
        return o;
      })
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const addFeedback = (fb: Omit<FeedbackReview, 'id' | 'date'>) => {
    const created: FeedbackReview = {
      ...fb,
      id: `fb_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setFeedbacks((prev) => [created, ...prev]);

    // Update customer satisfaction
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === fb.customerId || c.name.toLowerCase() === fb.customerName.toLowerCase()) {
          return {
            ...c,
            satisfaction: fb.satisfaction,
            rating: fb.rating,
            feedback: fb.feedback,
          };
        }
        return c;
      })
    );
  };

  const resetToSampleData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setOrders(INITIAL_ORDERS);
    setFeedbacks(INITIAL_FEEDBACKS);
    localStorage.removeItem('nexus_simple_customers');
    localStorage.removeItem('nexus_simple_orders');
    localStorage.removeItem('nexus_simple_feedbacks');
  };

  return (
    <CrmContext.Provider
      value={{
        customers,
        orders,
        feedbacks,
        currencySymbol,
        setCurrencySymbol,
        totalCustomersCount,
        totalOrdersCount,
        deliveredOrdersCount,
        overallSatisfactionPct,
        satisfiedCount,
        neutralCount,
        unsatisfiedCount,
        satisfiedPct,
        neutralPct,
        unsatisfiedPct,
        totalSalesAmount,
        averageOrderValue,
        weeklySalesData,
        monthlySalesData,
        yearlySalesData,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addFeedback,
        resetToSampleData,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
