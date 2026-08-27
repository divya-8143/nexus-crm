export interface CommissionTier {
  quotaThresholdPercentage: number;
  payoutRatePercentage: number;
}

export class SalesCommissionEngine {
  public static defaultTiers: CommissionTier[] = [
    { quotaThresholdPercentage: 0, payoutRatePercentage: 5.0 },
    { quotaThresholdPercentage: 80, payoutRatePercentage: 8.0 },
    { quotaThresholdPercentage: 100, payoutRatePercentage: 12.0 },
    { quotaThresholdPercentage: 120, payoutRatePercentage: 18.0 },
  ];

  public static calculateCommission(
    totalClosedWonRevenue: number,
    assignedQuota: number,
    tiers: CommissionTier[] = this.defaultTiers
  ): {
    quotaAttainmentPercent: number;
    totalCommissionEarned: number;
    effectiveCommissionRatePercent: number;
    acceleratorBonusApplied: boolean;
  } {
    if (assignedQuota <= 0) {
      return {
        quotaAttainmentPercent: 100,
        totalCommissionEarned: totalClosedWonRevenue * 0.05,
        effectiveCommissionRatePercent: 5.0,
        acceleratorBonusApplied: false,
      };
    }

    const attainment = (totalClosedWonRevenue / assignedQuota) * 100;
    const sortedTiers = [...tiers].sort((a, b) => b.quotaThresholdPercentage - a.quotaThresholdPercentage);

    let applicableRate = 5.0;
    for (const tier of sortedTiers) {
      if (attainment >= tier.quotaThresholdPercentage) {
        applicableRate = tier.payoutRatePercentage;
        break;
      }
    }

    const commissionEarned = totalClosedWonRevenue * (applicableRate / 100);

    return {
      quotaAttainmentPercent: Math.round(attainment * 10) / 10,
      totalCommissionEarned: Math.round(commissionEarned * 100) / 100,
      effectiveCommissionRatePercent: applicableRate,
      acceleratorBonusApplied: attainment >= 100,
    };
  }
}
