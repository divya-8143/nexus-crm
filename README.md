# NexusCRM | Enterprise Customer Relationship & Lifecycle Management Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Code Quality](https://img.shields.io/badge/LOC-50K%2B-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-purple.svg)]()

NexusCRM is an enterprise-ready Customer Management System built for high-volume customer lifecycle tracking, multi-stage sales pipelines, SLA-driven helpdesks, and multi-tier billing & invoicing.

---

## 🌟 Key Architecture Highlights

- **360° Customer Directory**: Full hierarchy tracking, custom fields, tags, and automated predictive lead scoring heuristics.
- **Sales Deals & Forecasting**: Drag-and-drop Kanban pipeline with real-time weighted probability and revenue projection.
- **Support & SLA Automation**: Ticket triage, automated breach timers, canned responses, and multi-channel intake.
- **Financial Billing Engine**: Line-item computation with tiered discounts, regional tax calculations, and PDF generation.
- **Enterprise RBAC**: Granular multi-tenant permission matrix (`SuperAdmin`, `Admin`, `SalesManager`, `SalesAgent`, `SupportAgent`, `ComplianceAuditor`).
- **Immutable Audit Ledger**: Tamper-evident change logs, state before/after diffing, and security compliance telemetry.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/divya-8143/nexus-crm.git
cd nexus-crm

# Install dependencies across all workspaces
npm install
```

### 2. Running in Development
```bash
# Start backend and frontend concurrently
npm run dev
```
- Backend API Gateway: `http://localhost:5000`
- Frontend Application: `http://localhost:3000`

### 3. Automated Test Suite Execution
```bash
npm run test
```

---

## 📁 Repository Structure

```
nexus-crm/
├── backend/               # Node.js / Express Clean Architecture Backend
│   ├── src/
│   │   ├── core/          # Database, Security, Events, Logger, Middleware
│   │   ├── modules/       # Auth, Customers, Deals, Helpdesk, Billing, Analytics, Audit
│   │   ├── app.ts         # Express Application setup
│   │   └── server.ts      # Bootstrap entrypoint
│   └── tests/             # Automated test suites & test runner
├── frontend/              # React 18, Vite & Tailwind CSS Client
│   ├── src/
│   │   ├── components/    # Design System & domain components
│   │   ├── pages/         # Dashboard, Customers, Deals, Helpdesk, Billing, Audit
│   │   ├── App.tsx        # App Shell
│   │   └── main.tsx       # Client entrypoint
├── shared/                # Universal TypeScript contracts, DTOs, & Validators
└── docs/                  # Comprehensive architecture & API specifications
```

---

## 🛡️ License
Released under the [MIT License](LICENSE).
