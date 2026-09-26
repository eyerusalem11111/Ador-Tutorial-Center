import React, { useState, useMemo } from 'react';
import { TutoringJob, EducationalLevelItem, SupportedLanguage } from '../types';
import { TranslationDictionary } from '../data/translations';
import { 
  EDUCATIONAL_LEVELS, 
  OFFICIAL_FAQS, 
  TESTIMONIALS, 
  OFFICIAL_SOCIAL_LINKS 
} from '../data/educationalData';
import { getLocalizedEducationalLevels } from '../data/localizedEducationalLevels';
import { getLocalizedTestimonials, LocalizedTestimonial } from '../data/localizedTestimonials';
import { getSectionTranslations } from '../data/multilingualSections';
import { getLocalizedJob, getJobCardTranslations } from '../data/localizedJobs';
import { getLocalizedProgramChips } from '../data/dashboardLocalization';
import { AdorLogo } from './AdorLogo';
import { EducationalLevelModal } from './EducationalLevelModal';
import { TelegramIcon, WhatsAppIcon, SocialMediaIcon, GoldenStar, GoldenStarGroup } from './BrandIcons';
import { 
  Lock, 
  ShieldCheck, 
  Laptop, 
  Globe, 
  BookOpen, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2, 
  Code2,
  UserPlus,
  Briefcase
} from 'lucide-react';

