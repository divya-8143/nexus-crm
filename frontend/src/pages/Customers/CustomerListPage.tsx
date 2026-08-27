import React, { useState } from 'react';
import { Customer } from '@nexus/shared';
import { Table, Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { CustomerCreateWizard } from '../../components/forms/CustomerCreateWizard';
import { CustomerDetailDrawer } from '../../components/customers/CustomerDetailDrawer';

export const CustomerListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'cust_101',
      tenantId: 'tenant_01',
      accountNumber: 'ACC-849102',
      name: 'Acme Corporation',
      companyName: 'Acme Global Holdings LLC',
      industry: 'Enterprise SaaS',
      email: 'contact@acmeglobal.com',
      phone: '+1 (555) 234-5678',
      website: 'https://acmeglobal.com',
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
      companyName: 'Stark Dynamics Defense',
      industry: 'Aerospace & Defense',
      email: 'pepper.potts@starkindustries.io',
      phone: '+1 (555) 890-1234',
      website: 'https://starkindustries.io',
      lifecycleStage: 'OPPORTUNITY',
      leadScore: 98,
      annualRevenue: 85000000,
      currency: 'USD',
      assignedAgentName: 'Tony Stark',
      billingAddress: { street1: '10880 Wilshire Blvd', city: 'Los Angeles', state: 'CA', postalCode: '90024', country: 'USA' },
      shippingAddress: { street1: '10880 Wilshire Blvd', city: 'Los Angeles', state: 'CA', postalCode: '90024', country: 'USA' },
      customFields: {},
      tags: ['STRATEGIC', 'VIP', 'DEFENSE'],
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
      companyName: 'Wayne Technologies Corp',
      industry: 'Financial Services',
      email: 'lucius.fox@waynecorp.com',
      phone: '+1 (555) 432-8765',
      website: 'https://waynecorp.com',
      lifecycleStage: 'CUSTOMER',
      leadScore: 88,
      annualRevenue: 42000000,
      currency: 'USD',
      assignedAgentName: 'Bruce Wayne',
      billingAddress: { street1: 'Wayne Tower', city: 'Gotham', state: 'NJ', postalCode: '07001', country: 'USA' },
      shippingAddress: { street1: 'Wayne Tower', city: 'Gotham', state: 'NJ', postalCode: '07001', country: 'USA' },
      customFields: {},
      tags: ['TIER_1', 'BANKING'],
      isVip: true,
      status: 'ACTIVE',
      createdAt: '2026-03-01T10:00:00Z',
      updatedAt: '2026-08-25T12:00:00Z',
    },
  ]);

  const handleRowClick = (c: Customer) => {
    setSelectedCustomer(c);
    setIsDrawerOpen(true);
  };

  const handleCreateCustomer = (newCust: Partial<Customer>) => {
    const created: Customer = {
      id: `cust_${Date.now()}`,
      tenantId: 'tenant_01',
      accountNumber: `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
      name: newCust.name || 'New Enterprise',
      companyName: newCust.companyName,
      industry: newCust.industry,
      email: newCust.email || '',
      phone: newCust.phone,
      website: newCust.website,
      lifecycleStage: newCust.lifecycleStage || 'LEAD',
      leadScore: 75,
      annualRevenue: newCust.annualRevenue || 0,
      currency: 'USD',
      assignedAgentName: 'Alexander Pierce',
      billingAddress: newCust.billingAddress || ({} as any),
      shippingAddress: newCust.shippingAddress || ({} as any),
      customFields: {},
      tags: newCust.tags || ['NEW'],
      isVip: newCust.isVip || false,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCustomers((prev) => [created, ...prev]);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<Customer>[] = [
    {
      header: 'Account / Legal Entity',
      accessor: (c) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400">
            {c.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <span>{c.name}</span>
              {c.isVip && <Badge variant="warning" size="sm">VIP</Badge>}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">{c.accountNumber} • {c.industry}</div>
          </div>
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
        <div className="flex items-center gap-2.5">
          <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full ${c.leadScore > 80 ? 'bg-emerald-500' : 'bg-sky-500'}`}
              style={{ width: `${c.leadScore}%` }}
            />
          </div>
          <span className="font-bold text-xs font-mono text-slate-200">{c.leadScore}</span>
        </div>
      ),
    },
    {
      header: 'Annual Revenue',
      accessor: (c) => (
        <span className="font-bold text-white font-mono">
          ${c.annualRevenue.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Assigned Executive',
      accessor: (c) => (
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
            {c.assignedAgentName?.charAt(0) || 'U'}
          </span>
          <span className="text-xs text-slate-300">{c.assignedAgentName || 'Unassigned'}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Customer 360 Directory</h1>
          <p className="text-sm text-slate-400 mt-1">Hierarchical organization trees, contact decision matrices, and lead scoring</p>
        </div>
        <Button variant="primary" onClick={() => setIsWizardOpen(true)}>+ Add Enterprise Account</Button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="w-96">
          <input
            type="text"
            placeholder="Filter accounts by name, email, or account number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredCustomers}
        keyExtractor={(c) => c.id}
        onRowClick={handleRowClick}
      />

      {/* Customer Creation Multi-Step Wizard */}
      <CustomerCreateWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccess={handleCreateCustomer}
      />

      {/* Customer 360 Detail Drawer */}
      <CustomerDetailDrawer
        customer={selectedCustomer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
