-- Migration 010: Notification Deliveries & Webhook Outbox
CREATE TABLE IF NOT EXISTS in_app_notifications (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    recipient_user_id VARCHAR(64) NOT NULL,
    notification_title VARCHAR(255) NOT NULL,
    message_body TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'INFO',
    action_url VARCHAR(255),
    is_read_flag BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS webhook_endpoints (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    target_url VARCHAR(255) NOT NULL,
    secret_token VARCHAR(255) NOT NULL,
    subscribed_events_json TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    consecutive_failures INTEGER DEFAULT 0,
    last_dispatched_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS webhook_dispatch_queue (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    endpoint_id VARCHAR(64) NOT NULL REFERENCES webhook_endpoints(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    payload_json TEXT NOT NULL,
    attempt_count INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 5,
    next_attempt_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, DELIVERED, FAILED, RETRYING
    last_response_code INTEGER,
    last_error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
