import { Database } from '../../core/database/connection';
import { AuditLogEntry } from '@nexus/shared';

export class AuditRepository {
  public static async log(entry: Partial<AuditLogEntry>): Promise<void> {
    const id = `aud_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const sql = `
      INSERT INTO audit_logs (
        id, tenant_id, actor_user_id, actor_email, action_type,
        entity_type, entity_id, ip_address, user_agent, before_state_json,
        after_state_json, metadata_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `;

    await Database.run(sql, [
      id,
      entry.tenantId || 'tenant_default_01',
      entry.actorUserId || null,
      entry.actorEmail || null,
      entry.actionType || 'UPDATE',
      entry.entityType || 'CUSTOMER',
      entry.entityId || 'unknown',
      entry.ipAddress || null,
      entry.userAgent || null,
      JSON.stringify(entry.beforeState || null),
      JSON.stringify(entry.afterState || null),
      JSON.stringify(entry.metadata || {}),
    ]);
  }

  public static async list(tenantId: string, limit = 50): Promise<AuditLogEntry[]> {
    const rows = await Database.query<any>(
      'SELECT * FROM audit_logs WHERE tenant_id = ? ORDER BY created_at DESC LIMIT ?',
      [tenantId, limit]
    );

    return rows.map((r) => ({
      id: r.id,
      tenantId: r.tenant_id,
      actorUserId: r.actor_user_id,
      actorEmail: r.actor_email,
      actionType: r.action_type,
      entityType: r.entity_type,
      entityId: r.entity_id,
      ipAddress: r.ip_address,
      userAgent: r.user_agent,
      beforeState: r.before_state_json ? JSON.parse(r.before_state_json) : undefined,
      afterState: r.after_state_json ? JSON.parse(r.after_state_json) : undefined,
      metadata: JSON.parse(r.metadata_json || '{}'),
      createdAt: r.created_at,
    }));
  }
}
