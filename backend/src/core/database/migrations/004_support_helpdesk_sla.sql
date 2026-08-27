-- Migration 004: Support Helpdesk & SLA Engine
CREATE TABLE IF NOT EXISTS sla_policies (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    policy_name VARCHAR(150) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    first_response_target_hours_urgent NUMERIC(6, 2) DEFAULT 1.0,
    first_response_target_hours_high NUMERIC(6, 2) DEFAULT 4.0,
    first_response_target_hours_medium NUMERIC(6, 2) DEFAULT 8.0,
    first_response_target_hours_low NUMERIC(6, 2) DEFAULT 24.0,
    resolution_target_hours_urgent NUMERIC(6, 2) DEFAULT 4.0,
    resolution_target_hours_high NUMERIC(6, 2) DEFAULT 16.0,
    resolution_target_hours_medium NUMERIC(6, 2) DEFAULT 48.0,
    resolution_target_hours_low NUMERIC(6, 2) DEFAULT 120.0,
    business_hours_only BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS helpdesk_tickets (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    ticket_serial_code VARCHAR(64) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    problem_description TEXT NOT NULL,
    priority_level VARCHAR(20) DEFAULT 'MEDIUM',
    lifecycle_status VARCHAR(50) DEFAULT 'OPEN',
    intake_channel VARCHAR(50) DEFAULT 'WEB_PORTAL',
    assigned_support_agent_id VARCHAR(64),
    assigned_tier INTEGER DEFAULT 1,
    sla_policy_id VARCHAR(64) REFERENCES sla_policies(id),
    first_response_due_at TIMESTAMP,
    resolution_due_at TIMESTAMP,
    actual_first_response_at TIMESTAMP,
    actual_resolved_at TIMESTAMP,
    is_sla_breached BOOLEAN DEFAULT FALSE,
    csat_rating INTEGER,
    csat_feedback_comment TEXT,
    tags_json TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
