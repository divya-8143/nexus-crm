import React, { useState } from 'react';
import { useCrm, SalesPeriodData } from '../../context/CrmContext';

export const SalesOverviewChart: React.FC = () => {
  const { weeklySalesData, monthlySalesData, yearlySalesData, currencySymbol } = useCrm();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentData: SalesPeriodData[] =
    period === 'weekly'
      ? weeklySalesData
      : period === 'monthly'
      ? monthlySalesData
      : yearlySalesData;

  const totalPeriodSales = currentData.reduce((sum, d) => sum + d.sales, 0);
  const rawMax = Math.max(...currentData.map((d) => d.sales), 10000);
  // Round max to neat tick ceiling
  const maxSale = Math.ceil(rawMax / 10000) * 10000 || 50000;

  // Y-axis grid ticks (4 steps: 100%, 75%, 50%, 25%, 0%)
  const yTicks = [
    maxSale,
    Math.round(maxSale * 0.75),
    Math.round(maxSale * 0.5),
    Math.round(maxSale * 0.25),
    0,
  ];

  return (
    <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl space-y-6">
      {/* Header with Title and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-extrabold text-white">Sales Overview</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-bold border border-sky-500/30">
              {period.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic sales calculated from customer orders
          </p>
        </div>

        {/* The 3 Tabs: [ Weekly ] [ Monthly ] [ Yearly ] */}
        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 self-start sm:self-auto shadow-inner">
          {(['weekly', 'monthly', 'yearly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setPeriod(tab);
                setHoveredIndex(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all duration-200 ${
                period === tab
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 ring-1 ring-white/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab === 'weekly' ? 'Weekly' : tab === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas with Clearly Visible X & Y Axes */}
      <div className="relative pt-2">
        <div className="flex gap-4">
          {/* Y-Axis Column */}
          <div className="flex flex-col justify-between text-right text-[11px] font-mono text-slate-400 h-64 select-none pr-2 shrink-0 border-r border-slate-800/80">
            {yTicks.map((tick, idx) => (
              <span key={idx} className="leading-none">
                {currencySymbol}
                {tick >= 100000
                  ? `${(tick / 100000).toFixed(1)}L`
                  : tick >= 1000
                  ? `${(tick / 1000).toFixed(0)}k`
                  : tick}
              </span>
            ))}
          </div>

          {/* Graph Grid & Bars/Points Area */}
          <div className="flex-1 relative h-64 flex flex-col justify-between">
            {/* Horizontal Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {yTicks.map((_, idx) => (
                <div key={idx} className="w-full border-b border-slate-800/60 border-dashed" />
              ))}
            </div>

            {/* Interactive Data Bars Container */}
            <div className="relative h-full flex items-end justify-around gap-2 px-2 z-10">
              {currentData.map((item, idx) => {
                const heightPercent = maxSale > 0 ? Math.min(100, Math.max(4, Math.round((item.sales / maxSale) * 100))) : 4;
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  >
                    {/* Floating Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full mb-3 z-30 bg-slate-900 text-white text-xs rounded-xl py-2 px-3 shadow-2xl border border-sky-500/50 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                        <div className="font-bold text-sky-400">{item.label}</div>
                        <div className="text-white font-extrabold text-sm mt-0.5 font-mono">
                          {currencySymbol}{item.sales.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {item.orderCount} {item.orderCount === 1 ? 'order' : 'orders'} placed
                        </div>
                      </div>
                    )}

                    {/* Bar Component with Hover Glow */}
                    <div
                      className={`w-full ${
                        period === 'weekly'
                          ? 'max-w-[42px]'
                          : period === 'monthly'
                          ? 'max-w-[26px]'
                          : 'max-w-[56px]'
                      } rounded-t-xl overflow-hidden transition-all duration-300 flex items-end ${
                        isHovered ? 'ring-2 ring-sky-400 brightness-110 scale-[1.03]' : ''
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-sky-700 via-sky-500 to-indigo-400 shadow-lg shadow-sky-600/25 rounded-t-xl" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* X-Axis Labels Row */}
        <div className="flex gap-4 pt-3">
          <div className="w-14 shrink-0" /> {/* Spacer for Y-axis offset */}
          <div className="flex-1 flex justify-around px-2 border-t border-slate-800">
            {currentData.map((item, idx) => (
              <div
                key={item.label}
                className={`text-center pt-2 text-xs font-semibold transition-colors duration-150 ${
                  hoveredIndex === idx
                    ? 'text-sky-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Responsive Label shortening for mobile */}
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Footer: Total Sales */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/40 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total {period.charAt(0).toUpperCase() + period.slice(1)} Sales:
          </span>
          <span className="text-lg font-extrabold text-emerald-400 font-mono">
            {currencySymbol}{totalPeriodSales.toLocaleString()}
          </span>
        </div>

        <div className="text-xs text-slate-400">
          Hover over any point/bar to inspect exact daily/monthly breakdown
        </div>
      </div>
    </div>
  );
};
