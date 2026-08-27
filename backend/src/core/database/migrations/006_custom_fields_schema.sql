-- Migration 006: Dynamic Custom Fields Schema
CREATE TABLE IF NOT EXISTS custom_field_definitions (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- CUSTOMER, DEAL, TICKET, INVOICE
    field_identifier VARCHAR(100) NOT NULL,
    display_label VARCHAR(150) NOT NULL,
    data_type VARCHAR(50) NOT NULL, -- TEXT, NUMBER, DATE, SELECT, MULTI_SELECT, BOOLEAN
    is_mandatory BOOLEAN DEFAULT FALSE,
    default_value_json TEXT,
    options_array_json TEXT DEFAULT '[]',
    validation_regex VARCHAR(255),
    display_order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, entity_type, field_identifier)
);

CREATE TABLE IF NOT EXISTS custom_field_values (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    field_definition_id VARCHAR(64) NOT NULL REFERENCES custom_field_definitions(id) ON DELETE CASCADE,
    entity_instance_id VARCHAR(64) NOT NULL,
    value_string TEXT,
    value_numeric NUMERIC(18, 4),
    value_date TIMESTAMP,
    value_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cfv_entity ON custom_field_values(tenant_id, entity_instance_id);
