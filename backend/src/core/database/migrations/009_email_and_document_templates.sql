-- Migration 009: Email and Document Templates
CREATE TABLE IF NOT EXISTS communication_templates (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    template_code VARCHAR(100) NOT NULL,
    template_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- ONBOARDING, INVOICING, HELPDESK, SALES, DUNNING
    channel VARCHAR(20) NOT NULL, -- EMAIL, SMS, PDF, IN_APP
    subject_template VARCHAR(255),
    body_template TEXT NOT NULL,
    available_variables_json TEXT DEFAULT '[]',
    is_system_template BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, template_code)
);
