import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Quarterly');

  const stats = [
    { label: 'Total Enterprise Accounts', value: '1,428', change: '+14.2%', isPositive: true, sub: '84 new this month', icon: '🏢' },
    { label: 'Active Pipeline Value', value: '$8,450,000', change: '+22.5%', isPositive: true, sub: '184 active opportunities', icon: '💼' },
    { label: 'Weighted Forecast (p50)', value: '$4,180,000', change: '+8.1%', isPositive: true, sub: 'Monte Carlo simulation', icon: '📈' },
    { label: 'SLA Breach Rate', value: '1.8%', change: '-0.6%', isPositive: true, sub: 'Target: < 2.0%', icon: '⚡' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Executive Performance Dashboard</span>
            <Badge variant="primary" size="sm">LIVE TELEMETRY</Badge>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time revenue velocity, conversion funnels, and customer health scoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800">
            {['Monthly', 'Quarterly', 'Yearly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="primary" size="sm">+ New Deal Opportunity</Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-950/70 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
              <span className="text-xl p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                {stat.icon}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</span>
              <Badge variant={stat.isPositive ? 'success' : 'danger'}>{stat.change}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Column */}
        <div className="lg:col-span-2 p-6 bg-slate-950/70 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Sales Pipeline Conversion Funnel</h3>
              <p className="text-xs text-slate-400 mt-0.5">Stage velocity and probability weighting</p>
            </div>
            <Badge variant="primary">Stage Duration: 18d Avg</Badge>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { stage: 'Discovery & Initial Contact', count: 120, val: '$3.4M', width: '100%', color: 'from-sky-500 to-sky-600' },
              { stage: 'Qualification & Technical Proof', count: 84, val: '$2.8M', width: '70%', color: 'from-indigo-500 to-indigo-600' },
              { stage: 'Proposal & Procurement Review', count: 52, val: '$1.9M', width: '45%', color: 'from-purple-500 to-purple-600' },
              { stage: 'Contract Negotiation', count: 31, val: '$1.2M', width: '28%', color: 'from-amber-500 to-amber-600' },
              { stage: 'Closed Won (MTD)', count: 24, val: '$980k', width: '20%', color: 'from-emerald-500 to-emerald-600' },
            ].map((stg, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{stg.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">{stg.count} deals</span>
                    <span className="text-sky-400 font-mono">{stg.val}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 border border-slate-800">
                  <div
                    className={`bg-gradient-to-r ${stg.color} h-full rounded-full transition-all duration-700 shadow-sm`}
                    style={{ width: stg.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health & NPS Column */}
        <div className="p-6 bg-slate-950/70 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Customer Satisfaction</h3>
              <span className="text-xl">🌟</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Aggregated NPS, SLA compliance & retention</p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300">Customer Satisfaction (CSAT)</span>
                  <span className="text-emerald-400 font-bold">96.4%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: '96.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300">Net Retention Rate (NRR)</span>
                  <span className="text-sky-400 font-bold">128%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-300">Avg SLA First Response</span>
                  <span className="text-purple-400 font-bold">14 min</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <Button variant="outline" size="sm" className="w-full">
              Download Quarterly PDF Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
