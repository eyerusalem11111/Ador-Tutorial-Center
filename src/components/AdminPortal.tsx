import React, { useState } from 'react';
import { 
  PaymentRecord, 
  TutorProfile, 
  TutoringJob, 
  JobApplication, 
  MonthlyReport, 
  CurrentUser, 
  SubAdminUser, 
  AdminDesignation, 
  AdminPermissions,
  TutorMonthlyPayout,
  SupportedLanguage 
} from '../types';
import { PORTAL_TRANSLATIONS } from '../data/portalTranslations';
import { getDashboardCardTranslations } from '../data/dashboardCardTranslations';
import { 
  getLocalizedPersonName, 
  getLocalizedMonth, 
  getLocalizedScore, 
  getLocalizedActionText,
  getLocalizedLocation,
  getLocalizedDate
} from '../data/dashboardLocalization';
import { getLocalizedJob } from '../data/localizedJobs';
import { createReceiptPlaceholder } from '../data/initialData';
import { 
  ShieldCheck, 
  CreditCard, 
  Award, 
  DollarSign, 
  FileText, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Plus, 
  Users, 
  Search,
  Filter,
  Check,
  AlertTriangle,
  UserCheck,
  UserX,
  Shield,
  Key,
  Lock,
  Edit2,
  Trash2,
  Sliders,
  ShieldAlert,
  Upload,
  Send,
  Sparkles,
  BookOpen,
  Download,
  ExternalLink
} from 'lucide-react';

