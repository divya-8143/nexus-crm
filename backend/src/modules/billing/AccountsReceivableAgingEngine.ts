import { Invoice } from '@nexus/shared';

export interface ArAgingBucketSummary {
  currentTotal: number;       // Not yet due
  days1To30Overdue: number;
  days31To60Overdue: number;
  days61To90Overdue: number;
  days90PlusOverdue: number;
  totalReceivables: number;
}

export class AccountsReceivableAgingEngine {
  public static calculateAging(invoices: Invoice[]): ArAgingBucketSummary {
    const now = new Date().getTime();
    let currentTotal = 0;
    let days1To30 = 0;
    let days31To60 = 0;
    let days61To90 = 0;
    let days90Plus = 0;

    for (const inv of invoices) {
      if (inv.status === 'PAID' || inv.status === 'CANCELLED') continue;

      const dueDateMs = new Date(inv.dueDate).getTime();
      const diffDays = Math.floor((now - dueDateMs) / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        currentTotal += inv.totalAmount;
      } else if (diffDays <= 30) {
        days1To30 += inv.totalAmount;
      } else if (diffDays <= 60) {
        days31To60 += inv.totalAmount;
      } else if (diffDays <= 90) {
        days61To90 += inv.totalAmount;
      } else {
        days90Plus += inv.totalAmount;
      }
    }

    return {
      currentTotal: Math.round(currentTotal * 100) / 100,
      days1To30Overdue: Math.round(days1To30 * 100) / 100,
      days31To60Overdue: Math.round(days31To60 * 100) / 100,
      days61To90Overdue: Math.round(days61To90 * 100) / 100,
      days90PlusOverdue: Math.round(days90Plus * 100) / 100,
      totalReceivables: Math.round((currentTotal + days1To30 + days31To60 + days61To90 + days90Plus) * 100) / 100,
    };
  }

  public static determineDunningStage(dueDateStr: string): {
    stage: 'UPCOMING_REMINDER' | 'FIRST_OVERDUE_NOTICE' | 'SECOND_OVERDUE_NOTICE' | 'SUSPENSION_WARNING' | 'LEGAL_COLLECTIONS';
    recommendedTemplateName: string;
    urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  } {
    const diffDays = Math.floor((Date.now() - new Date(dueDateStr).getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= -3) {
      return { stage: 'UPCOMING_REMINDER', recommendedTemplateName: 'tpl_invoice_upcoming_friendly', urgencyLevel: 'LOW' };
    }
    if (diffDays <= 14) {
      return { stage: 'FIRST_OVERDUE_NOTICE', recommendedTemplateName: 'tpl_invoice_overdue_gentle', urgencyLevel: 'MEDIUM' };
    }
    if (diffDays <= 30) {
      return { stage: 'SECOND_OVERDUE_NOTICE', recommendedTemplateName: 'tpl_invoice_overdue_urgent', urgencyLevel: 'HIGH' };
    }
    if (diffDays <= 60) {
      return { stage: 'SUSPENSION_WARNING', recommendedTemplateName: 'tpl_service_suspension_warning', urgencyLevel: 'CRITICAL' };
    }
    return { stage: 'LEGAL_COLLECTIONS', recommendedTemplateName: 'tpl_collections_notice', urgencyLevel: 'CRITICAL' };
  }
}
