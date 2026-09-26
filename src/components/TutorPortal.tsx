import React, { useState, useMemo } from 'react';
import { 
  TutorProfile, 
  TutoringJob, 
  JobApplication, 
  MonthlyReport, 
  TutorMonthlyPayout, 
  SupportedLanguage 
} from '../types';
import { createReceiptPlaceholder } from '../data/initialData';
import { getPortalTranslations } from '../data/portalTranslations';
import { getDashboardCardTranslations } from '../data/dashboardCardTranslations';
import { 
  getLocalizedPersonName, 
  getLocalizedTutorEducation, 
  getLocalizedLocation, 
  getLocalizedSubject, 
  getLocalizedSchedule, 
  getLocalizedGrade, 
  getLocalizedRate,
  getLocalizedJobCardNotice,
  getLocalizedDate,
  getLocalizedMonth,
  getLocalizedScore
} from '../data/dashboardLocalization';
import { getLocalizedJob } from '../data/localizedJobs';
import { 
  Briefcase, 
  FileEdit, 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Upload, 
  Search, 
  DollarSign, 
  MapPin, 
  BookOpen, 
  Award, 
  Eye, 
  ArrowUpRight,
  ShieldCheck,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface TutorPortalProps {
  tutor?: TutorProfile;
  tutors?: TutorProfile[];
  jobs: TutoringJob[];
  applications: JobApplication[];
  reports: MonthlyReport[];
  payouts?: TutorMonthlyPayout[];
  language?: SupportedLanguage;
  onUpdateMembership?: (data: { method: string; reference: string; receiptUrl: string }) => void;
  onSubmitMembershipFee?: (tutorId: string, method: string, reference: string, receiptUrl: string) => void;
  onApplyJob: (jobId: string, coverNote: string) => void;
  onSubmitCommission: (applicationId: string, choice: '60_percent_first_month' | '23_percent_monthly', method: string, reference: string, receiptUrl: string) => void;
  onSubmitReport: (report: Omit<MonthlyReport, 'id' | 'tutorId' | 'tutorName' | 'status' | 'parentDecision' | 'submittedDate'>) => void;
  onViewReceipt: (receiptUrl: string, details: any) => void;
  showToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
  t?: any;
}

export const TutorPortal: React.FC<TutorPortalProps> = ({
  tutor: propTutor,
  tutors,
  jobs,
  applications,
  reports,
  payouts = [],
  language = 'en',
  onUpdateMembership,
  onSubmitMembershipFee,
  onApplyJob,
  onSubmitCommission,
  onSubmitReport,
  onViewReceipt,
  showToast,
}) => {
  const tutor: TutorProfile = propTutor || (tutors && tutors.length > 0 ? tutors[0] : {
    id: 'tut-1',
    name: 'Henok Tadesse',
    email: 'henok.t@adortutorial.com',
    phone: '0911223344',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    education: 'BSc in Mathematics (Addis Ababa University)',
    specialties: ['Mathematics', 'Physics'],
    rating: 4.9,
    studentsCount: 14,
    totalHours: 180,
    hourlyRate: 350,
    status: 'active',
    bio: 'Dedicated educator providing high-quality tutorial instruction.',
    membershipStatus: 'verified',
    verifiedBadges: ['ID Verified', 'Academic Degree Certified', 'Background Checked'],
  });

  const pt = getPortalTranslations(language as SupportedLanguage || 'en').tutor;
  const cardTr = getDashboardCardTranslations(language as SupportedLanguage || 'en');

  const [activeTab, setActiveTab] = useState<'jobs' | 'submit-report' | 'history' | 'payouts'>('jobs');

  // 500 ETB Membership form state
  const [membershipMethod, setMembershipMethod] = useState('Telebirr');
  const [membershipRef, setMembershipRef] = useState('');
  const [membershipReceiptUrl, setMembershipReceiptUrl] = useState<string | null>(null);

  // Commission Submission form states per application
  const [selectedChoices, setSelectedChoices] = useState<Record<string, '60_percent_first_month' | '23_percent_monthly'>>({});
  const [commissionMethods, setCommissionMethods] = useState<Record<string, string>>({});
  const [commissionRefs, setCommissionRefs] = useState<Record<string, string>>({});
  const [commissionReceipts, setCommissionReceipts] = useState<Record<string, string>>({});

  // Job Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  // Submit Monthly Report State
  const [reportStudentName, setReportStudentName] = useState('Samuel Kassahun');
  const [reportParentEmail, setReportParentEmail] = useState('almaz.m@gmail.com');
  const [reportMonth, setReportMonth] = useState('Second Month (Tikimt / Month 2)');
  const [reportHours, setReportHours] = useState('16');
  const [reportScore, setReportScore] = useState<MonthlyReport['overallScore']>('Excellent (Straight A / 90%+)');
  const [reportStrengths, setReportStrengths] = useState('');
  const [reportImprovements, setReportImprovements] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  // Applications matching: resilient to ID or email or name matches
  const myApplications = useMemo(() => {
    return (applications || []).filter(a => {
      const idMatch = a.tutorId && tutor.id && String(a.tutorId).trim() === String(tutor.id).trim();
      const emailMatch = a.tutorEmail && tutor.email && a.tutorEmail.toLowerCase().trim() === tutor.email.toLowerCase().trim();
      const nameMatch = a.tutorName && tutor.name && a.tutorName.toLowerCase().trim() === tutor.name.toLowerCase().trim();
      return idMatch || emailMatch || nameMatch;
    });
  }, [applications, tutor]);

  const acceptedApps = useMemo(() => {
    return myApplications.filter(a => a.status === 'approved');
  }, [myApplications]);

  const pendingApps = useMemo(() => {
    return myApplications.filter(a => a.status === 'pending');
  }, [myApplications]);

  const myReports = useMemo(() => {
    return (reports || []).filter(r => {
      const idMatch = r.tutorId && tutor.id && String(r.tutorId).trim() === String(tutor.id).trim();
      const nameMatch = r.tutorName && tutor.name && r.tutorName.toLowerCase().trim() === tutor.name.toLowerCase().trim();
      return idMatch || nameMatch;
    });
  }, [reports, tutor]);

  const myPayouts = useMemo(() => {
    return (payouts || []).filter(p => {
      const idMatch = p.tutorId && tutor.id && String(p.tutorId).trim() === String(tutor.id).trim();
      const emailMatch = p.tutorEmail && tutor.email && p.tutorEmail.toLowerCase().trim() === tutor.email.toLowerCase().trim();
      const nameMatch = p.tutorName && tutor.name && p.tutorName.toLowerCase().trim() === tutor.name.toLowerCase().trim();
      return idMatch || emailMatch || nameMatch;
    });
  }, [payouts, tutor]);

  // Handle membership fee receipt file upload
  const handleMembershipFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setMembershipReceiptUrl(result);
      showToast('success', '500 ETB receipt screenshot loaded!');
    };
    reader.readAsDataURL(file);
  };

  const handleMembershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipReceiptUrl) {
      showToast('error', 'Please attach a payment receipt screenshot.');
      return;
    }
    const ref = membershipRef || ('TXN-MB-' + Math.floor(100000 + Math.random() * 900000));
    if (onSubmitMembershipFee) {
      onSubmitMembershipFee(tutor.id, membershipMethod, ref, membershipReceiptUrl);
    } else if (onUpdateMembership) {
      onUpdateMembership({
        method: membershipMethod,
        reference: ref,
        receiptUrl: membershipReceiptUrl,
      });
    }
    showToast('success', '500 ETB membership receipt submitted for admin verification!', 'Verification Pending');
  };

  // Handle commission receipt file upload
  const handleCommissionFileUpload = (appId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCommissionReceipts(prev => ({ ...prev, [appId]: result }));
      showToast('success', 'Commission payment receipt attached!');
    };
    reader.readAsDataURL(file);
  };

  const handleCommissionSubmit = (appId: string, defaultEstimate: number) => {
    const choice = selectedChoices[appId] || '60_percent_first_month';
    const method = commissionMethods[appId] || 'Telebirr';
    const ref = commissionRefs[appId] || ('TXN-' + Math.floor(1000000 + Math.random() * 9000000));
    let receipt = commissionReceipts[appId];

    if (!receipt) {
      // Auto-generate fallback placeholder if tutor did not attach screenshot
      const amount = choice === '60_percent_first_month' ? defaultEstimate * 0.6 : defaultEstimate * 0.23;
      receipt = createReceiptPlaceholder('telebirr', ref, amount.toFixed(2), tutor.name, 'Tutoring Placement Commission');
    }

    onSubmitCommission(appId, choice, method, ref, receipt);
    showToast('success', 'Placement commission proof submitted for Ador Admin verification!', 'Commission Submitted');
  };

  const handleApplyClick = (job: TutoringJob) => {
    onApplyJob(
      job.id, 
      `Direct application by ${tutor.name} for ${job.title} (${job.subject}, ${job.grade}). Available immediately.`
    );
    showToast('success', `Applied for "${job.title}" successfully! Status: Under Admin Review.`);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportStudentName.trim() || !reportStrengths.trim() || !reportImprovements.trim()) {
      showToast('error', 'Please fill out all evaluation fields.');
      return;
    }

    setIsSubmittingReport(true);
    setTimeout(() => {
      onSubmitReport({
        studentName: reportStudentName,
        parentEmail: reportParentEmail,
        month: reportMonth,
        totalHours: parseInt(reportHours, 10) || 16,
        overallScore: reportScore,
        strengths: reportStrengths,
        improvements: reportImprovements,
      });

      setIsSubmittingReport(false);
      setReportStrengths('');
      setReportImprovements('');
      showToast('success', 'Monthly report submitted to Ador Admin for dispatch to parent!', 'Report Submitted');
      setActiveTab('history');
    }, 400);
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            j.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            j.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = filterSubject === 'all' || j.subject.toLowerCase().includes(filterSubject.toLowerCase());
      return matchesSearch && matchesSubject;
    });
  }, [jobs, searchQuery, filterSubject]);

  return (
    <div className="space-y-8 animate-fade-in pb-12">

      {/* 1. TUTOR MEMBERSHIP ONBOARDING (500 ETB FEE BANNER) */}
      {tutor.membershipStatus !== 'verified' && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {pt.membershipNoticeTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pt.membershipNoticeDesc}
              </p>

              {/* Two Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-800 flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold">1</span>
                    {cardTr.telegramStepTitle || 'Review Terms on Telegram'}
                  </span>
                  <p className="text-slate-600 mb-2">
                    {cardTr.telegramStepDesc || 'Visit our official Telegram account and confirm your instructor guidelines.'}
                  </p>
                  <a
                    href="https://t.me/AdorTutorCenter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                  >
                    {cardTr.openTelegramLink || 'Open @AdorTutorCenter'} <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-extrabold text-amber-800 flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-bold">2</span>
                    {cardTr.oneTimeFeeStepTitle || '500 ETB One-time Fee'}
                  </span>
                  <p className="text-slate-600 mb-1">
                    {cardTr.oneTimeFeeStepDesc || 'Pay via Telebirr or CBE to activate your teaching badge.'}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    Telebirr: 0911 22 33 44 &bull; CBE: 1000 2938 49182
                  </p>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <div className="w-full md:w-80 bg-white rounded-2xl p-5 border border-amber-200 shadow-sm shrink-0">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>{cardTr.uploadReceiptFormTitle || 'Upload 500 ETB Receipt'}</span>
              </h4>

              <form onSubmit={handleMembershipSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {pt.membershipMethodLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <select
                    value={membershipMethod}
                    onChange={(e) => setMembershipMethod(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Telebirr">Telebirr (0911 22 33 44)</option>
                    <option value="Commercial Bank of Ethiopia (CBE)">CBE (1000 2938 49182)</option>
                    <option value="Awash Bank">Awash Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {pt.membershipRefLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={membershipRef}
                    onChange={(e) => setMembershipRef(e.target.value)}
                    placeholder="e.g. TB12345678"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {cardTr.paymentScreenshotLabel || 'Payment Receipt Screenshot'} <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  {membershipReceiptUrl ? (
                    <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                      <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {cardTr.receiptAttached || 'Receipt Attached'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setMembershipReceiptUrl(null)}
                        className="text-[11px] text-rose-600 hover:underline font-bold"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl bg-slate-50 hover:bg-amber-50/50 transition-colors text-slate-500">
                      <Upload className="w-5 h-5 text-amber-600 mb-1" />
                      <span className="text-[11px] font-semibold text-slate-700">{cardTr.dropzoneUploadText || 'Upload Receipt Screenshot'}</span>
                      <span className="text-[10px] text-slate-400">{cardTr.dropzoneHintText || 'PNG, JPG, or screenshot'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMembershipFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                >
                  {cardTr.submitReceiptBtn || pt.membershipSubmitBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. TUTOR PROFILE SUMMARY BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={tutor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'}
              alt={tutor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-600 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{getLocalizedPersonName(tutor.name, language)}</h2>
                {tutor.membershipStatus === 'verified' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> {pt.verifiedTutor}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {pt.pendingTutor}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">{getLocalizedTutorEducation(language)}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 flex-wrap">
                <span>⭐ {tutor.rating} {cardTr.ratingLabel || 'Rating'}</span>
                <span>&bull;</span>
                <span>👨‍🎓 {tutor.studentsCount} {cardTr.activeStudentsLabel || 'Active Students'}</span>
                <span>&bull;</span>
                <span>⏱️ {tutor.totalHours} {cardTr.totalHoursLabel || 'Total Hours Taught'}</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 gap-2">
            <span className="text-xs text-slate-500 font-semibold">{cardTr.rateLabel || pt.rateLabel}</span>
            <span className="text-xl sm:text-2xl font-black text-blue-700">
              {tutor.hourlyRate} ETB <span className="text-xs font-normal text-slate-500">{cardTr.etbPerHour || '/ hour'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Clean typography, brand Blue & White, no icons */}
      <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-4">
        <button
          id="tutor-tab-jobs"
          onClick={() => setActiveTab('jobs')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'jobs'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pt.tabJobs}</span>
          {acceptedApps.filter(a => a.commissionStatus !== 'approved').length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-600 text-white font-extrabold animate-pulse">
              Placement Action Required
            </span>
          )}
          {pendingApps.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {pendingApps.length} Under Review
            </span>
          )}
        </button>

        <button
          id="tutor-tab-report"
          onClick={() => setActiveTab('submit-report')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'submit-report'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pt.tabSubmitReport}</span>
        </button>

        <button
          id="tutor-tab-history"
          onClick={() => setActiveTab('history')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pt.tabReportHistory}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            {myReports.length}
          </span>
        </button>

        {/* Payouts & Receipts Tab */}
        <button
          id="tutor-tab-payouts"
          onClick={() => setActiveTab('payouts')}
          className={`pb-4 px-2 sm:px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'payouts'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>{pt.tabPayouts}</span>
          {myPayouts.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {myPayouts.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: TUTORING JOBS & COMMISSION FLOW */}
      {activeTab === 'jobs' && (
        <div className="space-y-8">

          {/* SECTION 1: MY ACTIVE APPLICATIONS & STATUS BOARD */}
          {myApplications.length > 0 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {cardTr.myApplicationsTitle} ({myApplications.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    {cardTr.myApplicationsSubtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {myApplications.map((app) => {
                  const job = jobs.find(j => String(j.id) === String(app.jobId));
                  const locJob = job ? getLocalizedJob(job, language) : null;
                  const isApproved = app.status === 'approved';
                  const isPending = app.status === 'pending';
                  const isDeclined = app.status === 'declined';

                  return (
                    <div 
                      key={app.id} 
                      className={`p-4 rounded-xl border bg-white shadow-xs transition-all ${
                        isApproved ? 'border-blue-400 ring-2 ring-blue-100' :
                        isPending ? 'border-blue-300 bg-blue-50/30' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                              {locJob ? locJob.title : app.jobTitle}
                            </h4>
                            {(locJob || job) && (
                              <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {locJob ? locJob.grade : job?.grade}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-2">
                            <span>📅 {getLocalizedJobCardNotice('appliedDatePrefix', language)} <strong>{getLocalizedDate(app.appliedDate, language)}</strong></span>
                            {(locJob?.location || job?.location) && <span>&bull; 📍 {locJob ? locJob.location : job?.location}</span>}
                          </p>
                        </div>

                        {/* Status Badges */}
                        <div className="flex items-center gap-2">
                          {isPending && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                              <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                              <span>{pt.statusAppliedReview}</span>
                            </span>
                          )}
                          {isApproved && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>{pt.statusPlacementApproved}</span>
                            </span>
                          )}
                          {isDeclined && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
                              <XCircle className="w-3.5 h-3.5 text-slate-600" />
                              <span>{pt.statusDeclined}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Explanation Helper */}
                      {isPending && (
                        <div className="mt-3 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            {getLocalizedJobCardNotice('applicationReceivedNotice', language)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* SECTION 2: ACCEPTED PLACEMENTS & COMMISSION FEE SELECTION (Option 1: 60% vs Option 2: 23%) */}
          {acceptedApps.length > 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {cardTr.acceptedPlacementsTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {cardTr.acceptedPlacementsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {acceptedApps.map((app) => {
                  const job = jobs.find(j => String(j.id) === String(app.jobId)) || {
                    title: app.jobTitle,
                    monthlyEstimate: 12000,
                    rate: '500 ETB / hour',
                    location: 'Addis Ababa',
                  };
                  const locJob = getLocalizedJob(job as TutoringJob, language);

                  const estMonthly = job.monthlyEstimate || 10000;
                  const downpayment60 = estMonthly * 0.6;
                  const monthly23 = estMonthly * 0.23;

                  const currentChoice = selectedChoices[app.id] || app.commissionChoice || '60_percent_first_month';
                  const isVerified = app.commissionStatus === 'approved';
                  const isPendingAdmin = app.commissionStatus === 'pending_verification';

                  return (
                    <div key={app.id} className="bg-white rounded-2xl p-6 border-2 border-blue-500 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
                            {pt.statusPlacementApproved}
                          </span>
                          <h4 className="text-lg font-bold text-slate-900 mt-1">{locJob.title || app.jobTitle}</h4>
                          <p className="text-xs text-slate-500">
                            Est. Monthly Earnings: <strong>{estMonthly.toLocaleString()} ETB</strong> &bull; {locJob.rate || job.rate}
                          </p>
                        </div>

                        {isVerified && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" /> {pt.contractActiveTitle}
                          </span>
                        )}
                        {isPendingAdmin && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-900 border border-blue-300 animate-pulse">
                            <Clock className="w-4 h-4 text-blue-600" /> {pt.receiptUnderReviewTitle}
                          </span>
                        )}
                      </div>

                      {isVerified ? (
                        <div className="mt-4 p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-950 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">{pt.contractActiveTitle}</p>
                            <p className="text-xs text-blue-800 mt-0.5">
                              {pt.contractActiveDesc} Selected Model: <strong>{app.commissionChoice === '60_percent_first_month' ? pt.option60Title : pt.option23Title}</strong>.
                            </p>
                            {app.commissionReceiptUrl && (
                              <button
                                onClick={() => onViewReceipt(app.commissionReceiptUrl!, {
                                  payerOrStudent: tutor.name,
                                  amount: app.commissionChoice === '60_percent_first_month' ? downpayment60 : monthly23,
                                  monthOrPurpose: 'Tutoring Placement Commission',
                                  status: 'Approved',
                                })}
                                className="inline-flex items-center gap-1 text-xs font-bold text-blue-800 hover:underline mt-2"
                              >
                                <Eye className="w-3.5 h-3.5" /> {pt.viewApprovedReceiptBtn}
                              </button>
                            )}
                          </div>
                        </div>
                      ) : isPendingAdmin ? (
                        <div className="mt-4 p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-950 flex items-start gap-3">
                          <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">{pt.receiptUnderReviewTitle}</p>
                            <p className="text-xs text-blue-800 mt-0.5">
                              {pt.receiptUnderReviewDesc} Chosen Model:{' '}
                              <strong>
                                {app.commissionChoice === '60_percent_first_month'
                                  ? `${pt.option60Title} (${downpayment60.toLocaleString()} ETB)`
                                  : `${pt.option23Title} (${monthly23.toLocaleString()} ETB)`}
                              </strong>
                              . Ador Executive Admin will confirm shortly.
                            </p>
                            {app.commissionReceiptUrl && (
                              <button
                                onClick={() => onViewReceipt(app.commissionReceiptUrl!, {
                                  payerOrStudent: tutor.name,
                                  amount: app.commissionChoice === '60_percent_first_month' ? downpayment60 : monthly23,
                                  method: app.commissionMethod,
                                  reference: app.commissionReference,
                                  monthOrPurpose: 'Tutoring Placement Commission',
                                  status: 'Pending Verification',
                                })}
                                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline mt-2"
                              >
                                <Eye className="w-3.5 h-3.5" /> {pt.viewUploadedReceiptBtn}
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Interactive 60% vs 23% Choice Form */
                        <div className="mt-5 space-y-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            {pt.selectFeeModelTitle}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Option 1: 60% Downpayment */}
                            <label
                              onClick={() => setSelectedChoices(prev => ({ ...prev, [app.id]: '60_percent_first_month' }))}
                              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all block ${
                                currentChoice === '60_percent_first_month'
                                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`choice-${app.id}`}
                                    checked={currentChoice === '60_percent_first_month'}
                                    onChange={() => {}}
                                    className="text-emerald-600 focus:ring-emerald-500"
                                  />
                                  <h5 className="text-sm font-bold text-slate-900">
                                    {pt.option60Title}
                                  </h5>
                                </div>
                                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                  {pt.option60Badge}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-2">
                                {pt.option60Desc}
                              </p>
                              <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-baseline justify-between">
                                <span className="text-xs text-slate-500">{pt.requiredAmount}:</span>
                                <span className="text-sm font-extrabold text-slate-900">
                                  {downpayment60.toLocaleString()} ETB
                                </span>
                              </div>
                            </label>

                            {/* Option 2: 23% Monthly */}
                            <label
                              onClick={() => setSelectedChoices(prev => ({ ...prev, [app.id]: '23_percent_monthly' }))}
                              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all block ${
                                currentChoice === '23_percent_monthly'
                                  ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`choice-${app.id}`}
                                    checked={currentChoice === '23_percent_monthly'}
                                    onChange={() => {}}
                                    className="text-emerald-600 focus:ring-emerald-500"
                                  />
                                  <h5 className="text-sm font-bold text-slate-900">
                                    {pt.option23Title}
                                  </h5>
                                </div>
                                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                                  {pt.option23Badge}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-2">
                                {pt.option23Desc}
                              </p>
                              <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-baseline justify-between">
                                <span className="text-xs text-slate-500">{pt.monthlyAmount}:</span>
                                <span className="text-sm font-extrabold text-slate-900">
                                  {monthly23.toLocaleString()} ETB / mo
                                </span>
                              </div>
                            </label>
                          </div>

                          {/* Bank Accounts Info reminder */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                            <span className="text-slate-600">
                              <strong>Transfer to Ador:</strong> Telebirr: <code>0911 22 33 44</code> | CBE: <code>1000 2938 49182</code>
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Attach your official transfer screenshot below.
                            </span>
                          </div>

                          {/* Inputs & Screenshot */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Payment Method <span className="text-rose-500 font-bold ml-1">*</span>
                              </label>
                              <select
                                value={commissionMethods[app.id] || 'Telebirr'}
                                onChange={(e) => setCommissionMethods(prev => ({ ...prev, [app.id]: e.target.value }))}
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600"
                              >
                                <option value="Telebirr">Telebirr (0911 22 33 44)</option>
                                <option value="Commercial Bank of Ethiopia (CBE)">CBE (1000 2938 49182)</option>
                                <option value="Awash Bank">Awash Bank</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Transaction Reference <span className="text-rose-500 font-bold ml-1">*</span>
                              </label>
                              <input
                                type="text"
                                value={commissionRefs[app.id] || ''}
                                onChange={(e) => setCommissionRefs(prev => ({ ...prev, [app.id]: e.target.value }))}
                                placeholder="e.g. TXN98765"
                                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600"
                              />
                            </div>
                          </div>

                          {/* Receipt Screenshot Upload */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                              Payment Receipt Screenshot <span className="text-rose-500 font-bold ml-1">*</span>
                            </label>

                            {commissionReceipts[app.id] ? (
                              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span className="text-xs font-semibold text-emerald-800 flex-1">
                                  Payment Receipt Screenshot Attached
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCommissionReceipts(prev => ({ ...prev, [app.id]: '' }))}
                                  className="text-xs text-rose-600 hover:underline font-semibold"
                                >
                                  Change Image
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 transition-colors text-slate-600">
                                <Upload className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs font-bold text-slate-700">Attach Transfer Receipt Screenshot (Telebirr / CBE)</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleCommissionFileUpload(app.id, e)}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCommissionSubmit(app.id, estMonthly)}
                            className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm"
                          >
                            {pt.submitCommissionProofBtn}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3: AVAILABLE TUTORING JOBS BOARD */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{pt.jobBoardTitle}</h3>
                <p className="text-xs text-slate-500">
                  {pt.jobBoardSubtitle}
                </p>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={pt.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none"
                >
                  <option value="all">All Subjects</option>
                  <option value="physics">Physics</option>
                  <option value="math">Mathematics</option>
                  <option value="science">General Science</option>
                  <option value="cambridge">Cambridge IGCSE</option>
                </select>
              </div>
            </div>

            {/* Jobs List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const application = myApplications.find(a => 
                  String(a.jobId) === String(job.id) || 
                  a.jobTitle?.toLowerCase().trim() === job.title?.toLowerCase().trim()
                );
                const locJob = getLocalizedJob(job, language);
                const hasApplied = !!application;
                const isApproved = application?.status === 'approved';
                const isPending = application?.status === 'pending';

                return (
                  <div
                    key={job.id}
                    className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                      isApproved 
                        ? 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-200/50' 
                        : isPending 
                        ? 'bg-blue-50/30 border-blue-300 ring-2 ring-blue-200/40' 
                        : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          {locJob.grade}
                        </span>
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          {locJob.rate}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 leading-snug mb-2">
                        {locJob.title}
                      </h4>

                      <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                        <p className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          <span><strong>{pt.subjectLabel}:</strong> {locJob.subject}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span><strong>{pt.locationLabel}:</strong> {locJob.location}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span><strong>{pt.scheduleLabel}:</strong> {locJob.schedule}</span>
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                        {locJob.description}
                      </p>
                    </div>

                    {/* Action Area: Clearly displays applied state */}
                    <div>
                      {hasApplied ? (
                        <div className="pt-3 border-t border-slate-200/80">
                          {isApproved ? (
                            <div className="p-3 rounded-xl bg-blue-50/90 border border-blue-200 text-xs">
                              <div className="flex items-center justify-between font-bold text-blue-900">
                                <span className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-blue-700" /> {getLocalizedJobCardNotice('placementApproved', language)}
                                </span>
                                <span className="text-[10px] text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md font-bold">
                                  {getLocalizedJobCardNotice('readyForTutoring', language)}
                                </span>
                              </div>
                              <p className="text-[11px] text-blue-800 mt-1">
                                {getLocalizedJobCardNotice('feeConfirmationNotice', language)}
                              </p>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                              <div className="flex items-center justify-between font-bold text-blue-900">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-4 h-4 text-blue-600 animate-spin" /> {getLocalizedJobCardNotice('appliedUnderAdminReview', language)}
                                </span>
                                <span className="text-[10px] text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md font-bold">
                                  {getLocalizedDate(application.appliedDate, language)}
                                </span>
                              </div>
                              <p className="text-[11px] text-blue-800 mt-1">
                                {getLocalizedJobCardNotice('applicationSubmittedNotice', language)}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center shadow-2xs"
                        >
                          <span>{pt.apply1ClickBtn}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SUBMIT MONTHLY REPORT */}
      {activeTab === 'submit-report' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {pt.reportTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {pt.reportSubtitle}
            </p>
          </div>

          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {pt.studentNameLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reportStudentName}
                  onChange={(e) => setReportStudentName(e.target.value)}
                  placeholder="e.g. Samuel Kassahun"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {pt.parentEmailLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={reportParentEmail}
                  onChange={(e) => setReportParentEmail(e.target.value)}
                  placeholder="e.g. almaz.m@gmail.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {pt.monthLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                </label>
                <select
                  value={reportMonth}
                  onChange={(e) => setReportMonth(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="First Month (Meskerem / Month 1)">First Month (Meskerem / Month 1)</option>
                  <option value="Second Month (Tikimt / Month 2)">Second Month (Tikimt / Month 2)</option>
                  <option value="Third Month (Hidar / Month 3)">Third Month (Hidar / Month 3)</option>
                  <option value="Fourth Month (Tahsas / Month 4)">Fourth Month (Tahsas / Month 4)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {pt.hoursLabel} <span className="text-rose-500 font-bold ml-1">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={reportHours}
                  onChange={(e) => setReportHours(e.target.value)}
                  placeholder="16"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {pt.scoreLabel} <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <select
                value={reportScore}
                onChange={(e) => setReportScore(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Excellent (Straight A / 90%+)">Excellent (Straight A / 90%+)</option>
                <option value="Very Good (B+ to A / 80-89%)">Very Good (B+ to A / 80-89%)</option>
                <option value="Good / Steady Progress (70-79%)">Good / Steady Progress (70-79%)</option>
                <option value="Needs More Focus / Extra Sessions">Needs More Focus / Extra Sessions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {pt.strengthsLabel} <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={reportStrengths}
                onChange={(e) => setReportStrengths(e.target.value)}
                placeholder="e.g. Demonstrated outstanding grasp of quadratic equations, vectors, and solved 10 national exam problems independently."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {pt.improvementsLabel} <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={reportImprovements}
                onChange={(e) => setReportImprovements(e.target.value)}
                placeholder="e.g. Recommended extra practice on trigonometry identities and word problems before next week's exam."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingReport}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmittingReport ? 'Submitting to Admin...' : pt.submitReportBtn}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: SUBMITTED REPORTS & PARENT FEEDBACK */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              {pt.tabReportHistory}
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {myReports.length} Reports
            </span>
          </div>

          {myReports.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <ClipboardList className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">{cardTr.noReportsSubmittedYet || 'No monthly reports submitted yet.'}</p>
              <p className="text-xs text-slate-400 mt-1">{cardTr.submitFirstReportHint || 'Submit your first report using the "Submit Monthly Report" tab above.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="pb-3 pr-4">{cardTr.thStudentMonth || 'Student & Month'}</th>
                    <th className="pb-3 px-4">{cardTr.thHours || 'Hours'}</th>
                    <th className="pb-3 px-4">{cardTr.thAcademicRating || 'Academic Rating'}</th>
                    <th className="pb-3 px-4">{cardTr.thAdminDispatch || 'Admin Dispatch'}</th>
                    <th className="pb-3 pl-4 text-right">{cardTr.thParentApproval || 'Parent Approval'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myReports.map((r) => {
                    const isDispatched = r.status === 'dispatched_to_parent';
                    const isAccepted = r.parentDecision === 'accepted';
                    const isDeclined = r.parentDecision === 'declined';
                    const isPendingParent = !r.parentDecision;

                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 pr-4">
                          <p className="font-bold text-slate-900">{getLocalizedPersonName(r.studentName, language)}</p>
                          <p className="text-slate-500 text-[11px]">{getLocalizedMonth(r.month, language)} &bull; {cardTr.statusSubmitted || 'Submitted'} {getLocalizedDate(r.submittedDate, language)}</p>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">
                          {r.totalHours} {cardTr.hrsUnit || 'hrs'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-blue-50 text-blue-800 border border-blue-200">
                            {getLocalizedScore(r.overallScore, language)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {isDispatched ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              {cardTr.statusDispatchedParent || 'Dispatched to Parent'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50/60 text-blue-800 border border-blue-200">
                              {cardTr.statusPendingAdmin || 'Under Admin Review'}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pl-4 text-right">
                          {isAccepted && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusAcceptedParent || 'Accepted by Parent'}
                            </span>
                          )}
                          {isDeclined && (
                            <div className="text-right">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                <XCircle className="w-3.5 h-3.5" /> {cardTr.statusDeclinedParent || 'Declined by Parent'}
                              </span>
                              {r.parentFeedback && (
                                <p className="text-[11px] text-rose-600 mt-1 italic">
                                  "{r.parentFeedback}"
                                </p>
                              )}
                            </div>
                          )}
                          {isPendingParent && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              <Clock className="w-3.5 h-3.5" /> {cardTr.statusAwaitingParent || 'Awaiting Parent'}
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
      )}

      {/* TAB 4: MONTHLY PAYOUTS & OFFICIAL PAYMENT RECEIPTS FROM ADMIN */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {cardTr.payoutReceiptsHistoryTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {cardTr.payoutReceiptsHistorySubtitle}
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {myPayouts.length} Official Disbursements
              </span>
            </div>
          </div>

          {myPayouts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <DollarSign className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">{pt.noPayoutsFound}</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Once the Ador Administration disburses your monthly teaching salary via Telebirr or CBE, the official payment receipt screenshot will appear here for your financial records.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myPayouts.map((payout) => {
                const pMonth = payout.month || (payout as any).tutoringMonth || 'Current Month';
                const pHours = payout.teachingHours || (payout as any).completedHours || 16;
                const pMethod = payout.method || (payout as any).paymentMethod || 'Telebirr';
                const pRef = payout.reference || (payout as any).transactionReference || 'TXN-DISB';
                const pNotes = payout.notes || (payout as any).adminNotes;

                return (
                <div 
                  key={payout.id} 
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {getLocalizedMonth(pMonth, language)}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1.5">
                          {getLocalizedPersonName(payout.studentName, language)}
                        </h4>
                        <p className="text-xs text-slate-500">{pt.studentCourseLabel}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-black text-blue-700">
                          {payout.amount.toLocaleString()} ETB
                        </span>
                        <p className="text-[11px] text-slate-500 font-semibold">{pHours} {cardTr.teachingHoursLabel || 'Teaching Hours'}</p>
                      </div>
                    </div>

                    {/* Transfer Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-slate-500 block text-[11px]">{pt.methodLabel}</span>
                        <span className="font-bold text-slate-800">{pMethod}</span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-slate-500 block text-[11px]">{pt.refLabel}</span>
                        <span className="font-mono font-bold text-slate-800 truncate block" title={pRef}>
                          {pRef}
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl col-span-2">
                        <span className="text-slate-500 block text-[11px]">{pt.dateDisbursedLabel}</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" /> {getLocalizedDate(payout.disbursedDate, language)}
                        </span>
                      </div>
                    </div>

                    {/* Admin Message */}
                    {pNotes && (
                      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900">
                        <span className="font-bold block text-[11px] text-blue-700 mb-0.5">{pt.adminNotesLabel}:</span>
                        <p className="italic">"{pNotes}"</p>
                      </div>
                    )}

                    {/* Receipt Screenshot Preview Thumbnail */}
                    {payout.receiptScreenshotUrl && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-600 block">
                          {cardTr.disbursementSlipLabel || 'Disbursement Slip Screenshot:'}
                        </span>
                        <div 
                          onClick={() => onViewReceipt(payout.receiptScreenshotUrl, {
                            payerOrStudent: getLocalizedPersonName(payout.studentName, language),
                            amount: payout.amount,
                            method: pMethod,
                            reference: pRef,
                            monthOrPurpose: `Tutor Payout (${getLocalizedMonth(pMonth, language)})`,
                            status: 'Disbursed by Admin',
                          })}
                          className="cursor-pointer group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-28 flex items-center justify-center"
                        >
                          <img 
                            src={payout.receiptScreenshotUrl} 
                            alt="Payout Receipt" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5">
                            <Eye className="w-4 h-4" /> {cardTr.clickToEnlarge || 'Click to View Full Size'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View Button */}
                  <div className="pt-4 mt-2">
                    <button
                      type="button"
                      onClick={() => onViewReceipt(payout.receiptScreenshotUrl, {
                        payerOrStudent: payout.studentName,
                        amount: payout.amount,
                        method: pMethod,
                        reference: pRef,
                        monthOrPurpose: `Tutor Payout (${pMonth})`,
                        status: 'Disbursed by Admin',
                      })}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Eye className="w-4 h-4 text-emerald-700" />
                      <span>{pt.viewPayoutReceiptBtn}</span>
                    </button>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
