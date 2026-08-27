import { Invoice, InvoiceLineItem } from '../types';

export class InvoiceValidator {
  public static calculateLineTotal(item: InvoiceLineItem): number {
    const base = item.quantity * item.unitPrice;
    const discount = base * (item.discountPercent / 100);
    const afterDiscount = base - discount;
    const tax = afterDiscount * (item.taxRatePercent / 100);
    return Math.round((afterDiscount + tax) * 100) / 100;
  }

  public static calculateInvoiceTotals(lineItems: InvoiceLineItem[]): {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
  } {
    let subtotal = 0;
    let discountAmount = 0;
    let taxAmount = 0;

    for (const item of lineItems) {
      const base = item.quantity * item.unitPrice;
      const disc = base * (item.discountPercent / 100);
      const afterDisc = base - disc;
      const tax = afterDisc * (item.taxRatePercent / 100);

      subtotal += base;
      discountAmount += disc;
      taxAmount += tax;
    }

    const totalAmount = subtotal - discountAmount + taxAmount;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  }

  public static validateInvoice(invoice: Partial<Invoice>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!invoice.customerId) {
      errors.customerId = 'Customer reference is mandatory';
    }

    if (!invoice.issueDate) {
      errors.issueDate = 'Issue date is required';
    }

    if (!invoice.dueDate) {
      errors.dueDate = 'Due date is required';
    } else if (invoice.issueDate && new Date(invoice.dueDate) < new Date(invoice.issueDate)) {
      errors.dueDate = 'Due date cannot precede issue date';
    }

    if (!invoice.lineItems || invoice.lineItems.length === 0) {
      errors.lineItems = 'Invoice must contain at least one line item';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
