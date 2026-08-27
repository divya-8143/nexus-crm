import { UUID, ISODateString } from './common';

export type DealStage = 
  | 'DISCOVERY'
  | 'QUALIFICATION'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'CLOSED_WON'
  | 'CLOSED_LOST';

export interface Deal {
  id: UUID;
  tenantId: UUID;
  customerId: UUID;
  customerName?: string;
  title: string;
  dealValue: number;
  currency: string;
  stage: DealStage;
  winProbability: number;
  expectedCloseDate: ISODateString;
  actualCloseDate?: ISODateString;
  assignedRepId?: UUID;
  assignedRepName?: string;
  pipelineType: string;
  lossReason?: string;
  customMetrics: Record<string, any>;
  weightedValue?: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface DealPipelineSummary {
  stage: DealStage;
  totalCount: number;
  totalValue: number;
  weightedValue: number;
  deals: Deal[];
}
