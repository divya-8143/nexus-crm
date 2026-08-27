import React, { useState } from 'react';
import { AuditLogEntry } from '@nexus/shared';
import { Table, Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([
    {
      id: 'aud_101',
      tenantId: 'tenant_1',
      actorEmail: 'admin@nexuscrm.io',
      actionType: 'UPDATE',
      entityType: 'CUSTOMER',
      entityId: 'cust_101',
      ipAddress: '192.168.1.1',
      createdAt: '2026-08-27T10:15:00Z',
    },
    {
      id: 'aud_102',
      tenantId: 'tenant_1',
      actorEmail: 'tony.stark@stark.io',
      actionType: 'STATUS_CHANGE',
      entityType: 'DEAL',
      entityId: 'deal_2',
      ipAddress: '10.0.0.45',
      createdAt: '2026-08-27T11:30:00Z',
    },
  ]);

  const columns: Column<AuditLogEntry>[] = [
    {
      header: 'Timestamp',
      accessor: (l) => <span className="text-xs text-slate-500">{new Date(l.createdAt).toLocaleString()}</span>,
    },
    {
      header: 'Actor',
      accessor: (l) => <span className="font-semibold">{l.actorEmail || 'System'}</span>,
    },
    {
      header: 'Action',
      accessor: (l) => <Badge variant="primary">{l.actionType}</Badge>,
    },
    {
      header: 'Entity Type & ID',
      accessor: (l) => (
        <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
          {l.entityType} ({l.entityId})
        </span>
      ),
    },
    {
      header: 'IP Address',
      accessor: (l) => <span className="font-mono text-xs">{l.ipAddress || 'Internal'}</span>,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Audit & Compliance Ledger</h1>
        <p className="text-sm text-slate-500">Tamper-evident system activity and regulatory change verification</p>
      </div>

      <Table columns={columns} data={logs} keyExtractor={(l) => l.id} />
    </div>
  );
};
