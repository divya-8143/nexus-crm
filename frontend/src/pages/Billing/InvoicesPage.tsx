import React, { useState } from 'react';
import { Invoice } from '@nexus/shared';
import { Table, Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv_101',
      tenantId: 'tenant_1',
      customerId: 'cust_101',
      customerName: 'Acme Corporation',
      invoiceNumber: 'INV-2026-8912',
      status: 'PAID',
      issueDate: '2026-08-01',
      dueDate: '2026-08-31',
      subtotal: 12000,
      taxAmount: 864,
      discountAmount: 1200,
      totalAmount: 11664,
      currency: 'USD',
      lineItems: [],
      paymentTerms: 'NET_30',
      paidAt: '2026-08-15T14:00:00Z',
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z',
    },
    {
      id: 'inv_102',
      tenantId: 'tenant_1',
      customerId: 'cust_102',
      customerName: 'Stark Industries',
      invoiceNumber: 'INV-2026-9041',
      status: 'SENT',
      issueDate: '2026-08-15',
      dueDate: '2026-09-15',
      subtotal: 45000,
      taxAmount: 3240,
      discountAmount: 0,
      totalAmount: 48240,
      currency: 'USD',
      lineItems: [],
      paymentTerms: 'NET_30',
      createdAt: '2026-08-15T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z',
    },
  ]);

  const columns: Column<Invoice>[] = [
    {
      header: 'Invoice #',
      accessor: (i) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100">{i.invoiceNumber}</span>
          <div className="text-xs text-slate-500">{i.customerName}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (i) => {
        const variantMap: Record<string, any> = {
          PAID: 'success',
          SENT: 'primary',
          DRAFT: 'neutral',
          OVERDUE: 'danger',
        };
        return <Badge variant={variantMap[i.status] || 'neutral'}>{i.status}</Badge>;
      },
    },
    {
      header: 'Issue / Due Date',
      accessor: (i) => (
        <div className="text-xs">
          <div>Issued: {i.issueDate}</div>
          <div className="text-slate-500">Due: {i.dueDate}</div>
        </div>
      ),
    },
    {
      header: 'Total Amount',
      accessor: (i) => (
        <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
          ${i.totalAmount.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Financial Invoicing & Billing</h1>
          <p className="text-sm text-slate-500">Multi-currency line item invoicing, automated taxes, and receipt ledgers</p>
        </div>
        <Button variant="primary">+ Create Invoice</Button>
      </div>

      <Table columns={columns} data={invoices} keyExtractor={(i) => i.id} />
    </div>
  );
};
