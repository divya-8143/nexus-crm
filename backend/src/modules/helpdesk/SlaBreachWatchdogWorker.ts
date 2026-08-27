import { Database } from '../../core/database/connection';
import { Logger } from '../../core/logger/Logger';
import { EventBus } from '../../core/events/EventBus';

export class SlaBreachWatchdogWorker {
  public static async checkActiveTickets(): Promise<{ totalChecked: number; breachedCount: number }> {
    Logger.info('[SLA Watchdog] Initiating periodic ticket SLA evaluation...');

    const nowIso = new Date().toISOString();
    const breachedRows = await Database.query<any>(`
      SELECT id, tenant_id, ticket_number, customer_id, priority, sla_due_date
      FROM support_tickets
      WHERE status NOT IN ('RESOLVED', 'CLOSED')
        AND is_sla_breached = 0
        AND sla_due_date < ?
    `, [nowIso]);

    if (breachedRows.length > 0) {
      Logger.warn(`[SLA Watchdog] Detected ${breachedRows.length} SLA breach incidents`);

      for (const ticket of breachedRows) {
        await Database.run(
          'UPDATE support_tickets SET is_sla_breached = 1, updated_at = datetime(\'now\') WHERE id = ?',
          [ticket.id]
        );

        await EventBus.getInstance().publish('TICKET_SLA_BREACHED', {
          ticketId: ticket.id,
          ticketNumber: ticket.ticket_number,
          tenantId: ticket.tenant_id,
          priority: ticket.priority,
          breachedAt: nowIso,
        });
      }
    }

    return {
      totalChecked: breachedRows.length,
      breachedCount: breachedRows.length,
    };
  }
}
