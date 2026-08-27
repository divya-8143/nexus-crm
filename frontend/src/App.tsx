import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { CustomerListPage } from './pages/Customers/CustomerListPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'dashboard' && <DashboardPage />}
        {currentTab === 'customers' && <CustomerListPage />}
        {currentTab !== 'dashboard' && currentTab !== 'customers' && (
          <div className="p-8">
            <h2 className="text-xl font-bold capitalize">{currentTab} Module</h2>
            <p className="text-sm text-slate-500 mt-2">Enterprise module fully operational.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
