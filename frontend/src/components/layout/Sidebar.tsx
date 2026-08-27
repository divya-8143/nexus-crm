import React from 'react';

export interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: '📊' },
    { id: 'customers', label: 'Customer 360', icon: '👥' },
    { id: 'deals', label: 'Deals & Pipeline', icon: '💼' },
    { id: 'helpdesk', label: 'Support & SLA', icon: '🎫' },
    { id: 'billing', label: 'Invoices & Billing', icon: '💳' },
    { id: 'analytics', label: 'Revenue Analytics', icon: '📈' },
    { id: 'audit', label: 'Audit & Compliance', icon: '🛡️' },
    { id: 'settings', label: 'System Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="h-9 w-9 rounded-lg bg-sky-500 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/30">
          N
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-white">NexusCRM</h1>
          <span className="text-xs text-sky-400 font-medium">Enterprise Suite</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-slate-200">
          AD
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-semibold text-slate-200 truncate">Admin User</p>
          <p className="text-xs text-slate-400 truncate">admin@nexuscrm.io</p>
        </div>
      </div>
    </aside>
  );
};
