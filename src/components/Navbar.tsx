import React, { useState, useRef, useEffect } from 'react';
import { ActiveView, SupportedLanguage, CurrentUser } from '../types';
import { TranslationDictionary } from '../data/translations';
import { getSectionTranslations } from '../data/multilingualSections';
import { AdorLogo } from './AdorLogo';
import { TelegramIcon, WhatsAppIcon } from './BrandIcons';
import { ShieldCheck, Sun, Moon } from 'lucide-react';
import { getLocalizedRoleName, getLocalizedPersonName } from '../data/dashboardLocalization';

interface NavbarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  pendingCounts: {
    parent: number;
    tutor: number;
    admin: number;
  };
  currentUser: CurrentUser;
  onOpenSignIn: (role?: 'parent' | 'tutor' | 'admin') => void;
  onOpenSignUp: (role?: 'parent' | 'tutor') => void;
  onSignOut: () => void;
  onOpenWpGuide: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  language,
  onSelectLanguage,
  t,
  pendingCounts,
  currentUser,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onOpenWpGuide,
  theme,
  onToggleTheme,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: t.langEnglish, flag: '🇺🇸' },
    { code: 'am', label: t.langAmharic, flag: '🇪🇹' },
    { code: 'om', label: t.langOromo, flag: '🇪🇹' },
    { code: 'ti', label: t.langTigrinya, flag: '🇪🇹' },
    { code: 'so', label: t.langSomali, flag: '🇸🇴' },
    { code: 'ar', label: t.langArabic, flag: '🇸🇦' },
    { code: 'fr', label: t.langFrench, flag: '🇫🇷' },
    { code: 'es', label: t.langSpanish, flag: '🇪🇸' },
    { code: 'de', label: t.langGerman, flag: '🇩🇪' },
    { code: 'zh', label: t.langChinese, flag: '🇨🇳' },
    { code: 'sw', label: t.langSwahili, flag: '🇹🇿' },
  ];

  const currentLangOption = languageOptions.find(l => l.code === language) || languageOptions[0];
  const sec = getSectionTranslations(language);

  const getRestrictedLabel = (lang: SupportedLanguage) => {
    switch (lang) {
      case 'am': return '[የተገደበ]';
      case 'om': return '[Daangeffame]';
      case 'ti': return '[ዝተገደበ]';
      case 'so': return '[Xaddidan]';
      case 'ar': return '[مقيد]';
      case 'fr': return '[Restreint]';
      case 'es': return '[Restringido]';
      case 'de': return '[Eingeschränkt]';
      case 'zh': return '[受限]';
      case 'sw': return '[Imezuiwa]';
      default: return '[Restricted]';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      
      {/* Top Bar with Top-Left Sign In & Sign Up buttons */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs border-b border-slate-800 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Top-Left: Role-Specific Sign In & Sign Up Buttons */}
          <div className="flex items-center gap-2">
            {currentUser.role === 'guest' ? (
              activeView === 'parent' ? (
                /* At Parent Portal: Only Parent Sign In & Parent Sign Up */
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {t.navParentPortal}
                  </span>
                  <button
                    id="parent-nav-signin-btn"
                    onClick={() => onOpenSignIn('parent')}
                    className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] sm:text-xs transition-colors border border-white/20"
                    title={sec.parentNavSignIn}
                  >
                    {sec.parentNavSignIn}
                  </button>
                  <button
                    id="parent-nav-signup-btn"
                    onClick={() => onOpenSignUp('parent')}
                    className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] sm:text-xs transition-colors shadow-xs"
                    title={sec.parentNavSignUp}
                  >
                    {sec.parentNavSignUp}
                  </button>
                </div>
              ) : activeView === 'tutor' ? (
                /* At Tutor Workspace: Only Tutor Sign In & Tutor Sign Up */
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {t.navTutorPortal}
                  </span>
                  <button
                    id="tutor-nav-signin-btn"
                    onClick={() => onOpenSignIn('tutor')}
                    className="px-3 py-1 rounded-md bg-white/10 hover:bg-blue-600/30 text-white font-semibold text-[11px] sm:text-xs transition-colors border border-blue-400/30"
                    title={sec.tutorNavSignIn}
                  >
                    {sec.tutorNavSignIn}
                  </button>
                  <button
                    id="tutor-nav-signup-btn"
                    onClick={() => onOpenSignUp('tutor')}
                    className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] sm:text-xs transition-colors shadow-xs"
                    title={sec.tutorNavSignUp}
                  >
                    {sec.tutorNavSignUp}
                  </button>
                </div>
              ) : activeView === 'admin' ? (
                /* At Admin Hub: Only Admin Sign In */
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {t.navAdminHub}
                  </span>
                  <button
                    id="admin-nav-signin-btn"
                    onClick={() => onOpenSignIn('admin')}
                    className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] sm:text-xs transition-colors shadow-xs"
                    title={sec.adminNavSignIn}
                  >
                    {sec.adminNavSignIn}
                  </button>
                </div>
              ) : (
                /* At Official Website: Direct role-specific buttons avoiding generic selection */
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Parent Group */}
                  <div className="flex items-center rounded-md bg-white/5 border border-white/15 p-0.5">
                    <button
                      id="website-parent-signin-btn"
                      onClick={() => onOpenSignIn('parent')}
                      className="px-2.5 py-0.5 rounded hover:bg-blue-600 text-slate-200 hover:text-white font-semibold text-[11px] transition-colors"
                      title={sec.parentNavSignIn}
                    >
                      {sec.parentNavSignIn}
                    </button>
                    <button
                      id="website-parent-signup-btn"
                      onClick={() => onOpenSignUp('parent')}
                      className="px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors shadow-2xs ml-0.5"
                      title={sec.parentNavSignUp}
                    >
                      {sec.parentNavSignUp}
                    </button>
                  </div>

                  <span className="text-slate-600 hidden sm:inline">|</span>

                  {/* Tutor Group - In Blue */}
                  <div className="hidden sm:flex items-center rounded-md bg-white/5 border border-blue-400/30 p-0.5">
                    <button
                      id="website-tutor-signin-btn"
                      onClick={() => onOpenSignIn('tutor')}
                      className="px-2.5 py-0.5 rounded hover:bg-blue-600 text-blue-100 hover:text-white font-semibold text-[11px] transition-colors"
                      title={sec.tutorNavSignIn}
                    >
                      {sec.tutorNavSignIn}
                    </button>
                    <button
                      id="website-tutor-signup-btn"
                      onClick={() => onOpenSignUp('tutor')}
                      className="px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors shadow-2xs ml-0.5"
                      title={sec.tutorNavSignUp}
                    >
                      {sec.tutorNavSignUp}
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-blue-200 hidden sm:inline">{t.signedInAs || 'Signed in as'}:</span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white border border-blue-400/60 shadow-xs">
                  {getLocalizedRoleName(currentUser.role, language)}: {getLocalizedPersonName(currentUser.name, language)}
                </span>

                <button
                  onClick={onSignOut}
                  className="text-[11px] text-blue-300 hover:text-white hover:underline ml-1 font-semibold"
                  title="Switch or Sign Out"
                >
                  [{t.switchOrSignOut}]
                </button>
              </div>
            )}

            <div className="hidden md:flex items-center gap-2 pl-3 ml-2 border-l border-slate-700 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 ring-2 ring-blue-500/20 shadow-xs" />
              <span>{t.oneOnOneTagline}</span>
            </div>
          </div>

          {/* Top-Right: Quick Contact & Official Social Handles */}
          <div className="flex items-center gap-2.5 text-[11px]">
            <a 
              href="http://t.me/ADORTUTORIALACADEMY" 
              target="_blank" 
              rel="noreferrer" 
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>@ADORTUTORIALACADEMY</span>
            </a>
            <span className="text-slate-600">•</span>
            <a 
              href="https://wa.me/251912629431" 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:inline text-slate-300 font-medium">+251 912 629 431 / +251 961 173 718</span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Official Ador Tutorial Center Logo */}
          <div 
            onClick={() => onSelectView('website')}
            className="flex items-center cursor-pointer group"
            title="Ador Tutorial Center Home"
          >
            <AdorLogo size="md" variant="horizontal" />
          </div>

          {/* Center Navigation Pills (Clean typography, avoiding icon clutter) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
            {/* Official Website Tab */}
            <button
              id="view-btn-website"
              onClick={() => onSelectView('website')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'website'
                  ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-300 shadow-xs border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {t.navOfficialWebsite}
            </button>

            {/* Parent Tab (Protected) */}
            <button
              id="view-btn-parent"
              onClick={() => onSelectView('parent')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeView === 'parent'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              } ${currentUser.role === 'tutor' ? 'opacity-70' : ''}`}
              title={currentUser.role === 'tutor' ? 'Parent portal restricted for Tutors' : 'Parent & Student Portal'}
            >
              <span>{t.navParentPortal}</span>
              {currentUser.role === 'tutor' && (
                <span className="text-[10px] text-rose-600 font-bold ml-1">{getRestrictedLabel(language)}</span>
              )}
              {pendingCounts.parent > 0 && currentUser.role !== 'tutor' && (
                <span className="w-2 h-2 rounded-full bg-blue-600 ring-2 ring-blue-400/30" />
              )}
            </button>

            {/* Tutor Tab (Protected) */}
            <button
              id="view-btn-tutor"
              onClick={() => onSelectView('tutor')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeView === 'tutor'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              } ${currentUser.role === 'parent' ? 'opacity-70' : ''}`}
              title={currentUser.role === 'parent' ? 'Tutor workspace restricted for Parents' : 'Tutor Workspace'}
            >
              <span>{t.navTutorPortal}</span>
              {currentUser.role === 'parent' && (
                <span className="text-[10px] text-rose-600 font-bold ml-1">{getRestrictedLabel(language)}</span>
              )}
              {pendingCounts.tutor > 0 && currentUser.role !== 'parent' && (
                <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-300">
                  {pendingCounts.tutor}
                </span>
              )}
            </button>

            {/* Admin Tab (Protected - Strictly visible ONLY when authenticated as an Administrator) */}
            {currentUser.role === 'admin' && (
              <button
                id="view-btn-admin"
                onClick={() => onSelectView('admin')}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeView === 'admin'
                    ? 'bg-blue-900 text-white shadow-xs dark:bg-blue-600 dark:text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
                title="Ador Executive Administration Console"
              >
                <span>{t.navAdminHub}</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-100 border border-blue-400 dark:border-blue-500">
                  {currentUser.adminDesignation === 'academic_coordinator' ? 'Academic' : currentUser.adminDesignation === 'finance_officer' ? 'Finance' : 'Super Admin'}
                </span>
                {pendingCounts.admin > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-rose-500 text-white font-bold">
                    {pendingCounts.admin}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Right Tools: Dark/Light Mode Toggle, Multilingual Selector, WP Guide, Plugin ZIP */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-slate-700 transition-colors shadow-2xs flex items-center justify-center"
              title={theme === 'dark' ? 'Dark Mode (Active)' : 'Light Mode (Active)'}
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-blue-200 transition-transform duration-200 hover:-rotate-12" />
              ) : (
                <Sun className="w-4 h-4 text-blue-600 transition-transform duration-200 hover:rotate-45" />
              )}
            </button>

            {/* Multilingual Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="language-select-btn"
                onClick={() => setLangDropdownOpen(prev => !prev)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs"
                title="Select Platform Language"
              >
                <span>{currentLangOption.flag}</span>
                <span className="hidden sm:inline-block truncate max-w-[130px]">{currentLangOption.label}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-64 max-h-96 overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50 animate-fade-in custom-scrollbar">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center justify-between">
                    <span>{t.activeLanguageLabel} (11 Languages)</span>
                    <span className="text-[10px] lowercase font-normal text-slate-400">global</span>
                  </div>
                  {languageOptions.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        onSelectLanguage(opt.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-xs font-medium text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                        language === opt.code 
                          ? 'text-blue-700 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40' 
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{opt.flag}</span>
                        <span>{opt.label}</span>
                      </div>
                      {language === opt.code && (
                        <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

    </header>
  );
};
