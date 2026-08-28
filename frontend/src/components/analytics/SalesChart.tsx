import React, { useState } from 'react';
import { useCrm, SalesPeriodData } from '../../context/CrmContext';

export const SalesOverviewChart: React.FC = () => {
  const { weeklySalesData, monthlySalesData, yearlySalesData, currencySymbol } = useCrm();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const currentData: SalesPeriodData[] =
    period === 'weekly'
      ? weeklySalesData
      : period === 'monthly'
      ? monthlySalesData
      : yearlySalesData;

  const maxSale = Math.max(...currentData.map((d) => d.sales), 1000);
  const totalPeriodSales = currentData.reduce((sum, d) => sum + d.sales, 0);

  return (
    <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-bold text-white">Sales Overview</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30">
              {currencySymbol}{totalPeriodSales.toLocaleString()} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Calculated directly from customer orders</p>
        </div>

        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 self-start sm:self-auto">
          {[
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriod(tab.id as any)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === tab.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Bar / Area Chart */}
      <div className="pt-6">
        <div className="h-56 flex items-end gap-3 sm:gap-6 justify-between px-2">
          {currentData.map((item, idx) => {
            const heightPercent = Math.max(12, Math.round((item.sales / maxSale) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {/* Hover Tooltip Value */}
                <div className="text-[11px] font-bold text-slate-300 opacity-80 group-hover:opacity-100 group-hover:text-sky-400 transition-all">
                  {currencySymbol}{item.sales >= 1000 ? `${(item.sales / 1000).toFixed(0)}k` : item.sales}
                </div>

                {/* Animated Gradient Bar */}
                <div className="w-full max-w-[48px] bg-slate-900 rounded-t-lg overflow-hidden border border-slate-800/80 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-sky-600 via-sky-500 to-indigo-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-lg shadow-sky-600/20"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Period Label */}
                <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
