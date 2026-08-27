-- Migration 008: Workflow Automation Rules and Execution Logs
CREATE TABLE IF NOT EXISTS automation_workflow_rules (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    rule_name VARCHAR(150) NOT NULL,
    description TEXT,
    trigger_event_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    filter_conditions_json TEXT NOT NULL DEFAULT '[]',
    action_sequences_json TEXT NOT NULL DEFAULT '[]',
    execution_count INTEGER DEFAULT 0,
    last_triggered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS automation_execution_logs (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    rule_id VARCHAR(64) NOT NULL REFERENCES automation_workflow_rules(id) ON DELETE CASCADE,
    trigger_event_name VARCHAR(100) NOT NULL,
    entity_identifier VARCHAR(64) NOT NULL,
    execution_status VARCHAR(50) NOT NULL, -- SUCCESS, FAILED, SKIPPED
    actions_executed_count INTEGER DEFAULT 0,
    error_message TEXT,
    execution_duration_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
