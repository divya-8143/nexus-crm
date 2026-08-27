import { Database } from '../../core/database/connection';
import { Customer, CustomerContact, CustomerFilterParams, PaginatedResult } from '@nexus/shared';

export interface CustomerRow {
  id: string;
  tenant_id: string;
  account_number: string;
  name: string;
  company_name: string | null;
  industry: string | null;
  email: string;
  phone: string | null;
  website: string | null;
  lifecycle_stage: string;
  lead_score: number;
  annual_revenue: number;
  currency: string;
  assigned_agent_id: string | null;
  assigned_agent_name?: string | null;
  billing_address_json: string;
  shipping_address_json: string;
  custom_fields_json: string;
  tags_json: string;
  is_vip: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export class CustomerRepository {
  public static mapToDomain(row: CustomerRow): Customer {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      accountNumber: row.account_number,
      name: row.name,
      companyName: row.company_name || undefined,
      industry: row.industry || undefined,
      email: row.email,
      phone: row.phone || undefined,
      website: row.website || undefined,
      lifecycleStage: row.lifecycle_stage as any,
      leadScore: row.lead_score,
      annualRevenue: row.annual_revenue,
      currency: row.currency,
      assignedAgentId: row.assigned_agent_id || undefined,
      assignedAgentName: row.assigned_agent_name || undefined,
      billingAddress: JSON.parse(row.billing_address_json || '{}'),
      shippingAddress: JSON.parse(row.shipping_address_json || '{}'),
      customFields: JSON.parse(row.custom_fields_json || '{}'),
      tags: JSON.parse(row.tags_json || '[]'),
      isVip: row.is_vip === 1,
      status: row.status as any,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  public static async findById(id: string, tenantId: string): Promise<Customer | null> {
    const sql = `
      SELECT c.*, (u.first_name || ' ' || u.last_name) AS assigned_agent_name
      FROM customers c
      LEFT JOIN users u ON c.assigned_agent_id = u.id
      WHERE c.id = ? AND c.tenant_id = ?
    `;
    const row = await Database.getOne<CustomerRow>(sql, [id, tenantId]);
    return row ? this.mapToDomain(row) : null;
  }

  public static async list(
    tenantId: string,
    filters: CustomerFilterParams,
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<Customer>> {
    let sql = `
      SELECT c.*, (u.first_name || ' ' || u.last_name) AS assigned_agent_name
      FROM customers c
      LEFT JOIN users u ON c.assigned_agent_id = u.id
      WHERE c.tenant_id = ?
    `;
    const params: any[] = [tenantId];

    if (filters.search) {
      sql += ` AND (c.name LIKE ? OR c.company_name LIKE ? OR c.email LIKE ? OR c.account_number LIKE ?)`;
      const query = `%${filters.search}%`;
      params.push(query, query, query, query);
    }

    if (filters.lifecycleStage && filters.lifecycleStage.length > 0) {
      const placeholders = filters.lifecycleStage.map(() => '?').join(',');
      sql += ` AND c.lifecycle_stage IN (${placeholders})`;
      params.push(...filters.lifecycleStage);
    }

    if (filters.status && filters.status.length > 0) {
      const placeholders = filters.status.map(() => '?').join(',');
      sql += ` AND c.status IN (${placeholders})`;
      params.push(...filters.status);
    }

    if (filters.assignedAgentId) {
      sql += ` AND c.assigned_agent_id = ?`;
      params.push(filters.assignedAgentId);
    }

    if (filters.isVip !== undefined) {
      sql += ` AND c.is_vip = ?`;
      params.push(filters.isVip ? 1 : 0);
    }

    // Count query
    const countSql = `SELECT COUNT(*) as count FROM (${sql})`;
    const countRow = await Database.getOne<{ count: number }>(countSql, params);
    const total = countRow ? countRow.count : 0;

    // Pagination
    const offset = (page - 1) * limit;
    sql += ` ORDER BY c.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const rows = await Database.query<CustomerRow>(sql, params);
    const data = rows.map(this.mapToDomain);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  }

  public static async create(customer: Partial<Customer>): Promise<Customer> {
    const id = customer.id || `cust_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const accNum = customer.accountNumber || `ACC-${Math.floor(100000 + Math.random() * 900000)}`;

    const sql = `
      INSERT INTO customers (
        id, tenant_id, account_number, name, company_name, industry,
        email, phone, website, lifecycle_stage, lead_score, annual_revenue,
        currency, assigned_agent_id, billing_address_json, shipping_address_json,
        custom_fields_json, tags_json, is_vip, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    await Database.run(sql, [
      id,
      customer.tenantId || 'tenant_default_01',
      accNum,
      customer.name,
      customer.companyName || null,
      customer.industry || null,
      customer.email,
      customer.phone || null,
      customer.website || null,
      customer.lifecycleStage || 'LEAD',
      customer.leadScore || 0,
      customer.annualRevenue || 0.0,
      customer.currency || 'USD',
      customer.assignedAgentId || null,
      JSON.stringify(customer.billingAddress || {}),
      JSON.stringify(customer.shippingAddress || {}),
      JSON.stringify(customer.customFields || {}),
      JSON.stringify(customer.tags || []),
      customer.isVip ? 1 : 0,
      customer.status || 'ACTIVE',
    ]);

    const created = await this.findById(id, customer.tenantId || 'tenant_default_01');
    return created!;
  }

  public static async update(id: string, tenantId: string, updates: Partial<Customer>): Promise<Customer> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) { fields.push('name = ?'); values.push(updates.name); }
    if (updates.companyName !== undefined) { fields.push('company_name = ?'); values.push(updates.companyName); }
    if (updates.industry !== undefined) { fields.push('industry = ?'); values.push(updates.industry); }
    if (updates.email !== undefined) { fields.push('email = ?'); values.push(updates.email); }
    if (updates.phone !== undefined) { fields.push('phone = ?'); values.push(updates.phone); }
    if (updates.website !== undefined) { fields.push('website = ?'); values.push(updates.website); }
    if (updates.lifecycleStage !== undefined) { fields.push('lifecycle_stage = ?'); values.push(updates.lifecycleStage); }
    if (updates.leadScore !== undefined) { fields.push('lead_score = ?'); values.push(updates.leadScore); }
    if (updates.annualRevenue !== undefined) { fields.push('annual_revenue = ?'); values.push(updates.annualRevenue); }
    if (updates.assignedAgentId !== undefined) { fields.push('assigned_agent_id = ?'); values.push(updates.assignedAgentId); }
    if (updates.billingAddress !== undefined) { fields.push('billing_address_json = ?'); values.push(JSON.stringify(updates.billingAddress)); }
    if (updates.shippingAddress !== undefined) { fields.push('shipping_address_json = ?'); values.push(JSON.stringify(updates.shippingAddress)); }
    if (updates.customFields !== undefined) { fields.push('custom_fields_json = ?'); values.push(JSON.stringify(updates.customFields)); }
    if (updates.tags !== undefined) { fields.push('tags_json = ?'); values.push(JSON.stringify(updates.tags)); }
    if (updates.isVip !== undefined) { fields.push('is_vip = ?'); values.push(updates.isVip ? 1 : 0); }
    if (updates.status !== undefined) { fields.push('status = ?'); values.push(updates.status); }

    fields.push("updated_at = datetime('now')");

    const sql = `UPDATE customers SET ${fields.join(', ')} WHERE id = ? AND tenant_id = ?`;
    values.push(id, tenantId);

    await Database.run(sql, values);
    const updated = await this.findById(id, tenantId);
    return updated!;
  }

  public static async delete(id: string, tenantId: string): Promise<boolean> {
    const res = await Database.run('DELETE FROM customers WHERE id = ? AND tenant_id = ?', [id, tenantId]);
    return res.changes > 0;
  }
}
