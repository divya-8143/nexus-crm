import React from 'react';
import { Badge } from './Badge';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
}) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{value}</span>
        {change && <Badge variant={isPositive ? 'success' : 'danger'}>{change}</Badge>}
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
};
