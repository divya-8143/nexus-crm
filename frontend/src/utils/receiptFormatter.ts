// Order Receipt Summary Formatter
export class ReceiptFormatter {
  public static formatReceipt(orderId: string, total: number): string {
    return `REC-${orderId}-${total}`;
  }
}
