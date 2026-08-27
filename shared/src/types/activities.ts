import { UUID, ISODateString } from './common';

export type ActivityType = 'CALL' | 'MEETING' | 'EMAIL' | 'NOTE' | 'TASK' | 'STATUS_CHANGE';
export type ActivityPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Activity {
  id: UUID;
  tenantId: UUID;
  customerId?: UUID;
  dealId?: UUID;
  userId: UUID;
  userName?: string;
  activityType: ActivityType;
  subject: string;
  description?: string;
  scheduledStart?: ISODateString;
  scheduledEnd?: ISODateString;
  isCompleted: boolean;
  priority: ActivityPriority;
  metadata: Record<string, any>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
