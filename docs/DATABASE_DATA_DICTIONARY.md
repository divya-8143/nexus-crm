# NexusCRM Enterprise Relational Database Data Dictionary

Comprehensive architectural catalog of relational tables, constraints, indexes, foreign keys, and audit schemas.

---

### Table: `tenants`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Unique Tenant Identifier |
| `name` | VARCHAR(255) | NO | - | Organization Legal Entity Name |
| `domain` | VARCHAR(255) | NO | UNIQUE | Custom Domain or Subdomain |
| `plan_tier` | VARCHAR(50) | NO | 'ENTERPRISE' | Subscription Tier (STARTER, PRO, ENTERPRISE) |
| `settings_json` | TEXT | NO | '{}' | Serialized tenant configuration |
| `is_active` | INTEGER | NO | 1 | Boolean active status flag |
| `created_at` | DATETIME | NO | CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | DATETIME | NO | CURRENT_TIMESTAMP | Last modification timestamp |

---

### Table: `users`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Unique User Identifier |
| `tenant_id` | VARCHAR(64) | NO | FK (tenants.id) | Tenant Partition Identifier |
| `email` | VARCHAR(255) | NO | UNIQUE | Primary Authentication Email |
| `password_hash` | VARCHAR(255) | NO | - | Bcrypt hashed secret |
| `first_name` | VARCHAR(100) | NO | - | User Given Name |
| `last_name` | VARCHAR(100) | NO | - | User Family Name |
| `role` | VARCHAR(50) | NO | 'SALES_AGENT' | RBAC Role Identifier |
| `department` | VARCHAR(100) | YES | NULL | Department or Organizational Unit |
| `is_active` | INTEGER | NO | 1 | Active user flag |
| `two_factor_enabled` | INTEGER | NO | 0 | 2FA TOTP activation flag |

---

### Table: `customers`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Unique Customer Account UUID |
| `tenant_id` | VARCHAR(64) | NO | FK (tenants.id) | Multi-tenant partition ID |
| `account_number`| VARCHAR(64) | NO | UNIQUE | Formatted Account ID (ACC-XXXXXX) |
| `name` | VARCHAR(255) | NO | - | Account / Customer Trade Name |
| `company_name` | VARCHAR(255) | YES | NULL | Registered Corporate Legal Entity |
| `industry` | VARCHAR(100) | YES | NULL | Industry Vertical Taxonomy |
| `email` | VARCHAR(255) | NO | - | Primary Account Corporate Email |
| `phone` | VARCHAR(50) | YES | NULL | Corporate Telephone Number |
| `website` | VARCHAR(255) | YES | NULL | Corporate Web URL |
| `lifecycle_stage`| VARCHAR(50) | NO | 'LEAD' | Lifecycle State Machine Stage |
| `lead_score` | INTEGER | NO | 0 | Predictive Lead Score (0-100) |
| `annual_revenue`| REAL | NO | 0.0 | Estimated Annual Revenue (USD) |
| `currency` | VARCHAR(10) | NO | 'USD' | ISO Currency Code |
| `assigned_agent_id`| VARCHAR(64)| YES | FK (users.id) | Account Executive / Representative |
| `billing_address_json`| TEXT | NO | '{}' | Serialized Structured Address |
| `shipping_address_json`| TEXT | NO | '{}' | Serialized Structured Address |
| `custom_fields_json`| TEXT | NO | '{}' | Dynamic Custom Field Attributes |
| `tags_json` | TEXT | NO | '[]' | Tag array for filtering |
| `is_vip` | INTEGER | NO | 0 | VIP High-Touch Indicator Flag |
| `status` | VARCHAR(50) | NO | 'ACTIVE' | Lifecycle Status (ACTIVE, ARCHIVED) |

---

