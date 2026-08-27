export interface SalesforceLeadRecord {
  Id: string;
  FirstName: string;
  LastName: string;
  Company: string;
  Title: string;
  Email: string;
  Phone: string;
  LeadSource: string;
  Status: string;
  AnnualRevenue: number;
  NumberOfEmployees: number;
  Industry: string;
  CreatedDate: string;
}

export class SalesforceMigrationAdapter {
  public static mapSfLeadToNexusCustomer(sfLead: SalesforceLeadRecord, tenantId: string): Record<string, any> {
    return {
      tenantId,
      accountNumber: `SF-${sfLead.Id}`,
      name: sfLead.Company || `${sfLead.FirstName} ${sfLead.LastName}`,
      companyName: sfLead.Company,
      industry: sfLead.Industry || 'Other',
      email: sfLead.Email,
      phone: sfLead.Phone,
      lifecycleStage: this.mapSfStatusToLifecycle(sfLead.Status),
      annualRevenue: sfLead.AnnualRevenue || 0,
      leadScore: 50,
      tags: ['SALESFORCE_IMPORT', sfLead.LeadSource].filter(Boolean),
      customFields: {
        sfOriginalId: sfLead.Id,
        sfLeadSource: sfLead.LeadSource,
        sfTitle: sfLead.Title,
      },
      status: 'ACTIVE',
    };
  }

  private static mapSfStatusToLifecycle(sfStatus: string): string {
    switch (sfStatus?.toLowerCase()) {
      case 'open - not contacted': return 'LEAD';
      case 'working - contacted': return 'MQL';
      case 'qualified': return 'SQL';
      case 'closed - converted': return 'CUSTOMER';
      case 'closed - not converted': return 'CHURNED';
      default: return 'LEAD';
    }
  }
}
