export class DocumentTemplateEngine {
  public static interpolate(templateString: string, variables: Record<string, any>): string {
    return templateString.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (match, path) => {
      const parts = path.split('.');
      let current: any = variables;

      for (const part of parts) {
        if (current === undefined || current === null) return '';
        current = current[part];
      }

      return current !== undefined && current !== null ? String(current) : '';
    });
  }

  public static standardTemplates = {
    WELCOME_EMAIL: `
Dear {{contact.firstName}},

Welcome to NexusCRM Enterprise! Your corporate account ({{customer.name}}, Account #{{customer.accountNumber}}) has been successfully activated.

Your assigned Account Executive is {{agent.name}} ({{agent.email}}).

Best regards,
The NexusCRM Customer Success Team
    `,
    INVOICE_EMAIL: `
Hello {{customer.name}} Billing Department,

Please find attached Invoice {{invoice.invoiceNumber}} for {{invoice.totalAmount}} {{invoice.currency}}.
Payment is due on or before {{invoice.dueDate}}.

Remittance Details:
Terms: {{invoice.paymentTerms}}
Ref: {{invoice.invoiceNumber}}

Thank you for your business.
    `,
    TICKET_RESOLVED: `
Hi {{contact.firstName}},

Your support ticket {{ticket.ticketNumber}} ({{ticket.subject}}) has been marked as RESOLVED by our engineering team.

Please take 10 seconds to rate your experience: {{surveyUrl}}

Regards,
Nexus Technical Support
    `,
  };
}
