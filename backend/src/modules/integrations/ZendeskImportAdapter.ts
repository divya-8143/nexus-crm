export interface ZendeskTicketExport {
  id: number;
  subject: string;
  description: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  status: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
  recipient: string;
  requester_id: number;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export class ZendeskImportAdapter {
  public static mapZendeskToNexusTicket(zd: ZendeskTicketExport, tenantId: string, customerId: string): Record<string, any> {
    const priorityMap: Record<string, string> = {
      urgent: 'URGENT',
      high: 'HIGH',
      normal: 'MEDIUM',
      low: 'LOW',
    };

    const statusMap: Record<string, string> = {
      new: 'OPEN',
      open: 'OPEN',
      pending: 'PENDING',
      hold: 'IN_PROGRESS',
      solved: 'RESOLVED',
      closed: 'CLOSED',
    };

    return {
      tenantId,
      customerId,
      ticketNumber: `ZD-${zd.id}`,
      subject: zd.subject,
      description: zd.description || 'No description provided.',
      priority: priorityMap[zd.priority] || 'MEDIUM',
      status: statusMap[zd.status] || 'OPEN',
      channel: 'EMAIL',
      tags: ['ZENDESK_IMPORT', ...zd.tags],
      createdAt: zd.created_at,
      updatedAt: zd.updated_at,
    };
  }
}
