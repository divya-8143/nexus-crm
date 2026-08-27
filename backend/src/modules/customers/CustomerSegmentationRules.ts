export interface CustomerSegmentDefinition {
  id: string;
  name: string;
  description: string;
  targetCriteria: {
    minRevenue?: number;
    maxRevenue?: number;
    lifecycleStages?: string[];
    industries?: string[];
    isVipRequired?: boolean;
    requiredTags?: string[];
  };
  recommendedOutreachCadenceDays: number;
  assignedTier: 'TIER_1_STRATEGIC' | 'TIER_2_CORE' | 'TIER_3_SCALE' | 'TIER_4_AUTOMATED';
}

export const ENTERPRISE_SEGMENTATION_RULES: CustomerSegmentDefinition[] = [
  { id: 'SEG_01', name: 'Strategic Fortune 500 Enterprise', description: 'Accounts with revenue >$50M requiring white-glove executive sponsorship', targetCriteria: { minRevenue: 50000000, isVipRequired: true }, recommendedOutreachCadenceDays: 7, assignedTier: 'TIER_1_STRATEGIC' },
  { id: 'SEG_02', name: 'High-Growth Tech Scale-ups', description: 'Technology accounts with active product-led growth expansion', targetCriteria: { minRevenue: 10000000, industries: ['Enterprise SaaS', 'Artificial Intelligence', 'Cybersecurity'] }, recommendedOutreachCadenceDays: 14, assignedTier: 'TIER_2_CORE' },
  { id: 'SEG_03', name: 'Regulated Healthcare & Life Sciences', description: 'Healthcare institutions requiring HIPAA compliance oversight', targetCriteria: { industries: ['Healthcare & Life Sciences', 'Healthcare Provider', 'Pharma'] }, recommendedOutreachCadenceDays: 14, assignedTier: 'TIER_2_CORE' },
  { id: 'SEG_04', name: 'Financial Wealth & Institutional Banking', description: 'Banking and asset management entities with strict AML requirements', targetCriteria: { industries: ['Financial Services', 'Banking & Securities', 'FinTech'] }, recommendedOutreachCadenceDays: 10, assignedTier: 'TIER_1_STRATEGIC' },
  { id: 'SEG_05', name: 'At-Risk / High Churn Probability Accounts', description: 'Accounts exhibiting churn indicators or low CSAT ratings', targetCriteria: { requiredTags: ['AT_RISK', 'CHURN_WARNING'] }, recommendedOutreachCadenceDays: 3, assignedTier: 'TIER_1_STRATEGIC' },
  { id: 'SEG_06', name: 'Standard Mid-Market Commercial', description: 'Standard accounts between $2M and $10M annual revenue', targetCriteria: { minRevenue: 2000000, maxRevenue: 10000000 }, recommendedOutreachCadenceDays: 30, assignedTier: 'TIER_3_SCALE' },
  { id: 'SEG_07', name: 'Emerging Inbound Leads', description: 'Early lifecycle stage leads requiring marketing qualification', targetCriteria: { lifecycleStages: ['LEAD', 'MQL'] }, recommendedOutreachCadenceDays: 3, assignedTier: 'TIER_4_AUTOMATED' },
  { id: 'SEG_08', name: 'Advocate & Reference Customers', description: 'High NPS customers willing to serve as public case studies', targetCriteria: { lifecycleStages: ['CUSTOMER'], requiredTags: ['ADVOCATE', 'CASE_STUDY'] }, recommendedOutreachCadenceDays: 45, assignedTier: 'TIER_2_CORE' },
];
