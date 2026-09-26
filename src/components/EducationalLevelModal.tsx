import React from 'react';
import { EducationalLevelItem, SupportedLanguage } from '../types';
import { GoldenStar } from './BrandIcons';
import { TranslationDictionary } from '../data/translations';
import { getSectionTranslations } from '../data/multilingualSections';

interface EducationalLevelModalProps {
  level: EducationalLevelItem | null;
  onClose: () => void;
  onRequestTutor: (level: EducationalLevelItem) => void;
  t?: TranslationDictionary;
  language?: SupportedLanguage;
}

export const EducationalLevelModal: React.FC<EducationalLevelModalProps> = ({
  level,
  onClose,
  onRequestTutor,
  t,
  language = 'en',
}) => {
  if (!level) return null;

  const sec = getSectionTranslations(language);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Cover Image & Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={level.image}
            alt={level.title}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/90 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-900 transition-colors z-10 text-xs font-bold"
          >
            ✕ {t?.close || sec.eduModalClose}
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider">
                {level.badge}
              </span>
              <span className="text-xs font-bold bg-black/60 px-2 py-0.5 rounded-md text-amber-300 flex items-center gap-1 shadow-xs">
                <GoldenStar className="w-3.5 h-3.5" />
                <span>{level.rating.toFixed(1)} / 5.00 {sec.eduModalRatingText}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {level.title}
            </h2>
            <p className="text-xs text-slate-200 font-medium">
              {level.grades}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              {sec.eduModalOverviewTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {level.description} {sec.eduModalCurriculumText}
            </p>
          </div>

          {/* Highlights & Curriculum Focus */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-1.5">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">
              {sec.eduModalHighlightTitle}: {level.highlight}
            </span>
            <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
              {sec.eduModalTutorGuarantee}
            </p>
          </div>

          {/* Specialized Subject Tracks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {sec.eduModalSubjectsTitle}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {level.subjects.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              {t?.close || sec.eduModalClose}
            </button>

            <button
              onClick={() => {
                onClose();
                onRequestTutor(level);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow-xs"
            >
              {t?.requestTutorLevelBtn || sec.eduModalRequestBtn}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
