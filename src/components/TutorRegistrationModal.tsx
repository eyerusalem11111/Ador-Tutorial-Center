import React, { useState } from 'react';
import { TutorRegistration21, SupportedLanguage } from '../types';
import { TranslationDictionary } from '../data/translations';
import { getRegistrationTranslations } from '../data/registrationTranslations';
import { AdorLogo } from './AdorLogo';
import { 
  X, 
  CheckCircle2, 
  ArrowLeft, 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Upload, 
  ShieldCheck, 
  AlertCircle,
  Send,
  Sparkles
} from 'lucide-react';

interface TutorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TutorRegistration21) => void;
  t: TranslationDictionary;
  language?: SupportedLanguage;
}

export const TutorRegistrationModal: React.FC<TutorRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  t,
  language = 'en',
}) => {
  const reg = getRegistrationTranslations(language);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State for 21 Requests
  const [formData, setFormData] = useState<Partial<TutorRegistration21>>({
    profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    fullName: '',
    gender: 'Male',
    phoneNumber: '',
    mobileNumber: '',
    city: 'Addis Ababa',
    specificArea: '',
    email: '',
    telegramUsername: '',
    religion: 'Orthodox',
    qualificationTier: 'BSc/BA/LLB',
    fieldOfStudy: '',
    studentAcademicYear: '',
    tutorTeachingPreferences: ['Grade 5-Grade 8', 'Grade 9-Grade 10', 'Exam Preparation'],
    jobSitePreference: ['In Person/On site'],
    expNationalCurriculum: 'Yes',
    yearsOfExperience: '1-3 Years',
    expInternationalCurriculum: 'Maybe',
    internationalCurriculums: ['Cambridge Curriculum'],
    leadershipExperience: 'Yes',
    preferredLocations: ['Bole', 'CMC / Ayat'],
    nationalIdUrl: 'attached_national_id.pdf',
    universityStudentIdUrl: '',
    cvResumeUrl: 'attached_cv_resume.pdf',
    coverLetterText: '',
    agreedTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!formData.fullName?.trim() || !formData.phoneNumber?.trim() || !formData.email?.trim()) {
        setErrorMsg('Please enter your Full Name, Phone Number, and Email Address.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.fieldOfStudy?.trim()) {
        setErrorMsg('Please enter your Field of Study / Degree Department.');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.preferredLocations || formData.preferredLocations.length < 2) {
        setErrorMsg('Please select at least 2 preferred tutoring areas in Addis Ababa.');
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
    if (!formData.agreedTerms) {
      setErrorMsg('You must agree to the Terms & Conditions and Commission policy to proceed.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const submission: TutorRegistration21 = {
        id: `reg-tutor-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        profilePictureUrl: formData.profilePictureUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        fullName: formData.fullName || 'Tutor',
        gender: formData.gender || 'Male',
        phoneNumber: formData.phoneNumber || '',
        mobileNumber: formData.mobileNumber || '',
        city: formData.city || 'Addis Ababa',
        specificArea: formData.specificArea || '',
        email: formData.email || '',
        telegramUsername: formData.telegramUsername || '',
        religion: formData.religion || 'Orthodox',
        qualificationTier: formData.qualificationTier || 'BSc/BA/LLB',
        fieldOfStudy: formData.fieldOfStudy || 'Education',
        studentAcademicYear: formData.studentAcademicYear || '',
        tutorTeachingPreferences: formData.tutorTeachingPreferences || ['Grade 5-Grade 8'],
        jobSitePreference: formData.jobSitePreference || ['In Person/On site'],
        expNationalCurriculum: formData.expNationalCurriculum || 'Yes',
        yearsOfExperience: formData.yearsOfExperience || '1-3 Years',
        expInternationalCurriculum: formData.expInternationalCurriculum || 'No',
        internationalCurriculums: formData.internationalCurriculums || [],
        leadershipExperience: formData.leadershipExperience || 'Yes',
        preferredLocations: formData.preferredLocations || ['Bole', 'Yeka'],
        nationalIdUrl: formData.nationalIdUrl || 'id_verified.pdf',
        universityStudentIdUrl: formData.universityStudentIdUrl || '',
        cvResumeUrl: formData.cvResumeUrl || 'cv_tutor.pdf',
        coverLetterText: formData.coverLetterText || '',
        agreedTerms: true,
        status: 'pending_review',
      };

      onSubmit(submission);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const toggleArrayItem = (field: keyof TutorRegistration21, item: string) => {
    setFormData(prev => {
      const current = (prev[field] as string[]) || [];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const areasInAddis = [
    'Bole / Edna Mall', 'CMC / Michael', 'Ayat / Tafo', 'Sarbet / Old Airport', 
    'Summit / Figa', 'Gerji / Imperial', 'Piassa / Arada', 'Kazanchis / Kirkos', 
    'Lebu / Jemo', 'Gullele / Shiromeda', 'Megenagna / Yeka', 'Kotebe / Kara'
  ];

  const teachingPreferencesList = [
    'Kindergarten-Grade 4', 'Grade 5-Grade 8', 'Grade 9-Grade 10', 'Grade 11-Grade 12', 
    'Health Science', 'Technology Science', 'Art&Business Related', 'Language Skill', 
    'Exam Preparation', 'Special Need'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header - Brand Blue and White */}
        <div className="bg-gradient-to-r from-[#014aac] via-blue-700 to-blue-900 text-white p-5 sm:p-6 relative">
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
                {reg.tutorModalBadge}
              </span>
              <span className="text-xs text-white/90 font-medium">
                {reg.stepLabel} {currentStep} {reg.ofLabel} {totalSteps}
              </span>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {reg.tutorModalTitle}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
            {reg.tutorModalSubtitle}
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
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {reg.tutorSuccessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {reg.tutorSuccessDesc}
              </p>
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1.5">
                <p><strong>Qualification:</strong> {formData.qualificationTier} in {formData.fieldOfStudy}</p>
                <p><strong>Preferred Grades:</strong> {formData.tutorTeachingPreferences?.slice(0, 3).join(', ')}</p>
                <p><strong>Placement Commission:</strong> Selected post-application upon admin approval (60% First Month or 23% Monthly)</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="http://t.me/ADORTUTORIALACADEMY"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join Official Telegram Channel @ADORTUTORIALACADEMY</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
                >
                  {reg.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Personal & Contact (Requests 1-8) */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span>{reg.tutorStep1Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.tutorStep1Desc}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.tutorFullNameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName || ''}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={reg.tutorFullNamePlaceholder || 'e.g. Abebe Kebede Wolde'}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.tutorGenderLabel} <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-4 p-2 rounded-xl border border-slate-200 bg-slate-50/50">
                        {['Male', 'Female'].map(g => (
                          <label key={g} className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="radio"
                              name="tutorGender"
                              checked={formData.gender === g}
                              onChange={() => setFormData({ ...formData, gender: g as any })}
                              className="text-blue-600"
                            />
                            <span className="text-slate-700 font-medium">{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        3. Religion
                      </label>
                      <select
                        value={formData.religion || 'Orthodox'}
                        onChange={e => setFormData({ ...formData, religion: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      >
                        {['Orthodox', 'Muslim', 'Protestant', 'Other'].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.tutorPhoneLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber || ''}
                        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder={reg.tutorPhone1Placeholder || '0911XXXXXX'}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        5. Secondary Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={formData.mobileNumber || ''}
                        onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })}
                        placeholder={reg.tutorPhone2Placeholder || '0922XXXXXX'}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.tutorEmailLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email || ''}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder={reg.tutorEmailPlaceholder || 'abebe.kebede@gmail.com'}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        7. Telegram Username
                      </label>
                      <input
                        type="text"
                        value={formData.telegramUsername || ''}
                        onChange={e => setFormData({ ...formData, telegramUsername: e.target.value })}
                        placeholder={reg.tutorTelegramPlaceholder || '@tutor_telegram'}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {reg.tutorAreaLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.specificArea || ''}
                      onChange={e => setFormData({ ...formData, specificArea: e.target.value })}
                      placeholder={reg.tutorAreaPlaceholder}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Qualifications & Academic Dept (Requests 9-13) */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>{reg.tutorStep2Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.tutorStep2Desc}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.tutorQualificationLabel} <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {['PhD', 'MSc/MA', 'BSc/BA/LLB', 'Student(University)', 'Certificate'].map(tier => (
                        <label key={tier} className={`p-2.5 rounded-xl border text-center cursor-pointer transition-colors ${
                          formData.qualificationTier === tier
                            ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}>
                          <input
                            type="radio"
                            name="tutorQual"
                            className="sr-only"
                            checked={formData.qualificationTier === tier}
                            onChange={() => setFormData({ ...formData, qualificationTier: tier as any })}
                          />
                          <span>{tier}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {reg.tutorFieldLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fieldOfStudy || ''}
                        onChange={e => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                        placeholder={reg.tutorFieldPlaceholder}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        11. Academic Year (For Students Only)
                      </label>
                      <input
                        type="text"
                        value={formData.studentAcademicYear || ''}
                        onChange={e => setFormData({ ...formData, studentAcademicYear: e.target.value })}
                        placeholder="e.g. 3rd Year, 4th Year, Graduate"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      12. Tutors Teaching Preference (Select All That Apply)
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50/50">
                      {teachingPreferencesList.map(pref => (
                        <label key={pref} className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            checked={formData.tutorTeachingPreferences?.includes(pref) || false}
                            onChange={() => toggleArrayItem('tutorTeachingPreferences', pref)}
                            className="rounded text-blue-600"
                          />
                          <span className="text-slate-700 truncate">{pref}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      13. Job Site Preference
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['In Person/On site', 'Remote/Online', 'Hybrid'].map(site => (
                        <label key={site} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.jobSitePreference?.includes(site) || false}
                            onChange={() => toggleArrayItem('jobSitePreference', site)}
                            className="rounded text-blue-600"
                          />
                          <span className="text-slate-700">{site}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Experience & Locations (Requests 14-19) */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>{reg.tutorStep3Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.tutorStep3Desc}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        14. National Curriculum Experience?
                      </label>
                      <div className="flex gap-4 p-2 rounded-xl border border-slate-200">
                        {['Yes', 'No'].map(ans => (
                          <label key={ans} className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="radio"
                              name="natExp"
                              checked={formData.expNationalCurriculum === ans}
                              onChange={() => setFormData({ ...formData, expNationalCurriculum: ans as any })}
                              className="text-blue-600"
                            />
                            <span className="text-slate-700">{ans}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        15. Years of Tutoring Experience
                      </label>
                      <select
                        value={formData.yearsOfExperience || '1-3 Years'}
                        onChange={e => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                      >
                        {['Less than 1 year', '1-3 Years', '3-5 Years', '5+ Years'].map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        16. International Curriculum Experience?
                      </label>
                      <div className="flex gap-3 p-2 rounded-xl border border-slate-200 text-xs">
                        {['Yes', 'No', 'Maybe'].map(ans => (
                          <label key={ans} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="intlExp"
                              checked={formData.expInternationalCurriculum === ans}
                              onChange={() => setFormData({ ...formData, expInternationalCurriculum: ans as any })}
                              className="text-blue-600"
                            />
                            <span className="text-slate-700">{ans}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        17. Leadership / Mentorship Experience?
                      </label>
                      <div className="flex gap-3 p-2 rounded-xl border border-slate-200 text-xs">
                        {['Yes', 'No', 'Maybe'].map(ans => (
                          <label key={ans} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="leadExp"
                              checked={formData.leadershipExperience === ans}
                              onChange={() => setFormData({ ...formData, leadershipExperience: ans as any })}
                              className="text-blue-600"
                            />
                            <span className="text-slate-700">{ans}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {reg.tutorLocationsLabel} <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-2 border border-slate-200 rounded-xl bg-slate-50/50 text-xs">
                      {areasInAddis.map(loc => (
                        <label key={loc} className={`flex items-center gap-2 p-1.5 rounded-lg border cursor-pointer ${
                          formData.preferredLocations?.includes(loc)
                            ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={formData.preferredLocations?.includes(loc) || false}
                            onChange={() => toggleArrayItem('preferredLocations', loc)}
                            className="rounded text-blue-600"
                          />
                          <span className="truncate">{loc}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Selected: {formData.preferredLocations?.length || 0} areas (minimum 2 required)</p>
                  </div>
                </div>
              )}

              {/* STEP 4: Documents, Terms & Commission Choice (Requests 20-21) */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>{reg.tutorStep4Title}</span>
                    </h4>
                    <p className="text-xs text-slate-500">{reg.tutorStep4Desc}</p>
                  </div>

                  {/* Document Attachments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{reg.tutorIdDocLabel}</p>
                        <p className="text-[11px] text-slate-500">Government issued identity</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                        ✓ Attached
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{reg.tutorDegreeDocLabel}</p>
                        <p className="text-[11px] text-slate-500">Academic &amp; teaching history</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                        ✓ Attached
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      20c. Cover Letter / Personal Statement
                    </label>
                    <textarea
                      rows={2}
                      value={formData.coverLetterText || ''}
                      onChange={e => setFormData({ ...formData, coverLetterText: e.target.value })}
                      placeholder="Briefly state your teaching philosophy, motivation, and why you want to tutor with Ador..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreedTerms || false}
                        onChange={e => setFormData({ ...formData, agreedTerms: e.target.checked })}
                        className="mt-0.5 rounded text-blue-600"
                      />
                      <span className="text-xs text-slate-700 leading-tight">
                        <strong>21b. Terms &amp; Conditions:</strong> I certify that all educational credentials, ID details, and teaching records provided are genuine and accurate. I agree to uphold professional conduct with Ethiopian parents and students.
                      </span>
                    </label>
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
                    disabled={isSubmitting || !formData.agreedTerms}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md disabled:opacity-50"
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