### Table: `deals`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Deal Opportunity Identifier |
| `tenant_id` | VARCHAR(64) | NO | FK (tenants.id) | Multi-tenant Partition ID |
| `customer_id` | VARCHAR(64) | NO | FK (customers.id)| Target Customer Reference |
| `title` | VARCHAR(255) | NO | - | Opportunity Title Summary |
| `deal_value` | REAL | NO | 0.0 | Gross Deal Value Amount |
| `currency` | VARCHAR(10) | NO | 'USD' | ISO Currency Code |
| `stage` | VARCHAR(50) | NO | 'DISCOVERY' | Pipeline Stage (DISCOVERY, PROPOSAL, WON) |
| `win_probability`| INTEGER | NO | 20 | Probability Percentage (0-100) |
| `expected_close_date`| DATE | NO | - | Forecasted Close Date |
| `assigned_rep_id`| VARCHAR(64)| YES | FK (users.id) | Assigned Sales Executive |

---

### Table: `support_tickets`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Ticket UUID |
| `tenant_id` | VARCHAR(64) | NO | FK (tenants.id) | Multi-tenant Partition ID |
| `customer_id` | VARCHAR(64) | NO | FK (customers.id)| Customer Account ID |
| `ticket_number`| VARCHAR(64) | NO | UNIQUE | Ticket Number (TICK-XXXXX) |
| `subject` | VARCHAR(255) | NO | - | Issue Subject Heading |
| `description` | TEXT | NO | - | Comprehensive Diagnostic Details |
| `priority` | VARCHAR(20) | NO | 'MEDIUM' | Priority (LOW, MEDIUM, HIGH, URGENT) |
| `status` | VARCHAR(50) | NO | 'OPEN' | Ticket Status (OPEN, IN_PROGRESS, RESOLVED) |
| `channel` | VARCHAR(50) | NO | 'WEB' | Intake Channel (WEB, EMAIL, API, PHONE) |
| `sla_due_date` | DATETIME | NO | - | Calculated SLA Breach Timestamp |
| `is_sla_breached`| INTEGER | NO | 0 | Flag indicating SLA Breach occurrence |
| `satisfaction_rating`| INTEGER | YES | NULL | CSAT Survey Rating (1-5) |

---

### Table: `invoices`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Unique Invoice UUID |
| `tenant_id` | VARCHAR(64) | NO | FK (tenants.id) | Multi-tenant Partition ID |
| `customer_id` | VARCHAR(64) | NO | FK (customers.id)| Customer Account ID |
| `invoice_number`| VARCHAR(100)| NO | UNIQUE | Formatted Invoice Number (INV-YYYY-XXXX) |
| `status` | VARCHAR(50) | NO | 'DRAFT' | Invoice Status (DRAFT, SENT, PAID, OVERDUE) |
| `issue_date` | DATE | NO | - | Issuance Date |
| `due_date` | DATE | NO | - | Payment Due Date |
| `subtotal` | REAL | NO | 0.0 | Gross Sum of Line Items |
| `tax_amount` | REAL | NO | 0.0 | Calculated Regional Tax |
| `discount_amount`| REAL | NO | 0.0 | Applied Promotional Discount |
| `total_amount` | REAL | NO | 0.0 | Net Receivable Total |
| `currency` | VARCHAR(10) | NO | 'USD' | ISO Currency Code |
| `line_items_json`| TEXT | NO | '[]' | Serialized Line Item Array |
| `payment_terms`| VARCHAR(50) | NO | 'NET_30' | Payment Terms (NET_15, NET_30, NET_60) |

---

### Table: `audit_logs`
| Column Name | Data Type | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(64) | NO | PK | Audit Entry UUID |
| `tenant_id` | VARCHAR(64) | NO | - | Multi-tenant Partition ID |
| `actor_user_id`| VARCHAR(64) | YES | NULL | User Performing the Action |
| `actor_email` | VARCHAR(255) | YES | NULL | Actor Email Snapshot |
| `action_type` | VARCHAR(50) | NO | - | Action (CREATE, UPDATE, DELETE, LOGIN) |
| `entity_type` | VARCHAR(50) | NO | - | Entity Type (CUSTOMER, DEAL, TICKET) |
| `entity_id` | VARCHAR(64) | NO | - | Entity Instance ID |
| `ip_address` | VARCHAR(50) | YES | NULL | Client IP Address |
| `before_state_json`| TEXT | YES | NULL | JSON Snapshot Before Mutation |
| `after_state_json`| TEXT | YES | NULL | JSON Snapshot After Mutation |
| `created_at` | DATETIME | NO | CURRENT_TIMESTAMP | Event Log Timestamp |
