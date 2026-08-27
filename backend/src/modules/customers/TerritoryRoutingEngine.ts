export interface SalesTerritory {
  id: string;
  name: string;
  region: 'NORTH_AMERICA_EAST' | 'NORTH_AMERICA_WEST' | 'EMEA' | 'APAC' | 'LATAM';
  countriesIncluded: string[];
  statesOrProvincesIncluded?: string[];
  industrySpecialization?: string[];
  assignedLeadRepId: string;
  backupRepId?: string;
  currentQuotaUsd: number;
}

export class TerritoryRoutingEngine {
  private static territories: SalesTerritory[] = [
    {
      id: 'TERR_NA_WEST',
      name: 'North America West Enterprise',
      region: 'NORTH_AMERICA_WEST',
      countriesIncluded: ['USA', 'CAN'],
      statesOrProvincesIncluded: ['CA', 'WA', 'OR', 'NV', 'AZ', 'BC', 'AB'],
      assignedLeadRepId: 'usr_rep_01',
      currentQuotaUsd: 2500000,
    },
    {
      id: 'TERR_NA_EAST',
      name: 'North America East Enterprise',
      region: 'NORTH_AMERICA_EAST',
      countriesIncluded: ['USA', 'CAN'],
      statesOrProvincesIncluded: ['NY', 'NJ', 'MA', 'FL', 'IL', 'ON', 'QC'],
      assignedLeadRepId: 'usr_rep_02',
      currentQuotaUsd: 2500000,
    },
    {
      id: 'TERR_EMEA',
      name: 'EMEA Strategic Accounts',
      region: 'EMEA',
      countriesIncluded: ['GBR', 'DEU', 'FRA', 'NLD', 'CHE', 'SWE', 'IRL'],
      assignedLeadRepId: 'usr_mgr_01',
      currentQuotaUsd: 3000000,
    },
    {
      id: 'TERR_APAC',
      name: 'APAC High Growth',
      region: 'APAC',
      countriesIncluded: ['SGP', 'AUS', 'NZL', 'JPN', 'IND'],
      assignedLeadRepId: 'usr_rep_01',
      currentQuotaUsd: 2000000,
    },
  ];

  public static routeAccount(countryIso: string, stateOrProvince?: string, industry?: string): SalesTerritory {
    for (const terr of this.territories) {
      if (terr.countriesIncluded.includes(countryIso)) {
        if (stateOrProvince && terr.statesOrProvincesIncluded) {
          if (terr.statesOrProvincesIncluded.includes(stateOrProvince)) {
            return terr;
          }
        } else {
          return terr;
        }
      }
    }
    return this.territories[0]; // Default fallback territory
  }
}
