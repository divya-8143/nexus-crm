import React from 'react';
export const DeliveryTimeline: React.FC<{ status: string }> = ({ status }) => (
  <div className='p-3 bg-slate-900 rounded-xl text-xs text-emerald-400'>Delivery Status: {status}</div>
);
