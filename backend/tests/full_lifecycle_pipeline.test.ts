import { CustomerService } from '../src/modules/customers/CustomerService';
import { DealService } from '../src/modules/deals/DealService';
import { TicketRepository } from '../src/modules/helpdesk/TicketRepository';
import { InvoiceRepository } from '../src/modules/billing/InvoiceRepository';
import { AuditTamperProofService } from '../src/modules/audit/AuditTamperProofService';
import { LeadScoringRuleCatalog } from '../src/modules/customers/LeadScoringRuleCatalog';

export async function runFullPipelineIntegrationTest(): Promise<void> {
  console.log('=== Executing Full Enterprise Lifecycle Integration Pipeline ===');

  const tenantId = 'tenant_pipeline_test';
  const actorId = 'usr_admin_01';

  // Step 1: Onboard Customer Account
  const customer = await CustomerService.createCustomer(tenantId, actorId, {
    name: 'Pipeline Apex Dynamics',
    email: 'contact@apex-pipeline.io',
    industry: 'Enterprise SaaS',
    annualRevenue: 12000000,
    lifecycleStage: 'LEAD',
    billingAddress: { street1: '100 Tech Blvd', city: 'SF', state: 'CA', postalCode: '94105', country: 'USA' },
    shippingAddress: { street1: '100 Tech Blvd', city: 'SF', state: 'CA', postalCode: '94105', country: 'USA' },
    tags: ['PIPELINE_TEST'],
    currency: 'USD',
  });

  if (!customer.id || !customer.accountNumber) {
    throw new Error('Step 1 Failed: Customer account initialization incomplete');
  }
  console.log(`✔ Step 1 Passed: Customer ${customer.accountNumber} created successfully`);

  // Step 2: Evaluate Predictive Lead Score
  const leadResult = LeadScoringRuleCatalog.evaluateLead(customer, {
    employeeCount: 650,
    isCorporateEmail: true,
    contactTitle: 'VP of Engineering',
  });

  if (!leadResult.isMqlQualified) {
    throw new Error('Step 2 Failed: Expected enterprise profile to qualify as MQL');
  }
  console.log(`✔ Step 2 Passed: Lead scored at ${leadResult.finalScore}/100 (Grade ${leadResult.grade})`);

  // Step 3: Transition Customer to Opportunity & Create Deal
  const deal = await DealService.createDeal(tenantId, actorId, {
    customerId: customer.id,
    title: 'Apex Enterprise Software License (Annual)',
    dealValue: 120000,
    currency: 'USD',
    stage: 'DISCOVERY',
    winProbability: 20,
    expectedCloseDate: '2026-11-30',
  });

  if (deal.dealValue !== 120000) {
    throw new Error('Step 3 Failed: Deal value mismatch');
  }
  console.log(`✔ Step 3 Passed: Opportunity deal ${deal.id} created`);

  // Step 4: Advance Deal Stage to Closed Won
  const updatedDeal = await DealService.updateStage(deal.id, tenantId, actorId, 'CLOSED_WON');
  if (updatedDeal.stage !== 'CLOSED_WON' || updatedDeal.winProbability !== 100) {
    throw new Error('Step 4 Failed: Deal transition to CLOSED_WON failed');
  }
  console.log('✔ Step 4 Passed: Deal closed won successfully');

  // Step 5: Generate Billing Invoice
  const invoice = await InvoiceRepository.create({
    tenantId,
    customerId: customer.id,
    currency: 'USD',
    lineItems: [
      { id: 'li_1', description: 'Enterprise License', quantity: 100, unitPrice: 1200, discountPercent: 0, taxRatePercent: 8, lineTotal: 129600 },
    ],
  });

  if (!invoice.invoiceNumber || invoice.totalAmount <= 0) {
    throw new Error('Step 5 Failed: Invoice generation calculation failure');
  }
  console.log(`✔ Step 5 Passed: Invoice ${invoice.invoiceNumber} generated for $${invoice.totalAmount}`);

  // Step 6: Log Support SLA Ticket
  const ticket = await TicketRepository.create({
    tenantId,
    customerId: customer.id,
    subject: 'Initial SSO SAML Provisioning Request',
    description: 'Setup single sign-on metadata exchange.',
    priority: 'HIGH',
    status: 'OPEN',
  });

  if (!ticket.ticketNumber || ticket.isSlaBreached) {
    throw new Error('Step 6 Failed: Ticket SLA assignment failure');
  }
  console.log(`✔ Step 6 Passed: Support Ticket ${ticket.ticketNumber} logged under SLA`);

  // Step 7: Validate Cryptographic Audit Chain
  const mockChain = [
    { entry: { id: '1', tenantId, actionType: 'CREATE', entityType: 'CUSTOMER', entityId: customer.id, createdAt: '2026-08-01' } as any, hash: '' },
  ];
  mockChain[0].hash = AuditTamperProofService.computeEntryHash(mockChain[0].entry);
  const chainIntegrity = AuditTamperProofService.verifyChainIntegrity(mockChain);

  if (!chainIntegrity.isTamperFree) {
    throw new Error('Step 7 Failed: Cryptographic audit verification detected corruption');
  }
  console.log('✔ Step 7 Passed: Cryptographic audit chain verified');

  console.log('=== All 7 Enterprise Lifecycle Pipeline Steps Passed Successfully ===\n');
}
