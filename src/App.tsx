import React, { useState, useEffect, useMemo } from 'react';
import { 
  ActiveView, 
  SupportedLanguage, 
  PaymentRecord, 
  TutorProfile, 
  TutoringJob, 
  JobApplication, 
  MonthlyReport,
  CurrentUser,
  ParentRegistration19,
  TutorRegistration21,
  SubAdminUser,
  AdminDesignation,
  TutorMonthlyPayout
} from './types';
import { 
  INITIAL_PAYMENTS, 
  INITIAL_TUTORS, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_REPORTS,
  INITIAL_SUBADMINS,
  INITIAL_TUTOR_PAYOUTS
} from './data/initialData';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { PublicWebsite } from './components/PublicWebsite';
import { ParentPortal } from './components/ParentPortal';
import { TutorPortal } from './components/TutorPortal';
import { AdminPortal } from './components/AdminPortal';
import { ReceiptModal } from './components/ReceiptModal';
import { NewJobModal } from './components/NewJobModal';
import { PublicApplyModal } from './components/PublicApplyModal';
import { WordPressGuideModal } from './components/WordPressGuideModal';
import { SignInModal } from './components/SignInModal';
import { RoleSelectModal } from './components/RoleSelectModal';
import { ParentRegistrationModal } from './components/ParentRegistrationModal';
import { TutorRegistrationModal } from './components/TutorRegistrationModal';
import { AccessDeniedModal } from './components/AccessDeniedModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Current Authenticated User & RBAC state
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem('ador_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default to guest
    return {
      id: 'guest',
      role: 'guest',
      name: 'Guest Visitor',
      email: '',
    };
  });

  // Active View State (Website is default public gateway, or Parent/Tutor/Admin portals)
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'parent' || hash === 'tutor' || hash === 'admin' || hash === 'website') {
        return hash as ActiveView;
      }
    }
    const saved = localStorage.getItem('ador_active_view');
    return (saved as ActiveView) || 'website';
  });

  // Multilingual State (Supported: en, am, om, ti, so, ar, fr, es, de, zh, sw)
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('ador_lang');
    return (saved as SupportedLanguage) || 'en';
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Dark / Light Mode Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ador_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      if (document.body) document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
      if (document.body) document.body.classList.remove('dark');
    }
    localStorage.setItem('ador_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Core Data Collections with localStorage caching
  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('ador_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [tutors, setTutors] = useState<TutorProfile[]>(() => {
    const saved = localStorage.getItem('ador_tutors');
    return saved ? JSON.parse(saved) : INITIAL_TUTORS;
  });

  const [jobs, setJobs] = useState<TutoringJob[]>(() => {
    const saved = localStorage.getItem('ador_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('ador_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [reports, setReports] = useState<MonthlyReport[]>(() => {
    const saved = localStorage.getItem('ador_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Registrations submitted through 19 & 21 flows
  const [parentRegistrations, setParentRegistrations] = useState<ParentRegistration19[]>(() => {
    const saved = localStorage.getItem('ador_parent_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  const [tutorRegistrations, setTutorRegistrations] = useState<TutorRegistration21[]>(() => {
    const saved = localStorage.getItem('ador_tutor_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  // Sub-Administrators & Role Assignments State
  const [subAdmins, setSubAdmins] = useState<SubAdminUser[]>(() => {
    const saved = localStorage.getItem('ador_subadmins');
    return saved ? JSON.parse(saved) : INITIAL_SUBADMINS;
  });

  // Tutor Monthly Payout Receipts State (Admin to Tutor)
  const [payouts, setPayouts] = useState<TutorMonthlyPayout[]>(() => {
    const saved = localStorage.getItem('ador_tutor_payouts');
    return saved ? JSON.parse(saved) : INITIAL_TUTOR_PAYOUTS;
  });

  useEffect(() => {
    localStorage.setItem('ador_tutor_payouts', JSON.stringify(payouts));
  }, [payouts]);

  // Modals & Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isWpGuideOpen, setIsWpGuideOpen] = useState(false);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<TutoringJob | null>(null);

  // Auth & RBAC Modals
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInTargetRole, setSignInTargetRole] = useState<'parent' | 'tutor' | 'admin'>('parent');
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
  const [isParentRegOpen, setIsParentRegOpen] = useState(false);
  const [isTutorRegOpen, setIsTutorRegOpen] = useState(false);
  const [accessDeniedView, setAccessDeniedView] = useState<ActiveView | null>(null);

  // Receipt Modal State
  const [receiptModal, setReceiptModal] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    details?: any;
  }>({
    isOpen: false,
    title: 'Payment Receipt Verification',
    url: '',
  });

  // Resolve current tutor profile when user is a tutor
  const currentTutorProfile: TutorProfile = useMemo(() => {
    const found = tutors.find(t => t.id === currentUser.id || t.email === currentUser.email);
    if (found) return found;
    return tutors[0] || {
      id: currentUser.id || 'tut-demo-1',
      name: currentUser.name || 'Verified Ador Tutor',
      phone: currentUser.phone || '0911000000',
      email: currentUser.email || 'tutor@adortutorial.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      education: 'BSc in Mathematics (Addis Ababa University)',
      specialties: ['Mathematics', 'Physics'],
      rating: 4.9,
      studentsCount: 14,
      totalHours: 180,
      hourlyRate: 350,
      status: 'active',
      bio: 'Experienced educator providing dedicated one-on-one tutorial support.',
      membershipStatus: 'verified',
      verifiedBadges: ['ID Verified', 'Academic Degree Certified', 'Background Checked'],
    };
  }, [tutors, currentUser]);

  // Sync window.location.hash with activeView
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase();
      if (rawHash === 'parent' || rawHash === 'tutor' || rawHash === 'admin' || rawHash === 'website' || rawHash === 'home') {
        const targetView: ActiveView = (rawHash === 'home' || rawHash === 'website') ? 'website' : (rawHash as ActiveView);
        if (targetView === 'website') {
          setActiveView('website');
        } else if (currentUser.role === targetView || currentUser.role === 'admin') {
          setActiveView(targetView);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('ador_active_view', activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('ador_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ador_subadmins', JSON.stringify(subAdmins));
  }, [subAdmins]);

  useEffect(() => {
    localStorage.setItem('ador_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('ador_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('ador_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('ador_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('ador_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ador_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('ador_parent_registrations', JSON.stringify(parentRegistrations));
  }, [parentRegistrations]);

  useEffect(() => {
    localStorage.setItem('ador_tutor_registrations', JSON.stringify(tutorRegistrations));
  }, [tutorRegistrations]);

  // Toast Helper
  const showToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Role-Specific Auth Triggers (Bypasses generic "Select Your Official Account Role")
  const handleOpenRoleSignIn = (role?: 'parent' | 'tutor' | 'admin') => {
    const target = role || (activeView === 'tutor' ? 'tutor' : activeView === 'admin' ? 'admin' : 'parent');
    setSignInTargetRole(target);
    setIsSignInOpen(true);
  };

  const handleOpenRoleSignUp = (role?: 'parent' | 'tutor') => {
    const target = role || (activeView === 'tutor' ? 'tutor' : 'parent');
    if (target === 'tutor') {
      setIsTutorRegOpen(true);
    } else {
      setIsParentRegOpen(true);
    }
  };

  // --- Strict Role-Based Access Control (RBAC) Navigation Handler ---
  // Directive: "don't let tutors access parents and admins dashboard and vice versa"
  const handleSelectView = (targetView: ActiveView) => {
    // 1. Website view is always accessible
    if (targetView === 'website') {
      setActiveView('website');
      if (typeof window !== 'undefined') {
        window.location.hash = '#home';
      }
      return;
    }

    // 2. If Guest tries to enter a portal:
    if (currentUser.role === 'guest') {
      if (targetView === 'parent') {
        showToast('info', 'Please sign in or register to access the Parent Portal.');
        handleOpenRoleSignIn('parent');
        return;
      }
      if (targetView === 'tutor') {
        showToast('info', 'Please sign in or register to access the Tutor Workspace.');
        handleOpenRoleSignIn('tutor');
        return;
      }
      if (targetView === 'admin') {
        showToast('info', 'Authorized Staff & Executive Administrator credentials required.');
        handleOpenRoleSignIn('admin');
        return;
      }
    }

    // 3. Strict Tutor Isolation: Tutors cannot access parent or admin dashboards
    if (currentUser.role === 'tutor') {
      if (targetView === 'parent' || targetView === 'admin') {
        setAccessDeniedView(targetView);
        return;
      }
    }

    // 4. Strict Parent Isolation: Parents cannot access tutor or admin dashboards
    if (currentUser.role === 'parent') {
      if (targetView === 'tutor' || targetView === 'admin') {
        setAccessDeniedView(targetView);
        return;
      }
    }

    // 5. Authorized transition
    setActiveView(targetView);
    if (typeof window !== 'undefined') {
      window.location.hash = '#' + targetView;
    }
  };

  // Auth Handlers
  const handleSignIn = (user: CurrentUser) => {
    setCurrentUser(user);
    showToast('success', `Signed in as ${user.name} (${user.role.toUpperCase()})`, 'Authentication Success');
    
    // Seamlessly direct to their authorized portal
    if (user.role === 'parent') {
      setActiveView('parent');
      if (typeof window !== 'undefined') window.location.hash = '#parent';
    } else if (user.role === 'tutor') {
      setActiveView('tutor');
      if (typeof window !== 'undefined') window.location.hash = '#tutor';
    } else if (user.role === 'admin') {
      setActiveView('admin');
      if (typeof window !== 'undefined') window.location.hash = '#admin';
    }
  };

  const handleSignOut = () => {
    setCurrentUser({
      id: 'guest',
      role: 'guest',
      name: 'Guest Visitor',
      email: '',
    });
    setActiveView('website');
    if (typeof window !== 'undefined') window.location.hash = '#home';
    showToast('info', 'You have been signed out. Welcome to the official website.', 'Signed Out');
  };

  // --- 19 Requests Parent Registration Submission ---
  const handleParentRegistrationSubmit = (data: ParentRegistration19) => {
    setParentRegistrations(prev => [data, ...prev]);

    // Automatically authenticate the parent
    const newUser: CurrentUser = {
      id: data.id,
      role: 'parent',
      name: data.parentFullName,
      email: data.email || 'parent@adortutorial.com',
      phone: data.phoneNumber1,
      isVerified: true,
    };
    setCurrentUser(newUser);
    setActiveView('parent');

    // If payment was attached, log to payments queue
    if (data.transactionReference) {
      const newPay: PaymentRecord = {
        id: 'pay-' + Date.now(),
        parentId: data.id,
        parentName: data.parentFullName,
        parentEmail: data.email || 'parent@adortutorial.com',
        studentName: data.studentFullName,
        month: 'Initial Placement',
        method: 'Commercial Bank of Ethiopia (CBE)',
        reference: data.transactionReference,
        amount: 2500,
        screenshotUrl: data.receiptScreenshotUrl || '',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        adminNotes: `19-Point Intake for ${data.studentGradeLevel?.join(', ')} in ${data.subcity}`,
      };
      setPayments(prev => [newPay, ...prev]);
    }

    showToast('success', `19-Point Intake for ${data.studentFullName} successfully registered!`, 'Parent Registered');
  };

  // --- 21 Requests Tutor Registration Submission ---
  const handleTutorRegistrationSubmit = (data: TutorRegistration21) => {
    setTutorRegistrations(prev => [data, ...prev]);

    // Add to active tutors list with pending verification
    const newTutor: TutorProfile = {
      id: data.id,
      name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      avatarUrl: data.profilePictureUrl,
      specialties: data.tutorTeachingPreferences || ['General Tutoring'],
      education: `${data.qualificationTier} in ${data.fieldOfStudy}`,
      membershipStatus: 'pending_verification',
      membershipMethod: 'Bank Transfer',
      membershipReference: `REG-${Date.now().toString().slice(-6)}`,
      membershipDate: new Date().toISOString().split('T')[0],
    };
    setTutors(prev => [newTutor, ...prev]);

    // Authenticate the tutor
    const newUser: CurrentUser = {
      id: data.id,
      role: 'tutor',
      name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      avatarUrl: data.profilePictureUrl,
      isVerified: false,
    };
    setCurrentUser(newUser);
    setActiveView('tutor');

    showToast('success', `21-Point Tutor Application received for ${data.fullName}!`, 'Tutor Registered');
  };

  // Reset to initial test dataset
  const handleResetData = () => {
    if (window.confirm('Reset all portal records back to initial mock state?')) {
      setPayments(INITIAL_PAYMENTS);
      setTutors(INITIAL_TUTORS);
      setJobs(INITIAL_JOBS);
      setApplications(INITIAL_APPLICATIONS);
      setReports(INITIAL_REPORTS);
      setSubAdmins(INITIAL_SUBADMINS);
      setParentRegistrations([]);
      setTutorRegistrations([]);
      localStorage.removeItem('ador_payments');
      localStorage.removeItem('ador_tutors');
      localStorage.removeItem('ador_jobs');
      localStorage.removeItem('ador_applications');
      localStorage.removeItem('ador_reports');
      localStorage.removeItem('ador_subadmins');
      localStorage.removeItem('ador_parent_registrations');
      localStorage.removeItem('ador_tutor_registrations');
      showToast('info', 'All data reset to official initial state.', 'System Reset');
    }
  };

  // Sub-Admin role delegation updates
  const handleUpdateSubAdmins = (updated: SubAdminUser[]) => {
    setSubAdmins(updated);
  };

  // Quick perspective switcher for testing isolated dashboards
  const handleSwitchAdminDesignation = (designation: AdminDesignation) => {
    if (currentUser.role === 'admin') {
      const match = subAdmins.find(s => s.designation === designation);
      const updated: CurrentUser = {
        ...currentUser,
        adminDesignation: designation,
        name: match ? match.name : currentUser.name,
        email: match ? match.email : currentUser.email,
        permissions: match ? match.permissions : currentUser.permissions,
      };
      setCurrentUser(updated);
      showToast('info', `Simulating isolated workspace for: ${match ? match.roleTitle : designation}`, 'Perspective Switched');
    }
  };

  // --- Actions ---

  // 1. Parent adds payment
  const handleAddPayment = (newPay: Omit<PaymentRecord, 'id' | 'date' | 'status'>) => {
    const payment: PaymentRecord = {
      ...newPay,
      id: 'pay-' + Date.now(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setPayments(prev => [payment, ...prev]);
  };

  // 2. Parent accepts or disputes report
  const handleParentDecision = (reportId: string, decision: 'accepted' | 'declined', feedback: string) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          return {
            ...r,
            parentDecision: decision,
            parentFeedback: feedback,
            parentRespondedDate: new Date().toISOString().split('T')[0],
          };
        }
        return r;
      })
    );
  };

  // 3. Tutor submits monthly performance report
  const handleTutorSubmitReport = (newReport: Omit<MonthlyReport, 'id' | 'status' | 'parentDecision' | 'submittedDate'>) => {
    const report: MonthlyReport = {
      ...newReport,
      id: 'rep-' + Date.now(),
      status: 'pending_admin',
      parentDecision: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
    };
    setReports(prev => [report, ...prev]);
  };

  // 4. Tutor submits registration/membership fee slip
  const handleTutorSubmitMembershipFee = (
    tutorId: string,
    method: string,
    reference: string,
    receiptUrl: string
  ) => {
    setTutors(prev =>
      prev.map(t => {
        if (t.id === tutorId) {
          return {
            ...t,
            membershipStatus: 'pending_verification',
            membershipMethod: method,
            membershipReference: reference,
            membershipReceiptUrl: receiptUrl,
            membershipDate: new Date().toISOString().split('T')[0],
          };
        }
        return t;
      })
    );
  };

  // 5. Tutor chooses commission model & submits placement fee
  const handleTutorSubmitCommission = (
    applicationId: string,
    commissionChoice: '60_percent_first_month' | '23_percent_monthly',
    method: string,
    reference: string,
    receiptUrl: string
  ) => {
    setApplications(prev =>
      prev.map(a => {
        if (a.id === applicationId) {
          return {
            ...a,
            commissionChoice,
            commissionStatus: 'pending_verification',
            commissionMethod: method,
            commissionReference: reference,
            commissionReceiptUrl: receiptUrl,
          };
        }
        return a;
      })
    );
  };

  // 6. Admin approves or rejects parent payment
  const handleAdminVerifyPayment = (paymentId: string, status: 'approved' | 'rejected', notes?: string) => {
    setPayments(prev =>
      prev.map(p => {
        if (p.id === paymentId) {
          return { ...p, status, adminNotes: notes || p.adminNotes };
        }
        return p;
      })
    );
  };

  // 7. Admin verifies tutor membership
  const handleAdminVerifyTutor = (tutorId: string, status: 'verified' | 'unpaid') => {
    setTutors(prev =>
      prev.map(t => {
        if (t.id === tutorId) {
          return { ...t, membershipStatus: status };
        }
        return t;
      })
    );
  };

  // 8. Admin approves tutor commission payment
  const handleAdminUpdateCommission = (applicationId: string, status: 'approved' | 'rejected') => {
    setApplications(prev =>
      prev.map(a => {
        if (a.id === applicationId) {
          return { ...a, commissionStatus: status };
        }
        return a;
      })
    );
  };

  // 9. Admin releases monthly report to parent
  const handleAdminApproveReport = (reportId: string) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          return {
            ...r,
            status: 'approved_for_parent',
            adminApprovedDate: new Date().toISOString().split('T')[0],
          };
        }
        return r;
      })
    );
  };

  // 10. Admin accepts or declines tutor application for job
  const handleAdminUpdateApplication = (applicationId: string, status: 'approved' | 'declined') => {
    setApplications(prev =>
      prev.map(a => {
        if (a.id === applicationId) {
          return { ...a, status };
        }
        return a;
      })
    );
  };

  // 11. Admin adds new tutoring job opening
  const handleAddNewJob = (newJob: Omit<TutoringJob, 'id' | 'postedDate' | 'status'>) => {
    const job: TutoringJob = {
      ...newJob,
      id: 'job-' + Date.now(),
      status: 'open',
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobs(prev => [job, ...prev]);
    showToast('success', `Tutoring opening "${job.title}" successfully dispatched to live board!`);
  };

  // 12. Public or tutor applies for job
  const handlePublicJobApply = (applicationData: {
    jobId: string;
    jobTitle: string;
    tutorName: string;
    tutorEmail: string;
    tutorPhone: string;
    coverNote: string;
  }) => {
    const app: JobApplication = {
      id: 'app-' + Date.now(),
      ...applicationData,
      tutorId: currentUser.role === 'tutor' ? currentUser.id : 'applicant-' + Date.now(),
      status: 'pending',
      commissionStatus: 'unpaid',
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setApplications(prev => [app, ...prev]);
    setSelectedJobForApply(null);
    showToast('success', 'Your tutoring application was sent! Our dispatch team will review your qualifications.');
  };

  // 13. Tutor applies directly from Tutor Workspace (1-Click or custom note)
  const handleTutorApplyJob = (jobId: string, coverNote?: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    // Check if application already exists
    const existing = applications.find(
      a => a.jobId === jobId && (
        a.tutorId === currentTutorProfile.id || 
        a.tutorEmail.toLowerCase() === currentTutorProfile.email.toLowerCase()
      )
    );

    if (existing) {
      showToast('info', `You have already applied for "${targetJob.title}". Status: ${existing.status.toUpperCase()}`, 'Already Applied');
      return;
    }

    const app: JobApplication = {
      id: 'app-' + Date.now(),
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      tutorId: currentTutorProfile.id,
      tutorName: currentTutorProfile.name,
      tutorEmail: currentTutorProfile.email,
      tutorPhone: currentTutorProfile.phone,
      coverNote: coverNote || `Direct application by ${currentTutorProfile.name} for ${targetJob.title}. Experienced educator for ${targetJob.grade}.`,
      status: 'pending',
      commissionStatus: 'unpaid',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setApplications(prev => [app, ...prev]);
    showToast('success', `Application for "${targetJob.title}" submitted successfully! Application is now under admin review.`, 'Application Submitted');
  };

  // 14. Admin sends monthly payout and receipt screenshot to tutor
  const handleAdminSendPayout = (payoutData: Omit<TutorMonthlyPayout, 'id' | 'disbursedDate' | 'status'>) => {
    const newPayout: TutorMonthlyPayout = {
      id: 'payout-' + Date.now(),
      ...payoutData,
      disbursedDate: new Date().toISOString().split('T')[0],
      status: 'received',
    };
    setPayouts(prev => [newPayout, ...prev]);
    showToast('success', `Monthly payout voucher & receipt screenshot sent to ${payoutData.tutorName}!`, 'Payout Disbursed');
  };

  // 15. Open global receipt viewer modal
  const handleViewReceipt = (title: string, url: string, details?: any) => {
    setReceiptModal({
      isOpen: true,
      title,
      url,
      details,
    });
  };

  // Pending count calculations for badge alerts
  const pendingCounts = {
    parent: reports.filter(r => r.status === 'approved_for_parent' && r.parentDecision === 'pending').length,
    tutor: applications.filter(a => a.status === 'approved' && a.commissionStatus === 'unpaid').length +
           tutors.filter(t => t.membershipStatus === 'unpaid').length,
    admin: payments.filter(p => p.status === 'pending').length +
           tutors.filter(t => t.membershipStatus === 'pending_verification').length +
           applications.filter(a => a.commissionStatus === 'pending_verification').length +
           reports.filter(r => r.status === 'pending_admin').length,
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-200`}>
      
      {/* Navigation Bar with Top-Left Role-Specific Sign In/Sign Up & Brand Logo */}
      <Navbar
        activeView={activeView}
        onSelectView={handleSelectView}
        language={language}
        onSelectLanguage={setLanguage}
        t={t}
        pendingCounts={pendingCounts}
        currentUser={currentUser}
        onOpenSignIn={handleOpenRoleSignIn}
        onOpenSignUp={handleOpenRoleSignUp}
        onSignOut={handleSignOut}
        onOpenWpGuide={() => setIsWpGuideOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* VIEW 1: Official Public Website */}
        {activeView === 'website' && (
          <PublicWebsite
            jobs={jobs}
            t={t}
            language={language}
            onNavigateToPortal={handleSelectView}
            onOpenWpGuide={() => setIsWpGuideOpen(true)}
            onApplyJob={(job) => setSelectedJobForApply(job)}
            onOpenParentRegistration={() => setIsParentRegOpen(true)}
            onOpenTutorRegistration={() => setIsTutorRegOpen(true)}
          />
        )}

        {/* VIEW 2: Parent & Student Portal */}
        {activeView === 'parent' && (
          <ParentPortal
            payments={payments}
            reports={reports}
            t={t}
            language={language}
            onAddPayment={handleAddPayment}
            onParentDecision={handleParentDecision}
            onViewReceipt={handleViewReceipt}
            showToast={showToast}
          />
        )}

        {/* VIEW 3: Tutor Operational Workspace */}
        {activeView === 'tutor' && (
          <TutorPortal
            tutor={currentTutorProfile}
            tutors={tutors}
            jobs={jobs}
            applications={applications}
            reports={reports}
            payouts={payouts}
            language={language}
            t={t}
            onSubmitReport={handleTutorSubmitReport}
            onSubmitMembershipFee={handleTutorSubmitMembershipFee}
            onUpdateMembership={({ method, reference, receiptUrl }) =>
              handleTutorSubmitMembershipFee(currentTutorProfile.id, method, reference, receiptUrl)
            }
            onSubmitCommission={handleTutorSubmitCommission}
            onApplyJob={handleTutorApplyJob}
            onViewReceipt={handleViewReceipt}
            showToast={showToast}
          />
        )}

        {/* VIEW 4: Executive Administrator Console */}
        {activeView === 'admin' && (
          <AdminPortal
            payments={payments}
            tutors={tutors}
            jobs={jobs}
            applications={applications}
            reports={reports}
            payouts={payouts}
            language={language}
            currentUser={currentUser}
            subAdmins={subAdmins}
            onUpdatePaymentStatus={handleAdminVerifyPayment}
            onUpdateTutorMembership={handleAdminVerifyTutor}
            onUpdateCommissionStatus={handleAdminUpdateCommission}
            onApproveReportForParent={handleAdminApproveReport}
            onUpdateApplicationStatus={handleAdminUpdateApplication}
            onSendPayout={handleAdminSendPayout}
            onOpenNewJobModal={() => setIsNewJobModalOpen(true)}
            onViewReceipt={handleViewReceipt}
            onUpdateSubAdmins={handleUpdateSubAdmins}
            onSwitchAdminDesignation={handleSwitchAdminDesignation}
            showToast={showToast}
          />
        )}
      </main>

      {/* Role-Specific Sign In Modal (Avoids 'Select Your Official Account Role') */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
        targetRole={signInTargetRole}
        onOpenSignUp={(role) => {
          setIsSignInOpen(false);
          handleOpenRoleSignUp(role);
        }}
        t={t}
        language={language}
      />

      {/* Role Select Pathway Modal (Only used if triggered without pre-selected role) */}
      <RoleSelectModal
        isOpen={isRoleSelectOpen}
        onClose={() => setIsRoleSelectOpen(false)}
        onSelectParent={() => {
          setIsRoleSelectOpen(false);
          setIsParentRegOpen(true);
        }}
        onSelectTutor={() => {
          setIsRoleSelectOpen(false);
          setIsTutorRegOpen(true);
        }}
        onOpenSignIn={() => {
          setIsRoleSelectOpen(false);
          handleOpenRoleSignIn('parent');
        }}
        t={t}
        language={language}
      />

      {/* 19 Requests Parent Registration Flow */}
      <ParentRegistrationModal
        isOpen={isParentRegOpen}
        onClose={() => setIsParentRegOpen(false)}
        onSubmit={handleParentRegistrationSubmit}
        t={t}
        language={language}
      />

      {/* 21 Requests Tutor Registration Flow */}
      <TutorRegistrationModal
        isOpen={isTutorRegOpen}
        onClose={() => setIsTutorRegOpen(false)}
        onSubmit={handleTutorRegistrationSubmit}
        t={t}
        language={language}
      />

      {/* Access Denied (RBAC Isolation) Modal */}
      <AccessDeniedModal
        isOpen={!!accessDeniedView}
        onClose={() => setAccessDeniedView(null)}
        currentUser={currentUser}
        attemptedView={accessDeniedView || 'website'}
        onSwitchAccount={() => {
          const target = accessDeniedView === 'parent' ? 'parent' : accessDeniedView === 'tutor' ? 'tutor' : 'admin';
          setAccessDeniedView(null);
          handleOpenRoleSignIn(target);
        }}
        onNavigateSafe={(view) => {
          setAccessDeniedView(null);
          setActiveView(view);
        }}
        t={t}
        language={language}
      />

      {/* Global Receipt Viewer Modal */}
      <ReceiptModal
        isOpen={receiptModal.isOpen}
        onClose={() => setReceiptModal(prev => ({ ...prev, isOpen: false }))}
        title={receiptModal.title}
        receiptUrl={receiptModal.url}
        details={receiptModal.details}
      />

      {/* Admin New Job Opening Modal */}
      <NewJobModal
        isOpen={isNewJobModalOpen}
        onClose={() => setIsNewJobModalOpen(false)}
        onAddJob={handleAddNewJob}
      />

      {/* Public Job Placement Apply Modal */}
      <PublicApplyModal
        isOpen={!!selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
        job={selectedJobForApply}
        t={t}
        onSubmitApplication={handlePublicJobApply}
      />

      {/* WordPress & Elementor Integration Instructions Modal */}
      <WordPressGuideModal
        isOpen={isWpGuideOpen}
        onClose={() => setIsWpGuideOpen(false)}
        t={t}
      />

      {/* Floating Toast Feedback Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} language={language} />
    </div>
  );
}
