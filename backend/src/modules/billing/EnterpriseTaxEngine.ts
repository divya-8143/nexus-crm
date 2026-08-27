export interface RegionalTaxBracket {
  regionCode: string;
  name: string;
  standardRatePercent: number;
  reducedRatePercent?: number;
  isDigitalServiceTaxable: boolean;
}

export const REGIONAL_TAX_BRACKETS: Record<string, RegionalTaxBracket> = {
  US_CA: { regionCode: 'US_CA', name: 'California State Sales Tax', standardRatePercent: 7.25, isDigitalServiceTaxable: true },
  US_NY: { regionCode: 'US_NY', name: 'New York State Sales Tax', standardRatePercent: 8.875, isDigitalServiceTaxable: true },
  US_TX: { regionCode: 'US_TX', name: 'Texas State Sales Tax', standardRatePercent: 6.25, isDigitalServiceTaxable: true },
  UK: { regionCode: 'UK', name: 'United Kingdom Standard VAT', standardRatePercent: 20.0, isDigitalServiceTaxable: true },
  DE: { regionCode: 'DE', name: 'Germany Mehrwertsteuer (MwSt)', standardRatePercent: 19.0, isDigitalServiceTaxable: true },
  FR: { regionCode: 'FR', name: 'France TVA', standardRatePercent: 20.0, isDigitalServiceTaxable: true },
  IN: { regionCode: 'IN', name: 'India GST (Integrated)', standardRatePercent: 18.0, isDigitalServiceTaxable: true },
  SG: { regionCode: 'SG', name: 'Singapore GST', standardRatePercent: 9.0, isDigitalServiceTaxable: true },
  AU: { regionCode: 'AU', name: 'Australia GST', standardRatePercent: 10.0, isDigitalServiceTaxable: true },
};

export class EnterpriseTaxEngine {
  public static calculateTax(
    subtotal: number,
    regionCode?: string,
    isTaxExempt = false
  ): { taxRatePercent: number; taxAmount: number; taxLabel: string } {
    if (isTaxExempt || !regionCode) {
      return { taxRatePercent: 0, taxAmount: 0, taxLabel: 'Tax Exempt / 0%' };
    }

    const bracket = REGIONAL_TAX_BRACKETS[regionCode] || {
      regionCode,
      name: 'Standard Regional Tax',
      standardRatePercent: 0,
      isDigitalServiceTaxable: false,
    };

    const taxAmount = Math.round(subtotal * (bracket.standardRatePercent / 100) * 100) / 100;

    return {
      taxRatePercent: bracket.standardRatePercent,
      taxAmount,
      taxLabel: `${bracket.name} (${bracket.standardRatePercent}%)`,
    };
  }
}
