export interface SaasProductTelemetry {
  tenantId: string;
  organizationName: string;
  subscriptionPlan: 'FREE_TRIAL' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  licensedSeats: number;
  activeDailyUsers: number;
  monthlyActiveUsers: number;
  storageUsedGb: number;
  apiRequestsCurrentMonth: number;
  featureFlagUsage: Record<string, number>;
  expansionIntentScorePercent: number;
  contractRenewalDate: string;
}

export class SaasExpansionScoringEngine {
  public static calculateExpansionReadiness(telemetry: SaasProductTelemetry): {
    isPql: boolean; // Product Qualified Lead
    score: number;
    recommendedUpgradeTier?: string;
    triggers: string[];
  } {
    let score = 0;
    const triggers: string[] = [];

    const seatUtilization = (telemetry.activeDailyUsers / telemetry.licensedSeats) * 100;
    if (seatUtilization >= 85) {
      score += 35;
      triggers.push(`High seat utilization (${Math.round(seatUtilization)}%)`);
    }

    if (telemetry.apiRequestsCurrentMonth > 500000 && telemetry.subscriptionPlan !== 'ENTERPRISE') {
      score += 30;
      triggers.push('High API throughput exceeding starter thresholds');
    }

    if (telemetry.storageUsedGb > 100 && telemetry.subscriptionPlan === 'STARTER') {
      score += 25;
      triggers.push('Storage capacity near plan ceiling');
    }

    const isPql = score >= 50;
    let recommendedTier: string | undefined;
    if (telemetry.subscriptionPlan === 'FREE_TRIAL' && isPql) recommendedTier = 'PROFESSIONAL';
    else if (telemetry.subscriptionPlan === 'STARTER' && isPql) recommendedTier = 'PROFESSIONAL';
    else if (telemetry.subscriptionPlan === 'PROFESSIONAL' && isPql) recommendedTier = 'ENTERPRISE';

    return {
      isPql,
      score: Math.min(100, score),
      recommendedUpgradeTier: recommendedTier,
      triggers,
    };
  }
}
