import { DealRepository } from '../src/modules/deals/DealRepository';

export async function runDealTests(): Promise<void> {
  // Test 1: Weighted Value computation
  const dealDomain = DealRepository.mapToDomain({
    id: 'deal_1',
    tenant_id: 'tenant_1',
    customer_id: 'cust_1',
    title: 'Enterprise License',
    deal_value: 100000,
    currency: 'USD',
    stage: 'PROPOSAL',
    win_probability: 60,
    expected_close_date: '2026-09-30',
    actual_close_date: null,
    assigned_rep_id: null,
    pipeline_type: 'STANDARD',
    loss_reason: null,
    custom_metrics_json: '{}',
    created_at: '2026-08-01',
    updated_at: '2026-08-01',
  });

  if (dealDomain.weightedValue !== 60000) {
    throw new Error(`Expected weighted value to be 60000, got ${dealDomain.weightedValue}`);
  }
}
