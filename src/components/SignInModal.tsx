import React, { useState, useEffect } from 'react';
import { CurrentUser, AdminDesignation, SupportedLanguage } from '../types';
import { TranslationDictionary } from '../data/translations';
import { getSectionTranslations } from '../data/multilingualSections';
import { AdorLogo } from './AdorLogo';
import { ShieldCheck, UserCheck, GraduationCap, Lock } from 'lucide-react';

export interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (user: CurrentUser) => void;
  onOpenSignUp: (role?: 'parent' | 'tutor') => void;
  targetRole?: 'parent' | 'tutor' | 'admin';
  t: TranslationDictionary;
  language?: SupportedLanguage;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSignIn,
  onOpenSignUp,
  targetRole = 'parent',
  t,
  language = 'en',
}) => {
  const [selectedRole, setSelectedRole] = useState<'parent' | 'tutor' | 'admin'>(targetRole);
  const [adminDesignation, setAdminDesignation] = useState<AdminDesignation>('super_admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••');

  const sec = getSectionTranslations(language);

  // Preset accounts with verified credentials
  const demoAccounts = {
    parent: {
      id: 'demo-parent-1',
      role: 'parent' as const,
      name: 'Dr. Elias Solomon',
      email: 'elias.solomon@gmail.com',
      phone: '0911234567',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
    },
    tutor: {
      id: 'demo-tutor-1',
      role: 'tutor' as const,
      name: 'Abebe Kebede (MSc)',
      email: 'abebe.kebede@gmail.com',
      phone: '0912345678',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
    },
    admin: {
      super_admin: {
        id: 'admin-super-1',
        role: 'admin' as const,
        adminDesignation: 'super_admin' as const,
        name: 'Executive Director (Main Admin)',
        email: 'admin@adortutorial.com',
        phone: '0900000000',
        avatarUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=80',
        isVerified: true,
        permissions: {
          canVerifyPayments: true,
          canVerifyTutors: true,
          canPostJobs: true,
          canApproveReports: true,
          canManageApplications: true,
          canAssignRoles: true,
        }
      },
      academic_coordinator: {
        id: 'admin-acad-2',
        role: 'admin' as const,
        adminDesignation: 'academic_coordinator' as const,
        name: 'Dr. Alula Kebede (MSc, PhD)',
        email: 'academic@adortutorial.com',
        phone: '0912223344',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        isVerified: true,
        permissions: {
          canVerifyPayments: false,
          canVerifyTutors: true,
          canPostJobs: true,
          canApproveReports: true,
          canManageApplications: true,
          canAssignRoles: false,
        }
      },
      finance_officer: {
        id: 'admin-fin-3',
        role: 'admin' as const,
        adminDesignation: 'finance_officer' as const,
        name: 'Selamawit Tadesse (BA Acc)',
        email: 'finance@adortutorial.com',
        phone: '0913334455',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        isVerified: true,
        permissions: {
          canVerifyPayments: true,
          canVerifyTutors: false,
          canPostJobs: false,
          canApproveReports: false,
          canManageApplications: false,
          canAssignRoles: false,
        }
      }
    }
  };

  // Sync role and demo email whenever modal opens or targetRole changes
  useEffect(() => {
    const role = targetRole || 'parent';
    setSelectedRole(role);
    if (role === 'parent') {
      setEmail(demoAccounts.parent.email);
    } else if (role === 'tutor') {
      setEmail(demoAccounts.tutor.email);
    } else if (role === 'admin') {
      setEmail(demoAccounts.admin[adminDesignation].email);
    }
  }, [targetRole, isOpen]);

  if (!isOpen) return null;

  const handleQuickLogin = (role: 'parent' | 'tutor' | 'admin') => {
    if (role === 'admin') {
      onSignIn(demoAccounts.admin[adminDesignation]);
    } else {
      onSignIn(demoAccounts[role]);
    }
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      const targetPreset = demoAccounts.admin[adminDesignation];
      const user: CurrentUser = {
        id: targetPreset.id,
        role: 'admin',
        adminDesignation,
        name: targetPreset.name,
        email: email || targetPreset.email,
        phone: targetPreset.phone,
        isVerified: true,
        permissions: targetPreset.permissions,
      };
      onSignIn(user);
    } else {
      const user: CurrentUser = {
        id: `usr-${Date.now()}`,
        role: selectedRole,
        name: email.split('@')[0] || (selectedRole === 'parent' ? 'Registered Parent' : 'Verified Tutor'),
        email: email || demoAccounts[selectedRole].email,
        phone: '0911000000',
        isVerified: true,
      };
      onSignIn(user);
    }
    onClose();
  };

  // Role-specific theme styling & textual labels - Strictly Blue and White branding
  const roleConfig = {
    parent: {
      gradient: 'from-[#014aac] via-blue-700 to-blue-900',
      tagText: sec.signInTagParent,
      tagBadge: 'bg-white/20 text-white border-white/40',
      title: sec.signInModalTitleParent,
      subtitle: sec.signInModalSubtitleParent,
      demoTitle: `${sec.signInDemoTitle}: Dr. Elias Solomon (${t?.navParentPortal || 'Parent'})`,
      demoSub: sec.signInParentDemoSub,
      signUpPrompt: t?.signUp || sec.signInRegisterLink,
      icon: <UserCheck className="w-4 h-4 text-white" />,
      submitBtnClass: 'bg-[#014aac] hover:bg-blue-700 text-white',
    },
    tutor: {
      gradient: 'from-[#014aac] via-blue-700 to-blue-900',
      tagText: sec.signInTagTutor,
      tagBadge: 'bg-white/20 text-white border-white/40',
      title: sec.signInModalTitleTutor,
      subtitle: sec.signInModalSubtitleTutor,
      demoTitle: `${sec.signInDemoTitle}: Abebe Kebede MSc (${t?.navTutorPortal || 'Tutor'})`,
      demoSub: sec.signInTutorDemoSub,
      signUpPrompt: t?.signUp || sec.signInRegisterLink,
      icon: <GraduationCap className="w-4 h-4 text-white" />,
      submitBtnClass: 'bg-[#014aac] hover:bg-blue-700 text-white',
    },
    admin: {
      gradient: 'from-blue-900 via-[#014aac] to-blue-950',
      tagText: sec.signInTagAdmin,
      tagBadge: 'bg-white/20 text-white border-white/40',
      title: sec.signInModalTitleAdmin,
      subtitle: sec.signInModalSubtitleAdmin,
      demoTitle: `${sec.signInDemoTitle}: ${demoAccounts.admin[adminDesignation].name}`,
      demoSub: sec.signInAdminDemoSub,
      signUpPrompt: '',
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      submitBtnClass: 'bg-[#014aac] hover:bg-blue-700 text-white',
    }
  };

  const currentConfig = roleConfig[selectedRole];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden animate-fade-in transition-colors">
        
        {/* Role-Specific Header Banner - Blue & White Brand Identity */}
        <div className={`bg-gradient-to-r ${currentConfig.gradient} text-white p-6 text-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs font-bold"
          >
            ✕
          </button>

          <div className="flex justify-center mb-3">
            <AdorLogo variant="badge" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-2 mx-auto shadow-2xs backdrop-blur-xs">
            {currentConfig.icon}
            <span className={currentConfig.tagBadge}>{currentConfig.tagText}</span>
          </div>

          <h2 className="text-xl font-black tracking-tight">
            {currentConfig.title}
          </h2>
          <p className="text-xs text-slate-200/90 mt-1 max-w-xs mx-auto leading-relaxed">
            {currentConfig.subtitle}
          </p>
        </div>

        <div className="p-6 space-y-4">
          
          {/* If Admin is selected, display Sub-Admin Designation selector */}
          {selectedRole === 'admin' && (
            <div className="bg-blue-50/70 dark:bg-blue-950/30 p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 space-y-2">
              <label className="block text-[11px] font-bold text-blue-950 dark:text-blue-200 uppercase tracking-wider">
                {sec.adminSelectAccessLevel}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAdminDesignation('super_admin');
                    setEmail(demoAccounts.admin.super_admin.email);
                  }}
                  className={`px-2 py-2 rounded-lg text-xs font-bold transition-all text-center border ${
                    adminDesignation === 'super_admin'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-blue-950 dark:text-blue-200 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <p className="text-[11px]">{sec.adminRoleSuper}</p>
                  <p className="text-[9px] font-normal opacity-90">{sec.adminRoleSuperDesc}</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdminDesignation('academic_coordinator');
                    setEmail(demoAccounts.admin.academic_coordinator.email);
                  }}
                  className={`px-2 py-2 rounded-lg text-xs font-bold transition-all text-center border ${
                    adminDesignation === 'academic_coordinator'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-blue-950 dark:text-blue-200 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <p className="text-[11px]">{sec.adminRoleAcademic}</p>
                  <p className="text-[9px] font-normal opacity-90">{sec.adminRoleAcademicDesc}</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdminDesignation('finance_officer');
                    setEmail(demoAccounts.admin.finance_officer.email);
                  }}
                  className={`px-2 py-2 rounded-lg text-xs font-bold transition-all text-center border ${
                    adminDesignation === 'finance_officer'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-blue-950 dark:text-blue-200 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <p className="text-[11px]">{sec.adminRoleFinance}</p>
                  <p className="text-[9px] font-normal opacity-90">{sec.adminRoleFinanceDesc}</p>
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Sign In Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between gap-3 shadow-2xs">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                {currentConfig.demoTitle}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {currentConfig.demoSub}
              </p>
            </div>
            <button
              onClick={() => handleQuickLogin(selectedRole)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              {sec.signInInstantBtn}
            </button>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
            <span className="bg-white dark:bg-slate-900 px-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
              {sec.signInOrWithEmail}
            </span>
            <div className="border-t border-slate-200 dark:border-slate-700 w-full" />
          </div>

          {/* Custom Credentials Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {selectedRole === 'parent' ? sec.signInEmailLabelParent : selectedRole === 'tutor' ? sec.signInEmailLabelTutor : sec.signInEmailLabelAdmin}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={
                  selectedRole === 'parent'
                    ? (sec.signInEmailPlaceholderParent || 'parent@gmail.com')
                    : selectedRole === 'tutor'
                    ? (sec.signInEmailPlaceholderTutor || 'tutor@adortutorial.com')
                    : (sec.signInEmailPlaceholderAdmin || 'admin@adortutorial.com')
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {sec.signInPasswordLabel}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={sec.signInPasswordPlaceholder || '••••••••'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs uppercase tracking-wide flex items-center justify-center gap-1.5 ${currentConfig.submitBtnClass}`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>
                {selectedRole === 'parent' ? sec.signInBtnParent : selectedRole === 'tutor' ? sec.signInBtnTutor : sec.signInBtnAdmin}
              </span>
            </button>
          </form>

          {/* Role-Specific Sign Up Call-To-Action */}
          {selectedRole !== 'admin' && (
            <div className="pt-2 text-center text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">{sec.signInNoAccountPrompt}</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenSignUp(selectedRole);
                }}
                className="font-bold hover:underline inline-block text-blue-700 dark:text-blue-400"
              >
                <span>{currentConfig.signUpPrompt}</span>
              </button>
            </div>
          )}

          {/* Subtle switcher if user clicked wrong portal */}
          <div className="pt-1 text-center text-[11px] text-slate-400 dark:text-slate-500">
            {selectedRole === 'parent' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('tutor');
                  setEmail(demoAccounts.tutor.email);
                }}
                className="hover:text-slate-700 dark:hover:text-slate-300 underline"
              >
                {sec.signInLookingForTutor}
              </button>
            )}
            {selectedRole === 'tutor' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('parent');
                  setEmail(demoAccounts.parent.email);
                }}
                className="hover:text-slate-700 dark:hover:text-slate-300 underline"
              >
                {sec.signInLookingForParent}
              </button>
            )}
            {selectedRole === 'admin' && (
              <span className="text-slate-400 dark:text-slate-500">
                {sec.signInAdminStaffNotice}
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

