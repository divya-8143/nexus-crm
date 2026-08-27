export class MultiCurrencyConversionService {
  private static exchangeRatesToUsd: Record<string, number> = {
    USD: 1.0,
    EUR: 1.08,
    GBP: 1.28,
    JPY: 0.0065,
    CAD: 0.74,
    AUD: 0.65,
    INR: 0.012,
    SGD: 0.75,
    CHF: 1.13,
  };

  public static convert(amount: number, fromCurrency: string, toCurrency: string): number {
    const fromRate = this.exchangeRatesToUsd[fromCurrency.toUpperCase()] || 1.0;
    const toRate = this.exchangeRatesToUsd[toCurrency.toUpperCase()] || 1.0;

    // Convert to USD base, then to target
    const amountInUsd = amount * fromRate;
    const targetAmount = amountInUsd / toRate;

    return Math.round(targetAmount * 100) / 100;
  }

  public static formatCurrency(amount: number, currencyCode = 'USD', locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}
