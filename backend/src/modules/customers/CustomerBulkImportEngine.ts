// Customer Bulk Import and Validation Engine
export class CustomerBulkImportEngine {
  public static validateRow(row: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!row.name) errors.push('Customer name is required');
    if (!row.email || !row.email.includes('@')) errors.push('Valid email is required');
    return { isValid: errors.length === 0, errors };
  }
}
