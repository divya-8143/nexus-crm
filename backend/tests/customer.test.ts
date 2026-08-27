import { CustomerValidator } from '@nexus/shared';
import { CustomerService } from '../src/modules/customers/CustomerService';

export async function runCustomerTests(): Promise<void> {
  // Test 1: Customer Validation Rule
  const validation = CustomerValidator.validateCustomer({
    name: 'A', // Too short
    email: 'bad-email',
  });
  if (validation.isValid) throw new Error('CustomerValidator should reject invalid name/email');
  if (!validation.errors.name || !validation.errors.email) throw new Error('Missing specific validation error keys');

  // Test 2: Lead Scoring Heuristic
  const score = await CustomerService.calculateLeadScore({
    id: 'test_1',
    tenantId: 'tenant_1',
    accountNumber: 'ACC-123',
    name: 'Big Corp',
    email: 'corp@big.com',
    annualRevenue: 500000,
    lifecycleStage: 'LEAD',
    leadScore: 0,
    currency: 'USD',
    billingAddress: {} as any,
    shippingAddress: {} as any,
    customFields: {},
    tags: ['ENTERPRISE'],
    isVip: true,
    status: 'ACTIVE',
    createdAt: '',
    updatedAt: '',
  });

  if (score < 50) throw new Error(`Expected high lead score for enterprise VIP account, got ${score}`);
}
