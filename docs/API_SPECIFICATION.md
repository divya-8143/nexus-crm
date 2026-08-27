# NexusCRM REST API Specification

### Authentication
- `POST /api/v1/auth/login` - Authenticate user & return JWT session token.
- `POST /api/v1/auth/register` - Create new user account within a tenant.
- `GET /api/v1/auth/me` - Fetch authenticated user profile and permissions.

### Customer Management (360°)
- `GET /api/v1/customers` - Paginated customer listing with advanced filtering.
- `POST /api/v1/customers` - Create new enterprise customer account.
- `GET /api/v1/customers/:id` - Fetch 360-degree customer profile.
- `PUT /api/v1/customers/:id` - Update customer attributes.
- `DELETE /api/v1/customers/:id` - Soft or hard delete customer.

### Deals & Sales Pipeline
- `GET /api/v1/deals/pipeline` - Fetch Kanban pipeline breakdown by stage.
- `POST /api/v1/deals` - Create new sales deal.
- `PATCH /api/v1/deals/:id/stage` - Transition deal across pipeline stages.

### Helpdesk & SLA Engine
- `GET /api/v1/helpdesk` - List support tickets with SLA countdown telemetry.
- `POST /api/v1/helpdesk` - Create support ticket.
- `PATCH /api/v1/helpdesk/:id/status` - Transition ticket status.

### Billing & Invoicing
- `GET /api/v1/billing` - List invoices and balances.
- `POST /api/v1/billing` - Generate new invoice with automated tax calculations.

### Executive Analytics & Audit
- `GET /api/v1/analytics/dashboard` - Real-time executive KPIs and ARR/MRR summaries.
- `GET /api/v1/audit` - Retrieve tamper-evident audit logs.
