-- Migration 005: Billing, Multi-Currency Invoicing & General Ledger
CREATE TABLE IF NOT EXISTS billing_invoices (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    invoice_serial_number VARCHAR(100) UNIQUE NOT NULL,
    billing_status VARCHAR(50) DEFAULT 'DRAFT',
    issue_date DATE NOT NULL,
    payment_due_date DATE NOT NULL,
    subtotal_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    total_tax_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    total_discount_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    grand_total_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    balance_due_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    currency_code VARCHAR(10) DEFAULT 'USD',
    tax_bracket_identifier VARCHAR(50),
    payment_terms_code VARCHAR(50) DEFAULT 'NET_30',
    notes_and_remittance_instructions TEXT,
    paid_in_full_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoice_line_items (
    id VARCHAR(64) PRIMARY KEY,
    invoice_id VARCHAR(64) NOT NULL REFERENCES billing_invoices(id) ON DELETE CASCADE,
    item_position_index INTEGER NOT NULL,
    sku_or_product_code VARCHAR(100),
    item_description VARCHAR(255) NOT NULL,
    unit_quantity NUMERIC(12, 4) NOT NULL DEFAULT 1.0000,
    unit_price_amount NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
    discount_percentage NUMERIC(5, 2) DEFAULT 0.00,
    tax_rate_percentage NUMERIC(5, 2) DEFAULT 0.00,
    calculated_subtotal NUMERIC(18, 2) NOT NULL,
    calculated_tax_amount NUMERIC(18, 2) NOT NULL,
    calculated_line_total NUMERIC(18, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS general_ledger_entries (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    transaction_reference VARCHAR(100) NOT NULL,
    account_debit VARCHAR(100) NOT NULL,
    account_credit VARCHAR(100) NOT NULL,
    amount NUMERIC(18, 2) NOT NULL,
    currency_iso VARCHAR(10) DEFAULT 'USD',
    posting_date DATE NOT NULL,
    entry_narrative TEXT,
    is_reconciled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
