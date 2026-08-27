import { UUID, ISODateString, Address } from './common';

export type CustomerLifecycleStage = 
  | 'LEAD'
  | 'MQL'
  | 'SQL'
  | 'OPPORTUNITY'
  | 'CUSTOMER'
  | 'CHURNED'
  | 'ADVOCATE';

export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED';

export interface CustomerContact {
  id: UUID;
  customerId: UUID;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
  decisionMakerRole?: 'PRIMARY' | 'INFLUENCER' | 'BLOCKER' | 'FINANCIAL_BUYER' | 'TECHNICAL_BUYER';
  notes?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Customer {
  id: UUID;
  tenantId: UUID;
  accountNumber: string;
  name: string;
  companyName?: string;
  industry?: string;
  email: string;
  phone?: string;
  website?: string;
  lifecycleStage: CustomerLifecycleStage;
  leadScore: number;
  annualRevenue: number;
  currency: string;
  assignedAgentId?: UUID;
  assignedAgentName?: string;
  billingAddress: Address;
  shippingAddress: Address;
  customFields: Record<string, any>;
  tags: string[];
  isVip: boolean;
  status: CustomerStatus;
  totalDealsCount?: number;
  totalDealsValue?: number;
  openTicketsCount?: number;
  lastContactedAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CustomerFilterParams {
  search?: string;
  lifecycleStage?: CustomerLifecycleStage[];
  status?: CustomerStatus[];
  assignedAgentId?: UUID;
  industry?: string[];
  tags?: string[];
  isVip?: boolean;
  minRevenue?: number;
  maxRevenue?: number;
  minLeadScore?: number;
  maxLeadScore?: number;
  createdAfter?: ISODateString;
  createdBefore?: ISODateString;
}
