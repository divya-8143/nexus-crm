import React, { useState } from 'react';
import { Deal, DealStage } from '@nexus/shared';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

export const DealsBoardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 'deal_1',
      tenantId: 'tenant_1',
      customerId: 'cust_101',
      customerName: 'Acme Corporation',
      title: 'Global ERP Modernization',
      dealValue: 240000,
      currency: 'USD',
      stage: 'QUALIFICATION',
      winProbability: 40,
      expectedCloseDate: '2026-09-30',
      pipelineType: 'ENTERPRISE',
      customMetrics: {},
      weightedValue: 96000,
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-10T00:00:00Z',
    },
    {
      id: 'deal_2',
      tenantId: 'tenant_1',
      customerId: 'cust_102',
      customerName: 'Stark Industries',
      title: 'Autonomous Fleet Telemetry Suite',
      dealValue: 750000,
      currency: 'USD',
      stage: 'PROPOSAL',
      winProbability: 60,
      expectedCloseDate: '2026-10-15',
      pipelineType: 'STRATEGIC',
      customMetrics: {},
      weightedValue: 450000,
      createdAt: '2026-08-05T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z',
    },
    {
      id: 'deal_3',
      tenantId: 'tenant_1',
      customerId: 'cust_103',
      customerName: 'Wayne Enterprises',
      title: 'Security Operations Cloud AI',
      dealValue: 500000,
      currency: 'USD',
      stage: 'NEGOTIATION',
      winProbability: 80,
      expectedCloseDate: '2026-09-15',
      pipelineType: 'ENTERPRISE',
      customMetrics: {},
      weightedValue: 400000,
      createdAt: '2026-07-20T00:00:00Z',
      updatedAt: '2026-08-20T00:00:00Z',
    },
  ]);

  const stages: { stage: DealStage; label: string; color: string }[] = [
    { stage: 'DISCOVERY', label: 'Discovery', color: 'border-slate-400' },
    { stage: 'QUALIFICATION', label: 'Qualification', color: 'border-sky-400' },
    { stage: 'PROPOSAL', label: 'Proposal Submitted', color: 'border-indigo-400' },
    { stage: 'NEGOTIATION', label: 'Negotiation', color: 'border-amber-400' },
    { stage: 'CLOSED_WON', label: 'Closed Won', color: 'border-emerald-500' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sales Pipeline Kanban</h1>
          <p className="text-sm text-slate-500">Track deal progress, revenue velocity, and stage conversion probability</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ Create Opportunity</Button>
      </div>

      {/* Kanban Stage Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto min-h-[650px]">
        {stages.map((col) => {
          const colDeals = deals.filter((d) => d.stage === col.stage);
          const colTotal = colDeals.reduce((sum, d) => sum + d.dealValue, 0);

          return (
            <div
              key={col.stage}
              className="bg-slate-100 dark:bg-slate-850 rounded-xl p-4 flex flex-col gap-3 border border-slate-200 dark:border-slate-750"
            >
              <div className={`border-t-4 ${col.color} pt-2`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">{col.label}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">
                    {colDeals.length}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1">
                  ${(colTotal / 1000).toFixed(0)}k total
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                {colDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition cursor-pointer"
                  >
                    <div className="text-xs text-sky-600 dark:text-sky-400 font-semibold">{deal.customerName}</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{deal.title}</h4>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                        ${deal.dealValue.toLocaleString()}
                      </span>
                      <Badge variant="primary">{deal.winProbability}% win</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Sales Opportunity"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Save Opportunity</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Opportunity Title" placeholder="Strategic Expansion" />
          <Input label="Deal Value (USD)" placeholder="150000" type="number" />
          <Input label="Expected Close Date" type="date" />
        </div>
      </Modal>
    </div>
  );
};
