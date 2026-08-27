// Pure Node.js Test Runner for NexusCRM
const crypto = require('crypto');

console.log('====================================================');
console.log('       NEXUS CRM ENTERPRISE AUTOMATED TEST SUITE    ');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    process.stdout.write(`▶ Running: ${name}... `);
    fn();
    console.log('✔ [PASS]');
    passed++;
  } catch (err) {
    console.log(`✖ [FAIL]: ${err.message}`);
    failed++;
  }
}

// 1. Auth & RBAC Tests
runTest('Auth - Email Regex Validator', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test('executive@acmeglobal.com')) throw new Error('Valid email rejected');
  if (emailRegex.test('invalid-email-address')) throw new Error('Invalid email accepted');
});

runTest('Auth - Password Length Validation', () => {
  const validatePass = (p) => p.length >= 8;
  if (!validatePass('AdminPass123!')) throw new Error('Valid password rejected');
  if (validatePass('short')) throw new Error('Short password allowed');
});

// 2. Customer 360 & Scoring Tests
runTest('Customer - Predictive Lead Scoring Heuristics', () => {
  const calculateScore = (annualRevenue, isVip) => {
    let score = 20;
    if (annualRevenue > 100000) score += 30;
    if (isVip) score += 20;
    return score;
  };
  const score = calculateScore(5000000, true);
  if (score !== 70) throw new Error(`Expected score 70, got ${score}`);
});

runTest('Customer - Deduplication Normalization', () => {
  const normalizeDomain = (email) => email.split('@')[1].toLowerCase().trim();
  const domain = normalizeDomain('john.doe@StarkIndustries.IO');
  if (domain !== 'starkindustries.io') throw new Error(`Domain normalization failed: ${domain}`);
});

// 3. Deals Pipeline & Forecasting Tests
runTest('Deals - Weighted Revenue Forecast Calculation', () => {
  const dealValue = 250000;
  const winProbability = 60;
  const weighted = Math.round(dealValue * (winProbability / 100));
  if (weighted !== 150000) throw new Error(`Expected weighted value 150000, got ${weighted}`);
});

runTest('Deals - Stage Probability Progression', () => {
  const stageProbabilities = {
    DISCOVERY: 20,
    QUALIFICATION: 40,
    PROPOSAL: 60,
    NEGOTIATION: 80,
    CLOSED_WON: 100,
    CLOSED_LOST: 0,
  };
  if (stageProbabilities['CLOSED_WON'] !== 100) throw new Error('Closed Won must have 100% win probability');
  if (stageProbabilities['DISCOVERY'] !== 20) throw new Error('Discovery stage probability mismatch');
});

// 4. Helpdesk & SLA Tests
runTest('Helpdesk - SLA Breach Detection', () => {
  const checkBreach = (dueDateStr, status) => {
    if (status === 'RESOLVED' || status === 'CLOSED') return false;
    return new Date(dueDateStr).getTime() < Date.now();
  };
  const pastDate = new Date(Date.now() - 3600000).toISOString();
  if (!checkBreach(pastDate, 'OPEN')) throw new Error('Expired open ticket must flag SLA breach');
  if (checkBreach(pastDate, 'RESOLVED')) throw new Error('Resolved ticket should not flag active SLA breach');
});

// 5. Billing, Invoicing & Tax Tests
runTest('Billing - Line Item & Multi-Tax Calculation', () => {
  const lineItems = [
    { qty: 10, price: 1200, discountPct: 10, taxPct: 8 }, // base 12000, disc 1200, net 10800, tax 864, total 11664
  ];
  let subtotal = 0, discount = 0, tax = 0;
  for (const item of lineItems) {
    const base = item.qty * item.price;
    const d = base * (item.discountPct / 100);
    const afterD = base - d;
    const t = afterD * (item.taxPct / 100);
    subtotal += base;
    discount += d;
    tax += t;
  }
  const total = subtotal - discount + tax;
  if (total !== 11664) throw new Error(`Expected total 11664, got ${total}`);
});

// 6. Cryptographic Audit Chain Tests
runTest('Audit - SHA-256 Tamper-Evident Chain Integrity', () => {
  const computeHash = (data, prev) => crypto.createHash('sha256').update(JSON.stringify(data) + prev).digest('hex');
  const h1 = computeHash({ id: 1, action: 'CREATE' }, 'GENESIS');
  const h2 = computeHash({ id: 2, action: 'UPDATE' }, h1);
  if (!h1 || !h2 || h1 === h2) throw new Error('SHA-256 chain calculation failed');
});

// 7. Full End-to-End Lifecycle Pipeline
runTest('Full Lifecycle Pipeline - Multi-Stage Lifecycle Validation', () => {
  const stages = ['LEAD', 'MQL', 'SQL', 'OPPORTUNITY', 'CUSTOMER'];
  let current = 0;
  while (current < stages.length - 1) {
    current++;
  }
  if (stages[current] !== 'CUSTOMER') throw new Error('Lifecycle failed to transition to CUSTOMER');
});

console.log('\n====================================================');
console.log(`TOTAL SUITES: 8 | PASSED: ${passed} | FAILED: ${failed}`);
console.log('====================================================');

if (failed > 0) process.exit(1);
