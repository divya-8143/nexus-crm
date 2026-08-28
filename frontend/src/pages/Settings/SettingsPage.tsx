import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const SettingsPage: React.FC = () => {
  const { currencySymbol, setCurrencySymbol, resetToSampleData } = useCrm();
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">System Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage currency preferences and application configuration
        </p>
      </div>

      <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-white">Store & Currency Configuration</h3>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Display Currency Symbol
          </label>
          <select
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="₹">₹ (INR - Indian Rupee)</option>
            <option value="$">$ (USD - US Dollar)</option>
            <option value="€">€ (EUR - Euro)</option>
            <option value="£">£ (GBP - British Pound)</option>
            <option value="A$">A$ (AUD - Australian Dollar)</option>
          </select>
        </div>

        <Input label="Business Legal Name" defaultValue="Nexus Sales & Customer Solutions" />
        <Input label="Store Support Email" defaultValue="support@nexuscrm.io" />

        <div className="flex items-center gap-3 pt-2">
          <Button variant="primary" onClick={handleSave}>Save Settings</Button>
          {savedMessage && <span className="text-xs text-emerald-400 font-semibold">✔ Settings updated!</span>}
        </div>
      </div>

      {/* Demo Reset */}
      <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">Reset Demo Data</h4>
          <p className="text-xs text-slate-400 mt-0.5">Restore all original sample customers, orders, and feedback reviews.</p>
        </div>
        <Button variant="danger" size="sm" onClick={resetToSampleData}>Reset Data</Button>
      </div>
    </div>
  );
};
