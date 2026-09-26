import React, { useState } from 'react';
import { ParentRegistration19, SupportedLanguage } from '../types';
import { TranslationDictionary } from '../data/translations';
import { getRegistrationTranslations } from '../data/registrationTranslations';
import { AdorLogo } from './AdorLogo';
import { 
  X, 
  CheckCircle2, 
  ArrowLeft, 
  User, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Calendar, 
  BookOpen, 
  Upload, 
  Sparkles,
  Phone,
  Mail,
  Send,
  AlertCircle
} from 'lucide-react';

interface ParentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ParentRegistration19) => void;
  t: TranslationDictionary;
  language?: SupportedLanguage;
}

export const ParentRegistrationModal: React.FC<ParentRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  t,
  language = 'en',
}) => {
  const reg = getRegistrationTranslations(language);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State for 19 Requests
  const [formData, setFormData] = useState<Partial<ParentRegistration19>>({
    studentFullName: '',
    parentFullName: '',
    email: '',
    phoneNumber1: '',
    phoneNumber2: '',
    telegramUsername: '',
    availableCommunicationTime: ['Morning 2:00-6:00Local Time'],
    communicationMethod: ['Voice Mail(Direct Calling)'],
    city: 'Addis Ababa',
    subcity: 'Bole',
    specificArea: '',
    studentGradeLevel: ['Grade 8'],
    studentCurrentSchool: '',
    requestedSubjects: 'Mathematics, General Science, English',
    tutorProgramSubscription: ['National School', 'Exam Preparation'],
    tutorDaysPerWeek: ['Monday', 'Wednesday', 'Friday'],
    tutorPreferredTimeBlock: ['Afternoon'],
    hourlySubscriptionTier: '2 hour per day',
    yearlyPlanCommitment: '1-6 Months',
    additionalNotes: '',
    transactionReference: '',
    receiptScreenshotUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!formData.studentFullName?.trim() || !formData.parentFullName?.trim() || !formData.phoneNumber1?.trim()) {
        setErrorMsg('Please fill in student name, parent name, and primary phone number.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.subcity || !formData.specificArea?.trim()) {
        setErrorMsg('Please enter your specific residential area (e.g. CMC, Ayat, Sarbet).');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.studentCurrentSchool?.trim() || !formData.requestedSubjects?.trim()) {
        setErrorMsg('Please enter current school name and requested subjects.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const submission: ParentRegistration19 = {
        id: `reg-parent-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        studentFullName: formData.studentFullName || 'Student',
        parentFullName: formData.parentFullName || 'Parent',
        email: formData.email || '',
        phoneNumber1: formData.phoneNumber1 || '',
        phoneNumber2: formData.phoneNumber2 || '',
        telegramUsername: formData.telegramUsername || '',
        availableCommunicationTime: formData.availableCommunicationTime || ['Morning'],
        communicationMethod: formData.communicationMethod || ['Direct Calling'],
        city: formData.city || 'Addis Ababa',
        subcity: formData.subcity || 'Bole',
        specificArea: formData.specificArea || 'CMC',
        studentGradeLevel: formData.studentGradeLevel || ['Grade 8'],
        studentCurrentSchool: formData.studentCurrentSchool || 'Local School',
        requestedSubjects: formData.requestedSubjects || 'General Subjects',
        tutorProgramSubscription: formData.tutorProgramSubscription || ['National School'],
        tutorDaysPerWeek: formData.tutorDaysPerWeek || ['Monday', 'Wednesday', 'Friday'],
        tutorPreferredTimeBlock: formData.tutorPreferredTimeBlock || ['Afternoon'],
        hourlySubscriptionTier: formData.hourlySubscriptionTier || '2 hour per day',
        yearlyPlanCommitment: formData.yearlyPlanCommitment || '1-6 Months',
        additionalNotes: formData.additionalNotes || '',
        transactionReference: formData.transactionReference || '',
        receiptScreenshotUrl: formData.receiptScreenshotUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
        status: 'pending',
      };

      onSubmit(submission);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleSimulateReceiptUpload = () => {
    setFormData(prev => ({
      ...prev,
      receiptScreenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      transactionReference: prev.transactionReference || `FT${Date.now().toString().slice(-8)}`,
    }));
  };

  const toggleArrayItem = (field: keyof ParentRegistration19, item: string) => {
    setFormData(prev => {
      const current = (prev[field] as string[]) || [];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const subcities = [
    'Bole', 'Yeka', 'Kirkos', 'Arada', 'Gulele', 
    'Lideta', 'Kolfe Keranio', 'Nifas Silk Lafto', 'Akaki Kality', 'Lemi Kura'
  ];

  const gradeLevels = [
    'KG', 'KG2', 'KG3', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 
    'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 
    'Grade 11', 'Grade 12', 'University/College Student'
  ];

  const programs = [
    'National School', 'International School', 'Special Need', 
    'Training', 'Language Skill', 'Computer Skill', 'Art&Craft', 'Exam Preparation'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const hourlyTiers = [
    '1 hour per day', '1:30 hour per day', '2 hour per day', '3 hour per day', '3+ hour per day'
  ];

  const planCommitments = ['1-3 Months', '1-6 Months', '1 year'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header - Brand Blue and White */}
        <div className="bg-gradient-to-r from-[#014aac] via-blue-700 to-blue-900 text-white p-5 sm:p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <AdorLogo variant="badge" />
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/40">
                {reg.parentModalBadge}
              </span>
              <span className="text-xs text-white/90 font-medium">
                {reg.stepLabel} {currentStep} {reg.ofLabel} {totalSteps}
              </span>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {reg.parentModalTitle}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
            {reg.parentModalSubtitle}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-blue-950/60 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {reg.parentSuccessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {reg.parentSuccessDesc}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1.5">
                <p><strong>Primary Phone:</strong> {formData.phoneNumber1}</p>
                <p><strong>Grade Level:</strong> {formData.studentGradeLevel?.join(', ')}</p>
                <p><strong>Subjects:</strong> {formData.requestedSubjects}</p>
                <p><strong>Telegram:</strong> {formData.telegramUsername || 'Provided via Phone'}</p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="http://t.me/ADORTUTORIALACADEMY"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contact on Telegram @ADORTUTORIALACADEMY</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  {reg.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Student & Parent Profile (Requests 1-5) */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>{reg.parentStep1Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.parentStep1Desc}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentStudentNameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentFullName || ''}
                      onChange={e => setFormData({ ...formData, studentFullName: e.target.value })}
                      placeholder={reg.parentStudentNamePlaceholder}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentGuardianNameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentFullName || ''}
                      onChange={e => setFormData({ ...formData, parentFullName: e.target.value })}
                      placeholder={reg.parentGuardianNamePlaceholder}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentEmailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder={reg.parentEmailPlaceholder || 'e.g. parent.name@gmail.com'}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.parentPhone1Label} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber1 || ''}
                        onChange={e => setFormData({ ...formData, phoneNumber1: e.target.value })}
                        placeholder={reg.parentPhone1Placeholder || '0911XXXXXX'}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.parentPhone2Label}
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber2 || ''}
                        onChange={e => setFormData({ ...formData, phoneNumber2: e.target.value })}
                        placeholder={reg.parentPhone2Placeholder || '0922XXXXXX'}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Location & Communication Timing (Requests 6-11) */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{reg.parentStep2Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.parentStep2Desc}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentTelegramLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.telegramUsername || ''}
                      onChange={e => setFormData({ ...formData, telegramUsername: e.target.value })}
                      placeholder={reg.parentTelegramPlaceholder || '@yourusername'}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.parentCommTimeLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        'Morning 2:00-6:00Local Time',
                        'Noon 6:00-8:00Local Time',
                        'Afternoon 8:00-11:00Local Time',
                        'Evening 11:30-1:00Local Time',
                        'Night 1:00-2:30Local Time',
                        'Only Working hours',
                      ].map(opt => (
                        <label key={opt} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.availableCommunicationTime?.includes(opt) || false}
                            onChange={() => toggleArrayItem('availableCommunicationTime', opt)}
                            className="rounded text-blue-600"
                          />
                          <span className="text-slate-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.parentCommMethodLabel}
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {[
                        'Voice Mail(Direct Calling)',
                        'Online(Text Or Voice)Telegram, WhatsApp, Email',
                        'SMS(Text)',
                      ].map(m => (
                        <label key={m} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.communicationMethod?.includes(m) || false}
                            onChange={() => toggleArrayItem('communicationMethod', m)}
                            className="rounded text-blue-600"
                          />
                          <span className="text-slate-700">{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.parentCityLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.city || 'Addis Ababa'}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.parentSubcityLabel} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.subcity || 'Bole'}
                        onChange={e => setFormData({ ...formData, subcity: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      >
                        {subcities.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.parentAreaLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.specificArea || ''}
                        onChange={e => setFormData({ ...formData, specificArea: e.target.value })}
                        placeholder={reg.parentAreaPlaceholder}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Academic Requirements & Schedule (Requests 12-18) */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>{reg.parentStep3Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.parentStep3Desc}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.parentGradeLabel} <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50/50">
                      {gradeLevels.map(lvl => (
                        <button
                          type="button"
                          key={lvl}
                          onClick={() => toggleArrayItem('studentGradeLevel', lvl)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            formData.studentGradeLevel?.includes(lvl)
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentSchoolLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentCurrentSchool || ''}
                      onChange={e => setFormData({ ...formData, studentCurrentSchool: e.target.value })}
                      placeholder={reg.parentSchoolPlaceholder}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentSubjectsLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.requestedSubjects || ''}
                      onChange={e => setFormData({ ...formData, requestedSubjects: e.target.value })}
                      placeholder={reg.parentSubjectsPlaceholder || 'e.g. Mathematics, Physics, Chemistry, English Grammar'}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.parentProgramsLabel}
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {programs.map(p => (
                        <label key={p} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.tutorProgramSubscription?.includes(p) || false}
                            onChange={() => toggleArrayItem('tutorProgramSubscription', p)}
                            className="rounded text-blue-600"
                          />
                          <span className="text-slate-700">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {reg.parentDaysLabel}
                      </label>
                      <div className="flex flex-wrap gap-1 text-xs">
                        {daysOfWeek.map(d => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => toggleArrayItem('tutorDaysPerWeek', d)}
                            className={`px-2 py-1 rounded text-[11px] font-semibold ${
                              formData.tutorDaysPerWeek?.includes(d)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {(d || '').slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {reg.parentTimeBlockLabel}
                      </label>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {['Morning', 'Afternoon', 'Evening', 'Other'].map(blk => (
                          <button
                            type="button"
                            key={blk}
                            onClick={() => toggleArrayItem('tutorPreferredTimeBlock', blk)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              formData.tutorPreferredTimeBlock?.includes(blk)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {blk}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.parentDailyDurationLabel}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {hourlyTiers.map(tier => (
                        <label key={tier} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                          <input
                            type="radio"
                            name="hourlyTier"
                            checked={formData.hourlySubscriptionTier === tier}
                            onChange={() => setFormData({ ...formData, hourlySubscriptionTier: tier })}
                            className="text-blue-600"
                          />
                          <span className="text-slate-700">{tier}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Subscription Term, Verification & Notes (Request 19) */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{reg.parentStep4Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.parentStep4Desc}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.parentPlanCommitmentLabel}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {planCommitments.map(plan => (
                        <label key={plan} className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          formData.yearlyPlanCommitment === plan
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}>
                          <input
                            type="radio"
                            name="yearlyPlan"
                            className="sr-only"
                            checked={formData.yearlyPlanCommitment === plan}
                            onChange={() => setFormData({ ...formData, yearlyPlanCommitment: plan })}
                          />
                          <span>{plan}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.parentNotesLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes || ''}
                      onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                      placeholder={reg.parentNotesPlaceholder}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Optional Tuition Payment / Holding Slip */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {reg.parentPaymentTitle}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        CBE / Telebirr
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {reg.parentRefLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.transactionReference || ''}
                          onChange={e => setFormData({ ...formData, transactionReference: e.target.value })}
                          placeholder={reg.parentRefPlaceholder}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {reg.parentUploadLabel}
                        </label>
                        <button
                          type="button"
                          onClick={handleSimulateReceiptUpload}
                          className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs flex items-center justify-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>{formData.receiptScreenshotUrl ? '✓ ' + reg.parentUploadLabel : reg.parentSimulateUploadBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{reg.backBtn}</span>
                  </button>
                ) : <div />}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs"
                  >
                    <span>{reg.nextStepBtn} ({currentStep + 1}/{totalSteps})</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{reg.submittingText}</span>
                    ) : (
                      <>
                        <span>{reg.submitRegistrationBtn}</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
