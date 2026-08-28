import React, { useState } from 'react';
import { CrmProvider } from './context/CrmContext';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { CustomerListPage } from './pages/Customers/CustomerListPage';
import { OrdersPage } from './pages/Orders/OrdersPage';
import { SatisfactionPage } from './pages/Satisfaction/SatisfactionPage';
import { SalesPage } from './pages/Sales/SalesPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
      {/* Simplified Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-900">
        <main className="flex-1 overflow-y-auto bg-slate-900">
          {currentTab === 'dashboard' && <DashboardPage onNavigate={setCurrentTab} />}
          {currentTab === 'customers' && <CustomerListPage />}
          {currentTab === 'orders' && <OrdersPage />}
          {currentTab === 'satisfaction' && <SatisfactionPage />}
          {currentTab === 'sales' && <SalesPage />}
          {currentTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CrmProvider>
      <AppContent />
    </CrmProvider>
  );
};

export default App;
