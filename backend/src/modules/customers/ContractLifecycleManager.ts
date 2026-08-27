export interface CustomerContract {
  id: string;
  tenantId: string;
  customerId: string;
  contractNumber: string;
  title: string;
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED' | 'RENEWED';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  renewalNoticeDays: number;
  totalContractValueUsd: number;
  annualRecurringRevenueUsd: number;
  paymentTerms: string;
  signedDate?: string;
  signerName?: string;
  signerEmail?: string;
}

export class ContractLifecycleManager {
  public static evaluateRenewalStatus(contract: CustomerContract): {
    isDueForRenewal: boolean;
    daysUntilExpiration: number;
    urgency: 'NONE' | 'UPCOMING' | 'URGENT' | 'EXPIRED';
  } {
    const now = new Date().getTime();
    const endMs = new Date(contract.endDate).getTime();
    const daysUntilExp = Math.floor((endMs - now) / (1000 * 60 * 60 * 24));

    if (daysUntilExp < 0) {
      return { isDueForRenewal: false, daysUntilExpiration: daysUntilExp, urgency: 'EXPIRED' };
    }

    if (daysUntilExp <= contract.renewalNoticeDays) {
      const urgency = daysUntilExp <= 14 ? 'URGENT' : 'UPCOMING';
      return { isDueForRenewal: true, daysUntilExpiration: daysUntilExp, urgency };
    }

    return { isDueForRenewal: false, daysUntilExpiration: daysUntilExp, urgency: 'NONE' };
  }
}
