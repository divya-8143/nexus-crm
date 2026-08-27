import React, { useState } from 'react';
import { Customer } from '@nexus/shared';
import { Table, Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';

export const CustomerListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'cust_101',
      tenantId: 'tenant_01',
      accountNumber: 'ACC-849102',
      name: 'Acme Corporation',
      companyName: 'Acme Global Holdings',
      industry: 'Enterprise Software',
      email: 'contact@acmeglobal.com',
      phone: '+1 (555) 234-5678',
      lifecycleStage: 'CUSTOMER',
      leadScore: 92,
      annualRevenue: 15000000,
      currency: 'USD',
      assignedAgentName: 'Sarah Connor',
      billingAddress: { street1: '100 Silicon Way', city: 'San Francisco', state: 'CA', postalCode: '94105', country: 'USA' },
      shippingAddress: { street1: '100 Silicon Way', city: 'San Francisco', state: 'CA', postalCode: '94105', country: 'USA' },
      customFields: {},
      tags: ['ENTERPRISE', 'TIER_1', 'STRATEGIC'],
      isVip: true,
      status: 'ACTIVE',
      createdAt: '2026-01-15T09:00:00Z',
      updatedAt: '2026-08-20T14:30:00Z',
    },
    {
      id: 'cust_102',
      tenantId: 'tenant_01',
      accountNumber: 'ACC-571932',
      name: 'Stark Industries',
      companyName: 'Stark Dynamics',
      industry: 'Defense & Robotics',
      email: 'pepper.potts@starkindustries.io',
      phone: '+1 (555) 890-1234',
      lifecycleStage: 'OPPORTUNITY',
      leadScore: 98,
      annualRevenue: 85000000,
      currency: 'USD',
      assignedAgentName: 'Tony Stark',
      billingAddress: { street1: '10880 Wilshire Blvd', city: 'Los Angeles', state: 'CA', postalCode: '90024', country: 'USA' },
      shippingAddress: { street1: '10880 Wilshire Blvd', city: 'Los Angeles', state: 'CA', postalCode: '90024', country: 'USA' },
      customFields: {},
      tags: ['STRATEGIC', 'VIP'],
      isVip: true,
      status: 'ACTIVE',
      createdAt: '2026-02-10T11:00:00Z',
      updatedAt: '2026-08-22T16:00:00Z',
    },
    {
      id: 'cust_103',
      tenantId: 'tenant_01',
      accountNumber: 'ACC-294819',
      name: 'Wayne Enterprises',
      companyName: 'Wayne Tech',
      industry: 'Conglomerate',
      email: 'lucius.fox@waynecorp.com',
      phone: '+1 (555) 432-8765',
      lifecycleStage: 'CUSTOMER',
      leadScore: 88,
      annualRevenue: 42000000,
      currency: 'USD',
      assignedAgentName: 'Bruce Wayne',
      billingAddress: { street1: 'Wayne Tower', city: 'Gotham', state: 'NJ', postalCode: '07001', country: 'USA' },
      shippingAddress: { street1: 'Wayne Tower', city: 'Gotham', state: 'NJ', postalCode: '07001', country: 'USA' },
      customFields: {},
      tags: ['TIER_1'],
      isVip: true,
      status: 'ACTIVE',
      createdAt: '2026-03-01T10:00:00Z',
      updatedAt: '2026-08-25T12:00:00Z',
    },
  ]);

  const columns: Column<Customer>[] = [
    {
      header: 'Account / Company',
      accessor: (c) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{c.name}</span>
            {c.isVip && <Badge variant="warning" size="sm">VIP</Badge>}
          </div>
          <div className="text-xs text-slate-500">{c.accountNumber} • {c.industry}</div>
        </div>
      ),
    },
    {
      header: 'Lifecycle Stage',
      accessor: (c) => {
        const variantMap: Record<string, any> = {
          CUSTOMER: 'success',
          OPPORTUNITY: 'primary',
          LEAD: 'neutral',
          CHURNED: 'danger',
        };
        return <Badge variant={variantMap[c.lifecycleStage] || 'neutral'}>{c.lifecycleStage}</Badge>;
      },
    },
    {
      header: 'Lead Score',
      accessor: (c) => (
        <div className="flex items-center gap-2">
          <div className="w-12 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${c.leadScore > 80 ? 'bg-emerald-500' : 'bg-sky-500'}`}
              style={{ width: `${c.leadScore}%` }}
            />
          </div>
          <span className="font-bold text-xs">{c.leadScore}</span>
        </div>
      ),
    },
    {
      header: 'Annual Revenue',
      accessor: (c) => (
        <span className="font-semibold">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: c.currency, maximumFractionDigits: 0 }).format(c.annualRevenue)}
        </span>
      ),
    },
    {
      header: 'Assigned Agent',
      accessor: (c) => c.assignedAgentName || 'Unassigned',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Customer 360 Intelligence</h1>
          <p className="text-sm text-slate-500">Comprehensive view of accounts, hierarchies, and relationship scoring</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ Add New Customer</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-80">
          <Input
            placeholder="Search by name, email, or account..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table columns={columns} data={customers} keyExtractor={(c) => c.id} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Enterprise Customer"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Create Customer</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Company / Customer Name" placeholder="Acme International" />
          <Input label="Primary Corporate Email" placeholder="contact@acme.com" type="email" />
          <Input label="Industry Vertical" placeholder="Enterprise SaaS" />
          <Input label="Estimated Annual Revenue (USD)" placeholder="5000000" type="number" />
        </div>
      </Modal>
    </div>
  );
};
