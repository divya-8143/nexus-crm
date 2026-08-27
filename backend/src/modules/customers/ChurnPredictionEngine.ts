import { Customer, Deal, SupportTicket } from '@nexus/shared';

export interface ChurnRiskFactor {
  category: 'ENGAGEMENT' | 'SUPPORT_TICKETS' | 'FINANCIAL' | 'CONTRACT';
  description: string;
  weightPenalty: number;
}

export interface CustomerChurnReport {
  customerId: string;
  customerName: string;
  overallHealthScore: number; // 0-100 (100 is optimal health)
  churnProbabilityPercent: number; // 0-100%
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: ChurnRiskFactor[];
  recommendedPlaybookActions: string[];
}

export class ChurnPredictionEngine {
  public static evaluateRisk(
    customer: Customer,
    recentDeals: Deal[],
    recentTickets: SupportTicket[],
    daysSinceLastInteraction: number
  ): CustomerChurnReport {
    let healthScore = 100;
    const factors: ChurnRiskFactor[] = [];
    const playbooks: string[] = [];

    // Factor 1: Inactivity & Communication Gap
    if (daysSinceLastInteraction > 60) {
      const penalty = Math.min(40, Math.floor(daysSinceLastInteraction / 3));
      healthScore -= penalty;
      factors.push({
        category: 'ENGAGEMENT',
        description: `No active communication recorded for ${daysSinceLastInteraction} days`,
        weightPenalty: penalty,
      });
      playbooks.push('Schedule an Executive Business Review (EBR) immediately');
    } else if (daysSinceLastInteraction > 30) {
      healthScore -= 15;
      factors.push({
        category: 'ENGAGEMENT',
        description: `Communication lull (${daysSinceLastInteraction} days inactive)`,
        weightPenalty: 15,
      });
      playbooks.push('Assign account manager to reach out with product adoption check-in');
    }

    // Factor 2: Support Ticket Distress
    const openUrgentTickets = recentTickets.filter(
      (t) => t.status !== 'CLOSED' && t.status !== 'RESOLVED' && (t.priority === 'URGENT' || t.priority === 'HIGH')
    );
    if (openUrgentTickets.length > 0) {
      const penalty = openUrgentTickets.length * 15;
      healthScore -= penalty;
      factors.push({
        category: 'SUPPORT_TICKETS',
        description: `${openUrgentTickets.length} open high/urgent priority support tickets`,
        weightPenalty: penalty,
      });
      playbooks.push('Escalate unresolved support tickets to Tier 3 Engineering Lead');
    }

    const breachedTickets = recentTickets.filter((t) => t.isSlaBreached);
    if (breachedTickets.length > 0) {
      const penalty = breachedTickets.length * 10;
      healthScore -= penalty;
      factors.push({
        category: 'SUPPORT_TICKETS',
        description: `${breachedTickets.length} SLA breaches experienced in recent interactions`,
        weightPenalty: penalty,
      });
      playbooks.push('Conduct SLA remediation review and issue service credit if warranted');
    }

    // Factor 3: Deal Velocity & Losses
    const lostDeals = recentDeals.filter((d) => d.stage === 'CLOSED_LOST');
    if (lostDeals.length > 1) {
      healthScore -= 20;
      factors.push({
        category: 'FINANCIAL',
        description: `Multiple lost expansion/renewal deals in pipeline (${lostDeals.length} lost)`,
        weightPenalty: 20,
      });
      playbooks.push('Revisit pricing model and competitive positioning with stakeholder');
    }

    // Normalization
    healthScore = Math.max(0, Math.min(100, healthScore));
    const churnProb = 100 - healthScore;

    let riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (churnProb >= 70) riskTier = 'CRITICAL';
    else if (churnProb >= 45) riskTier = 'HIGH';
    else if (churnProb >= 25) riskTier = 'MEDIUM';

    if (playbooks.length === 0) {
      playbooks.push('Maintain regular quarterly sync and share roadmap updates');
    }

    return {
      customerId: customer.id,
      customerName: customer.name,
      overallHealthScore: healthScore,
      churnProbabilityPercent: churnProb,
      riskTier,
      factors,
      recommendedPlaybookActions: playbooks,
    };
  }
}
