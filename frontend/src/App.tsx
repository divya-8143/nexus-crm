import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { CustomerListPage } from './pages/Customers/CustomerListPage';
import { DealsBoardPage } from './pages/Deals/DealsBoardPage';
import { HelpdeskQueuePage } from './pages/Helpdesk/HelpdeskQueuePage';
import { InvoicesPage } from './pages/Billing/InvoicesPage';
import { AuditLogsPage } from './pages/Audit/AuditLogsPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
      {/* Sleek Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-900">
        {/* Top Navbar */}
        <header className="h-16 px-8 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search customers, deals, tickets, or invoice # (Ctrl + K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>All Systems Operational</span>
            </div>

            <button className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition">
              <span>🔔</span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sky-500"></span>
            </button>
          </div>
        </header>

        {/* Page View Container */}
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {currentTab === 'dashboard' && <DashboardPage />}
          {currentTab === 'customers' && <CustomerListPage />}
          {currentTab === 'deals' && <DealsBoardPage />}
          {currentTab === 'helpdesk' && <HelpdeskQueuePage />}
          {currentTab === 'billing' && <InvoicesPage />}
          {currentTab === 'audit' && <AuditLogsPage />}
          {currentTab === 'settings' && <SettingsPage />}
          {currentTab === 'analytics' && <DashboardPage />}
        </main>
      </div>
    </div>
  );
};

export default App;
