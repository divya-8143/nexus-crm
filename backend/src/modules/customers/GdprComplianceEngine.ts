import { Customer, CustomerContact } from '@nexus/shared';

export class GdprComplianceEngine {
  public static anonymizeCustomer(customer: Customer): Customer {
    const anonymizedId = customer.id.substring(0, 8) + '_ANON';
    return {
      ...customer,
      name: `Anonymized Customer (${anonymizedId})`,
      companyName: undefined,
      email: `anonymized_${anonymizedId}@gdpr-redacted.local`,
      phone: undefined,
      website: undefined,
      billingAddress: { street1: 'REDACTED', city: 'REDACTED', state: 'REDACTED', postalCode: '00000', country: customer.billingAddress.country },
      shippingAddress: { street1: 'REDACTED', city: 'REDACTED', state: 'REDACTED', postalCode: '00000', country: customer.shippingAddress.country },
      customFields: {},
      tags: ['GDPR_FORGOTTEN'],
      status: 'ARCHIVED',
    };
  }

  public static generateExportBundle(
    customer: Customer,
    contacts: CustomerContact[],
    activitiesCount: number
  ): Record<string, any> {
    return {
      exportVersion: '1.0',
      generatedAt: new Date().toISOString(),
      complianceStandard: 'GDPR_ARTICLE_20_DATA_PORTABILITY',
      customerProfile: customer,
      associatedContacts: contacts,
      metadata: {
        totalLoggedInteractions: activitiesCount,
        dataController: 'NexusCRM Enterprise',
      },
    };
  }
}
