import React, { useState } from 'react';
import { Tabs } from '../../components/common/Tabs';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Tenant Profile & General' },
    { id: 'rbac', label: 'Role Permissions (RBAC)' },
    { id: 'custom_fields', label: 'Custom Field Schema' },
    { id: 'sla', label: 'SLA Business Hours' },
  ];

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Enterprise Settings</h1>
        <p className="text-sm text-slate-500">Manage tenant identity, role-based access control, and SLA rules</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'general' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <Input label="Organization / Tenant Legal Name" defaultValue="Nexus Global Enterprise" />
          <Input label="Primary Domain" defaultValue="nexuscrm.io" />
          <Input label="Default Operating Currency" defaultValue="USD ($)" />
          <Button variant="primary">Save Changes</Button>
        </div>
      )}

      {activeTab === 'rbac' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Role-Based Access Control Matrix</h3>
          <p className="text-xs text-slate-500 mb-4">Granular permissions configured across 6 core enterprise roles.</p>
          <div className="text-sm font-mono p-4 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-700">
            SUPER_ADMIN, ADMIN, SALES_MANAGER, SALES_AGENT, SUPPORT_AGENT, COMPLIANCE_AUDITOR
          </div>
        </div>
      )}
    </div>
  );
};
