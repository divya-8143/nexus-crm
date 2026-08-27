import { UUID, ISODateString } from './common';

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'SALES_MANAGER' 
  | 'SALES_AGENT' 
  | 'SUPPORT_AGENT' 
  | 'COMPLIANCE_AUDITOR';

export interface UserProfile {
  id: UUID;
  tenantId: UUID;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserProfile;
}

export interface PermissionDefinition {
  resource: string;
  actions: Array<'create' | 'read' | 'update' | 'delete' | 'export' | 'admin'>;
}
