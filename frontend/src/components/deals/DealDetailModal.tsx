import React from 'react';
import { Deal } from '@nexus/shared';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export interface DealDetailModalProps {
  deal: Deal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({ deal, isOpen, onClose }) => {
  if (!deal) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={deal.title} maxWidth="lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase">Account</span>
            <div className="font-bold text-slate-900 dark:text-slate-100">{deal.customerName}</div>
          </div>
          <Badge variant="primary">{deal.stage}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-400 block">Deal Value</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ${deal.dealValue.toLocaleString()} {deal.currency}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Weighted Forecast</span>
            <span className="text-lg font-bold text-emerald-600">
              ${(deal.weightedValue || 0).toLocaleString()} {deal.currency}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Win Probability</span>
            <span className="font-semibold">{deal.winProbability}%</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Expected Close Date</span>
            <span className="font-semibold">{deal.expectedCloseDate}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="primary">Edit Deal</Button>
        </div>
      </div>
    </Modal>
  );
};
