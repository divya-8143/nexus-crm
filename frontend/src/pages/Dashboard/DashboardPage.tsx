import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Quarterly');

  const stats = [
    { label: 'Total Enterprise Accounts', value: '1,428', change: '+14.2%', isPositive: true },
    { label: 'Active Sales Pipeline', value: '$8,450,000', change: '+22.5%', isPositive: true },
    { label: 'Weighted Revenue Forecast', value: '$4,180,000', change: '+8.1%', isPositive: true },
    { label: 'SLA Breach Rate', value: '1.8%', change: '-0.6%', isPositive: true },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Executive Performance Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time telemetry, revenue velocity, and customer health metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
            {['Monthly', 'Quarterly', 'Yearly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  timeRange === range
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm">+ New Deal</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition"
          >
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{stat.value}</span>
              <Badge variant={stat.isPositive ? 'success' : 'danger'}>{stat.change}</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">Pipeline Velocity Funnel</h3>
          <div className="h-64 flex items-end justify-between gap-4 pt-8">
            {[
              { stage: 'Discovery', count: 120, height: '80%' },
              { stage: 'Qualification', count: 84, height: '65%' },
              { stage: 'Proposal', count: 52, height: '45%' },
              { stage: 'Negotiation', count: 31, height: '30%' },
              { stage: 'Won', count: 24, height: '22%' },
            ].map((col, cIdx) => (
              <div key={cIdx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{col.count} deals</span>
                <div
                  className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all"
                  style={{ height: col.height }}
                />
                <span className="text-xs font-medium text-slate-500">{col.stage}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Customer Health & Satisfaction</h3>
            <p className="text-xs text-slate-500 mb-6">Aggregated NPS and CSAT response scores</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Customer Satisfaction (CSAT)</span>
                  <span className="text-emerald-500">96.4%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '96.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Net Retention Rate (NRR)</span>
                  <span className="text-sky-500">128%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Avg Response Speed</span>
                  <span className="text-purple-500">14 min</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-6">View Comprehensive Analytics</Button>
        </div>
      </div>
    </div>
  );
};
