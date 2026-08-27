export interface WealthAccount {
  id: string;
  accountNumber: string;
  clientLegalName: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'REJECTED';
  kycLastVerifiedAt?: string;
  amlRiskScore: number; // 0-100 (higher is riskier)
  accreditedInvestor: boolean;
  totalAssetsUnderManagementUsd: number;
  portfolioRiskProfile: 'CONSERVATIVE' | 'MODERATE' | 'GROWTH' | 'AGGRESSIVE';
  assignedWealthAdvisorId: string;
  jurisdictionCountry: string;
  fatcaCompliant: boolean;
}

export class FinancialKycEngine {
  public static evaluateAmlRisk(account: WealthAccount, transactionVolume30Days: number): {
    riskTier: 'LOW' | 'MEDIUM' | 'HIGH';
    requiresEnhancedDueDiligence: boolean;
    flags: string[];
  } {
    const flags: string[] = [];
    let riskScore = account.amlRiskScore;

    if (transactionVolume30Days > account.totalAssetsUnderManagementUsd * 0.5) {
      riskScore += 25;
      flags.push('Unusually high 30-day velocity relative to AUM');
    }

    if (!account.accreditedInvestor && account.totalAssetsUnderManagementUsd > 1000000) {
      flags.push('Non-accredited profile with high AUM balance');
    }

    if (['HIGH_RISK_JURISDICTION_1', 'HIGH_RISK_JURISDICTION_2'].includes(account.jurisdictionCountry)) {
      riskScore += 40;
      flags.push('High-risk foreign jurisdiction');
    }

    const tier = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW';

    return {
      riskTier: tier,
      requiresEnhancedDueDiligence: tier === 'HIGH' || flags.length >= 2,
      flags,
    };
  }
}
