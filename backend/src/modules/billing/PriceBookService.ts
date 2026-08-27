export interface PriceBookEntry {
  sku: string;
  productName: string;
  category: 'LICENSE' | 'SUPPORT_PACKAGE' | 'PROFESSIONAL_SERVICES' | 'ADDON';
  unitListPriceUsd: number;
  billingFrequency: 'ONE_TIME' | 'MONTHLY' | 'ANNUALLY';
  minimumQuantity: number;
  maximumDiscountPercentWithoutApproval: number;
}

export class PriceBookService {
  public static entries: PriceBookEntry[] = [
    { sku: 'NX-ENT-USER-YR', productName: 'NexusCRM Enterprise User Seat (Annual)', category: 'LICENSE', unitListPriceUsd: 1200.0, billingFrequency: 'ANNUALLY', minimumQuantity: 5, maximumDiscountPercentWithoutApproval: 15.0 },
    { sku: 'NX-PRO-USER-YR', productName: 'NexusCRM Professional User Seat (Annual)', category: 'LICENSE', unitListPriceUsd: 720.0, billingFrequency: 'ANNUALLY', minimumQuantity: 1, maximumDiscountPercentWithoutApproval: 10.0 },
    { sku: 'NX-SUP-PREM-YR', productName: '24/7 Mission-Critical SLA Support Add-on', category: 'SUPPORT_PACKAGE', unitListPriceUsd: 15000.0, billingFrequency: 'ANNUALLY', minimumQuantity: 1, maximumDiscountPercentWithoutApproval: 5.0 },
    { sku: 'NX-ONBOARD-FAST', productName: 'Enterprise Accelerator Onboarding & Data Migration', category: 'PROFESSIONAL_SERVICES', unitListPriceUsd: 8500.0, billingFrequency: 'ONE_TIME', minimumQuantity: 1, maximumDiscountPercentWithoutApproval: 20.0 },
    { sku: 'NX-DEV-API-PACK', productName: 'High-Throughput API Gateway (1M req/day)', category: 'ADDON', unitListPriceUsd: 4800.0, billingFrequency: 'ANNUALLY', minimumQuantity: 1, maximumDiscountPercentWithoutApproval: 10.0 },
  ];

  public static getEntry(sku: string): PriceBookEntry | undefined {
    return this.entries.find((e) => e.sku === sku);
  }

  public static validateDiscount(sku: string, requestedDiscountPercent: number): {
    requiresApproval: boolean;
    approverRole?: 'SALES_MANAGER' | 'SUPER_ADMIN';
    reason?: string;
  } {
    const entry = this.getEntry(sku);
    if (!entry) return { requiresApproval: true, approverRole: 'SALES_MANAGER', reason: 'Custom or unlisted SKU' };

    if (requestedDiscountPercent > 30.0) {
      return { requiresApproval: true, approverRole: 'SUPER_ADMIN', reason: `Discount of ${requestedDiscountPercent}% exceeds executive threshold (30%)` };
    }

    if (requestedDiscountPercent > entry.maximumDiscountPercentWithoutApproval) {
      return { requiresApproval: true, approverRole: 'SALES_MANAGER', reason: `Discount of ${requestedDiscountPercent}% exceeds standard rep threshold (${entry.maximumDiscountPercentWithoutApproval}%)` };
    }

    return { requiresApproval: false };
  }
}
