export interface StripeChargeEvent {
  id: string;
  object: 'event';
  type: 'charge.succeeded' | 'charge.failed' | 'charge.refunded' | 'invoice.payment_succeeded';
  data: {
    object: {
      id: string;
      amount: number;
      currency: string;
      customer: string;
      receipt_email: string;
      paid: boolean;
      status: string;
      metadata: {
        nexusInvoiceId?: string;
        nexusTenantId?: string;
      };
    };
  };
}

export class StripePaymentAdapter {
  public static processWebhookEvent(event: StripeChargeEvent): {
    handled: boolean;
    invoiceId?: string;
    action: 'MARK_PAID' | 'MARK_FAILED' | 'PROCESS_REFUND' | 'IGNORED';
    amountReceived: number;
  } {
    const charge = event.data.object;
    const invoiceId = charge.metadata?.nexusInvoiceId;
    const amountInDollars = charge.amount / 100.0;

    switch (event.type) {
      case 'charge.succeeded':
      case 'invoice.payment_succeeded':
        return { handled: true, invoiceId, action: 'MARK_PAID', amountReceived: amountInDollars };
      case 'charge.failed':
        return { handled: true, invoiceId, action: 'MARK_FAILED', amountReceived: 0 };
      case 'charge.refunded':
        return { handled: true, invoiceId, action: 'PROCESS_REFUND', amountReceived: amountInDollars };
      default:
        return { handled: false, action: 'IGNORED', amountReceived: 0 };
    }
  }
}
