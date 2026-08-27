import React from 'react';

export interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: '📊', badge: 'Live' },
    { id: 'customers', label: 'Customer 360', icon: '👥', badge: '1.4k' },
    { id: 'deals', label: 'Deals & Pipeline', icon: '💼', badge: '$8.4M' },
    { id: 'helpdesk', label: 'Support & SLA', icon: '🎫', badge: '98%' },
    { id: 'billing', label: 'Invoices & Billing', icon: '💳' },
    { id: 'analytics', label: 'Revenue Analytics', icon: '📈' },
    { id: 'audit', label: 'Audit & Compliance', icon: '🛡️' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-72 bg-slate-950 text-slate-100 flex flex-col shrink-0 min-h-screen border-r border-slate-800 shadow-2xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-500 flex items-center justify-center font-extrabold text-white text-xl shadow-lg shadow-sky-500/25 ring-1 ring-white/20">
            N
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              NexusCRM
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">Enterprise v2.4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Core Workspaces
        </div>
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-lg shadow-sky-600/30 font-semibold ring-1 ring-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer Card */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-inner">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-200 truncate">Alexander Pierce</p>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">admin@nexuscrm.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
