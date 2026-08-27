-- =========================================================================
-- NEXUS CRM ENTERPRISE RELATIONAL SCHEMA
-- Multi-Tenant, Role-Based Access Control, Customer 360, Helpdesk, Billing
-- =========================================================================

-- 1. Tenants & Organizations
CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    domain TEXT UNIQUE NOT NULL,
    plan_tier TEXT DEFAULT 'ENTERPRISE',
    settings_json TEXT DEFAULT '{}',
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users & Authentication
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'SALES_AGENT',
    department TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    is_active INTEGER DEFAULT 1,
    two_factor_enabled INTEGER DEFAULT 0,
    two_factor_secret TEXT,
    last_login_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- 3. Customers & Accounts (Customer 360)
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    account_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    company_name TEXT,
    industry TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    lifecycle_stage TEXT DEFAULT 'LEAD',
    lead_score INTEGER DEFAULT 0,
    annual_revenue REAL DEFAULT 0.0,
    currency TEXT DEFAULT 'USD',
    assigned_agent_id TEXT,
    billing_address_json TEXT DEFAULT '{}',
    shipping_address_json TEXT DEFAULT '{}',
    custom_fields_json TEXT DEFAULT '{}',
    tags_json TEXT DEFAULT '[]',
    is_vip INTEGER DEFAULT 0,
    status TEXT DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY(assigned_agent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. Customer Contacts (Hierarchical Contacts)
CREATE TABLE IF NOT EXISTS customer_contacts (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    title TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    is_primary INTEGER DEFAULT 0,
    decision_maker_role TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 5. Deals & Sales Pipeline
CREATE TABLE IF NOT EXISTS deals (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    title TEXT NOT NULL,
    deal_value REAL NOT NULL DEFAULT 0.0,
    currency TEXT DEFAULT 'USD',
    stage TEXT NOT NULL DEFAULT 'DISCOVERY',
    win_probability INTEGER DEFAULT 20,
    expected_close_date DATE,
    actual_close_date DATE,
    assigned_rep_id TEXT,
    pipeline_type TEXT DEFAULT 'STANDARD',
    loss_reason TEXT,
    custom_metrics_json TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY(assigned_rep_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. Activities & Interactions
CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    customer_id TEXT,
    deal_id TEXT,
    user_id TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- CALL, MEETING, EMAIL, NOTE, TASK
    subject TEXT NOT NULL,
    description TEXT,
    scheduled_start DATETIME,
    scheduled_end DATETIME,
    is_completed INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'MEDIUM',
    metadata_json TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY(deal_id) REFERENCES deals(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Helpdesk & Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    ticket_number TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    status TEXT DEFAULT 'OPEN', -- OPEN, PENDING, IN_PROGRESS, RESOLVED, CLOSED
    channel TEXT DEFAULT 'WEB', -- WEB, EMAIL, PHONE, CHAT
    assigned_agent_id TEXT,
    sla_due_date DATETIME,
    is_sla_breached INTEGER DEFAULT 0,
    first_response_at DATETIME,
    resolved_at DATETIME,
    satisfaction_rating INTEGER,
    tags_json TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY(assigned_agent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 8. Ticket Comments & Thread History
CREATE TABLE IF NOT EXISTS ticket_comments (
    id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    author_user_id TEXT,
    is_internal_note INTEGER DEFAULT 0,
    body TEXT NOT NULL,
    attachments_json TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY(author_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 9. Billing, Invoices & Quotes
CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'DRAFT', -- DRAFT, SENT, PAID, OVERDUE, CANCELLED
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal REAL DEFAULT 0.0,
    tax_amount REAL DEFAULT 0.0,
    discount_amount REAL DEFAULT 0.0,
    total_amount REAL DEFAULT 0.0,
    currency TEXT DEFAULT 'USD',
    line_items_json TEXT NOT NULL DEFAULT '[]',
    payment_terms TEXT DEFAULT 'NET_30',
    notes TEXT,
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 10. Audit Trails & Event Ledger (Immutable)
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    actor_user_id TEXT,
    actor_email TEXT,
    action_type TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    before_state_json TEXT,
    after_state_json TEXT,
    metadata_json TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_customers_tenant ON customers(tenant_id);
CREATE INDEX IF NOT EXISTS idx_customers_lifecycle ON customers(lifecycle_stage);
CREATE INDEX IF NOT EXISTS idx_customers_agent ON customers(assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_deals_customer ON deals(customer_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_tickets_customer ON support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);
