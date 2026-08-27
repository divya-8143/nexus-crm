import { UUID, ISODateString } from './common';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type SupportChannel = 'WEB' | 'EMAIL' | 'PHONE' | 'CHAT' | 'API';

export interface TicketComment {
  id: UUID;
  ticketId: UUID;
  authorUserId?: UUID;
  authorName?: string;
  isInternalNote: boolean;
  body: string;
  attachments: Array<{ name: string; url: string; size: number }>;
  createdAt: ISODateString;
}

export interface SupportTicket {
  id: UUID;
  tenantId: UUID;
  customerId: UUID;
  customerName?: string;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  channel: SupportChannel;
  assignedAgentId?: UUID;
  assignedAgentName?: string;
  slaDueDate?: ISODateString;
  isSlaBreached: boolean;
  firstResponseAt?: ISODateString;
  resolvedAt?: ISODateString;
  satisfactionRating?: number; // 1-5
  tags: string[];
  commentsCount?: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
