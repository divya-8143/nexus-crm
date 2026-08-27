import { Database } from '../../core/database/connection';
import { Invoice, InvoiceValidator } from '@nexus/shared';

export class InvoiceRepository {
  public static async create(data: Partial<Invoice>): Promise<Invoice> {
    const id = data.id || `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const invNum = data.invoiceNumber || `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const totals = InvoiceValidator.calculateInvoiceTotals(data.lineItems || []);

    const sql = `
      INSERT INTO invoices (
        id, tenant_id, customer_id, invoice_number, status, issue_date,
        due_date, subtotal, tax_amount, discount_amount, total_amount,
        currency, line_items_json, payment_terms, notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    await Database.run(sql, [
      id,
      data.tenantId || 'tenant_default_01',
      data.customerId!,
      invNum,
      data.status || 'DRAFT',
      data.issueDate || new Date().toISOString().split('T')[0],
      data.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      totals.subtotal,
      totals.taxAmount,
      totals.discountAmount,
      totals.totalAmount,
      data.currency || 'USD',
      JSON.stringify(data.lineItems || []),
      data.paymentTerms || 'NET_30',
      data.notes || null,
    ]);

    return (await this.findById(id, data.tenantId || 'tenant_default_01'))!;
  }

  public static async findById(id: string, tenantId: string): Promise<Invoice | null> {
    const sql = `
      SELECT i.*, c.name AS customer_name
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      WHERE i.id = ? AND i.tenant_id = ?
    `;
    const row = await Database.getOne<any>(sql, [id, tenantId]);
    if (!row) return null;

    return {
      id: row.id,
      tenantId: row.tenant_id,
      customerId: row.customer_id,
      customerName: row.customer_name,
      invoiceNumber: row.invoice_number,
      status: row.status,
      issueDate: row.issue_date,
      dueDate: row.due_date,
      subtotal: row.subtotal,
      taxAmount: row.tax_amount,
      discountAmount: row.discount_amount,
      totalAmount: row.total_amount,
      currency: row.currency,
      lineItems: JSON.parse(row.line_items_json || '[]'),
      paymentTerms: row.payment_terms,
      notes: row.notes,
      paidAt: row.paid_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  public static async listByTenant(tenantId: string): Promise<Invoice[]> {
    const sql = `
      SELECT i.*, c.name AS customer_name
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      WHERE i.tenant_id = ?
      ORDER BY i.created_at DESC
    `;
    const rows = await Database.query<any>(sql, [tenantId]);
    return rows.map((row) => ({
      id: row.id,
      tenantId: row.tenant_id,
      customerId: row.customer_id,
      customerName: row.customer_name,
      invoiceNumber: row.invoice_number,
      status: row.status,
      issueDate: row.issue_date,
      dueDate: row.due_date,
      subtotal: row.subtotal,
      taxAmount: row.tax_amount,
      discountAmount: row.discount_amount,
      totalAmount: row.total_amount,
      currency: row.currency,
      lineItems: JSON.parse(row.line_items_json || '[]'),
      paymentTerms: row.payment_terms,
      notes: row.notes,
      paidAt: row.paid_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }
}
