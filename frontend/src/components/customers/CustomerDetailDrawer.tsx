import React from 'react';
import { Customer } from '@nexus/shared';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export interface CustomerDetailDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDetailDrawer: React.FC<CustomerDetailDrawerProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  if (!customer) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={customer.name} width="lg">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-mono">{customer.accountNumber}</div>
            <div className="font-bold text-lg text-slate-900 dark:text-slate-100">{customer.companyName || customer.name}</div>
            <div className="text-xs text-slate-500">{customer.industry}</div>
          </div>
          <Badge variant="success">{customer.lifecycleStage}</Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Corporate Email</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{customer.email}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Phone Number</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{customer.phone || 'N/A'}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Website</span>
              <a href={customer.website} target="_blank" rel="noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">
                {customer.website || 'N/A'}
              </a>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Assigned Representative</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{customer.assignedAgentName || 'Unassigned'}</span>
            </div>
          </div>
        </div>

        {/* Financial & Scoring */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Financial & Relationship Metrics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 block">Annual Revenue</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                ${customer.annualRevenue.toLocaleString()} {customer.currency}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 block">Lead Score</span>
              <span className="text-base font-extrabold text-emerald-600">
                {customer.leadScore} / 100
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {customer.tags && customer.tags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Account Tags</h4>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
          <Button variant="primary" size="sm" className="flex-1">+ Log Activity</Button>
          <Button variant="outline" size="sm" className="flex-1">+ New Deal</Button>
        </div>
      </div>
    </Drawer>
  );
};
