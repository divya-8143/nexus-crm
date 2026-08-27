export class CsvStreamingExporter {
  public static toCsvString<T extends Record<string, any>>(
    records: T[],
    columns: Array<{ key: keyof T; header: string }>
  ): string {
    if (records.length === 0) {
      return columns.map((c) => this.escapeCell(c.header)).join(',') + '\r\n';
    }

    const headerLine = columns.map((c) => this.escapeCell(c.header)).join(',');
    const dataLines = records.map((record) => {
      return columns
        .map((col) => {
          const val = record[col.key];
          return this.escapeCell(val);
        })
        .join(',');
    });

    return [headerLine, ...dataLines].join('\r\n');
  }

  private static escapeCell(value: any): string {
    if (value === null || value === undefined) return '""';
    let str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    // Double up quotes
    str = str.replace(/"/g, '""');
    return `"${str}"`;
  }
}
