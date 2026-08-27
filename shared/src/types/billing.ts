import { UUID, ISODateString } from './common';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'CANCELLED';
export type PaymentTerms = 'DUE_ON_RECEIPT' | 'NET_15' | 'NET_30' | 'NET_60' | 'CUSTOM';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRatePercent: number;
  discountPercent: number;
  lineTotal: number;
}

export interface Invoice {
  id: UUID;
  tenantId: UUID;
  customerId: UUID;
  customerName?: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  lineItems: InvoiceLineItem[];
  paymentTerms: PaymentTerms;
  notes?: string;
  paidAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Quote {
  id: UUID;
  tenantId: UUID;
  customerId: UUID;
  quoteNumber: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
  validUntil: string;
  totalAmount: number;
  currency: string;
  lineItems: InvoiceLineItem[];
  createdAt: ISODateString;
}
