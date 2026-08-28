import React from 'react';
import { useCrm } from '../../context/CrmContext';
import { SalesOverviewChart } from '../../components/analytics/SalesChart';

export const SalesPage: React.FC = () => {
  const { totalSalesAmount, totalOrdersCount, averageOrderValue, currencySymbol, orders } = useCrm();

  const validOrders = orders.filter(
    (o) => o.deliveryStatus !== 'Cancelled' && o.paymentStatus !== 'Failed'
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Sales & Revenue Reports</h1>
          <p className="text-xs text-slate-400 mt-1">
            Weekly, monthly, and yearly sales totals calculated from customer orders
          </p>
        </div>
      </div>

      {/* 3 Core Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sales Revenue</span>
          <span className="text-3xl font-extrabold text-white mt-2 block tracking-tight">
            {currencySymbol}{totalSalesAmount.toLocaleString()}
          </span>
          <p className="text-xs text-emerald-400 mt-1">From {validOrders.length} valid completed orders</p>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Number of Orders</span>
          <span className="text-3xl font-extrabold text-white mt-2 block tracking-tight">
            {totalOrdersCount}
          </span>
          <p className="text-xs text-sky-400 mt-1">All placed orders</p>
        </div>

        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Order Value (AOV)</span>
          <span className="text-3xl font-extrabold text-white mt-2 block tracking-tight">
            {currencySymbol}{averageOrderValue.toLocaleString()}
          </span>
          <p className="text-xs text-indigo-400 mt-1">Per valid completed customer order</p>
        </div>
      </div>

      {/* Sales Overview Chart (Weekly / Monthly / Yearly) */}
      <SalesOverviewChart />
    </div>
  );
};
