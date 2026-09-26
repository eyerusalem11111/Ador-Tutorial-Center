import React, { useState } from 'react';
import { PaymentRecord, MonthlyReport, SupportedLanguage } from '../types';
import { createReceiptPlaceholder } from '../data/initialData';
import { PORTAL_TRANSLATIONS } from '../data/portalTranslations';
import { getDashboardCardTranslations } from '../data/dashboardCardTranslations';
import { 
  getLocalizedPersonName, 
  getLocalizedMonth, 
  getLocalizedScore, 
  getLocalizedActionText,
  getLocalizedGrade
} from '../data/dashboardLocalization';
import { 
  CreditCard, 
  FileText, 
  Headphones, 
  Upload, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Eye, 
  Copy, 
  Check, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ParentPortalProps {
  payments: PaymentRecord[];
  reports: MonthlyReport[];
  onAddPayment: (payment: Omit<PaymentRecord, 'id' | 'date' | 'status'>) => void;
  onParentDecision: (reportId: string, decision: 'accepted' | 'declined', feedback: string) => void;
  onViewReceipt: (receiptUrl: string, details: any) => void;
  showToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
  language?: SupportedLanguage;
  t?: any;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  payments,
  reports,
  onAddPayment,
  onParentDecision,
  onViewReceipt,
  showToast,
  language = 'en',
  t,
}) => {
  const pp = PORTAL_TRANSLATIONS[language] ? PORTAL_TRANSLATIONS[language].parent : PORTAL_TRANSLATIONS.en.parent;
  const cardTr = getDashboardCardTranslations(language);
  const [activeTab, setActiveTab] = useState<'payments' | 'reports' | 'support'>('payments');
  
  // Payment Form State
  const [paymentMonth, setPaymentMonth] = useState('First Month (Meskerem / Month 1)');
  const [studentName, setStudentName] = useState('Samuel Kassahun');
  const [paymentMethod, setPaymentMethod] = useState<'Telebirr' | 'Commercial Bank of Ethiopia (CBE)' | 'Awash Bank' | 'Other Bank'>('Telebirr');
  const [amount, setAmount] = useState('4500');
  const [reference, setReference] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bank Info Copy helper
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Parent Feedback State for reports
  const [feedbackTexts, setFeedbackTexts] = useState<Record<string, string>>({});

  // Mandatory Decline Reason Modal State
  const [declineModalReport, setDeclineModalReport] = useState<MonthlyReport | null>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [declineError, setDeclineError] = useState('');

  // Support inquiry state
  const [inquirySubject, setInquirySubject] = useState('Session Rescheduling');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(key);
    showToast('info', `Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateSampleReceipt = () => {
    const randomRef = 'TXN-' + Math.floor(100000000 + Math.random() * 900000000);
    setReference(randomRef);
    const type = paymentMethod.toLowerCase().includes('telebirr') 
      ? 'telebirr' 
      : paymentMethod.toLowerCase().includes('cbe') 
      ? 'cbe' 
      : 'awash';
    const sampleSlip = createReceiptPlaceholder(type, randomRef, amount || '4,500.00', studentName || 'Samuel Kassahun', paymentMonth);
    setReceiptPreview(sampleSlip);
    showToast('success', 'Generated realistic digital transaction receipt slip!');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      showToast('error', 'Please provide the student name.');
      return;
    }
    if (!receiptPreview) {
      showToast('error', 'Please upload a receipt screenshot or click "Generate Sample Receipt".');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onAddPayment({
        parentId: 'parent-1',
        parentName: 'Almaz Mengistu',
        parentEmail: 'almaz.m@gmail.com',
        studentName,
        month: paymentMonth,
        method: paymentMethod,
        reference: reference || ('TXN-' + Math.floor(100000000 + Math.random() * 900000000)),
        amount: parseFloat(amount) || 4500,
        screenshotUrl: receiptPreview,
      });

      setIsSubmitting(false);
      setReference('');
      setReceiptFile(null);
      setReceiptPreview(null);
      showToast('success', 'Receipt uploaded successfully! Under review by Ador Administration.', 'Receipt Submitted');
    }, 400);
  };

  const handleDecisionSubmit = (reportId: string, decision: 'accepted' | 'declined') => {
    if (decision === 'declined') {
      const report = reports.find(r => r.id === reportId);
      if (report) {
        handleInitiateDecline(report);
      }
      return;
    }
    const feedback = feedbackTexts[reportId] || '';
    onParentDecision(reportId, 'accepted', feedback);
    showToast('success', 'Monthly progress report approved and signed off.', 'Report Accepted');
  };

  const handleInitiateDecline = (report: MonthlyReport) => {
    setDeclineModalReport(report);
    setDeclineReason(feedbackTexts[report.id] || '');
    setDeclineError('');
  };

  const handleConfirmDecline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declineReason.trim()) {
      setDeclineError('Reason for declining this report is mandatory. Please explain the discrepancy (e.g. wrong hours recorded, tutor missed sessions, topics incomplete).');
      return;
    }
    if (declineReason.trim().length < 6) {
      setDeclineError('Please provide a specific reason (at least 6 characters).');
      return;
    }
    if (declineModalReport) {
      onParentDecision(declineModalReport.id, 'declined', declineReason.trim());
      setFeedbackTexts(prev => ({ ...prev, [declineModalReport.id]: declineReason.trim() }));
      showToast('info', 'Report decline recorded with your mandatory dispute explanation. Ador administration will arbitrate.', 'Report Disputed');
      setDeclineModalReport(null);
      setDeclineReason('');
      setDeclineError('');
    }
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;
    setInquirySent(true);
    showToast('success', 'Your inquiry has been sent to Ador Center coordination desk.', 'Message Sent');
    setTimeout(() => {
      setInquiryMessage('');
      setInquirySent(false);
    }, 2500);
  };

  const myReports = reports.filter(r => r.parentEmail === 'almaz.m@gmail.com' || r.studentName.includes('Samuel') || r.studentName.includes('Liya'));

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Parent Header Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=220&q=80"
              alt="Parent Profile"
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-blue-600 text-white rounded-lg shadow-sm" title="Active Parent Account">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h2 className="text-2xl font-bold tracking-tight">{getLocalizedPersonName('Almaz Mengistu', language)}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-200 border border-blue-400/30">
                {cardTr.registeredParentBadge || 'Registered Parent'}
              </span>
            </div>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <span>Email: almaz.m@gmail.com</span>
              <span>•</span>
              <span>Phone: +251 911 345 678</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">{cardTr.assignedStudentsLabel || 'Assigned Students:'}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/15">
                {getLocalizedPersonName('Samuel Kassahun', language)} ({getLocalizedGrade('Grade 12 Natural', language)})
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/15">
                {getLocalizedPersonName('Liya Daniel', language)} ({getLocalizedGrade('Grade 4', language)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-4">
        <button
          id="parent-tab-payments"
          onClick={() => setActiveTab('payments')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'payments'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pp.tabPayments}</span>
        </button>

        <button
          id="parent-tab-reports"
          onClick={() => setActiveTab('reports')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'reports'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pp.tabReports}</span>
          {myReports.filter(r => r.parentDecision === 'pending').length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-600 text-white font-extrabold animate-pulse">
              {myReports.filter(r => r.parentDecision === 'pending').length}
            </span>
          )}
        </button>

        <button
          id="parent-tab-support"
          onClick={() => setActiveTab('support')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'support'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pp.tabSupport}</span>
        </button>
      </div>

      {/* TAB 1: PAYMENTS & SCREENSHOTS */}
      {activeTab === 'payments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Upload Form & Bank Info */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Center Bank Accounts Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-5 border border-blue-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                  {cardTr.parentAccountsCardTitle}
                </h4>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200">
                  {cardTr.parentAccountsCardBadge}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {/* Telebirr */}
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      TB
                    </span>
                    <div>
                      <p className="font-bold text-slate-800">{cardTr.telebirrAccountLabel}</p>
                      <p className="font-mono text-slate-600">0911 22 33 44 (Ador Tutorial Center)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('0911223344', 'tb')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                    title={cardTr.copyNumberTitle}
                  >
                    {copiedBank === 'tb' ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* CBE */}
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-800 text-white flex items-center justify-center font-bold text-[10px]">
                      CBE
                    </span>
                    <div>
                      <p className="font-bold text-slate-800">{cardTr.cbeAccountLabel}</p>
                      <p className="font-mono text-slate-600">1000 2938 49182 (Ador Tutorial Center)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('1000293849182', 'cbe')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                    title={cardTr.copyNumberTitle}
                  >
                    {copiedBank === 'cbe' ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Awash */}
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold text-[10px]">
                      AB
                    </span>
                    <div>
                      <p className="font-bold text-slate-800">Awash Bank</p>
                      <p className="font-mono text-slate-600">013 2093 84729 (Ador Tutorial Center)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('0132093849182', 'awash')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                    title="Copy Account Number"
                  >
                    {copiedBank === 'awash' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Payment Form Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">{pp.uploadPaymentTitle}</h3>
                <p className="text-xs text-slate-500">
                  {pp.uploadPaymentSubtitle}
                </p>
              </div>

              <form onSubmit={handleSubmitPayment} className="space-y-4">
                {/* Month Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {pp.monthLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <select
                    id="parent-payment-month-select"
                    value={paymentMonth}
                    onChange={(e) => setPaymentMonth(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Registration Fee">Initial Registration Fee</option>
                    <option value="First Month (Meskerem / Month 1)">First Month (Meskerem / Month 1)</option>
                    <option value="Second Month (Tikimt / Month 2)">Second Month (Tikimt / Month 2)</option>
                    <option value="Third Month (Hidar / Month 3)">Third Month (Hidar / Month 3)</option>
                    <option value="Fourth Month (Tahsas / Month 4)">Fourth Month (Tahsas / Month 4)</option>
                    <option value="Fifth Month (Tir / Month 5)">Fifth Month (Tir / Month 5)</option>
                    <option value="Sixth Month (Yekatit / Month 6)">Sixth Month (Yekatit / Month 6)</option>
                    <option value="Seventh Month (Megabit / Month 7)">Seventh Month (Megabit / Month 7)</option>
                    <option value="Eighth Month (Miyazya / Month 8)">Eighth Month (Miyazya / Month 8)</option>
                    <option value="Ninth Month (Ginbot / Month 9)">Ninth Month (Ginbot / Month 9)</option>
                    <option value="Tenth Month (Sene / Month 10)">Tenth Month (Sene / Month 10)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Student Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {pp.studentNameLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      placeholder="e.g. Samuel Kassahun"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Payment Amount */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {pp.amountLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      placeholder="e.g. 4500"
                      min="100"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Payment Method <span className="text-rose-500 font-bold ml-1">*</span>
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Telebirr">Telebirr</option>
                      <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                      <option value="Awash Bank">Awash Bank</option>
                      <option value="Other Bank">Other Bank / Mobile Transfer</option>
                    </select>
                  </div>

                  {/* Transaction Ref */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Transaction Ref / Note
                    </label>
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="e.g. TXN987654321"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Receipt Screenshot Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Receipt Screenshot (JPG, PNG) <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>

                  <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 text-center bg-slate-50/50 transition-colors">
                    {receiptPreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={receiptPreview}
                          alt="Receipt Preview"
                          className="h-28 object-contain rounded-lg border border-slate-200 mb-2 shadow-xs"
                        />
                        <p className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.receiptAttached || 'Receipt Attached'}
                        </p>
                        <button
                          type="button"
                          onClick={() => { setReceiptFile(null); setReceiptPreview(null); }}
                          className="text-[11px] text-rose-600 hover:underline mt-1"
                        >
                          Remove and re-upload
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                        <label className="cursor-pointer text-xs font-semibold text-blue-700 hover:underline">
                          <span>Click to browse photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Supports PNG, JPG, or PDF screenshot
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 active:scale-[0.99] transition-all shadow-md shadow-blue-700/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Uploading Receipt...' : pp.submitPaymentBtn}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Payment History & Status Table */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{pp.paymentHistoryTitle}</h3>
                  <p className="text-xs text-slate-500">Track verifications by Ador administrative staff.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {payments.length} Payments
                </span>
              </div>

              {payments.length === 0 ? (
                <div className="text-center py-12 flex-1 flex flex-col items-center justify-center text-slate-400">
                  <CreditCard className="w-10 h-10 mb-2 opacity-40" />
                  <p className="text-sm font-medium text-slate-600">{pp.noPaymentsYet}</p>
                  <p className="text-xs text-slate-400">Use the form on the left to submit your first receipt.</p>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                        <th className="pb-3 pr-2">{cardTr.thMonthStudent || 'Month / Student'}</th>
                        <th className="pb-3 px-2">{cardTr.thPaymentMethod || 'Method'}</th>
                        <th className="pb-3 px-2">{cardTr.thReceiptProof || 'Receipt'}</th>
                        <th className="pb-3 pl-2 text-right">{cardTr.thStatus || 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {payments.map((p) => {
                        const isApproved = p.status === 'approved';
                        const isPending = p.status === 'pending';
                        return (
                          <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 pr-2">
                              <span className="font-bold text-slate-800 block text-xs sm:text-sm">{getLocalizedMonth(p.month, language)}</span>
                              <span className="text-[11px] text-slate-500">{getLocalizedPersonName(p.studentName, language)} • {p.amount} ETB</span>
                            </td>
                            <td className="py-3.5 px-2">
                              <span className="font-medium text-slate-700 text-xs block">{p.method}</span>
                              <span className="font-mono text-[11px] text-slate-400">{p.reference}</span>
                            </td>
                            <td className="py-3.5 px-2">
                              <button
                                onClick={() => onViewReceipt(p.screenshotUrl, {
                                  payerOrStudent: getLocalizedPersonName(p.studentName, language),
                                  amount: p.amount,
                                  method: p.method,
                                  reference: p.reference,
                                  monthOrPurpose: getLocalizedMonth(p.month, language),
                                  status: p.status,
                                })}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                              >
                                <Eye className="w-3.5 h-3.5" /> {cardTr.btnViewReceipt || 'View'}
                              </button>
                            </td>
                            <td className="py-3.5 pl-2 text-right">
                              {isApproved ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
                                  <CheckCircle2 className="w-3 h-3 text-blue-600" /> {cardTr.statusApproved || 'Approved'}
                                </span>
                              ) : isPending ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                  <Clock className="w-3 h-3 text-blue-600" /> {cardTr.statusPending || 'Pending'}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                  <XCircle className="w-3 h-3" /> {cardTr.statusRejected || 'Rejected'}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PROGRESS REPORTS & APPROVAL */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">{pp.reportsTitle}</h3>
              <p className="text-xs text-slate-500">
                {pp.reportsSubtitle}
              </p>
            </div>

            {myReports.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium text-slate-600">{pp.noReportsYet}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {myReports.map((report) => {
                  const isPending = report.parentDecision === 'pending';
                  const isAccepted = report.parentDecision === 'accepted';
                  const isDeclined = report.parentDecision === 'declined';

                  return (
                    <div
                      key={report.id}
                      className={`rounded-2xl border transition-all p-6 ${
                        isPending
                          ? 'border-blue-300 bg-blue-50/20 shadow-sm'
                          : isAccepted
                          ? 'border-blue-200 bg-blue-50/10'
                          : 'border-rose-200 bg-rose-50/10'
                      }`}
                    >
                      {/* Report Head */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-extrabold text-slate-900">
                              {getLocalizedMonth(report.month, language)} — {getLocalizedPersonName(report.studentName, language)}
                            </h4>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                              {report.totalHours} {cardTr.totalHoursLabel || 'Hours Completed'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            <strong>{cardTr.tutorLabel || 'Tutor'}:</strong> {getLocalizedPersonName(report.tutorName, language)} &bull; <strong>{cardTr.ratingLabel || 'Rating'}:</strong> {getLocalizedScore(report.overallScore, language)}
                          </p>
                        </div>

                        <div>
                          {isAccepted && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {pp.approvedBadge}
                            </span>
                          )}
                          {isDeclined && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                              <XCircle className="w-3.5 h-3.5" /> {pp.disputedBadge}
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 animate-pulse">
                              <Clock className="w-3.5 h-3.5 text-blue-600" /> {pp.pendingBadge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Report Content Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs sm:text-sm">
                        <div className="p-4 bg-white rounded-xl border border-slate-200/80">
                          <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            {pp.strengthsLabel}:
                          </p>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {report.strengths}
                          </p>
                        </div>

                        <div className="p-4 bg-white rounded-xl border border-slate-200/80">
                          <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            {pp.growthLabel}:
                          </p>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {report.improvements}
                          </p>
                        </div>
                      </div>

                      {/* Decision Action Box */}
                      {isPending ? (
                        <div className="mt-2 pt-4 border-t border-blue-200/60 bg-blue-50/50 p-4 rounded-xl border border-blue-200">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                            {pp.parentFeedbackLabel}:
                          </h5>
                          <textarea
                            value={feedbackTexts[report.id] || ''}
                            onChange={(e) => setFeedbackTexts({ ...feedbackTexts, [report.id]: e.target.value })}
                            placeholder="Optional notes: confirm completed hours, comment on student improvements, or report discrepancy..."
                            rows={2}
                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
                          />
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => handleDecisionSubmit(report.id, 'accepted')}
                              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              {pp.approveReportBtn}
                            </button>
                            <button
                              onClick={() => handleDecisionSubmit(report.id, 'declined')}
                              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-300 transition-all flex items-center gap-1.5"
                            >
                              <XCircle className="w-4 h-4" />
                              {pp.declineReportBtn}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">Your Response:</span>{' '}
                            <span className={isAccepted ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                              {isAccepted ? 'Approved' : 'Disputed / Declined'}
                            </span>
                            {report.parentFeedback && (
                              <p className="mt-0.5 italic text-slate-700">"{report.parentFeedback}"</p>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CENTER & TUTOR SUPPORT */}
      {activeTab === 'support' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Ador Tutorial Center Coordination Desk
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Need to reschedule a tutorial session, request a subject adjustment, or reach an academic advisor?
              </p>

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">Direct Admin Hotlines (Click to Call)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-12">
                    <a
                      href="tel:+251912629431"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-xs transition-colors"
                    >
                      <Phone className="w-3 h-3 text-blue-600" />
                      <span>+251 912 629 431</span>
                    </a>
                    <a
                      href="tel:+251961173718"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-xs transition-colors"
                    >
                      <Phone className="w-3 h-3 text-blue-600" />
                      <span>+251 961 173 718</span>
                    </a>
                  </div>
                </div>

                <a
                  href="https://t.me/AdorTutorCenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-sky-50/60 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Official Telegram Channel</span>
                      <span className="text-sm font-bold text-slate-800 group-hover:text-sky-800 transition-colors">@AdorTutorCenter</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700 group-hover:underline flex items-center gap-1">
                    Open Channel <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="mailto:info@adortutorial.com"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Email Support (Click to compose)</span>
                      <span className="text-sm font-bold text-slate-800 group-hover:text-blue-800 transition-colors">info@adortutorial.com</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 group-hover:underline flex items-center gap-1">
                    Send Email <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Quick Message to Coordinator</h3>
              <p className="text-xs text-slate-500 mb-4">Send a direct message to Ador administration.</p>

              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Session Rescheduling">Session Rescheduling</option>
                    <option value="Tutor Feedback / Change">Tutor Feedback or Adjustment</option>
                    <option value="Payment Inquiry">Payment / Receipt Inquiry</option>
                    <option value="Exam Preparation Strategy">National / Ministry Exam Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    required
                    placeholder="Describe your request or schedule update..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquirySent}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-50"
                >
                  {inquirySent ? 'Message Dispatched!' : 'Send Inquiry to Coordination Desk'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MANDATORY DECLINE REASON MODAL */}
      {declineModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-rose-200 dark:border-rose-900/60 space-y-5">
            
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Decline Progress Report
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {declineModalReport.month} &bull; {declineModalReport.studentName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeclineModalReport(null);
                  setDeclineReason('');
                  setDeclineError('');
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Mandatory Policy Notice */}
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Mandatory Explanation Required
              </p>
              <p className="leading-relaxed text-[11px] text-rose-800 dark:text-rose-300">
                To maintain academic integrity and fair payment auditing, parents must provide a reason before declining a report. This alerts Ador Administration to conduct a formal review of hours or session delivery.
              </p>
            </div>

            <form onSubmit={handleConfirmDecline} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800 dark:text-slate-200">
                    Reason for Declining <span className="text-rose-600 font-extrabold">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {declineReason.length} characters
                  </span>
                </div>

                <textarea
                  required
                  rows={4}
                  value={declineReason}
                  onChange={(e) => {
                    setDeclineReason(e.target.value);
                    if (declineError) setDeclineError('');
                  }}
                  placeholder="Mandatory: Specify why you are declining (e.g. tutor logged 12 hours but only 8 took place, cancelled sessions not made up, or student was absent on specified dates)..."
                  className={`w-full p-3 text-xs sm:text-sm rounded-xl border ${
                    declineError 
                      ? 'border-rose-500 ring-2 ring-rose-500/20' 
                      : 'border-slate-300 dark:border-slate-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all`}
                />

                {declineError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {declineError}
                  </p>
                )}
              </div>

              {/* Quick Prompt Tags to help parents fill quickly */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Quick reasons:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Reported hours exceed actual tutoring sessions',
                    'Two sessions were cancelled without makeup',
                    'Homework feedback was not provided',
                    'Curriculum chapters were not completed',
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setDeclineReason(preset)}
                      className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] text-slate-700 dark:text-slate-300 font-medium transition-colors text-left"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDeclineModalReport(null);
                    setDeclineReason('');
                    setDeclineError('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  Submit Mandatory Decline
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
