import { LeadScoringRuleCatalog } from '../src/modules/customers/LeadScoringRuleCatalog';
import { TerritoryRoutingEngine } from '../src/modules/customers/TerritoryRoutingEngine';
import { PriceBookService } from '../src/modules/billing/PriceBookService';
import { AccountsReceivableAgingEngine } from '../src/modules/billing/AccountsReceivableAgingEngine';
import { DocumentTemplateEngine } from '../src/modules/notifications/DocumentTemplateEngine';
import { GdprComplianceEngine } from '../src/modules/customers/GdprComplianceEngine';
import { HealthcareComplianceEngine } from '../src/modules/integrations/HealthcareDomain';
import { FinancialKycEngine } from '../src/modules/integrations/FinancialServicesDomain';
import { SaasExpansionScoringEngine } from '../src/modules/integrations/SaasPlgDomain';
import { MonteCarloForecastEngine } from '../src/modules/deals/MonteCarloForecastEngine';

export async function runExtendedDomainTests(): Promise<void> {
  console.log('--- Running Extended Domain Test Suites ---');

  // Test 1: Lead Scoring
  const leadEval = LeadScoringRuleCatalog.evaluateLead(
    { name: 'Global Finance', annualRevenue: 25000000 },
    { employeeCount: 1200, isCorporateEmail: true, contactTitle: 'Chief Information Officer' }
  );
  if (leadEval.finalScore < 70 || leadEval.grade !== 'A') {
    throw new Error(`Lead evaluation score failed: expected Grade A (>70), got ${leadEval.finalScore}`);
  }
  console.log('✔ Test 1: Lead Scoring Rule Catalog verified');

  // Test 2: Territory Routing
  const terrUsWest = TerritoryRoutingEngine.routeAccount('USA', 'CA');
  if (terrUsWest.id !== 'TERR_NA_WEST') {
    throw new Error(`Territory routing failed for California: got ${terrUsWest.id}`);
  }
  const terrEmea = TerritoryRoutingEngine.routeAccount('DEU');
  if (terrEmea.id !== 'TERR_EMEA') {
    throw new Error(`Territory routing failed for Germany: got ${terrEmea.id}`);
  }
  console.log('✔ Test 2: Multi-regional Territory Routing verified');

  // Test 3: Price Book & Discount Matrix
  const regularDisc = PriceBookService.validateDiscount('NX-ENT-USER-YR', 10.0);
  if (regularDisc.requiresApproval) {
    throw new Error('10% discount on Enterprise Seat should not require manager approval');
  }
  const extremeDisc = PriceBookService.validateDiscount('NX-ENT-USER-YR', 35.0);
  if (!extremeDisc.requiresApproval || extremeDisc.approverRole !== 'SUPER_ADMIN') {
    throw new Error('35% discount must require SuperAdmin approval');
  }
  console.log('✔ Test 3: Price Book & Discount Approval Matrix verified');

  // Test 4: AR Aging Calculation
  const aging = AccountsReceivableAgingEngine.calculateAging([
    { id: '1', totalAmount: 5000, dueDate: new Date(Date.now() - 10 * 86400000).toISOString(), status: 'SENT' } as any,
    { id: '2', totalAmount: 10000, dueDate: new Date(Date.now() - 45 * 86400000).toISOString(), status: 'SENT' } as any,
  ]);
  if (aging.days1To30Overdue !== 5000 || aging.days31To60Overdue !== 10000 || aging.totalReceivables !== 15000) {
    throw new Error('AR Aging calculation mismatch');
  }
  console.log('✔ Test 4: Accounts Receivable Aging Engine verified');

  // Test 5: Template Variable Interpolation
  const rendered = DocumentTemplateEngine.interpolate('Hello {{contact.name}}, Account #{{acc}}', {
    contact: { name: 'John Doe' },
    acc: '89102',
  });
  if (rendered !== 'Hello John Doe, Account #89102') {
    throw new Error(`Template interpolation failed, got: ${rendered}`);
  }
  console.log('✔ Test 5: Template Engine Variable Interpolation verified');

  // Test 6: GDPR Anonymization
  const redacted = GdprComplianceEngine.anonymizeCustomer({
    id: 'cust_test_999',
    name: 'Secret Corp',
    email: 'private@secret.com',
    billingAddress: { street1: '123 Main St', city: 'NY', state: 'NY', postalCode: '10001', country: 'USA' },
    shippingAddress: { street1: '123 Main St', city: 'NY', state: 'NY', postalCode: '10001', country: 'USA' },
  } as any);
  if (!redacted.email.includes('gdpr-redacted.local') || redacted.name.includes('Secret')) {
    throw new Error('GDPR Anonymization failed to redact customer identity');
  }
  console.log('✔ Test 6: GDPR Compliance & Data Privacy Erasure verified');

  // Test 7: Healthcare HIPAA Verification
  const validHipaa = HealthcareComplianceEngine.verifyHipaaConsent({
    hipaaConsentSignedAt: new Date().toISOString(),
  } as any);
  if (!validHipaa) throw new Error('HIPAA verification failed for current date');
  console.log('✔ Test 7: Healthcare HIPAA Consent Engine verified');

  // Test 8: Financial KYC/AML Risk Evaluation
  const amlEval = FinancialKycEngine.evaluateAmlRisk(
    { amlRiskScore: 20, totalAssetsUnderManagementUsd: 100000, accreditedInvestor: true, jurisdictionCountry: 'USA' } as any,
    80000 // 80% volume in 30 days
  );
  if (!amlEval.flags.some((f) => f.includes('velocity'))) {
    throw new Error('AML Evaluation should flag high velocity transaction');
  }
  console.log('✔ Test 8: Financial Wealth KYC & AML Risk Evaluation verified');

  // Test 9: SaaS PLG Expansion Scoring
  const saasExp = SaasExpansionScoringEngine.calculateExpansionReadiness({
    subscriptionPlan: 'STARTER',
    licensedSeats: 10,
    activeDailyUsers: 9,
    storageUsedGb: 120,
    apiRequestsCurrentMonth: 100000,
  } as any);
  if (!saasExp.isPql || saasExp.recommendedUpgradeTier !== 'PROFESSIONAL') {
    throw new Error('SaaS PLG scoring failed to identify Product Qualified Lead');
  }
  console.log('✔ Test 9: SaaS Product-Led Growth (PLG) Expansion Scoring verified');

  // Test 10: Monte Carlo Simulation Stability
  const sim = MonteCarloForecastEngine.runSimulation([
    { id: '1', title: 'Deal A', dealValue: 100000, winProbability: 50, stage: 'PROPOSAL' } as any,
  ], 500);
  if (sim.simulationRuns !== 500 || sim.meanForecast <= 0) {
    throw new Error('Monte Carlo simulation failed to complete runs');
  }
  console.log('✔ Test 10: Monte Carlo Sales Forecasting Simulation verified');
}
