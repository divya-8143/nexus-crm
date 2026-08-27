export interface SeedCompanyFixture {
  name: string;
  companyName: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
  lifecycleStage: string;
  leadScore: number;
  annualRevenue: number;
  isVip: boolean;
  tags: string[];
}

export const ENTERPRISE_COMPANIES_CATALOG: SeedCompanyFixture[] = [
  { name: 'Apex Global Technologies', companyName: 'Apex Global Inc', industry: 'Enterprise SaaS', email: 'contact@apextech.io', phone: '+1 (555) 101-2001', website: 'https://apextech.io', lifecycleStage: 'CUSTOMER', leadScore: 95, annualRevenue: 28000000, isVip: true, tags: ['TIER_1', 'STRATEGIC', 'CLOUD'] },
  { name: 'BioVanguard Therapeutics', companyName: 'BioVanguard Pharma', industry: 'Healthcare & Pharma', email: 'licensing@biovanguard.com', phone: '+1 (555) 102-2002', website: 'https://biovanguard.com', lifecycleStage: 'CUSTOMER', leadScore: 92, annualRevenue: 45000000, isVip: true, tags: ['HEALTHCARE', 'HIPAA', 'TIER_1'] },
  { name: 'Crestview Capital Management', companyName: 'Crestview Holdings', industry: 'Financial Services', email: 'investor.relations@crestview.com', phone: '+1 (555) 103-2003', website: 'https://crestview.com', lifecycleStage: 'CUSTOMER', leadScore: 88, annualRevenue: 75000000, isVip: true, tags: ['FINTECH', 'WEALTH', 'COMPLIANCE'] },
  { name: 'Dynasty Logistics Network', companyName: 'Dynasty Freight Ltd', industry: 'Supply Chain & Logistics', email: 'ops@dynastylogistics.com', phone: '+1 (555) 104-2004', website: 'https://dynastylogistics.com', lifecycleStage: 'OPPORTUNITY', leadScore: 78, annualRevenue: 18000000, isVip: false, tags: ['LOGISTICS', 'EXPANSION'] },
  { name: 'Echelon Defense Systems', companyName: 'Echelon Dynamics', industry: 'Aerospace & Defense', email: 'procurement@echelondefense.com', phone: '+1 (555) 105-2005', website: 'https://echelondefense.com', lifecycleStage: 'CUSTOMER', leadScore: 98, annualRevenue: 120000000, isVip: true, tags: ['SECURITY', 'GOVERNMENT', 'TIER_1'] },
  { name: 'Frontier Renewable Power', companyName: 'Frontier Clean Energy', industry: 'Energy & Utilities', email: 'contracts@frontierclean.com', phone: '+1 (555) 106-2006', website: 'https://frontierclean.com', lifecycleStage: 'SQL', leadScore: 72, annualRevenue: 34000000, isVip: false, tags: ['ENERGY', 'SUSTAINABILITY'] },
  { name: 'GigaWave Telecommunications', companyName: 'GigaWave Broadband', industry: 'Telecommunications', email: 'enterprise@gigawave.net', phone: '+1 (555) 107-2007', website: 'https://gigawave.net', lifecycleStage: 'CUSTOMER', leadScore: 90, annualRevenue: 62000000, isVip: true, tags: ['TELECOM', 'INFRASTRUCTURE'] },
  { name: 'Hyperion AI Research', companyName: 'Hyperion Labs Inc', industry: 'Artificial Intelligence', email: 'partnerships@hyperion-ai.org', phone: '+1 (555) 108-2008', website: 'https://hyperion-ai.org', lifecycleStage: 'OPPORTUNITY', leadScore: 86, annualRevenue: 15000000, isVip: false, tags: ['AI', 'INNOVATION', 'FAST_GROWTH'] },
  { name: 'IronClad Cyber Protection', companyName: 'IronClad Security', industry: 'Cybersecurity', email: 'sales@ironcladsec.io', phone: '+1 (555) 109-2009', website: 'https://ironcladsec.io', lifecycleStage: 'CUSTOMER', leadScore: 94, annualRevenue: 41000000, isVip: true, tags: ['CYBERSECURITY', 'SOC2', 'TIER_1'] },
  { name: 'Jupiter Semiconductor Corp', companyName: 'Jupiter Chips Ltd', industry: 'Semiconductors', email: 'foundry@jupitersemi.com', phone: '+1 (555) 110-2010', website: 'https://jupitersemi.com', lifecycleStage: 'CUSTOMER', leadScore: 96, annualRevenue: 190000000, isVip: true, tags: ['HARDWARE', 'GLOBAL', 'TIER_1'] },
  { name: 'Kodiak Heavy Manufacturing', companyName: 'Kodiak Industrial Group', industry: 'Manufacturing & Automotive', email: 'fleet@kodiakmfg.com', phone: '+1 (555) 111-2011', website: 'https://kodiakmfg.com', lifecycleStage: 'MQL', leadScore: 65, annualRevenue: 54000000, isVip: false, tags: ['MANUFACTURING', 'AUTOMOTIVE'] },
  { name: 'Lumina Digital Media', companyName: 'Lumina Broadcasting', industry: 'Media & Entertainment', email: 'licensing@luminamedia.tv', phone: '+1 (555) 112-2012', website: 'https://luminamedia.tv', lifecycleStage: 'LEAD', leadScore: 50, annualRevenue: 22000000, isVip: false, tags: ['MEDIA', 'STREAMING'] },
  { name: 'Monolith Financial Services', companyName: 'Monolith Bank AG', industry: 'Banking & Securities', email: 'institutional@monolithbank.ch', phone: '+41 22 555 2013', website: 'https://monolithbank.ch', lifecycleStage: 'CUSTOMER', leadScore: 97, annualRevenue: 310000000, isVip: true, tags: ['BANKING', 'FINANCE', 'TIER_1'] },
  { name: 'Nexus Space Exploration', companyName: 'Nexus Orbital Corp', industry: 'Aerospace', email: 'payload@nexusorbital.space', phone: '+1 (555) 114-2014', website: 'https://nexusorbital.space', lifecycleStage: 'OPPORTUNITY', leadScore: 89, annualRevenue: 48000000, isVip: true, tags: ['AEROSPACE', 'HIGH_INTENT'] },
  { name: 'OmniHealth Hospital Network', companyName: 'OmniHealth Systems', industry: 'Healthcare Provider', email: 'admin@omnihealthnet.org', phone: '+1 (555) 115-2015', website: 'https://omnihealthnet.org', lifecycleStage: 'CUSTOMER', leadScore: 93, annualRevenue: 88000000, isVip: true, tags: ['HEALTHCARE', 'HOSPITAL', 'HIPAA'] },
];
