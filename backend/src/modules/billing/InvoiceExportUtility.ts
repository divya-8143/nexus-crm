// Invoice Export Utility for CSV and PDF generation
export class InvoiceExportUtility {
  public static generateCsv(invoices: any[]): string {
    const headers = 'InvoiceID,Customer,Amount,Currency,Status,DueDate\n';
    const rows = invoices.map(i => `${i.id},"${i.customerName}",${i.amount},${i.currency},${i.status},${i.dueDate}`).join('\n');
    return headers + rows;
  }
}
