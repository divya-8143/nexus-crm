import React from 'react';
import { useCrm, Order } from '../../context/CrmContext';
import { SalesOverviewChart } from '../../components/analytics/SalesChart';
import { DeliveryStatusBadge } from '../../components/common/StatusBadges';
import { Button } from '../../components/common/Button';

export const DashboardPage: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const {
    totalCustomersCount,
    totalOrdersCount,
    deliveredOrdersCount,
    overallSatisfactionPct,
    satisfiedPct,
    neutralPct,
    unsatisfiedPct,
    orders,
    currencySymbol,
  } = useCrm();

  const recentOrders = orders.slice(0, 5);

  const summaryCards = [
    {
      title: 'Total Customers',
      value: totalCustomersCount.toLocaleString(),
      subtitle: 'Registered customer accounts',
      icon: '👥',
      accentColor: 'from-blue-500 to-sky-500',
    },
    {
      title: 'Total Orders',
      value: totalOrdersCount.toLocaleString(),
      subtitle: 'All-time placed orders',
      icon: '📦',
      accentColor: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Delivered Orders',
      value: deliveredOrdersCount.toLocaleString(),
      subtitle: 'Successfully completed delivery',
      icon: '✔',
      accentColor: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Customer Satisfaction',
      value: `${overallSatisfactionPct}%`,
      subtitle: 'Positive feedback rating',
      icon: '⭐',
      accentColor: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Back Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Welcome Back</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white mt-0.5">
            Customer & Sales Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time customer metrics, order receipt tracking, and sales performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onNavigate && (
            <>
              <Button variant="outline" size="sm" onClick={() => onNavigate('orders')}>
                View All Orders
              </Button>
              <Button variant="primary" size="sm" onClick={() => onNavigate('customers')}>
                + Manage Customers
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 4 Summary Cards (Exact required metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <span className="text-xl p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                {card.icon}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
              <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
            </div>

            {/* Bottom accent glow */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accentColor}`}
            />
          </div>
        ))}
      </div>

      {/* Sales Overview Section with Weekly/Monthly/Yearly Filter */}
      <SalesOverviewChart />

      {/* Bottom Grid: Recent Orders & Customer Satisfaction Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white">Recent Orders</h3>
              <p className="text-xs text-slate-400 mt-0.5">Live order tracking and receipt status</p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('orders')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                View all orders →
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 font-bold font-mono text-sky-400">{ord.id}</td>
                    <td className="py-3.5 font-semibold text-slate-200">{ord.customerName}</td>
                    <td className="py-3.5 text-slate-300 truncate max-w-[180px]">{ord.product}</td>
                    <td className="py-3.5 font-bold text-white">
                      {currencySymbol}{ord.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5">
                      <DeliveryStatusBadge status={ord.deliveryStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Satisfaction Breakdown (1 Column) */}
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white">Customer Satisfaction</h3>
              <span className="text-xl">⭐</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Aggregated feedback breakdown</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span>😊</span> Satisfied
                  </span>
                  <span className="text-emerald-400 font-bold">{satisfiedPct}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${satisfiedPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span>😐</span> Neutral
                  </span>
                  <span className="text-amber-400 font-bold">{neutralPct}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${neutralPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span>😞</span> Unsatisfied
                  </span>
                  <span className="text-rose-400 font-bold">{unsatisfiedPct}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${unsatisfiedPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6">
            {onNavigate && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onNavigate('satisfaction')}
              >
                View Customer Reviews
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
