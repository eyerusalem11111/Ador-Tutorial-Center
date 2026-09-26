import React from 'react';
import { X, ExternalLink, CheckCircle2, Clock, XCircle, Copy, Check } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  receiptUrl: string;
  details?: {
    payerOrStudent?: string;
    amount?: string | number;
    method?: string;
    reference?: string;
    date?: string;
    monthOrPurpose?: string;
    status?: string;
  };
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  title,
  receiptUrl,
  details,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyRef = () => {
    if (details?.reference) {
      navigator.clipboard.writeText(details.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    const s = status.toLowerCase();
    if (s.includes('approved') || s.includes('verified')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" /> Approved &amp; Verified
        </span>
      );
    }
    if (s.includes('reject') || s.includes('decline')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3.5 h-3.5" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3.5 h-3.5" /> Pending Verification
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">Official Payment Proof &amp; Verification Document</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status and Details summary */}
          {details && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {details.status && (
                <div className="col-span-2 sm:col-span-3 pb-2 border-b border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Verification Status</span>
                  {getStatusBadge(details.status)}
                </div>
              )}
              {details.payerOrStudent && (
                <div>
                  <span className="text-xs text-slate-500 block">Payer / Student</span>
                  <span className="font-semibold text-slate-800">{details.payerOrStudent}</span>
                </div>
              )}
              {details.amount && (
                <div>
                  <span className="text-xs text-slate-500 block">Amount</span>
                  <span className="font-bold text-emerald-700">{details.amount} ETB</span>
                </div>
              )}
              {details.method && (
                <div>
                  <span className="text-xs text-slate-500 block">Payment Method</span>
                  <span className="font-medium text-slate-800">{details.method}</span>
                </div>
              )}
              {details.monthOrPurpose && (
                <div>
                  <span className="text-xs text-slate-500 block">Purpose / Month</span>
                  <span className="font-medium text-slate-800">{details.monthOrPurpose}</span>
                </div>
              )}
              {details.reference && (
                <div className="col-span-2 sm:col-span-2">
                  <span className="text-xs text-slate-500 block">Reference No.</span>
                  <div className="flex items-center gap-1.5">
                    <code className="text-xs bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-slate-800 font-semibold">
                      {details.reference}
                    </code>
                    <button
                      onClick={handleCopyRef}
                      className="p-1 hover:bg-slate-200/80 text-slate-500 rounded transition-colors"
                      title="Copy Reference"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Receipt Image / Document Display */}
          <div className="flex flex-col items-center justify-center p-3 bg-slate-100 rounded-xl border border-slate-200">
            <div className="relative group max-h-[460px] overflow-hidden rounded-lg shadow-sm border border-slate-200 bg-white">
              <img
                src={receiptUrl}
                alt="Payment Receipt Screenshot"
                className="w-full h-auto max-h-[440px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <a
            href={receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Full Size in New Tab
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
