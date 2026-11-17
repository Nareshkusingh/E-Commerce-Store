import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      {/* Toast container floating at top right */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0 sm:bottom-6 sm:right-6"
      >
        {toasts.map((item) => {
          let bg = 'bg-white border-slate-200 text-slate-800';
          let Icon = Info;
          let iconColor = 'text-primary';

          if (item.type === 'success') {
            bg = 'bg-white border-emerald-100 text-slate-800 shadow-soft-lg';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-500';
          } else if (item.type === 'error') {
            bg = 'bg-white border-rose-100 text-slate-800 shadow-soft-lg';
            Icon = AlertCircle;
            iconColor = 'text-rose-500';
          } else if (item.type === 'warning') {
            bg = 'bg-white border-amber-100 text-slate-800 shadow-soft-lg';
            Icon = AlertTriangle;
            iconColor = 'text-amber-500';
          }

          return (
            <div
              key={item.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border ${bg} transition-all duration-300 transform translate-y-0 opacity-100 shadow-soft-lg`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                <span className="text-sm font-medium text-slate-800 truncate">
                  {item.message}
                </span>
              </div>
              <button
                onClick={() => removeToast(item.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 rounded-md"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}

export default ToastContext;
