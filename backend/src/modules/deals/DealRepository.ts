import { Database } from '../../core/database/connection';
import { Deal, DealStage, DealPipelineSummary } from '@nexus/shared';

export interface DealRow {
  id: string;
  tenant_id: string;
  customer_id: string;
  customer_name?: string | null;
  title: string;
  deal_value: number;
  currency: string;
  stage: string;
  win_probability: number;
  expected_close_date: string;
  actual_close_date: string | null;
  assigned_rep_id: string | null;
  assigned_rep_name?: string | null;
  pipeline_type: string;
  loss_reason: string | null;
  custom_metrics_json: string;
  created_at: string;
  updated_at: string;
}

export class DealRepository {
  public static mapToDomain(row: DealRow): Deal {
    const dealValue = row.deal_value;
    const winProbability = row.win_probability;
    const weightedValue = Math.round(dealValue * (winProbability / 100) * 100) / 100;

    return {
      id: row.id,
      tenantId: row.tenant_id,
      customerId: row.customer_id,
      customerName: row.customer_name || undefined,
      title: row.title,
      dealValue,
      currency: row.currency,
      stage: row.stage as DealStage,
      winProbability,
      expectedCloseDate: row.expected_close_date,
      actualCloseDate: row.actual_close_date || undefined,
      assignedRepId: row.assigned_rep_id || undefined,
      assignedRepName: row.assigned_rep_name || undefined,
      pipelineType: row.pipeline_type,
      lossReason: row.loss_reason || undefined,
      customMetrics: JSON.parse(row.custom_metrics_json || '{}'),
      weightedValue,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  public static async findById(id: string, tenantId: string): Promise<Deal | null> {
    const sql = `
      SELECT d.*, c.name AS customer_name, (u.first_name || ' ' || u.last_name) AS assigned_rep_name
      FROM deals d
      JOIN customers c ON d.customer_id = c.id
      LEFT JOIN users u ON d.assigned_rep_id = u.id
      WHERE d.id = ? AND d.tenant_id = ?
    `;
    const row = await Database.getOne<DealRow>(sql, [id, tenantId]);
    return row ? this.mapToDomain(row) : null;
  }

  public static async listByTenant(tenantId: string): Promise<Deal[]> {
    const sql = `
      SELECT d.*, c.name AS customer_name, (u.first_name || ' ' || u.last_name) AS assigned_rep_name
      FROM deals d
      JOIN customers c ON d.customer_id = c.id
      LEFT JOIN users u ON d.assigned_rep_id = u.id
      WHERE d.tenant_id = ?
      ORDER BY d.expected_close_date ASC
    `;
    const rows = await Database.query<DealRow>(sql, [tenantId]);
    return rows.map(this.mapToDomain);
  }

  public static async getPipelineSummary(tenantId: string): Promise<DealPipelineSummary[]> {
    const deals = await this.listByTenant(tenantId);
    const stages: DealStage[] = ['DISCOVERY', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];

    return stages.map((stage) => {
      const stageDeals = deals.filter((d) => d.stage === stage);
      const totalCount = stageDeals.length;
      const totalValue = stageDeals.reduce((sum, d) => sum + d.dealValue, 0);
      const weightedValue = stageDeals.reduce((sum, d) => sum + (d.weightedValue || 0), 0);

      return {
        stage,
        totalCount,
        totalValue: Math.round(totalValue * 100) / 100,
        weightedValue: Math.round(weightedValue * 100) / 100,
        deals: stageDeals,
      };
    });
  }

  public static async create(deal: Partial<Deal>): Promise<Deal> {
    const id = deal.id || `deal_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const sql = `
      INSERT INTO deals (
        id, tenant_id, customer_id, title, deal_value, currency,
        stage, win_probability, expected_close_date, actual_close_date,
        assigned_rep_id, pipeline_type, loss_reason, custom_metrics_json,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    await Database.run(sql, [
      id,
      deal.tenantId || 'tenant_default_01',
      deal.customerId!,
      deal.title!,
      deal.dealValue || 0.0,
      deal.currency || 'USD',
      deal.stage || 'DISCOVERY',
      deal.winProbability ?? 20,
      deal.expectedCloseDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      deal.actualCloseDate || null,
      deal.assignedRepId || null,
      deal.pipelineType || 'STANDARD',
      deal.lossReason || null,
      JSON.stringify(deal.customMetrics || {}),
    ]);

    const created = await this.findById(id, deal.tenantId || 'tenant_default_01');
    return created!;
  }

  public static async updateStage(id: string, tenantId: string, stage: DealStage, probability?: number): Promise<Deal> {
    let winProb = probability;
    if (winProb === undefined) {
      switch (stage) {
        case 'DISCOVERY': winProb = 20; break;
        case 'QUALIFICATION': winProb = 40; break;
        case 'PROPOSAL': winProb = 60; break;
        case 'NEGOTIATION': winProb = 80; break;
        case 'CLOSED_WON': winProb = 100; break;
        case 'CLOSED_LOST': winProb = 0; break;
      }
    }

    const actualClose = (stage === 'CLOSED_WON' || stage === 'CLOSED_LOST') ? new Date().toISOString() : null;

    const sql = `
      UPDATE deals
      SET stage = ?, win_probability = ?, actual_close_date = COALESCE(?, actual_close_date), updated_at = datetime('now')
      WHERE id = ? AND tenant_id = ?
    `;
    await Database.run(sql, [stage, winProb, actualClose, id, tenantId]);

    const updated = await this.findById(id, tenantId);
    return updated!;
  }
}
