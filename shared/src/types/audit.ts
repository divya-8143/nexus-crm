import { UUID, ISODateString } from './common';

export type AuditActionType = 
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'EXPORT'
  | 'STATUS_CHANGE'
  | 'PERMISSION_CHANGE';

export interface AuditLogEntry {
  id: UUID;
  tenantId: UUID;
  actorUserId?: UUID;
  actorEmail?: string;
  actionType: AuditActionType;
  entityType: 'CUSTOMER' | 'DEAL' | 'TICKET' | 'INVOICE' | 'USER' | 'SETTINGS' | 'AUTH';
  entityId: UUID;
  ipAddress?: string;
  userAgent?: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
  diff?: Record<string, { before: any; after: any }>;
  metadata?: Record<string, any>;
  createdAt: ISODateString;
}
