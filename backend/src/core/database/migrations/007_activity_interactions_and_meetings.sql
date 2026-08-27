-- Migration 007: Activity Interactions, Meeting Logs & Tasks
CREATE TABLE IF NOT EXISTS customer_activities (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) REFERENCES customer_organizations(id) ON DELETE CASCADE,
    contact_person_id VARCHAR(64),
    deal_id VARCHAR(64),
    ticket_id VARCHAR(64),
    actor_user_id VARCHAR(64) NOT NULL,
    activity_type VARCHAR(50) NOT NULL, -- CALL, MEETING, EMAIL, TASK, NOTE, STATUS_CHANGE
    subject_title VARCHAR(255) NOT NULL,
    detailed_notes TEXT,
    scheduled_start_time TIMESTAMP,
    scheduled_end_time TIMESTAMP,
    actual_duration_minutes INTEGER,
    is_completed_flag BOOLEAN DEFAULT FALSE,
    priority_level VARCHAR(20) DEFAULT 'MEDIUM',
    outcome_status VARCHAR(50), -- CONNECTED, LEFT_VOICEMAIL, NO_ANSWER, RESCHEDULED, COMPLETED
    calendar_event_external_id VARCHAR(255),
    metadata_json TEXT DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_customer ON customer_activities(customer_id);
CREATE INDEX idx_activity_actor ON customer_activities(actor_user_id);
