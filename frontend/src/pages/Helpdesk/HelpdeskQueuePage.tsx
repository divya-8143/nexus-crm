import React, { useState } from 'react';
import { SupportTicket } from '@nexus/shared';
import { Table, Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';

export const HelpdeskQueuePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tick_101',
      tenantId: 'tenant_1',
      customerId: 'cust_101',
      customerName: 'Acme Corporation',
      ticketNumber: 'TICK-81924',
      subject: 'SSO SAML Integration Certificate Rotation',
      description: 'Requesting assistance updating IdP metadata certificate.',
      priority: 'HIGH',
      status: 'OPEN',
      channel: 'WEB',
      assignedAgentName: 'Alex Mercer',
      slaDueDate: '2026-08-28T10:00:00Z',
      isSlaBreached: false,
      tags: ['SECURITY', 'SSO'],
      createdAt: '2026-08-27T08:00:00Z',
      updatedAt: '2026-08-27T08:30:00Z',
    },
    {
      id: 'tick_102',
      tenantId: 'tenant_1',
      customerId: 'cust_102',
      customerName: 'Stark Industries',
      ticketNumber: 'TICK-72819',
      subject: 'API Rate Limit Threshold Increase for Telemetry Stream',
      description: 'Need throughput boosted from 10k to 50k req/min for product launch.',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      channel: 'API',
      assignedAgentName: 'Tony Stark',
      slaDueDate: '2026-08-27T18:00:00Z',
      isSlaBreached: false,
      tags: ['API', 'INFRASTRUCTURE'],
      createdAt: '2026-08-27T09:15:00Z',
      updatedAt: '2026-08-27T09:45:00Z',
    },
  ]);

  const columns: Column<SupportTicket>[] = [
    {
      header: 'Ticket ID & Subject',
      accessor: (t) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{t.ticketNumber}</span>
            <span className="text-slate-500 font-normal">| {t.subject}</span>
          </div>
          <div className="text-xs text-slate-500">{t.customerName} • Channel: {t.channel}</div>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessor: (t) => {
        const variantMap: Record<string, any> = {
          URGENT: 'danger',
          HIGH: 'warning',
          MEDIUM: 'primary',
          LOW: 'neutral',
        };
        return <Badge variant={variantMap[t.priority] || 'neutral'}>{t.priority}</Badge>;
      },
    },
    {
      header: 'Status',
      accessor: (t) => {
        const variantMap: Record<string, any> = {
          OPEN: 'neutral',
          IN_PROGRESS: 'primary',
          RESOLVED: 'success',
          CLOSED: 'purple',
        };
        return <Badge variant={variantMap[t.status] || 'neutral'}>{t.status}</Badge>;
      },
    },
    {
      header: 'SLA Status',
      accessor: (t) => (
        <div className="flex items-center gap-2 text-xs font-semibold">
          {t.isSlaBreached ? (
            <Badge variant="danger">BREACHED</Badge>
          ) : (
            <Badge variant="success">ON TRACK</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Assigned Agent',
      accessor: (t) => t.assignedAgentName || 'Unassigned',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Support Helpdesk & SLA Console</h1>
          <p className="text-sm text-slate-500">Omnichannel support ticketing queue and SLA breach countdowns</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ New Support Ticket</Button>
      </div>

      <Table columns={columns} data={tickets} keyExtractor={(t) => t.id} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Open Support Ticket"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Create Ticket</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Subject / Summary" placeholder="Issue description summary" />
          <Input label="Customer Account" placeholder="Customer Name or ID" />
        </div>
      </Modal>
    </div>
  );
};
