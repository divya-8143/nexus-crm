import React from 'react';

export interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  // Only the 6 requested menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'satisfaction', label: 'Customer Satisfaction', icon: '⭐' },
    { id: 'sales', label: 'Sales', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-100 flex flex-col shrink-0 min-h-screen border-r border-slate-800 shadow-2xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-sky-500/30">
          N
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-white">NexusCRM</h1>
          <span className="text-[11px] font-semibold text-sky-400">Customer & Sales</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Menu
        </div>
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800">
          <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center font-bold text-xs text-white">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate">Store Admin</p>
            <p className="text-[10px] text-slate-400 truncate">admin@nexuscrm.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
