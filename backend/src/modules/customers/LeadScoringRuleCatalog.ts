import { Customer } from '@nexus/shared';

export interface LeadScoreRule {
  id: string;
  name: string;
  category: 'DEMOGRAPHIC' | 'BEHAVIORAL' | 'FIRMOGRAPHIC' | 'TECHNOGRAPHIC';
  conditionField: string;
  operator: 'EQUALS' | 'CONTAINS' | 'GREATER_THAN' | 'IN_LIST';
  targetValue: any;
  scoreAdjustment: number;
  description: string;
}

export class LeadScoringRuleCatalog {
  public static rules: LeadScoreRule[] = [
    { id: 'R01', name: 'Enterprise Employee Count', category: 'FIRMOGRAPHIC', conditionField: 'employeeCount', operator: 'GREATER_THAN', targetValue: 500, scoreAdjustment: 25, description: 'Accounts with >500 employees demonstrate enterprise purchasing capacity' },
    { id: 'R02', name: 'Strategic Industry Vertical', category: 'FIRMOGRAPHIC', conditionField: 'industry', operator: 'IN_LIST', targetValue: ['Financial Services', 'Healthcare', 'Enterprise SaaS', 'Aerospace'], scoreAdjustment: 20, description: 'Core strategic target industries' },
    { id: 'R03', name: 'C-Level / VP Contact Assigned', category: 'DEMOGRAPHIC', conditionField: 'contactTitle', operator: 'CONTAINS', targetValue: 'Chief', scoreAdjustment: 20, description: 'Engagement with senior executive decision maker' },
    { id: 'R04', name: 'Director Level Contact', category: 'DEMOGRAPHIC', conditionField: 'contactTitle', operator: 'CONTAINS', targetValue: 'Director', scoreAdjustment: 15, description: 'Engagement with director level stakeholder' },
    { id: 'R05', name: 'Corporate Email Verified', category: 'DEMOGRAPHIC', conditionField: 'isCorporateEmail', operator: 'EQUALS', targetValue: true, scoreAdjustment: 10, description: 'Non-free webmail domain verified' },
    { id: 'R06', name: 'High Revenue Threshold', category: 'FIRMOGRAPHIC', conditionField: 'annualRevenue', operator: 'GREATER_THAN', targetValue: 10000000, scoreAdjustment: 30, description: 'Annual revenue exceeding $10M USD' },
    { id: 'R07', name: 'Mid Revenue Threshold', category: 'FIRMOGRAPHIC', conditionField: 'annualRevenue', operator: 'GREATER_THAN', targetValue: 2000000, scoreAdjustment: 15, description: 'Annual revenue exceeding $2M USD' },
    { id: 'R08', name: 'Pricing Page High Intent', category: 'BEHAVIORAL', conditionField: 'pricingViewsCount', operator: 'GREATER_THAN', targetValue: 3, scoreAdjustment: 15, description: 'Visited pricing page 3+ times in past 7 days' },
    { id: 'R09', name: 'Whitepaper / Case Study Download', category: 'BEHAVIORAL', conditionField: 'assetsDownloadedCount', operator: 'GREATER_THAN', targetValue: 1, scoreAdjustment: 10, description: 'Downloaded product architecture whitepaper' },
    { id: 'R10', name: 'Webinar Attendance', category: 'BEHAVIORAL', conditionField: 'attendedWebinar', operator: 'EQUALS', targetValue: true, scoreAdjustment: 15, description: 'Participated in live enterprise demo session' },
  ];

  public static evaluateLead(customer: Partial<Customer>, context: Record<string, any> = {}): {
    finalScore: number;
    grade: 'A' | 'B' | 'C' | 'D';
    appliedRules: Array<{ ruleName: string; points: number }>;
    isMqlQualified: boolean;
  } {
    let score = 0;
    const applied: Array<{ ruleName: string; points: number }> = [];

    const merged = { ...customer, ...context };

    for (const rule of this.rules) {
      const val = merged[rule.conditionField];
      let matches = false;

      switch (rule.operator) {
        case 'EQUALS':
          matches = val === rule.targetValue;
          break;
        case 'CONTAINS':
          matches = typeof val === 'string' && val.toLowerCase().includes(String(rule.targetValue).toLowerCase());
          break;
        case 'GREATER_THAN':
          matches = Number(val) > Number(rule.targetValue);
          break;
        case 'IN_LIST':
          matches = Array.isArray(rule.targetValue) && rule.targetValue.includes(val);
          break;
      }

      if (matches) {
        score += rule.scoreAdjustment;
        applied.push({ ruleName: rule.name, points: rule.scoreAdjustment });
      }
    }

    const finalScore = Math.min(100, Math.max(0, score));
    let grade: 'A' | 'B' | 'C' | 'D' = 'D';
    if (finalScore >= 80) grade = 'A';
    else if (finalScore >= 60) grade = 'B';
    else if (finalScore >= 40) grade = 'C';

    return {
      finalScore,
      grade,
      appliedRules: applied,
      isMqlQualified: finalScore >= 60,
    };
  }
}
