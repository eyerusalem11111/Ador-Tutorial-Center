import React from 'react';
import { AdorLogo } from './AdorLogo';
import { TranslationDictionary } from '../data/translations';
import { SupportedLanguage } from '../types';
import { getSectionTranslations } from '../data/multilingualSections';

interface RoleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectParent: () => void;
  onSelectTutor: () => void;
  onOpenSignIn: () => void;
  t?: TranslationDictionary;
  language?: SupportedLanguage;
}

export const RoleSelectModal: React.FC<RoleSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectParent,
  onSelectTutor,
  onOpenSignIn,
  t,
  language = 'en',
}) => {
  if (!isOpen) return null;

  const sec = getSectionTranslations(language);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header - Brand Blue and White */}
        <div className="bg-gradient-to-r from-[#014aac] via-blue-700 to-blue-900 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white px-2 py-0.5 rounded-lg hover:bg-white/10 transition-colors text-xs font-bold"
          >
            ✕
          </button>

          <div className="flex justify-center mb-3">
            <AdorLogo variant="badge" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {t?.registerNowHeading || sec.roleSelectTitle}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/80 mt-1">
            {t?.registerNowSubtitle || sec.roleSelectSubtitle}
          </p>
        </div>

        {/* Pathway Selection - Clean typographic design avoiding icons */}
        <div className="p-6 space-y-4">
          
          {/* Option 1: Student / Parent */}
          <div 
            onClick={() => {
              onClose();
              onSelectParent();
            }}
            className="p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-800/80 hover:border-blue-600 dark:hover:border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all cursor-pointer group shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {t?.parentCardTitle || sec.roleSelectParentTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase">
                {sec.roleSelectParentBadge}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t?.parentCardDesc || sec.roleSelectParentDesc}
            </p>
            <div className="pt-2 text-xs font-bold text-blue-700 dark:text-blue-400">
              {t?.parentStartBtn || sec.roleSelectParentBtn}
            </div>
          </div>

          {/* Option 2: Professional Tutor */}
          <div 
            onClick={() => {
              onClose();
              onSelectTutor();
            }}
            className="p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-800/80 hover:border-blue-600 dark:hover:border-blue-500 bg-blue-50/40 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all cursor-pointer group shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {t?.tutorCardTitle || sec.roleSelectTutorTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase">
                {sec.roleSelectTutorBadge}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t?.tutorCardDesc || sec.roleSelectTutorDesc}
            </p>
            <div className="pt-2 text-xs font-bold text-blue-700 dark:text-blue-400">
              {t?.tutorStartBtn || sec.roleSelectTutorBtn}
            </div>
          </div>

          {/* Footer with sign in switch */}
          <div className="pt-3 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <span>{sec.roleSelectAlreadyHaveAccount} </span>
            <button
              onClick={() => {
                onClose();
                onOpenSignIn();
              }}
              className="text-blue-700 dark:text-blue-400 font-bold hover:underline"
            >
              {sec.roleSelectSignInLink}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
