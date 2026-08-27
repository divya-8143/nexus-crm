# NexusCRM Enterprise Developer & Operations Runbook

## 1. Local Environment Setup
To run the NexusCRM monorepo locally:

```bash
# Clone the repository
git clone https://github.com/divya-8143/nexus-crm.git
cd nexus-crm

# Install dependencies across all workspaces (root, backend, frontend, shared)
npm install

# Start both frontend and backend concurrently in dev mode
npm run dev
```

## 2. Automated Test Suite Execution
Execute the comprehensive test suites:
```bash
npm run test
```

Test suites executed:
- `Auth & RBAC Test Suite` (Password policies, JWT validation, role-permission verification)
- `Customer 360 Lifecycle Test Suite` (Lead scoring, validation rules, deduplication)
- `Sales Pipeline & Deals Test Suite` (Weighted forecasting, stage duration tracking)
- `Helpdesk & SLA Engine Test Suite` (Business hours calculation, escalation watchdog)
- `Billing, Invoicing & Taxes Test Suite` (Multi-tier tax brackets, line item arithmetic)
- `Audit & Compliance Ledger Test Suite` (Cryptographic block verification, tamper detection)
- `Extended Domain & Algorithmic Test Suite` (Monte Carlo simulations, KYC/AML, HIPAA sanitization)

## 3. Database Management & Migrations
SQLite relational database engine (`database.sqlite`) auto-initializes on startup with all table schemas, foreign key constraints, and performance indexes.