interface PublicWebsiteProps {
  jobs: TutoringJob[];
  t: TranslationDictionary;
  language?: SupportedLanguage;
  onNavigateToPortal: (role: 'parent' | 'tutor' | 'admin') => void;
  onOpenWpGuide: () => void;
  onApplyJob: (job: TutoringJob) => void;
  onOpenParentRegistration: () => void;
  onOpenTutorRegistration: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  jobs,
  t,
  language = 'en',
  onNavigateToPortal,
  onOpenWpGuide,
  onApplyJob,
  onOpenParentRegistration,
  onOpenTutorRegistration,
}) => {
  const sec = getSectionTranslations(language);
  const jobLabels = useMemo(() => getJobCardTranslations(language), [language]);
  const educationalLevels = useMemo(() => getLocalizedEducationalLevels(language), [language]);
  const localizedTestimonials = useMemo(() => getLocalizedTestimonials(language), [language]);
  // Job Board Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Educational Levels Category Filter & Modal State
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [selectedLevelForModal, setSelectedLevelForModal] = useState<EducationalLevelItem | null>(null);

  // Newsletter Email State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Extract unique subjects & locations for filter dropdowns
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      j.subject.split(',').forEach(s => set.add(s.trim()));
    });
    return Array.from(set);
  }, [jobs]);

  const availableLocations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      const loc = j.location.split(',')[0].trim();
      set.add(loc);
    });
    return Array.from(set);
  }, [jobs]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesSearch = 
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject === 'all' || j.subject.toLowerCase().includes(selectedSubject.toLowerCase());
      const matchesLocation = selectedLocation === 'all' || j.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesSubject && matchesLocation;
    });
  }, [jobs, searchQuery, selectedSubject, selectedLocation]);

  // Filtered Educational Levels
  const filteredLevels = useMemo(() => {
    if (selectedLevelFilter === 'all') return educationalLevels;
    const filter = selectedLevelFilter.toLowerCase();
    return educationalLevels.filter(l => {
      if (filter === 'foundations') return l.id === 'early-years';
      if (filter === 'ministry') return l.id === 'grade-6-prep' || l.id === 'grade-7-8-prep';
      if (filter === 'secondary') return l.id === 'secondary-9-10';
      if (filter === 'university') return l.id === 'university-prep-11-12';
      if (filter === 'international') return l.id === 'international-curricula';
      return l.badge.toLowerCase().includes(filter);
    });
  }, [educationalLevels, selectedLevelFilter]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  // Helper to retrieve translated FAQ item
  const getFaqQ = (faq: typeof OFFICIAL_FAQS[0]) => {
    const key = faq.questionKey as keyof TranslationDictionary;
    return (t[key] as string) || faq.question;
  };

  const getFaqA = (faq: typeof OFFICIAL_FAQS[0]) => {
    const key = faq.answerKey as keyof TranslationDictionary;
    return (t[key] as string) || faq.answer;
  };

  // Helper to retrieve translated testimonial text
  const getTestimonialText = (item: LocalizedTestimonial | typeof TESTIMONIALS[0]) => {
    const key = item.textKey as keyof TranslationDictionary;
    return (t[key] as string) || ('text' in item ? (item as any).text : '');
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* IN-PAGE SECTION NAVIGATION (Home, Services, Levels, About Us, Jobs, Register, FAQ, Testimonials, Contact) */}
      <nav aria-label="Page Sections Navigation" className="sticky top-20 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-1 min-w-max">
          <a 
            href="#home" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.navOfficialWebsite}
          </a>
          <a 
            href="#services" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.servicesSectionHeading}
          </a>
          <a 
            href="#educational-levels" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.educationalLevelsHeading}
          </a>
          <a 
            href="#about-us" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.missionTitle || "Our Mission"}
          </a>
          <a 
            href="#register" 
            id="nav-section-register-direct"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xs transition-all border border-blue-500 hover:scale-[1.02]"
            title="Registration for Parents and Tutor Intake"
          >
            <span>{t.registerNowHeading || "Registration for Parents and Tutor Intake"}</span>
          </a>
          <a 
            href="#jobs" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.jobBoardHeading || "Active Tutoring Opportunities"}
          </a>
          <a 
            href="#faq" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.faqSectionHeading}
          </a>
          <a 
            href="#testimonials" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.testimonialsHeading}
          </a>
          <a 
            href="#contact" 
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.colContactUs}
          </a>
        </div>
      </nav>
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-blue-900/50 scroll-mt-28">
        <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-block px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 uppercase tracking-wide">
              {t.heroBadge}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              {t.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenParentRegistration}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30"
              >
                {t.requestTutorBtn}
              </button>

              <button
                onClick={onOpenTutorRegistration}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20"
              >
                {t.applyTutorBtn}
              </button>

              <a
                href="#services"
                className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/15 text-blue-200 hover:text-white font-semibold text-xs sm:text-sm transition-colors border border-white/10"
              >
                {t.servicesSectionHeading}
              </a>

              <a
                href="#educational-levels"
                className="px-4 py-3.5 rounded-xl text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                {t.exploreLevelsBtn}
              </a>
            </div>

            {/* Quick Highlights Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t.statVetted}</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">KG - G12</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t.statLevels}</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">98.4%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t.statPassRate}</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">Weekly</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{t.statReports}</p>
              </div>
            </div>
          </div>

          {/* Official Logo Brand Card in Hero */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-800 flex flex-col items-center transition-colors">
                <AdorLogo size="xl" variant="full" />
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center w-full">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                    Official Brand Identity
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SPECIALIZED SERVICES OF ADOR TUTORIAL CENTER (Computer, Language, Ethics Training) */}
      <section id="services" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 transition-colors">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ador Tutorial Center Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.servicesSectionHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t.servicesSectionSubtitle}
            </p>
          </div>

          <button
            onClick={onOpenParentRegistration}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs shrink-0"
          >
            {t.serviceEnrollBtn}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Service 1: Computer & Digital Literacy Training */}
          {(() => {
            const techData = getLocalizedProgramChips('tech', language || 'en');
            return (
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Laptop className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/50">
                      {t.serviceTagComputer}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {t.serviceComputerTitle}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t.serviceComputerDesc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                    {techData.chips.map(chip => (
                      <span key={chip} className="px-2 py-0.5 rounded bg-blue-50/60 dark:bg-slate-800 text-blue-900 dark:text-slate-300 text-[10px] font-medium border border-blue-100/50 dark:border-slate-700">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{techData.badge}</span>
                  </span>
                  <button
                    onClick={onOpenParentRegistration}
                    className="inline-block text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline shrink-0"
                  >
                    <span>{t.serviceEnrollBtn || techData.enrollBtn}</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Service 2: Global Language & Fluency Training */}
          {(() => {
            const langData = getLocalizedProgramChips('lang', language || 'en');
            return (
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/50">
                      {t.serviceTagLanguage}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {t.serviceLanguageTitle}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t.serviceLanguageDesc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                    {langData.chips.map(chip => (
                      <span key={chip} className="px-2 py-0.5 rounded bg-blue-50/60 dark:bg-slate-800 text-blue-900 dark:text-slate-300 text-[10px] font-medium border border-blue-100/50 dark:border-slate-700">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{langData.badge}</span>
                  </span>
                  <button
                    onClick={onOpenParentRegistration}
                    className="inline-block text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline shrink-0"
                  >
                    <span>{t.serviceEnrollBtn || langData.enrollBtn}</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Service 3: Ethics & Character Building Training */}
          {(() => {
            const ethicsData = getLocalizedProgramChips('ethics', language || 'en');
            return (
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-200/50 dark:border-blue-800/50">
                      {t.serviceTagEthics}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {t.serviceEthicsTitle}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t.serviceEthicsDesc}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                    {ethicsData.chips.map(chip => (
                      <span key={chip} className="px-2 py-0.5 rounded bg-blue-50/60 dark:bg-slate-800 text-blue-900 dark:text-slate-300 text-[10px] font-medium border border-blue-100/50 dark:border-slate-700">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{ethicsData.badge}</span>
                  </span>
                  <button
                    onClick={onOpenParentRegistration}
                    className="inline-block text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline shrink-0"
                  >
                    <span>{t.serviceEnrollBtn || ethicsData.enrollBtn}</span>
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 3. EDUCATIONAL LEVELS SECTION */}
      <section id="educational-levels" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 transition-colors">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase block">
              {t.curriculumPathwaysLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.educationalLevelsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              {t.educationalLevelsSubtitle}
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'Foundations', label: t.filterEarly },
              { id: 'Ministry', label: t.filterMinistry },
              { id: 'Secondary', label: t.filterSecondary },
              { id: 'University', label: t.filterUniversity },
              { id: 'International', label: t.filterInternational },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevelFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedLevelFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Levels Grid with Melanin-Rich African Students and Instructors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLevels.map(level => (
            <div
              key={level.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={level.image}
                  alt={level.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                    {level.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-xs font-bold text-slate-900 dark:text-white shadow-xs flex items-center gap-1">
                  <GoldenStar className="w-3.5 h-3.5" />
                  <span>{level.rating.toFixed(1)} / 5.00</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide block">
                    {level.grades}
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {level.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {level.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {(level.subjects || []).slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                        {s}
                      </span>
                    ))}
                    {(level.subjects || []).length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px]">
                        +{(level.subjects || []).length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedLevelForModal(level)}
                    className="text-blue-700 dark:text-blue-400 font-bold text-xs hover:underline transition-all"
                  >
                    {t.readMoreBtn}
                  </button>

                  <button
                    onClick={onOpenParentRegistration}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold transition-colors"
                  >
                    {t.requestTutorLevelBtn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MISSION, VISION & CORE VALUES (About Us) */}
      <section id="about-us" className="space-y-8 scroll-mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-3 shadow-md border border-blue-800/40">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block">Ador Principle</span>
            <h3 className="text-xl font-black">{t.missionTitle}</h3>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              {t.missionBody}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-3 shadow-md border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Long-Term Goal</span>
            <h3 className="text-xl font-black">{t.visionTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.visionBody}
            </p>
          </div>
        </div>

        {/* Mission Direct Intake Action for Parents and Tutors */}
        <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/90 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-blue-600 text-white shadow-xs">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {t.registerNowHeading || "Registration for Parents & Tutor Intake"}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t.registerNowSubtitle || "Get matched with an expert educator or apply to join our accredited tutor network."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenParentRegistration}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              {t.parentStartBtn || "Start Parent Registration"}
            </button>
            <button
              onClick={onOpenTutorRegistration}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-bold transition-all shadow-2xs"
            >
              {t.tutorStartBtn || "Apply as Tutor"}
            </button>
          </div>
        </div>

        {/* 6 Core Values */}
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t.coreValuesHeading}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.coreValuesSubheading}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: t.val1Title, desc: t.val1Desc, border: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20' },
              { title: t.val2Title, desc: t.val2Desc, border: 'border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20' },
              { title: t.val3Title, desc: t.val3Desc, border: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20' },
              { title: t.val4Title, desc: t.val4Desc, border: 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/20' },
              { title: t.val5Title, desc: t.val5Desc, border: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20' },
              { title: t.val6Title, desc: t.val6Desc, border: 'border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/20' },
            ].map((v, i) => (
              <div key={i} className={`p-5 rounded-2xl border ${v.border} bg-white dark:bg-slate-900 shadow-2xs space-y-1.5 transition-colors`}>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{v.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIVE TUTORING JOB BOARD */}
      <section id="jobs" className="space-y-6 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 transition-colors">
          <div>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Active Placements
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t.jobBoardHeading}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.jobBoardSubheading}</p>
          </div>

          <button
            onClick={onOpenTutorRegistration}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs shrink-0"
          >
            {t.applyTutorBtn}
          </button>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 transition-colors">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.jobSearchPlaceholder}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.jobFilterAllSubjects}</option>
              {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.jobFilterAllLocations}</option>
              {availableLocations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.slice(0, 6).map(job => {
            const locJob = getLocalizedJob(job, language);
            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                        {locJob.grade}
                      </span>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mt-1">{locJob.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold uppercase shrink-0 border border-emerald-300 dark:border-emerald-800">
                      {jobLabels.statusOpen || t.jobStatusOpen}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">{jobLabels.location}</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{locJob.location}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">{jobLabels.rate}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 block">{locJob.rate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">{jobLabels.schedule}</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{locJob.schedule}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">{jobLabels.monthlyEst}</span>
                      <span className="font-medium text-indigo-700 dark:text-indigo-400 block">{locJob.monthlyEstimate.toLocaleString()} ETB</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {locJob.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{jobLabels.posted}: {locJob.postedDate}</span>
                  <button
                    onClick={() => onApplyJob(locJob)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    {jobLabels.applyNow || t.jobApplyButton}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. REGISTER NOW SECTION */}
      <section id="register" className="p-8 sm:p-10 rounded-3xl bg-slate-900 dark:bg-slate-950 text-white space-y-6 shadow-xl border border-slate-800 scroll-mt-28">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="px-3 py-0.5 rounded-full bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider">
            {t.brandTitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {t.registerNowHeading}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t.registerNowSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Parent Registration Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/60 to-blue-950/80 border border-blue-700/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wide inline-block">
                {sec.roleSelectParentBadge}
              </span>
              <h4 className="text-lg font-bold text-white">
                {t.parentCardTitle}
              </h4>
              <p className="text-xs text-blue-200/90 leading-relaxed">
                {t.parentCardDesc}
              </p>
              <ul className="space-y-1.5 text-xs text-blue-100/80 pt-1">
                <li className="leading-snug">• {t.parentBullet1}</li>
                <li className="leading-snug">• {t.parentBullet2}</li>
              </ul>
            </div>

            <button
              onClick={onOpenParentRegistration}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs uppercase tracking-wide"
            >
              {t.parentStartBtn}
            </button>
          </div>

          {/* Tutor Application Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-950/80 border border-blue-700/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wide inline-block">
                {sec.roleSelectTutorBadge}
              </span>
              <h4 className="text-lg font-bold text-white">
                {t.tutorCardTitle}
              </h4>
              <p className="text-xs text-blue-200/90 leading-relaxed">
                {t.tutorCardDesc}
              </p>
              <ul className="space-y-1.5 text-xs text-blue-100/80 pt-1">
                <li className="leading-snug">• {t.tutorBullet1}</li>
                <li className="leading-snug">• {t.tutorBullet2}</li>
              </ul>
            </div>

            <button
              onClick={onOpenTutorRegistration}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs uppercase tracking-wide"
            >
              {t.tutorStartBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-8 scroll-mt-28 transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Branding & Introductory Info with African Educators Image */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Inquiries &amp; Guidance
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.faqSectionHeading}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.faqSectionSubtitle}
            </p>

            {/* African Educators & Tutoring Team */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                alt="Ador Tutorial Center Academic Advisory & Coordination Team"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-xs font-bold">{t.faqTeamBanner}</p>
                <p className="text-[11px] text-slate-300">{t.faqTeamSubtitle}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <a
                href="http://t.me/ADORTUTORIALACADEMY"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors flex items-center gap-2 shadow-xs"
              >
                <TelegramIcon className="w-4 h-4 text-white" />
                <span>{t.faqTelegramBtn}</span>
              </a>
              <a
                href="https://wa.me/251912629431"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-2 shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </a>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {t.faqOrCall} <strong className="text-slate-900 dark:text-white">+251 912 629 431 / +251 961 173 718</strong>
              </span>
            </div>
          </div>

          {/* Right: Accordion Items */}
          <div className="lg:col-span-7 space-y-3">
            {OFFICIAL_FAQS.map(faq => {
              const isOpen = openFaqId === faq.id;
              const question = getFaqQ(faq);
              const answer = getFaqA(faq);

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen 
                      ? 'border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 shadow-xs' 
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                      {question}
                    </span>
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-400 px-2 select-none">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section id="testimonials" className="space-y-6 scroll-mt-28">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
            Parent Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.testimonialsHeading}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.testimonialsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localizedTestimonials.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GoldenStarGroup count={item.rating || 5} />
                  <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    {(item.rating || 5).toFixed(1)} / 5.0
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic pt-1">
                  "{getTestimonialText(item)}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-slate-700">
                  {(item.name || 'AD').slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FOOTER WITH OFFICIAL SOCIAL LINKS & NEWSLETTER */}
      <footer id="contact" className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 space-y-10 border border-slate-800 shadow-xl scroll-mt-28">
        
        {/* Newsletter Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-md">
            <h4 className="text-base sm:text-lg font-black text-white">
              {t.newsletterHeading}
            </h4>
            <p className="text-xs text-slate-300">
              {t.newsletterSubtitle}
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder={t.newsletterPlaceholder}
              className="w-full md:w-64 px-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shrink-0 shadow-xs"
            >
              {newsletterSubscribed ? t.newsletterSuccess : t.newsletterSubscribeBtn}
            </button>
          </form>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-400">
          
          {/* Column 1: Talk To Us */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm tracking-wide">
              {t.colTalkToUs}
            </h5>
            <ul className="space-y-2">
              <li><button onClick={onOpenParentRegistration} className="hover:text-white transition-colors">{t.parentStartBtn}</button></li>
              <li><button onClick={onOpenTutorRegistration} className="hover:text-white transition-colors">{t.tutorStartBtn}</button></li>
              <li><a href="#educational-levels" className="hover:text-white transition-colors">{t.educationalLevelsHeading}</a></li>
              <li><a href="http://t.me/ADORTUTORIALACADEMY" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{sec.contactTelegramChannel}</a></li>
              <li><button onClick={onOpenWpGuide} className="hover:text-white transition-colors">{t.wpGuideTitle}</button></li>
            </ul>
          </div>

          {/* Column 2: Information */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm tracking-wide">
              {t.colInformation}
            </h5>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.infoMembershipPlans}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.infoTutoringRates}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.infoTutorVetting}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.infoPrivacySecurity}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.infoTermsOfService}</span></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm tracking-wide">
              {t.colSupport}
            </h5>
            <ul className="space-y-2">
              <li><a href="#educational-levels" className="hover:text-white transition-colors">{t.faqSectionHeading}</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.supportDisputeResolution}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.supportCbeTelebirr}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.supportCodeOfConduct}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{sec.supportReleaseStatus}</span></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-sm tracking-wide">
              {t.colContactUs}
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="tel:+251912629431" className="hover:text-white transition-colors">
                  {sec.contactPhoneLabel}: +251 912 629 431
                </a>
              </li>
              <li>
                <a href="tel:+251961173718" className="hover:text-white transition-colors">
                  {sec.contactHotlineLabel}: +251 961 173 718
                </a>
              </li>
              <li>
                <a href="mailto:info@adortutorial.com" className="hover:text-white transition-colors">
                  {sec.contactEmailLabel}: info@adortutorial.com
                </a>
              </li>
              <li>{sec.contactOfficeLabel}: {sec.contactOfficeAddress}</li>
            </ul>
          </div>

        </div>

        {/* Brand Bottom Bar with Official Social Media Links */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <AdorLogo size="sm" variant="mark" />
            <div>
              <p className="font-bold text-white text-sm">Ador Tutorial Center</p>
              <p className="text-[11px] text-slate-400">{sec.footerTagline}</p>
            </div>
          </div>

          {/* Official Social Media Accounts */}
          <div className="flex flex-wrap items-center gap-2.5">
            {OFFICIAL_SOCIAL_LINKS.map(s => {
              const iconColor = 
                s.name === 'Telegram' ? 'text-sky-400' :
                s.name === 'Instagram' ? 'text-pink-400' :
                s.name === 'YouTube' ? 'text-red-500' :
                s.name === 'TikTok' ? 'text-cyan-400' :
                s.name === 'Facebook' ? 'text-blue-500' :
                s.name === 'WhatsApp' ? 'text-emerald-400' : 'text-slate-400';

              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                  title={`${s.name} (${s.handle})`}
                >
                  <span className={`${iconColor} transition-transform group-hover:scale-110`}>
                    <SocialMediaIcon name={s.name} className="w-3.5 h-3.5" />
                  </span>
                  <span>{s.name}</span>
                </a>
              );
            })}
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 pt-3 border-t border-slate-900/60">
          <div>
            {t.footerCopyright}
          </div>
          <div>
            <button
              onClick={() => onNavigateToPortal('admin')}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors py-1 px-2 rounded-md hover:bg-slate-800/60 text-[11px] font-medium"
              title="Secure Staff & Executive Administration Access"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{sec.signInTagAdmin}</span>
            </button>
          </div>
        </div>

      </footer>

      {/* Educational Level Detail Modal */}
      <EducationalLevelModal
        level={selectedLevelForModal}
        onClose={() => setSelectedLevelForModal(null)}
        onRequestTutor={(lvl) => {
          setSelectedLevelForModal(null);
          onOpenParentRegistration();
        }}
        t={t}
        language={language}
      />

    </div>
  );
};
