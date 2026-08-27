import { Database } from './connection';
import { PasswordHasher } from '../security/Hasher';

export class SeedDataCatalog {
  public static async executeSeed(): Promise<void> {
    console.log('Seeding NexusCRM enterprise fixtures...');

    const defaultTenantId = 'tenant_enterprise_alpha';
    const passwordHash = await PasswordHasher.hash('AdminPassword123!');

    // 1. Seed Tenant
    await Database.run(`
      INSERT OR REPLACE INTO tenants (id, name, domain, plan_tier, is_active)
      VALUES (?, ?, ?, ?, ?)
    `, [defaultTenantId, 'Nexus Global Enterprise Holdings', 'nexus-enterprise.io', 'ENTERPRISE', 1]);

    // 2. Seed Users
    const users = [
      { id: 'usr_admin_01', email: 'admin@nexuscrm.io', firstName: 'Alexander', lastName: 'Pierce', role: 'SUPER_ADMIN', dept: 'Executive Management' },
      { id: 'usr_mgr_01', email: 'sales.mgr@nexuscrm.io', firstName: 'Victoria', lastName: 'Hand', role: 'SALES_MANAGER', dept: 'Global Sales' },
      { id: 'usr_rep_01', email: 'tony.stark@nexuscrm.io', firstName: 'Tony', lastName: 'Stark', role: 'SALES_AGENT', dept: 'Commercial Enterprise' },
      { id: 'usr_rep_02', email: 'pepper.potts@nexuscrm.io', firstName: 'Pepper', lastName: 'Potts', role: 'SALES_AGENT', dept: 'Strategic Accounts' },
      { id: 'usr_sup_01', email: 'support.lead@nexuscrm.io', firstName: 'Bruce', lastName: 'Banner', role: 'SUPPORT_AGENT', dept: 'Tier 3 Technical Support' },
      { id: 'usr_aud_01', email: 'compliance@nexuscrm.io', firstName: 'Natasha', lastName: 'Romanoff', role: 'COMPLIANCE_AUDITOR', dept: 'Information Security & Audit' },
    ];

    for (const u of users) {
      await Database.run(`
        INSERT OR REPLACE INTO users (id, tenant_id, email, password_hash, first_name, last_name, role, department, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
      `, [u.id, defaultTenantId, u.email, passwordHash, u.firstName, u.lastName, u.role, u.dept]);
    }

    console.log('Seed execution completed successfully.');
  }
}
