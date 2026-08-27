import { InvoiceValidator } from '@nexus/shared';

export async function runBillingTests(): Promise<void> {
  const lineItems = [
    {
      id: 'item_1',
      description: 'NexusCRM Enterprise User License (Annual)',
      quantity: 10,
      unitPrice: 1200,
      discountPercent: 10,
      taxRatePercent: 8,
      lineTotal: 0,
    },
  ];

  const totals = InvoiceValidator.calculateInvoiceTotals(lineItems);
  // Base: 12000, Discount: 1200, Sub-after-disc: 10800, Tax: 864, Total: 11664
  if (totals.subtotal !== 12000) throw new Error(`Expected subtotal 12000, got ${totals.subtotal}`);
  if (totals.discountAmount !== 1200) throw new Error(`Expected discount 1200, got ${totals.discountAmount}`);
  if (totals.taxAmount !== 864) throw new Error(`Expected tax 864, got ${totals.taxAmount}`);
  if (totals.totalAmount !== 11664) throw new Error(`Expected total 11664, got ${totals.totalAmount}`);
}
