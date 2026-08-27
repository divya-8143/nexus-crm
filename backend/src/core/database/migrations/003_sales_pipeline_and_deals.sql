-- Migration 003: Sales Pipeline & Opportunity Management
CREATE TABLE IF NOT EXISTS sales_pipelines (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    stages_json TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales_opportunities (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    pipeline_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL REFERENCES customer_organizations(id) ON DELETE CASCADE,
    primary_contact_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    stage_identifier VARCHAR(50) NOT NULL,
    deal_value_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
    currency_iso VARCHAR(10) DEFAULT 'USD',
    win_probability_percent INTEGER NOT NULL DEFAULT 20,
    weighted_forecast_amount NUMERIC(18, 2) GENERATED ALWAYS AS (deal_value_amount * (win_probability_percent / 100.0)) STORED,
    expected_close_date DATE NOT NULL,
    actual_close_date DATE,
    assigned_sales_rep_id VARCHAR(64),
    lead_source VARCHAR(100),
    loss_reason_category VARCHAR(100),
    loss_reason_narrative TEXT,
    competitors_encountered_json TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