interface AdminPortalProps {
  payments: PaymentRecord[];
  tutors: TutorProfile[];
  jobs: TutoringJob[];
  applications: JobApplication[];
  reports: MonthlyReport[];
  payouts?: TutorMonthlyPayout[];
  currentUser: CurrentUser;
  subAdmins: SubAdminUser[];
  onUpdatePaymentStatus: (id: string, status: 'approved' | 'rejected') => void;
  onUpdateTutorMembership: (tutorId: string, status: 'verified' | 'unpaid') => void;
  onUpdateCommissionStatus: (applicationId: string, status: 'approved' | 'rejected') => void;
  onApproveReportForParent: (reportId: string) => void;
  onUpdateApplicationStatus: (applicationId: string, status: 'approved' | 'declined') => void;
  onSendPayout?: (payoutData: Omit<TutorMonthlyPayout, 'id' | 'disbursedDate' | 'status'>) => void;
  onOpenNewJobModal: () => void;
  onViewReceipt: (receiptUrl: string, details: any) => void;
  onUpdateSubAdmins: (subAdmins: SubAdminUser[]) => void;
  onSwitchAdminDesignation?: (designation: AdminDesignation) => void;
  showToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
  language?: SupportedLanguage;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  payments,
  tutors,
  jobs,
  applications,
  reports,
  payouts = [],
  currentUser,
  subAdmins,
  onUpdatePaymentStatus,
  onUpdateTutorMembership,
  onUpdateCommissionStatus,
  onApproveReportForParent,
  onUpdateApplicationStatus,
  onSendPayout,
  onOpenNewJobModal,
  onViewReceipt,
  onUpdateSubAdmins,
  onSwitchAdminDesignation,
  showToast,
  language = 'en',
}) => {
  const pa = PORTAL_TRANSLATIONS[language] ? PORTAL_TRANSLATIONS[language].admin : PORTAL_TRANSLATIONS.en.admin;
  const cardTr = getDashboardCardTranslations(language);
  const currentDesignation = currentUser.adminDesignation || 'super_admin';
  const isSuperAdmin = currentDesignation === 'super_admin';

  // Sub-admin view classification: Super Admin sees all desks; Sub-admins view classified desks
  const canViewPayments = isSuperAdmin || currentDesignation === 'finance_officer' || currentUser.permissions?.canVerifyPayments === true;
  const canViewMembership = isSuperAdmin || currentDesignation === 'finance_officer' || currentDesignation === 'academic_coordinator' || currentUser.permissions?.canVerifyTutors === true;
  const canViewCommissions = isSuperAdmin || currentDesignation === 'finance_officer' || currentUser.permissions?.canVerifyPayments === true;
  const canViewReports = isSuperAdmin || currentDesignation === 'academic_coordinator' || currentDesignation === 'counselor' || currentUser.permissions?.canApproveReports === true;
  const canViewJobs = isSuperAdmin || currentDesignation === 'academic_coordinator' || currentDesignation === 'counselor' || currentUser.permissions?.canPostJobs === true || currentUser.permissions?.canManageApplications === true;
  const canViewPayouts = isSuperAdmin || currentDesignation === 'finance_officer' || currentUser.permissions?.canVerifyPayments === true;
  const canViewRoles = isSuperAdmin || currentUser.permissions?.canAssignRoles === true;

  // Sub-admin action permission flags
  const canVerifyPayments = isSuperAdmin || currentUser.permissions?.canVerifyPayments !== false;
  const canVerifyTutors = isSuperAdmin || currentUser.permissions?.canVerifyTutors !== false;
  const canPostJobs = isSuperAdmin || currentUser.permissions?.canPostJobs !== false;
  const canApproveReports = isSuperAdmin || currentUser.permissions?.canApproveReports !== false;
  const canManageApplications = isSuperAdmin || currentUser.permissions?.canManageApplications !== false;
  const canAssignRoles = isSuperAdmin || currentUser.permissions?.canAssignRoles === true;

  // Compute allowed tabs based on classified role permissions
  const allowedTabs: Array<'payments' | 'membership' | 'commissions' | 'reports' | 'jobs' | 'payouts' | 'roles'> = [];
  if (canViewPayments) allowedTabs.push('payments');
  if (canViewMembership) allowedTabs.push('membership');
  if (canViewCommissions) allowedTabs.push('commissions');
  if (canViewReports) allowedTabs.push('reports');
  if (canViewJobs) allowedTabs.push('jobs');
  if (canViewPayouts) allowedTabs.push('payouts');
  if (canViewRoles) allowedTabs.push('roles');
  if (allowedTabs.length === 0) allowedTabs.push('payments');

  const defaultTab = allowedTabs[0] || 'payments';

  const [activeTab, setActiveTab] = useState<'payments' | 'membership' | 'commissions' | 'reports' | 'jobs' | 'payouts' | 'roles'>(defaultTab);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-switch to allowed tab if role or activeTab mismatch
  React.useEffect(() => {
    if (!allowedTabs.includes(activeTab)) {
      setActiveTab(allowedTabs[0]);
    }
  }, [currentDesignation, allowedTabs, activeTab]);

  // Read Full Report & Expand State (Requirement 1)
  const [selectedReportToRead, setSelectedReportToRead] = useState<MonthlyReport | null>(null);
  const [expandedReportIds, setExpandedReportIds] = useState<Set<string>>(new Set());

  const toggleReportExpand = (id: string) => {
    setExpandedReportIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Admin Monthly Payout to Tutor State (Requirements 3 & 10)
  const [payoutTutorId, setPayoutTutorId] = useState<string>('');
  const [payoutStudentName, setPayoutStudentName] = useState<string>('Samuel Kassahun (Grade 12)');
  const [payoutMonth, setPayoutMonth] = useState<string>('First Month (Meskerem)');
  const [payoutHours, setPayoutHours] = useState<string>('16');
  const [payoutAmount, setPayoutAmount] = useState<string>('8000');
  const [payoutMethod, setPayoutMethod] = useState<'Telebirr' | 'Commercial Bank of Ethiopia (CBE)' | 'Awash Bank' | 'Other Bank'>('Telebirr');
  const [payoutReference, setPayoutReference] = useState<string>('');
  const [payoutNotes, setPayoutNotes] = useState<string>('');
  const [payoutScreenshotUrl, setPayoutScreenshotUrl] = useState<string | null>(null);
  const [isSendingPayout, setIsSendingPayout] = useState<boolean>(false);

  // Sub-Admin Management Modal State
  const [isSubAdminModalOpen, setIsSubAdminModalOpen] = useState(false);
  const [editingSubAdminId, setEditingSubAdminId] = useState<string | null>(null);
  const [subAdminForm, setSubAdminForm] = useState<{
    name: string;
    email: string;
    phone: string;
    designation: AdminDesignation;
    roleTitle: string;
    permissions: AdminPermissions;
  }>({
    name: '',
    email: '',
    phone: '',
    designation: 'academic_coordinator',
    roleTitle: 'Academic Coordinator',
    permissions: {
      canVerifyPayments: false,
      canVerifyTutors: true,
      canPostJobs: true,
      canApproveReports: true,
      canManageApplications: true,
      canAssignRoles: false,
    }
  });

  const handleOpenAddSubAdmin = () => {
    setEditingSubAdminId(null);
    setSubAdminForm({
      name: '',
      email: '',
      phone: '',
      designation: 'academic_coordinator',
      roleTitle: 'Academic Coordinator',
      permissions: {
        canVerifyPayments: false,
        canVerifyTutors: true,
        canPostJobs: true,
        canApproveReports: true,
        canManageApplications: true,
        canAssignRoles: false,
      }
    });
    setIsSubAdminModalOpen(true);
  };

  const handleOpenEditSubAdmin = (admin: SubAdminUser) => {
    setEditingSubAdminId(admin.id);
    setSubAdminForm({
      name: admin.name,
      email: admin.email,
      phone: admin.phone || '',
      designation: admin.designation,
      roleTitle: admin.roleTitle,
      permissions: { ...admin.permissions }
    });
    setIsSubAdminModalOpen(true);
  };

  const handleSaveSubAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subAdminForm.name.trim() || !subAdminForm.email.trim()) {
      showToast('error', 'Name and Email are required.');
      return;
    }

    if (editingSubAdminId) {
      // Update existing
      const updated = subAdmins.map(s => {
        if (s.id === editingSubAdminId) {
          return {
            ...s,
            name: subAdminForm.name,
            email: subAdminForm.email,
            phone: subAdminForm.phone,
            designation: subAdminForm.designation,
            roleTitle: subAdminForm.roleTitle,
            permissions: subAdminForm.permissions,
          };
        }
        return s;
      });
      onUpdateSubAdmins(updated);
      showToast('success', `Updated permissions for ${subAdminForm.name}!`);
    } else {
      // Create new sub-admin
      const newAdmin: SubAdminUser = {
        id: `admin-${Date.now()}`,
        name: subAdminForm.name,
        email: subAdminForm.email,
        phone: subAdminForm.phone || '+251 91 000 0000',
        designation: subAdminForm.designation,
        roleTitle: subAdminForm.roleTitle,
        status: 'active',
        addedAt: new Date().toISOString().split('T')[0],
        lastActive: 'Newly Provisioned',
        permissions: subAdminForm.permissions,
      };
      onUpdateSubAdmins([...subAdmins, newAdmin]);
      showToast('success', `Sub-Admin ${newAdmin.name} provisioned with custom access rights!`);
    }
    setIsSubAdminModalOpen(false);
  };

  const handleToggleSubAdminStatus = (id: string) => {
    if (id === 'admin-super-1') {
      showToast('error', 'Cannot suspend the Super Administrator root account.');
      return;
    }
    const updated = subAdmins.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'active' ? 'suspended' as const : 'active' as const;
        return { ...s, status: newStatus };
      }
      return s;
    });
    onUpdateSubAdmins(updated);
    showToast('info', 'Sub-Admin status updated.');
  };

  const handleDeleteSubAdmin = (id: string) => {
    if (id === 'admin-super-1') {
      showToast('error', 'Cannot remove the Super Administrator root account.');
      return;
    }
    const updated = subAdmins.filter(s => s.id !== id);
    onUpdateSubAdmins(updated);
    showToast('info', 'Sub-Admin removed from active staff roster.');
  };

  // Counts for pending action items
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const pendingMemberships = tutors.filter(t => t.membershipStatus === 'pending_verification');
  const pendingCommissions = applications.filter(a => a.status === 'approved' && a.commissionStatus === 'pending_verification');
  const pendingReports = reports.filter(r => r.status === 'pending_admin');
  const pendingApps = applications.filter(a => a.status === 'pending');

  const handlePaymentAction = (id: string, status: 'approved' | 'rejected') => {
    onUpdatePaymentStatus(id, status);
    showToast(status === 'approved' ? 'success' : 'error', `Parent payment marked as ${status}.`);
  };

  const handleMembershipAction = (tutorId: string, status: 'verified' | 'unpaid') => {
    onUpdateTutorMembership(tutorId, status);
    showToast(status === 'verified' ? 'success' : 'error', `Tutor 500 ETB membership marked as ${status}.`);
  };

  const handleCommissionAction = (appId: string, status: 'approved' | 'rejected') => {
    onUpdateCommissionStatus(appId, status);
    showToast(status === 'approved' ? 'success' : 'error', `Placement commission marked as ${status}. Contract updated.`);
  };

  const handleReportApprove = (reportId: string) => {
    onApproveReportForParent(reportId);
    showToast('success', 'Report verified by Admin and dispatched to Parent for sign-off!', 'Report Dispatched');
  };

  const handleAppAction = (appId: string, status: 'approved' | 'declined') => {
    onUpdateApplicationStatus(appId, status);
    if (status === 'approved') {
      showToast('success', 'Tutor accepted for job! Placement card unlocked for 60%/23% commission.', 'Tutor Accepted');
    } else {
      showToast('info', 'Application declined.');
    }
  };

  const handleSendPayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetTutor = tutors.find(t => t.id === payoutTutorId) || tutors[0];
    if (!targetTutor) {
      showToast('error', 'Please select a recipient tutor.');
      return;
    }

    const ref = payoutReference || ('TXN-DISB-' + Math.floor(100000 + Math.random() * 900000));
    const receipt = payoutScreenshotUrl || createReceiptPlaceholder(
      payoutMethod.toLowerCase().includes('telebirr') ? 'telebirr' : 'cbe',
      ref,
      parseFloat(payoutAmount || '8000').toLocaleString('en-US', { minimumFractionDigits: 2 }),
      targetTutor.name,
      `Tutor Monthly Payment - ${payoutMonth}`
    );

    setIsSendingPayout(true);
    setTimeout(() => {
      if (onSendPayout) {
        onSendPayout({
          tutorId: targetTutor.id,
          tutorName: targetTutor.name,
          tutorEmail: targetTutor.email,
          tutorPhone: targetTutor.phone,
          studentName: payoutStudentName,
          month: payoutMonth,
          teachingHours: parseInt(payoutHours, 10) || 16,
          amount: parseFloat(payoutAmount) || 8000,
          method: payoutMethod,
          reference: ref,
          receiptScreenshotUrl: receipt,
          notes: payoutNotes || `Monthly payment for ${payoutMonth} (${payoutHours} hours). Well done!`,
        });
      }

      setIsSendingPayout(false);
      setPayoutReference('');
      setPayoutNotes('');
      setPayoutScreenshotUrl(null);
      showToast('success', `Monthly payout voucher and receipt screenshot successfully sent to ${targetTutor.name}!`, 'Receipt Sent');
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Executive Banner with Role Identity and Switcher */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-4 h-4" /> {cardTr.adorCentralDesk || 'ADOR CENTRAL DESK'}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30 uppercase tracking-wider">
                {currentDesignation === 'super_admin' ? (cardTr.adminRoleSuper || 'Root Super Administrator') :
                 currentDesignation === 'academic_coordinator' ? (cardTr.adminRoleAcademic || 'Academic Coordinator Sub-Admin') :
                 currentDesignation === 'finance_officer' ? (cardTr.adminRoleFinance || 'Finance Sub-Admin') : (cardTr.adminRoleCounselor || 'Counselor Sub-Admin')}
              </span>
              <span className="text-xs text-blue-200/80 font-medium">{getLocalizedLocation('Addis Ababa, Ethiopia', language)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {cardTr.adminExecutiveHub || 'Ador Tutorial Center — Executive Operations Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              <span className="font-semibold text-blue-200">{cardTr.signedInAs || 'Signed in as'}:</span> <strong className="text-white">{getLocalizedPersonName(currentUser.name, language)}</strong> ({currentUser.email}). {cardTr.activeSessionScopes || 'Active session permissions are enforced with role-isolated dashboard scopes.'}
            </p>

            {/* Quick Interactive Role Simulator for Super Admin */}
            {onSwitchAdminDesignation && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-blue-200 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> {cardTr.auditPerspectiveLabel || 'Audit Perspective As:'}
                </span>
                <button
                  type="button"
                  onClick={() => onSwitchAdminDesignation('super_admin')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currentDesignation === 'super_admin'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cardTr.adminRoleSuper || 'Super Admin (Master)'}
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchAdminDesignation('academic_coordinator')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currentDesignation === 'academic_coordinator'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cardTr.adminRoleAcademic || 'Academic Coordinator'}
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchAdminDesignation('finance_officer')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    currentDesignation === 'finance_officer'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cardTr.adminRoleFinance || 'Finance Sub-Admin'}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center">
            {isSuperAdmin && (
              <button
                onClick={handleOpenAddSubAdmin}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-600 text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>{cardTr.btnProvisionSubAdmin || '+ Provision Sub-Admin'}</span>
              </button>
            )}

            {canPostJobs && (
              <button
                onClick={onOpenNewJobModal}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{cardTr.btnPostOpening || 'Post Tutoring Opening'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid - Classified by Sub-Admin Role (Super Admin sees all) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Parent Payments */}
        {canViewPayments && (
          <div 
            onClick={() => setActiveTab('payments')}
            className={`cursor-pointer bg-white p-5 rounded-2xl border shadow-xs transition-all ${
              activeTab === 'payments' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {cardTr.kpiParentPayments}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {pendingPayments.length} Pending
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{payments.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{cardTr.kpiParentPaymentsSub}</p>
          </div>
        )}

        {/* Registered Tutors */}
        {canViewMembership && (
          <div 
            onClick={() => setActiveTab('membership')}
            className={`cursor-pointer bg-white p-5 rounded-2xl border shadow-xs transition-all ${
              activeTab === 'membership' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {cardTr.kpiTutors}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {pendingMemberships.length} To Verify
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{tutors.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{cardTr.kpiTutorsSub}</p>
          </div>
        )}

        {/* Commissions Desk */}
        {canViewCommissions && (
          <div 
            onClick={() => setActiveTab('commissions')}
            className={`cursor-pointer bg-white p-5 rounded-2xl border shadow-xs transition-all ${
              activeTab === 'commissions' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {cardTr.kpiCommissions}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {pendingCommissions.length} Action
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">
              {applications.filter(a => a.status === 'approved').length}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{cardTr.kpiCommissionsSub}</p>
          </div>
        )}

        {/* Monthly Reports */}
        {canViewReports && (
          <div 
            onClick={() => setActiveTab('reports')}
            className={`cursor-pointer bg-white p-5 rounded-2xl border shadow-xs transition-all ${
              activeTab === 'reports' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {cardTr.kpiReports}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {pendingReports.length} Review
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{reports.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{cardTr.kpiReportsSub}</p>
          </div>
        )}

        {/* Tutor Payouts */}
        {canViewPayouts && (
          <div 
            onClick={() => setActiveTab('payouts')}
            className={`cursor-pointer bg-white p-5 rounded-2xl border shadow-xs transition-all ${
              activeTab === 'payouts' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {cardTr.kpiPayouts}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {payouts.length} Sent
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{payouts.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{cardTr.kpiPayoutsSub}</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs Bar - Clean typography without icons, brand Blue & White */}
      <div className="flex flex-wrap border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto">
        {canViewPayments && (
          <button
            id="admin-tab-payments"
            onClick={() => setActiveTab('payments')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'payments'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabParentPayments}</span>
            {pendingPayments.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-blue-600 text-white font-extrabold">
                {pendingPayments.length}
              </span>
            )}
          </button>
        )}

        {canViewMembership && (
          <button
            id="admin-tab-membership"
            onClick={() => setActiveTab('membership')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'membership'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabTutorMemberships}</span>
            {pendingMemberships.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-blue-600 text-white font-extrabold">
                {pendingMemberships.length}
              </span>
            )}
          </button>
        )}

        {canViewCommissions && (
          <button
            id="admin-tab-commissions"
            onClick={() => setActiveTab('commissions')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'commissions'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabCommissions}</span>
            {pendingCommissions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-blue-600 text-white font-extrabold">
                {pendingCommissions.length}
              </span>
            )}
          </button>
        )}

        {canViewReports && (
          <button
            id="admin-tab-reports"
            onClick={() => setActiveTab('reports')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'reports'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabReports}</span>
            {pendingReports.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-blue-600 text-white font-extrabold">
                {pendingReports.length}
              </span>
            )}
          </button>
        )}

        {canViewJobs && (
          <button
            id="admin-tab-jobs"
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'jobs'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabJobs}</span>
            {pendingApps.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-blue-600 text-white font-extrabold">
                {pendingApps.length}
              </span>
            )}
          </button>
        )}

        {canViewPayouts && (
          <button
            id="admin-tab-payouts"
            onClick={() => setActiveTab('payouts')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'payouts'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabPayouts || 'Tutor Monthly Payouts & Receipts'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800 font-extrabold border border-blue-200">
              {payouts.length} Sent
            </span>
          </button>
        )}

        {canViewRoles && (
          <button
            id="admin-tab-roles"
            onClick={() => setActiveTab('roles')}
            className={`pb-4 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'roles'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{pa.tabSubAdmins}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800 font-extrabold border border-blue-200">
              {subAdmins.length} Staff
            </span>
          </button>
        )}
      </div>

      {/* TAB 1: PARENT PAYMENTS VERIFICATION DESK */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{cardTr.deskParentPaymentsTitle}</h3>
              <p className="text-xs text-slate-500">
                {cardTr.deskParentPaymentsDesc}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              {payments.length} Total Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-2">{cardTr.thParentStudent || 'Parent & Student'}</th>
                  <th className="pb-3 px-2">{cardTr.thSelectedMonth || 'Selected Month'}</th>
                  <th className="pb-3 px-2">{cardTr.thMethodRef || 'Method & Ref'}</th>
                  <th className="pb-3 px-2">{cardTr.thReceiptScreenshot || 'Receipt Screenshot'}</th>
                  <th className="pb-3 px-2">{cardTr.thStatus || 'Status'}</th>
                  <th className="pb-3 pl-2 text-right">{cardTr.thActions || 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((pay) => {
                  const isApproved = pay.status === 'approved';
                  const isPending = pay.status === 'pending';
                  const isRejected = pay.status === 'rejected';

                  return (
                    <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pr-2">
                        <strong className="text-slate-900 block text-xs sm:text-sm">{getLocalizedPersonName(pay.parentName, language)}</strong>
                        <span className="text-xs text-slate-500">{cardTr.studentLabel || 'Student'}: {getLocalizedPersonName(pay.studentName, language)}</span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100">
                          {getLocalizedMonth(pay.month, language)}
                        </span>
                        <span className="block text-xs font-bold text-slate-700 mt-1">
                          {pay.amount.toLocaleString()} ETB
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="font-medium text-slate-800 text-xs block">{pay.method}</span>
                        <code className="text-[11px] font-mono text-slate-500">{pay.reference}</code>
                      </td>
                      <td className="py-3.5 px-2">
                        <button
                          onClick={() => onViewReceipt(pay.screenshotUrl, {
                            payerOrStudent: `${getLocalizedPersonName(pay.parentName, language)} (${getLocalizedPersonName(pay.studentName, language)})`,
                            amount: pay.amount,
                            method: pay.method,
                            reference: pay.reference,
                            monthOrPurpose: getLocalizedMonth(pay.month, language),
                            status: pay.status,
                          })}
                          className="flex items-center gap-2 group p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <img
                            src={pay.screenshotUrl}
                            alt="Receipt thumb"
                            className="w-10 h-10 object-cover rounded-md border border-slate-200 group-hover:shadow-xs"
                          />
                          <span className="text-xs font-bold text-blue-700 group-hover:underline">
                            {cardTr.btnExpand || 'Expand 🔍'}
                          </span>
                        </button>
                      </td>
                      <td className="py-3.5 px-2">
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusApproved || 'Approved'}
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            <Clock className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusPending || 'Pending'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" /> {cardTr.statusRejected || 'Rejected'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handlePaymentAction(pay.id, 'approved')}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
                          >
                            ✔ {cardTr.btnApprove || 'Approve'}
                          </button>
                          <button
                            onClick={() => handlePaymentAction(pay.id, 'rejected')}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 transition-colors"
                          >
                            ✖ {cardTr.btnReject || 'Reject'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TUTOR 500 ETB MEMBERSHIP DESK */}
      {activeTab === 'membership' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{cardTr.deskTutorsTitle}</h3>
            <p className="text-xs text-slate-500">
              {cardTr.deskTutorsDesc}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-2">{cardTr.thTutorPhone || 'Tutor Name & Contact'}</th>
                  <th className="pb-3 px-2">{cardTr.thMethodRef || 'Method & Ref'}</th>
                  <th className="pb-3 px-2">{cardTr.thFeeReceipt || '500 ETB Receipt'}</th>
                  <th className="pb-3 px-2">{cardTr.thStatus || 'Status'}</th>
                  <th className="pb-3 pl-2 text-right">{cardTr.thActions || 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tutors.map((t) => {
                  const isVerified = t.membershipStatus === 'verified';
                  const isPending = t.membershipStatus === 'pending_verification';

                  return (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pr-2">
                        <strong className="text-slate-900 block">{getLocalizedPersonName(t.name, language)}</strong>
                        <span className="text-xs text-slate-500">{t.email} &bull; {t.phone}</span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="font-medium text-slate-800 text-xs block">{t.membershipMethod || '-'}</span>
                        <code className="text-[11px] font-mono text-slate-500">{t.membershipReference || '-'}</code>
                      </td>
                      <td className="py-3.5 px-2">
                        {t.membershipReceiptUrl ? (
                          <button
                            onClick={() => onViewReceipt(t.membershipReceiptUrl!, {
                              payerOrStudent: getLocalizedPersonName(t.name, language),
                              amount: 500,
                              method: t.membershipMethod,
                              reference: t.membershipReference,
                              monthOrPurpose: 'Tutor 500 ETB Membership',
                              status: t.membershipStatus,
                            })}
                            className="flex items-center gap-2 group p-1 rounded-lg hover:bg-slate-100"
                          >
                            <img
                              src={t.membershipReceiptUrl}
                              alt="Receipt thumb"
                              className="w-10 h-10 object-cover rounded-md border border-slate-200"
                            />
                            <span className="text-xs font-bold text-blue-700 group-hover:underline">
                              {cardTr.btnExpand || 'Expand 🔍'}
                            </span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">{cardTr.noReceiptYet || 'No Receipt Yet'}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-2">
                        {isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusVerifiedMember || 'Verified Member'}
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            <Clock className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusUnderReview || 'Under Review'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            {cardTr.statusUnpaid || 'Unpaid'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleMembershipAction(t.id, 'verified')}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
                          >
                            ✔ {cardTr.btnVerify || 'Verify'}
                          </button>
                          <button
                            onClick={() => handleMembershipAction(t.id, 'unpaid')}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 transition-colors"
                          >
                            ✖ {cardTr.btnReject || 'Reject'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TUTOR JOB PLACEMENT COMMISSIONS (60% Downpayment vs 23% Monthly) */}
      {activeTab === 'commissions' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {cardTr.deskCommissionsTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {cardTr.deskCommissionsDesc}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-2">{cardTr.thJobTutor || 'Job Title & Tutor'}</th>
                  <th className="pb-3 px-2">{cardTr.thCommissionOption || 'Chosen Commission Option'}</th>
                  <th className="pb-3 px-2">{cardTr.thMethodRef || 'Method & Ref'}</th>
                  <th className="pb-3 px-2">{cardTr.thReceiptProof || 'Receipt Proof'}</th>
                  <th className="pb-3 px-2">{cardTr.thStatus || 'Contract Status'}</th>
                  <th className="pb-3 pl-2 text-right">{cardTr.thActions || 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications
                  .filter(app => app.status === 'approved')
                  .map((app) => {
                    const isApproved = app.commissionStatus === 'approved';
                    const isPending = app.commissionStatus === 'pending_verification';

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 pr-2">
                          <strong className="text-slate-900 block">{app.jobTitle}</strong>
                          <span className="text-xs text-slate-500">{cardTr.tutorLabel || 'Tutor'}: {getLocalizedPersonName(app.tutorName, language)}</span>
                        </td>
                        <td className="py-3.5 px-2">
                          {app.commissionChoice === '60_percent_first_month' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {cardTr.option1Downpayment || 'Option 1: 60% Downpayment'}
                            </span>
                          ) : app.commissionChoice === '23_percent_monthly' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {cardTr.option2Monthly || 'Option 2: 23% Monthly'}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic">{cardTr.pendingTutorChoice || 'Pending Tutor Choice'}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="font-medium text-slate-800 text-xs block">{app.commissionMethod || '-'}</span>
                          <code className="text-[11px] font-mono text-slate-500">{app.commissionReference || '-'}</code>
                        </td>
                        <td className="py-3.5 px-2">
                          {app.commissionReceiptUrl ? (
                            <button
                              onClick={() => onViewReceipt(app.commissionReceiptUrl!, {
                                payerOrStudent: getLocalizedPersonName(app.tutorName, language),
                                method: app.commissionMethod,
                                reference: app.commissionReference,
                                monthOrPurpose: app.commissionChoice === '60_percent_first_month' ? '60% Placement Downpayment' : '23% Monthly Commission',
                                status: app.commissionStatus,
                              })}
                              className="flex items-center gap-2 group p-1 rounded-lg hover:bg-slate-100"
                            >
                              <img
                                src={app.commissionReceiptUrl}
                                alt="Receipt thumb"
                                className="w-10 h-10 object-cover rounded-md border border-slate-200"
                              />
                              <span className="text-xs font-bold text-blue-700 group-hover:underline">
                                {cardTr.btnExpand || 'Expand 🔍'}
                              </span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">{cardTr.noReceiptYet || 'No Receipt Yet'}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-2">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusContractActive || 'Contract Active'}
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              <Clock className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusUnderReview || 'Under Verification'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              {cardTr.statusUnpaid || 'Unpaid'}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleCommissionAction(app.id, 'approved')}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
                            >
                              ✔ {cardTr.btnApprove || 'Approve'}
                            </button>
                            <button
                              onClick={() => handleCommissionAction(app.id, 'rejected')}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 transition-colors"
                            >
                              ✖ {cardTr.btnReject || 'Reject'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: MONTHLY REPORTS & LIVE PARENT FEEDBACK */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {cardTr.deskReportsTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {cardTr.deskReportsDesc}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-2">{cardTr.thTutorStudent || 'Tutor & Student'}</th>
                  <th className="pb-3 px-2">{cardTr.thMonthHours || 'Month & Hours'}</th>
                  <th className="pb-3 px-2">{cardTr.thEvaluationSummary || 'Evaluation Summary'}</th>
                  <th className="pb-3 px-2">{cardTr.thAdminStatus || 'Admin Status'}</th>
                  <th className="pb-3 px-2">{cardTr.thParentDecision || 'Parent Decision'}</th>
                  <th className="pb-3 pl-2 text-right">{cardTr.thActions || 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((rep) => {
                  const isApprovedForParent = rep.status === 'approved_for_parent';
                  const isAccepted = rep.parentDecision === 'accepted';
                  const isDeclined = rep.parentDecision === 'declined';
                  const isPendingParent = rep.parentDecision === 'pending';

                  return (
                    <tr key={rep.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pr-2">
                        <strong className="text-slate-900 block">{getLocalizedPersonName(rep.tutorName, language)}</strong>
                        <span className="text-xs text-slate-500">{cardTr.studentLabel || 'Student'}: {getLocalizedPersonName(rep.studentName, language)}</span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="font-semibold text-slate-800 text-xs block">{getLocalizedMonth(rep.month, language)}</span>
                        <span className="text-xs text-slate-500">{rep.totalHours} hrs &bull; {getLocalizedScore(rep.overallScore, language)}</span>
                      </td>
                      <td 
                        className="py-3.5 px-2 max-w-sm cursor-pointer group"
                        onClick={() => toggleReportExpand(rep.id)}
                        title="Click to expand/collapse full report evaluation"
                      >
                        <div className="space-y-1">
                          <p className={`text-xs text-slate-700 leading-relaxed ${expandedReportIds.has(rep.id) ? 'whitespace-pre-line' : 'line-clamp-2'}`}>
                            <strong className="text-slate-900 block font-semibold">{cardTr.strengthsLabel || 'Strengths & Topics'}:</strong>
                            {rep.strengths}
                          </p>
                          {expandedReportIds.has(rep.id) && rep.improvements && (
                            <div className="pt-2 mt-1 border-t border-slate-100 text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                              <strong className="text-slate-900 block font-semibold">{cardTr.areasForGrowthLabel || 'Areas for Growth'}:</strong>
                              {rep.improvements}
                            </div>
                          )}
                          <div className="flex items-center gap-2 pt-0.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleReportExpand(rep.id);
                              }}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline"
                            >
                              {expandedReportIds.has(rep.id) ? cardTr.collapseReport : cardTr.readFullReport}
                            </button>
                            <span className="text-slate-300">&bull;</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedReportToRead(rep);
                              }}
                              className="text-[11px] font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>{cardTr.openInDialog || 'Open in Dialog'}</span>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        {isApprovedForParent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {cardTr.statusDispatchedParent || 'Dispatched to Parent'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            {cardTr.statusPendingAdmin || 'Pending Admin Review'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-2">
                        {isAccepted && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusAcceptedParent || 'Accepted by Parent'}
                          </span>
                        )}
                        {isDeclined && (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3.5 h-3.5" /> {cardTr.statusDeclinedParent || 'Declined by Parent'}
                            </span>
                            {rep.parentFeedback && (
                              <p className="text-[11px] text-rose-600 mt-1 italic line-clamp-1">
                                "{rep.parentFeedback}"
                              </p>
                            )}
                          </div>
                        )}
                        {isPendingParent && isApprovedForParent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                            <Clock className="w-3.5 h-3.5" /> {cardTr.statusAwaitingParent || 'Awaiting Parent'}
                          </span>
                        )}
                        {!isApprovedForParent && (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedReportToRead(rep)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs"
                            title="Read complete evaluation report"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>{cardTr.readFullReport}</span>
                          </button>
                          {!isApprovedForParent ? (
                            <button
                              onClick={() => handleReportApprove(rep.id)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
                            >
                              ✔ {cardTr.btnApproveSendParent || 'Approve & Send to Parent'}
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">{cardTr.dispatchedBadge || 'Dispatched'}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: TUTORING JOBS & APPLICATIONS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{cardTr.deskJobsTitle}</h3>
                <p className="text-xs text-slate-500">
                  {cardTr.deskJobsDesc}
                </p>
              </div>
              <button
                onClick={onOpenNewJobModal}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> {cardTr.btnPostOpening || '+ Post New Job Opening'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                    <th className="pb-3 pr-2">{cardTr.thJobOpening || 'Job Opening'}</th>
                    <th className="pb-3 px-2">{cardTr.thApplicantTutor || 'Applicant Tutor'}</th>
                    <th className="pb-3 px-2">{cardTr.thCoverNote || 'Cover Note'}</th>
                    <th className="pb-3 px-2">{cardTr.thStatus || 'Status'}</th>
                    <th className="pb-3 pl-2 text-right">{cardTr.thActions || 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => {
                    const isApproved = app.status === 'approved';
                    const isDeclined = app.status === 'declined';
                    const isPending = app.status === 'pending';
                    const matchedJob = jobs.find(j => String(j.id) === String(app.jobId));
                    const locJob = matchedJob ? getLocalizedJob(matchedJob, language) : null;

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 pr-2">
                          <strong className="text-slate-900 block">{locJob ? locJob.title : app.jobTitle}</strong>
                          <span className="text-xs text-slate-500 font-mono">App #{app.id}</span>
                        </td>
                        <td className="py-3.5 px-2">
                          <strong className="text-slate-800 block">{getLocalizedPersonName(app.tutorName, language)}</strong>
                          <span className="text-xs text-slate-500">{app.tutorEmail}</span>
                        </td>
                        <td className="py-3.5 px-2 max-w-xs">
                          <p className="text-xs text-slate-600 line-clamp-2">{app.coverNote}</p>
                        </td>
                        <td className="py-3.5 px-2">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusAcceptedJob || 'Accepted for Job'}
                            </span>
                          ) : isDeclined ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3.5 h-3.5" /> {cardTr.statusDeclined || 'Declined'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              <Clock className="w-3.5 h-3.5 text-blue-600" /> {cardTr.statusPendingReview || 'Pending Review'}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleAppAction(app.id, 'approved')}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
                            >
                              ✔ {cardTr.btnAcceptTutor || 'Accept Tutor'}
                            </button>
                            <button
                              onClick={() => handleAppAction(app.id, 'declined')}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 transition-colors"
                            >
                              ✖ {cardTr.btnDecline || 'Decline'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Current Active Job Postings List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-slate-900">{cardTr.currentJobOpenings || 'Current Job Openings'} ({jobs.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => {
                const locJob = getLocalizedJob(job, language);
                return (
                  <div key={job.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        {locJob.grade}
                      </span>
                      <span className="text-xs font-extrabold text-blue-700">
                        {locJob.rate}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">{locJob.title}</h5>
                    <p className="text-xs text-slate-600 mt-1">
                      📍 {locJob.location} &bull; 🗓 {locJob.schedule}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SUB-ADMIN ROLE ASSIGNMENT & PRIVACY ISOLATION BOARD */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          
          {/* Board Overview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> ACCESS GOVERNANCE
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Role-Based Access Control (RBAC)</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {cardTr.deskRolesTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
                  {cardTr.deskRolesDesc}
                </p>
              </div>

              {canAssignRoles ? (
                <button
                  onClick={handleOpenAddSubAdmin}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white transition-all shadow-sm flex items-center gap-2 shrink-0 self-start sm:self-center"
                >
                  <Plus className="w-4 h-4" />
                  <span>Provision New Sub-Admin</span>
                </button>
              ) : (
                <div className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Read-Only: Only the Main Super Admin can alter role permissions.</span>
                </div>
              )}
            </div>

            {/* Sub-Admin Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="text-xs font-semibold text-slate-500">Authorized Staff</p>
                <p className="text-xl font-black text-slate-900">{subAdmins.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/80">
                <p className="text-xs font-semibold text-blue-700">Active Sub-Admins</p>
                <p className="text-xl font-black text-blue-900">
                  {subAdmins.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60">
                <p className="text-xs font-semibold text-blue-700">Academic &amp; Tutors</p>
                <p className="text-xl font-black text-blue-900">
                  {subAdmins.filter(s => s.designation === 'academic_coordinator').length}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <p className="text-xs font-semibold text-slate-700">Finance &amp; Accounts</p>
                <p className="text-xl font-black text-slate-900">
                  {subAdmins.filter(s => s.designation === 'finance_officer').length}
                </p>
              </div>
            </div>
          </div>

          {/* Sub-Admin Directory & Permissions Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900">
                Active Staff Roster &amp; Permission Scopes ({subAdmins.length})
              </h4>
              <span className="text-xs text-slate-500">
                Privacy boundaries are enforced on client and view routing
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {subAdmins.map((admin) => {
                const isFounder = admin.id === 'admin-super-1';
                const isActive = admin.status === 'active';

                const badgeStyle = 
                  admin.designation === 'super_admin' ? 'bg-blue-600 text-white border-blue-700' :
                  admin.designation === 'academic_coordinator' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  admin.designation === 'finance_officer' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                  'bg-slate-100 text-slate-800 border-slate-300';

                return (
                  <div 
                    key={admin.id} 
                    className={`p-5 rounded-2xl border transition-all ${
                      isActive 
                        ? 'bg-white border-slate-200 shadow-xs' 
                        : 'bg-slate-50 border-slate-200/70 opacity-75'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${badgeStyle}`}>
                            {admin.roleTitle}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                            isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-400'}`} />
                            {isActive ? 'Active' : 'Suspended'}
                          </span>
                        </div>
                        <h5 className="font-black text-slate-900 text-base flex items-center gap-1.5">
                          {admin.name}
                          {isFounder && (
                            <span className="text-[10px] text-blue-700 bg-blue-100 border border-blue-200 px-1.5 py-0.2 rounded font-bold">
                              Founder Root
                            </span>
                          )}
                        </h5>
                        <p className="text-xs text-slate-500 mt-0.5">
                          ✉ {admin.email} &bull; 📞 {admin.phone}
                        </p>
                      </div>

                      {/* Controls */}
                      {canAssignRoles && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditSubAdmin(admin)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit Sub-Admin Permissions"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {!isFounder && (
                            <>
                              <button
                                onClick={() => handleToggleSubAdminStatus(admin.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isActive 
                                    ? 'text-blue-600 hover:bg-blue-50' 
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                                title={isActive ? 'Suspend Sub-Admin' : 'Activate Sub-Admin'}
                              >
                                {isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                              </button>

                              <button
                                onClick={() => handleDeleteSubAdmin(admin.id)}
                                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                title="Revoke Sub-Admin Access"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Permissions Matrix */}
                    <div className="pt-3 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Configured Access Scope:
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        <div className={`flex items-center gap-1.5 p-1.5 rounded-lg ${
                          admin.permissions.canVerifyPayments ? 'bg-blue-50 text-blue-800 font-semibold' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {admin.permissions.canVerifyPayments ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <span className="w-3.5 text-center text-slate-400 font-mono">-</span>}
                          <span>Parent Payments</span>
                        </div>

                        <div className={`flex items-center gap-1.5 p-1.5 rounded-lg ${
                          admin.permissions.canVerifyTutors ? 'bg-blue-50 text-blue-800 font-semibold' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {admin.permissions.canVerifyTutors ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <span className="w-3.5 text-center text-slate-400 font-mono">-</span>}
                          <span>Tutor 500 ETB Vetting</span>
                        </div>

                        <div className={`flex items-center gap-1.5 p-1.5 rounded-lg ${
                          admin.permissions.canPostJobs ? 'bg-blue-50 text-blue-800 font-semibold' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {admin.permissions.canPostJobs ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <span className="w-3.5 text-center text-slate-400 font-mono">-</span>}
                          <span>Post Tutoring Jobs</span>
                        </div>

                        <div className={`flex items-center gap-1.5 p-1.5 rounded-lg ${
                          admin.permissions.canApproveReports ? 'bg-blue-50 text-blue-800 font-semibold' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {admin.permissions.canApproveReports ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <span className="w-3.5 text-center text-slate-400 font-mono">-</span>}
                          <span>Monthly Reports</span>
                        </div>

                        <div className={`flex items-center gap-1.5 p-1.5 rounded-lg ${
                          admin.permissions.canManageApplications ? 'bg-blue-50 text-blue-800 font-semibold' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {admin.permissions.canManageApplications ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <span className="w-3.5 text-center text-slate-400 font-mono">-</span>}
                          <span>Tutor Applications</span>
                        </div>

                        <div className={`flex items-center gap-1.5 p-1.5 rounded-lg ${
                          admin.permissions.canAssignRoles ? 'bg-blue-100 text-blue-900 font-bold' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {admin.permissions.canAssignRoles ? <Check className="w-3.5 h-3.5 text-blue-700" /> : <span className="w-3.5 text-center text-slate-400 font-mono">-</span>}
                          <span>Role Assignment</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100">
                      <span>Added: {admin.addedAt}</span>
                      <span>Status: {admin.lastActive || 'Active'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB: TUTOR MONTHLY PAYOUTS & RECEIPTS DESK */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          {/* Top Form: Disburse Payout & Attach Receipt */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {cardTr.deskPayoutsTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {cardTr.deskPayoutsDesc}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Central Disbursement Desk
              </span>
            </div>

            <form onSubmit={handleSendPayoutSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tutor Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Select Recipient Tutor <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <select
                    value={payoutTutorId}
                    onChange={(e) => setPayoutTutorId(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">-- Choose Tutor --</option>
                    {tutors.map(t => {
                      const specs = (t.specialties || t.subjects || []).slice(0, 2).join(', ');
                      return (
                        <option key={t.id} value={t.id}>
                          {t.name}{specs ? ` (${specs})` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Assigned Student &amp; Grade <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={payoutStudentName}
                    onChange={(e) => setPayoutStudentName(e.target.value)}
                    required
                    placeholder="e.g. Samuel Kassahun (Grade 12)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Tutoring Month */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Tutoring Month <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <select
                    value={payoutMonth}
                    onChange={(e) => setPayoutMonth(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="First Month (Meskerem)">First Month (Meskerem / Month 1)</option>
                    <option value="Second Month (Tikimt)">Second Month (Tikimt / Month 2)</option>
                    <option value="Third Month (Hidar)">Third Month (Hidar / Month 3)</option>
                    <option value="Fourth Month (Tahsas)">Fourth Month (Tahsas / Month 4)</option>
                    <option value="Fifth Month (Tir)">Fifth Month (Tir / Month 5)</option>
                    <option value="Sixth Month (Yekatit)">Sixth Month (Yekatit / Month 6)</option>
                    <option value="Seventh Month (Megabit)">Seventh Month (Megabit / Month 7)</option>
                    <option value="Eighth Month (Miyazya)">Eighth Month (Miyazya / Month 8)</option>
                    <option value="Ninth Month (Ginbot)">Ninth Month (Ginbot / Month 9)</option>
                    <option value="Tenth Month (Sene)">Tenth Month (Sene / Month 10)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Teaching Hours */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Completed Hours <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={payoutHours}
                    onChange={(e) => setPayoutHours(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Net Payout Amount */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Payout Amount (ETB) <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    required
                    placeholder="e.g. 8000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Disbursement Channel <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value as any)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Telebirr">Telebirr (Ethio Telecom)</option>
                    <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                    <option value="Awash Bank">Awash Bank</option>
                    <option value="Other Bank">Other Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Transaction Ref */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Bank / Telebirr Transaction Ref
                  </label>
                  <input
                    type="text"
                    value={payoutReference}
                    onChange={(e) => setPayoutReference(e.target.value)}
                    placeholder="e.g. TXN-TB-982143"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Admin Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Disbursement Note / Message to Tutor
                  </label>
                  <input
                    type="text"
                    value={payoutNotes}
                    onChange={(e) => setPayoutNotes(e.target.value)}
                    placeholder="e.g. Monthly salary disbursed for Meskerem. Great work!"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Receipt Screenshot Upload / Attachment */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                    Payment Receipt Screenshot <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Upload an image screenshot of the CBE / Telebirr bank transfer disbursed to the tutor.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPayoutScreenshotUrl(reader.result as string);
                          showToast('info', 'Receipt screenshot uploaded!');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />

                  {payoutScreenshotUrl && (
                    <div className="flex items-center gap-3 shrink-0 bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                      <img
                        src={payoutScreenshotUrl}
                        alt="Receipt preview"
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-blue-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Receipt Attached
                        </span>
                        <button
                          type="button"
                          onClick={() => onViewReceipt(payoutScreenshotUrl, { title: 'Tutor Payout Receipt Preview' })}
                          className="text-blue-600 hover:underline block text-[11px] mt-0.5"
                        >
                          Preview Full Slip
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSendingPayout}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSendingPayout ? 'Sending Voucher...' : 'Send Monthly Payout Voucher & Receipt to Tutor'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Table: Disbursed Monthly Payments History */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sent Monthly Payouts &amp; Receipts History</h3>
                <p className="text-xs text-slate-500">
                  Record of all monthly salaries sent to tutors with attached payment proof receipts.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {payouts.length} Disbursed
              </span>
            </div>

            {payouts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium text-slate-600">No monthly payouts sent yet.</p>
                <p className="text-xs text-slate-400">Use the form above to disburse monthly tutor salary and attach receipts.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      <th className="pb-3 pr-2">{cardTr.thRecipientTutor || 'Recipient Tutor'}</th>
                      <th className="pb-3 px-2">{cardTr.thStudentMonth || 'Student & Month'}</th>
                      <th className="pb-3 px-2">{cardTr.thHoursAmount || 'Hours & Amount'}</th>
                      <th className="pb-3 px-2">{cardTr.thDisbursementChannel || 'Disbursement Channel'}</th>
                      <th className="pb-3 px-2">{cardTr.thDisbursedDate || 'Disbursed Date'}</th>
                      <th className="pb-3 pl-2 text-right">{cardTr.thReceiptScreenshot || 'Receipt Screenshot'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payouts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 pr-2">
                          <strong className="text-slate-900 block">{getLocalizedPersonName(p.tutorName, language)}</strong>
                          <span className="text-xs text-slate-500">{p.tutorEmail}</span>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="font-semibold text-slate-800 text-xs block">{getLocalizedPersonName(p.studentName, language)}</span>
                          <span className="text-xs text-slate-500">{getLocalizedMonth(p.month, language)}</span>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="font-bold text-blue-700 text-xs block">
                            {p.amount.toLocaleString()} ETB
                          </span>
                          <span className="text-xs text-slate-500">{p.teachingHours} {cardTr.totalHoursLabel || 'Hours Completed'}</span>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className="font-medium text-slate-700 text-xs block">{p.method}</span>
                          <span className="text-[11px] text-slate-400 font-mono">Ref: {p.reference}</span>
                        </td>
                        <td className="py-3.5 px-2 text-xs text-slate-500">
                          {getLocalizedDate(p.disbursedDate, language)}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <button
                            onClick={() => onViewReceipt(p.receiptScreenshotUrl, {
                              title: `Payout Receipt - ${getLocalizedPersonName(p.tutorName, language)}`,
                              amount: `${p.amount.toLocaleString()} ETB`,
                              date: p.disbursedDate,
                              reference: p.reference,
                              notes: `Disbursement for ${getLocalizedMonth(p.month, language)} (${p.teachingHours} hrs tutored). ${p.notes || ''}`
                            })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>{cardTr.btnViewReceipt || 'View Receipt'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROVISION / EDIT SUB-ADMIN MODAL */}
      {isSubAdminModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setIsSubAdminModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white px-2 py-1 rounded-md text-xs font-bold"
              >
                ✕
              </button>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {editingSubAdminId ? 'Modify Access Rights' : 'Staff Delegation'}
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                {editingSubAdminId ? 'Edit Sub-Admin Permissions' : 'Provision New Sub-Administrator'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Assign specific operational duties and ensure privacy-isolated module boundaries.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSubAdmin} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Staff Full Name <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subAdminForm.name}
                    onChange={e => setSubAdminForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Dr. Alula Kebede"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Staff Email Address <span className="text-rose-500 font-bold ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={subAdminForm.email}
                    onChange={e => setSubAdminForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="academic@adortutorial.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={subAdminForm.phone}
                    onChange={e => setSubAdminForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+251 91 222 3344"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Role Designation Preset
                  </label>
                  <select
                    value={subAdminForm.designation}
                    onChange={e => {
                      const des = e.target.value as AdminDesignation;
                      let title = 'Sub-Admin';
                      let perms: AdminPermissions = {
                        canVerifyPayments: false,
                        canVerifyTutors: false,
                        canPostJobs: false,
                        canApproveReports: false,
                        canManageApplications: false,
                        canAssignRoles: false,
                      };

                      if (des === 'academic_coordinator') {
                        title = 'Academic Director & Curriculum Matcher';
                        perms = {
                          canVerifyPayments: false,
                          canVerifyTutors: true,
                          canPostJobs: true,
                          canApproveReports: true,
                          canManageApplications: true,
                          canAssignRoles: false,
                        };
                      } else if (des === 'finance_officer') {
                        title = 'Finance & Bank Verification Officer';
                        perms = {
                          canVerifyPayments: true,
                          canVerifyTutors: false,
                          canPostJobs: false,
                          canApproveReports: false,
                          canManageApplications: false,
                          canAssignRoles: false,
                        };
                      } else if (des === 'counselor') {
                        title = 'Student & Parent Academic Counselor';
                        perms = {
                          canVerifyPayments: false,
                          canVerifyTutors: false,
                          canPostJobs: false,
                          canApproveReports: true,
                          canManageApplications: false,
                          canAssignRoles: false,
                        };
                      } else if (des === 'operations_manager') {
                        title = 'Operations & Job Postings Manager';
                        perms = {
                          canVerifyPayments: false,
                          canVerifyTutors: true,
                          canPostJobs: true,
                          canApproveReports: false,
                          canManageApplications: true,
                          canAssignRoles: false,
                        };
                      } else if (des === 'super_admin') {
                        title = 'Super Administrator';
                        perms = {
                          canVerifyPayments: true,
                          canVerifyTutors: true,
                          canPostJobs: true,
                          canApproveReports: true,
                          canManageApplications: true,
                          canAssignRoles: true,
                        };
                      }

                      setSubAdminForm(prev => ({
                        ...prev,
                        designation: des,
                        roleTitle: title,
                        permissions: perms,
                      }));
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="academic_coordinator">Academic Coordinator (Curriculum & Tutors)</option>
                    <option value="finance_officer">Finance Officer (Bank & Telebirr Verification)</option>
                    <option value="counselor">Student & Parent Counselor (Progress Reports)</option>
                    <option value="operations_manager">Operations Manager (Job Postings)</option>
                    <option value="super_admin">Super Administrator (Unrestricted)</option>
                  </select>
                </div>
              </div>

              {/* Granular Permissions Checkboxes */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Granular Permission Switches:
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAdminForm.permissions.canVerifyPayments}
                      onChange={e => setSubAdminForm(prev => ({
                        ...prev,
                        permissions: { ...prev.permissions, canVerifyPayments: e.target.checked }
                      }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span><strong>Verify Parent Payments:</strong> View Telebirr/CBE receipts and update payment statuses</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAdminForm.permissions.canVerifyTutors}
                      onChange={e => setSubAdminForm(prev => ({
                        ...prev,
                        permissions: { ...prev.permissions, canVerifyTutors: e.target.checked }
                      }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span><strong>Verify Tutor Memberships:</strong> Review 21-point tutor applications and 500 ETB receipts</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAdminForm.permissions.canPostJobs}
                      onChange={e => setSubAdminForm(prev => ({
                        ...prev,
                        permissions: { ...prev.permissions, canPostJobs: e.target.checked }
                      }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span><strong>Post Tutoring Openings:</strong> Create, publish, and edit tutoring jobs</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAdminForm.permissions.canApproveReports}
                      onChange={e => setSubAdminForm(prev => ({
                        ...prev,
                        permissions: { ...prev.permissions, canApproveReports: e.target.checked }
                      }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span><strong>Approve Student Reports:</strong> Quality check tutor feedback and release to parents</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subAdminForm.permissions.canManageApplications}
                      onChange={e => setSubAdminForm(prev => ({
                        ...prev,
                        permissions: { ...prev.permissions, canManageApplications: e.target.checked }
                      }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span><strong>Accept / Decline Tutors:</strong> Match tutors to jobs and unlock commission contracts</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      disabled={!isSuperAdmin}
                      checked={subAdminForm.permissions.canAssignRoles}
                      onChange={e => setSubAdminForm(prev => ({
                        ...prev,
                        permissions: { ...prev.permissions, canAssignRoles: e.target.checked }
                      }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 disabled:opacity-50"
                    />
                    <span><strong>Assign Roles &amp; Sub-Admins:</strong> Super Admin authority to provision staff (Master Only)</span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
                >
                  {editingSubAdminId ? 'Save Updated Permissions' : 'Authorize & Provision Sub-Admin'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* READ FULL REPORT MODAL (Requirement 1 & 9) */}
      {selectedReportToRead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl sm:max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedReportToRead(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white px-2 py-1 rounded-md text-xs font-bold"
              >
                ✕
              </button>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Official Academic Evaluation
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                Monthly Student Progress &amp; Hours Audit
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {getLocalizedMonth(selectedReportToRead.month, language)} &bull; Tutored by {getLocalizedPersonName(selectedReportToRead.tutorName, language)}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Student</span>
                  <strong className="text-slate-900 text-sm">{getLocalizedPersonName(selectedReportToRead.studentName, language)}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Assigned Tutor</span>
                  <strong className="text-slate-900 text-sm">{getLocalizedPersonName(selectedReportToRead.tutorName, language)}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Teaching Hours</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-extrabold text-xs inline-block mt-0.5">
                    {selectedReportToRead.totalHours} Hours
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Overall Rating</span>
                  <strong className="text-blue-700 text-sm">{getLocalizedScore(selectedReportToRead.overallScore, language)}</strong>
                </div>
              </div>

              {/* Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border bg-slate-50/80">
                <div className="text-xs">
                  <span className="text-slate-500 font-medium">Administrative Status: </span>
                  {selectedReportToRead.status === 'approved_for_parent' ? (
                    <span className="font-bold text-blue-700">Dispatched to Parent</span>
                  ) : (
                    <span className="font-bold text-blue-700">Pending Assigned Admin Review</span>
                  )}
                </div>

                <div className="text-xs">
                  <span className="text-slate-500 font-medium">Parent Sign-off: </span>
                  {selectedReportToRead.parentDecision === 'accepted' ? (
                    <span className="font-bold text-blue-700 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Accepted &amp; Verified
                    </span>
                  ) : selectedReportToRead.parentDecision === 'declined' ? (
                    <span className="font-bold text-rose-700 inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Disputed by Parent
                    </span>
                  ) : (
                    <span className="text-slate-600 font-medium">Awaiting Parent Review</span>
                  )}
                </div>
              </div>

              {/* Section 1: Topics Covered & Academic Strengths */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Curriculum Mastery &amp; Student Strengths:
                </h4>
                <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedReportToRead.strengths}
                </div>
              </div>

              {/* Section 2: Identified Weaknesses & Next Month Strategic Plan */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  Target Areas for Growth &amp; Upcoming Homework Plan:
                </h4>
                <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedReportToRead.improvements}
                </div>
              </div>

              {/* Parent Feedback (if any) */}
              {selectedReportToRead.parentFeedback && (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
                  <strong className="text-slate-900 block mb-1">Parent Feedback / Dispute Note:</strong>
                  <p className="text-slate-600 italic">"{selectedReportToRead.parentFeedback}"</p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedReportToRead(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Close Report
              </button>

              {selectedReportToRead.status !== 'approved_for_parent' ? (
                <button
                  type="button"
                  onClick={() => {
                    handleReportApprove(selectedReportToRead.id);
                    setSelectedReportToRead(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve &amp; Dispatch to Parent</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> Report Already Verified by Admin
                </span>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
