import React, { useState } from 'react';
import { Customer } from '@nexus/shared';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Badge } from '../common/Badge';

export interface CustomerCreateWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (customer: Partial<Customer>) => void;
}

export const CustomerCreateWizard: React.FC<CustomerCreateWizardProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    companyName: '',
    industry: 'Enterprise SaaS',
    email: '',
    phone: '',
    website: '',
    lifecycleStage: 'LEAD',
    annualRevenue: 1000000,
    currency: 'USD',
    isVip: false,
    billingAddress: { street1: '', city: '', state: '', postalCode: '', country: 'USA' },
    shippingAddress: { street1: '', city: '', state: '', postalCode: '', country: 'USA' },
    tags: ['INBOUND'],
  });

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAddressChange = (type: 'billingAddress' | 'shippingAddress', field: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...((prev[type] as any) || {}), [field]: val },
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onSuccess(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create Enterprise Account - Step ${step} of 3`}
      maxWidth="2xl"
      footer={
        <div className="flex justify-between w-full">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>Previous Step</Button>
          ) : <div />}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleNext}>
              {step === 3 ? 'Confirm & Create Account' : 'Continue to Next Step'}
            </Button>
          </div>
        </div>
      }
    >
      {/* Stepper Indicator */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        {[
          { num: 1, label: 'General Info' },
          { num: 2, label: 'Addresses & Tax' },
          { num: 3, label: 'Segmentation & Review' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s.num ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
            }`}>
              {s.num}
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{s.label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Account / Customer Name" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} placeholder="Acme International" />
            <Input label="Legal Entity Name" value={formData.companyName || ''} onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Acme Global Holdings LLC" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Primary Corporate Email" type="email" value={formData.email || ''} onChange={(e) => handleChange('email', e.target.value)} placeholder="contact@acme.com" />
            <Input label="Direct Phone" value={formData.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Corporate Website" value={formData.website || ''} onChange={(e) => handleChange('website', e.target.value)} placeholder="https://acme.com" />
            <Input label="Annual Revenue (USD)" type="number" value={formData.annualRevenue || 0} onChange={(e) => handleChange('annualRevenue', Number(e.target.value))} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Corporate Billing Address</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Street Address" value={formData.billingAddress?.street1 || ''} onChange={(e) => handleAddressChange('billingAddress', 'street1', e.target.value)} placeholder="100 Silicon Blvd" />
            <Input label="City" value={formData.billingAddress?.city || ''} onChange={(e) => handleAddressChange('billingAddress', 'city', e.target.value)} placeholder="San Francisco" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="State / Province" value={formData.billingAddress?.state || ''} onChange={(e) => handleAddressChange('billingAddress', 'state', e.target.value)} placeholder="CA" />
            <Input label="Postal Code" value={formData.billingAddress?.postalCode || ''} onChange={(e) => handleAddressChange('billingAddress', 'postalCode', e.target.value)} placeholder="94105" />
            <Input label="Country" value={formData.billingAddress?.country || 'USA'} onChange={(e) => handleAddressChange('billingAddress', 'country', e.target.value)} placeholder="USA" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Account: {formData.name}</span>
              <Badge variant="primary">{formData.industry}</Badge>
            </div>
            <div className="text-xs text-slate-500">Corporate Email: {formData.email}</div>
            <div className="text-xs text-slate-500">Estimated ARR: ${formData.annualRevenue?.toLocaleString()} {formData.currency}</div>
          </div>
          <p className="text-xs text-slate-500">
            By confirming, this enterprise customer profile will be initialized with a dedicated account number, lead scoring telemetry, and audit event logs.
          </p>
        </div>
      )}
    </Modal>
  );
};
