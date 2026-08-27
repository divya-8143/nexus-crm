export interface SupportMacroTemplate {
  id: string;
  title: string;
  category: 'GREETING' | 'TROUBLESHOOTING' | 'ESCALATION' | 'BILLING' | 'RESOLUTION' | 'CLOSING';
  shortcutKeyword: string;
  responseBody: string;
  suggestedNextStatus?: string;
}

export const SUPPORT_MACRO_CATALOG: SupportMacroTemplate[] = [
  { id: 'MACRO_01', title: 'Standard Initial Response & SLA Acknowledgment', category: 'GREETING', shortcutKeyword: '!greet', responseBody: 'Hello {{contact.firstName}},

Thank you for contacting Nexus Enterprise Support. We have received your ticket ({{ticket.ticketNumber}}) and a senior support engineer is reviewing your case under our enterprise SLA response guarantee.

Best regards,
Nexus Technical Support Team', suggestedNextStatus: 'IN_PROGRESS' },
  { id: 'MACRO_02', title: 'Request Diagnostic Logs & API Payload', category: 'TROUBLESHOOTING', shortcutKeyword: '!logs', responseBody: 'Hello {{contact.firstName}},

To assist our engineering team in pinpointing the issue, could you please provide:
1. The timestamp (UTC) of the failed API call
2. The request X-Request-ID header value
3. The exact HTTP response code and payload returned

Thank you for your cooperation.', suggestedNextStatus: 'PENDING' },
  { id: 'MACRO_03', title: 'Tier 3 Engineering Escalation Notification', category: 'ESCALATION', shortcutKeyword: '!esc', responseBody: 'Hello {{contact.firstName}},

Your support ticket has been escalated directly to our Tier 3 Core Platform Engineering lead. We are actively investigating system telemetry and will provide another status update within 2 hours.

Thank you for your patience.', suggestedNextStatus: 'IN_PROGRESS' },
  { id: 'MACRO_04', title: 'Invoice & Payment Confirmation Notice', category: 'BILLING', shortcutKeyword: '!payok', responseBody: 'Hello {{contact.firstName}},

We confirm that payment for Invoice {{invoice.invoiceNumber}} has been successfully processed and recorded in our general ledger. Your receipt is attached.

Thank you for your business.', suggestedNextStatus: 'RESOLVED' },
  { id: 'MACRO_05', title: 'Resolution & CSAT Survey Invitation', category: 'RESOLUTION', shortcutKeyword: '!resolve', responseBody: 'Hello {{contact.firstName}},

We have verified that the issue reported in {{ticket.ticketNumber}} is now fully resolved. We are closing this ticket, but if you have any follow-up questions, simply reply to this thread to reopen.

Please take a moment to rate our support: {{surveyUrl}}

Best regards,
Nexus Technical Support', suggestedNextStatus: 'RESOLVED' },
];
