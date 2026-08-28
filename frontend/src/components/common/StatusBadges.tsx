import React from 'react';
import { DeliveryStatus, PaymentStatus, SatisfactionLevel } from '../context/CrmContext';

export const DeliveryStatusBadge: React.FC<{ status: DeliveryStatus }> = ({ status }) => {
  const styles: Record<DeliveryStatus, string> = {
    'Delivered': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Out for Delivery': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    'Shipped': 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    'Processing': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Ordered': 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    'Not Delivered': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    'Cancelled': 'bg-red-500/15 text-red-400 border-red-500/30',
  };

  const icons: Record<DeliveryStatus, string> = {
    'Delivered': '✔',
    'Out for Delivery': '🚚',
    'Shipped': '📦',
    'Processing': '⏳',
    'Ordered': '📝',
    'Not Delivered': '⚠',
    'Cancelled': '✖',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        styles[status] || styles['Ordered']
      }`}
    >
      <span>{icons[status] || '•'}</span>
      <span>{status}</span>
    </span>
  );
};

export const SatisfactionBadge: React.FC<{ satisfaction: SatisfactionLevel; rating?: number }> = ({
  satisfaction,
  rating,
}) => {
  const styles: Record<SatisfactionLevel, string> = {
    'Satisfied': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Neutral': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Unsatisfied': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  };

  const icons: Record<SatisfactionLevel, string> = {
    'Satisfied': '😊',
    'Neutral': '😐',
    'Unsatisfied': '😞',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        styles[satisfaction] || styles['Neutral']
      }`}
    >
      <span>{icons[satisfaction]}</span>
      <span>{satisfaction}</span>
      {rating && <span className="text-[10px] opacity-80">({rating}★)</span>}
    </span>
  );
};

export const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-amber-400' : 'text-slate-700'}>
          ★
        </span>
      ))}
    </div>
  );
};
