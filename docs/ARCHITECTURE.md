# NexusCRM System Architecture & Technical Specifications

## 1. Architectural Philosophy
NexusCRM adopts a Clean Modular Architecture with strict domain segregation, dependency inversion, and contract-driven API interfaces between the backend micro-modules and the frontend client.

```
┌─────────────────────────────────────────────────────────────┐
│                    React 18 Frontend Shell                  │
├─────────────────────────────────────────────────────────────┤
│                 Shared DTOs & Validation Layer              │
├─────────────────────────────────────────────────────────────┤
│                    Express API Gateway                      │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Auth & RBAC    │  Customer 360   │  Deals & Forecasting    │
├─────────────────┼─────────────────┼─────────────────────────┤
│  Helpdesk & SLA │  Billing & Tax  │  Audit & Telemetry      │
├─────────────────┴─────────────────┴─────────────────────────┤
│                   Data Persistence (SQLite/PostgreSQL)      │
└─────────────────────────────────────────────────────────────┘
```

## 2. Security & Compliance
- **Zero Secrets Policy**: No hardcoded API keys, passwords, or tenant secrets in codebase.
- **JWT Rotation & RBAC Guard**: Strict role-based middleware guards all mutating endpoints.
- **Audit Trails**: Every mutation event publishes to an asynchronous event bus that records immutable before/after snapshots.
