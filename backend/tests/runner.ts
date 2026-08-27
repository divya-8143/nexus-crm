import { runAuthTests } from './auth.test';
import { runCustomerTests } from './customer.test';
import { runDealTests } from './deals.test';
import { runHelpdeskTests } from './helpdesk.test';
import { runBillingTests } from './billing.test';
import { runAuditTests } from './audit.test';
import { runExtendedDomainTests } from './extended_domains.test';

async function runAllSuites() {
  console.log('====================================================');
  console.log('       NEXUS CRM ENTERPRISE TEST RUNNER             ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  const suites = [
    { name: 'Auth & RBAC Test Suite', fn: runAuthTests },
    { name: 'Customer 360 Lifecycle Test Suite', fn: runCustomerTests },
    { name: 'Sales Pipeline & Deals Test Suite', fn: runDealTests },
    { name: 'Helpdesk & SLA Engine Test Suite', fn: runHelpdeskTests },
    { name: 'Billing, Invoicing & Taxes Test Suite', fn: runBillingTests },
    { name: 'Audit & Compliance Ledger Test Suite', fn: runAuditTests },
    { name: 'Extended Domain & Algorithmic Test Suite (10 Scenarios)', fn: runExtendedDomainTests },
  ];

  for (const suite of suites) {
    try {
      console.log(`▶ Running: ${suite.name}...`);
      await suite.fn();
      console.log(`✔ [PASS] ${suite.name}\n`);
      passed++;
    } catch (err: any) {
      console.error(`✖ [FAIL] ${suite.name}: ${err.message}\n`);
      failed++;
    }
  }

  console.log('====================================================');
  console.log(`TOTAL SUITES: ${suites.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
}

runAllSuites();
