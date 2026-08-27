import { Database } from '../../core/database/connection';
import { SupportTicket, TicketComment, TicketPriority, TicketStatus } from '@nexus/shared';

export class TicketRepository {
  public static async create(ticket: Partial<SupportTicket>): Promise<SupportTicket> {
    const id = ticket.id || `tick_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const ticketNum = `TICK-${Math.floor(10000 + Math.random() * 90000)}`;

    const sql = `
      INSERT INTO support_tickets (
        id, tenant_id, customer_id, ticket_number, subject, description,
        priority, status, channel, assigned_agent_id, sla_due_date,
        tags_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    // SLA default 24h for normal, 4h for urgent
    const hours = ticket.priority === 'URGENT' ? 4 : ticket.priority === 'HIGH' ? 8 : 24;
    const slaDue = new Date(Date.now() + hours * 3600000).toISOString();

    await Database.run(sql, [
      id,
      ticket.tenantId || 'tenant_default_01',
      ticket.customerId!,
      ticketNum,
      ticket.subject!,
      ticket.description!,
      ticket.priority || 'MEDIUM',
      ticket.status || 'OPEN',
      ticket.channel || 'WEB',
      ticket.assignedAgentId || null,
      ticket.slaDueDate || slaDue,
      JSON.stringify(ticket.tags || []),
    ]);

    const created = await this.findById(id, ticket.tenantId || 'tenant_default_01');
    return created!;
  }

  public static async findById(id: string, tenantId: string): Promise<SupportTicket | null> {
    const sql = `
      SELECT t.*, c.name AS customer_name, (u.first_name || ' ' || u.last_name) AS assigned_agent_name
      FROM support_tickets t
      JOIN customers c ON t.customer_id = c.id
      LEFT JOIN users u ON t.assigned_agent_id = u.id
      WHERE t.id = ? AND t.tenant_id = ?
    `;
    const row = await Database.getOne<any>(sql, [id, tenantId]);
    if (!row) return null;

    return {
      id: row.id,
      tenantId: row.tenant_id,
      customerId: row.customer_id,
      customerName: row.customer_name,
      ticketNumber: row.ticket_number,
      subject: row.subject,
      description: row.description,
      priority: row.priority as TicketPriority,
      status: row.status as TicketStatus,
      channel: row.channel,
      assignedAgentId: row.assigned_agent_id,
      assignedAgentName: row.assigned_agent_name,
      slaDueDate: row.sla_due_date,
      isSlaBreached: row.is_sla_breached === 1,
      firstResponseAt: row.first_response_at,
      resolvedAt: row.resolved_at,
      satisfactionRating: row.satisfaction_rating,
      tags: JSON.parse(row.tags_json || '[]'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  public static async listByTenant(tenantId: string, status?: string): Promise<SupportTicket[]> {
    let sql = `
      SELECT t.*, c.name AS customer_name, (u.first_name || ' ' || u.last_name) AS assigned_agent_name
      FROM support_tickets t
      JOIN customers c ON t.customer_id = c.id
      LEFT JOIN users u ON t.assigned_agent_id = u.id
      WHERE t.tenant_id = ?
    `;
    const params: any[] = [tenantId];
    if (status) {
      sql += ` AND t.status = ?`;
      params.push(status);
    }
    sql += ` ORDER BY t.created_at DESC`;

    const rows = await Database.query<any>(sql, params);
    return rows.map((row) => ({
      id: row.id,
      tenantId: row.tenant_id,
      customerId: row.customer_id,
      customerName: row.customer_name,
      ticketNumber: row.ticket_number,
      subject: row.subject,
      description: row.description,
      priority: row.priority,
      status: row.status,
      channel: row.channel,
      assignedAgentId: row.assigned_agent_id,
      assignedAgentName: row.assigned_agent_name,
      slaDueDate: row.sla_due_date,
      isSlaBreached: row.is_sla_breached === 1,
      firstResponseAt: row.first_response_at,
      resolvedAt: row.resolved_at,
      satisfactionRating: row.satisfaction_rating,
      tags: JSON.parse(row.tags_json || '[]'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  public static async updateStatus(id: string, tenantId: string, status: TicketStatus): Promise<SupportTicket> {
    const resolvedAt = status === 'RESOLVED' || status === 'CLOSED' ? new Date().toISOString() : null;
    const sql = `
      UPDATE support_tickets
      SET status = ?, resolved_at = COALESCE(?, resolved_at), updated_at = datetime('now')
      WHERE id = ? AND tenant_id = ?
    `;
    await Database.run(sql, [status, resolvedAt, id, tenantId]);
    return (await this.findById(id, tenantId))!;
  }
}
