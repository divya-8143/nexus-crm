import { ISODateString } from './common';

export interface RevenueMetric {
  period: string;
  mrr: number;
  arr: number;
  netNewRevenue: number;
  expansionRevenue: number;
  churnedRevenue: number;
}

export interface SalesFunnelStageMetric {
  stage: string;
  count: number;
  value: number;
  conversionRatePercent: number;
  averageTimeInStageHours: number;
}

export interface CustomerCohortMetric {
  cohortMonth: string;
  initialCustomers: number;
  retentionByMonth: number[]; // e.g. [100, 95, 90, 88, 85]
}

export interface ChurnRiskAnalysis {
  customerId: string;
  customerName: string;
  riskScorePercent: number; // 0-100
  riskFactors: string[];
  daysSinceLastActivity: number;
  openUnresolvedTickets: number;
  recommendation: string;
}

export interface ExecutiveDashboardSummary {
  totalCustomers: number;
  activeLeads: number;
  pipelineValue: number;
  weightedPipelineValue: number;
  closedWonMtd: number;
  slaBreachRatePercent: number;
  averageTicketResolutionHours: number;
  customerSatisfactionAvg: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
}
