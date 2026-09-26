import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { getLocalizedToastMessage, getLocalizedToastTitle } from '../data/dashboardLocalization';
import { SupportedLanguage } from '../types';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  title?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  language?: SupportedLanguage | string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss, language = 'en' }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-3">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const localizedMsg = getLocalizedToastMessage(toast.message, language);
        const localizedTitle = getLocalizedToastTitle(toast.title, language);

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl bg-white border-2 border-blue-600 text-blue-950 transition-all transform translate-y-0 backdrop-blur-md"
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-blue-800" />
              ) : (
                <Info className="w-5 h-5 text-blue-600" />
              )}
            </div>

            <div className="flex-1">
              {localizedTitle && (
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-0.5">
                  {localizedTitle}
                </h4>
              )}
              <p className="text-xs font-semibold leading-relaxed text-slate-800">
                {localizedMsg}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-900 transition-colors"
              title="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
