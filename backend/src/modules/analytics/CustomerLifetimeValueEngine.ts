export class CustomerLifetimeValueEngine {
  public static calculateClv(
    averageOrderValue: number,
    purchaseFrequencyPerYear: number,
    grossMarginPercent: number,
    annualChurnRatePercent: number
  ): {
    customerLifetimeValue: number;
    averageCustomerLifespanYears: number;
    annualCustomerValue: number;
  } {
    const annualChurnRateDecimal = Math.max(0.01, annualChurnRatePercent / 100);
    const averageLifespanYears = 1 / annualChurnRateDecimal;
    const annualValue = averageOrderValue * purchaseFrequencyPerYear;
    const marginDecimal = grossMarginPercent / 100;
    const clv = (annualValue * marginDecimal) / annualChurnRateDecimal;

    return {
      customerLifetimeValue: Math.round(clv * 100) / 100,
      averageCustomerLifespanYears: Math.round(averageLifespanYears * 10) / 10,
      annualCustomerValue: Math.round(annualValue * 100) / 100,
    };
  }
}
