import React from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  const iconMap = {
    success: '✔',
    error: '✖',
    info: 'ℹ',
    warning: '⚠',
  };

  const colorMap = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-rose-500 text-white',
    info: 'bg-sky-500 text-white',
    warning: 'bg-amber-500 text-white',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 animate-slideUp"
        >
          <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${colorMap[toast.type]}`}>
            {iconMap[toast.type]}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.title}</h4>
            {toast.description && <p className="text-xs text-slate-500 mt-0.5">{toast.description}</p>}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
