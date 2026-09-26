import React, { useState } from 'react';
import { TutoringJob } from '../types';
import { TranslationDictionary } from '../data/translations';
import { X, Send, MessageCircle, ExternalLink, CheckCircle2, User, Phone, Mail, FileText } from 'lucide-react';

interface PublicApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: TutoringJob | null;
  t: TranslationDictionary;
  onSubmitApplication: (jobId: string, applicantData: { name: string; phone: string; email: string; note: string }) => void;
}

export const PublicApplyModal: React.FC<PublicApplyModalProps> = ({
  isOpen,
  onClose,
  job,
  t,
  onSubmitApplication,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onSubmitApplication(job.id, { name, phone, email, note });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setNote('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              Placement Application
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {job.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your application for <strong>{job.title}</strong> in {job.location} has been registered with our operations office.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Location:</span>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Monthly Compensation:</span>
                <span className="font-bold text-emerald-700">~{job.monthlyEstimate.toLocaleString()} ETB</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500 font-bold ml-1">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Dawit Bekele"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+251 9..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tutor@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Introduction &amp; Availability Note
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <textarea
                    rows={2}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Briefly state your qualifications and availability for this student..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Direct Telegram Alternative */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
              <span className="text-[11px]">Or pitch directly to center dispatch via Telegram:</span>
              <a
                href="https://t.me/AdorTutorCenter"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-blue-700 hover:underline flex items-center gap-1 shrink-0 ml-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>@AdorTutorCenter</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                {t.close}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Quick Application</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
