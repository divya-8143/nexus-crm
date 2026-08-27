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

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'dashboard' && <DashboardPage />}
        {currentTab === 'customers' && <CustomerListPage />}
        {currentTab === 'deals' && <DealsBoardPage />}
        {currentTab === 'helpdesk' && <HelpdeskQueuePage />}
        {currentTab === 'billing' && <InvoicesPage />}
        {currentTab === 'audit' && <AuditLogsPage />}
        {currentTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
};

export default App;
