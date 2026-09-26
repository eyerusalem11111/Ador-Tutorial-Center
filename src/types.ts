export type UserRole = 'guest' | 'parent' | 'tutor' | 'admin';
export type ActiveView = 'website' | 'parent' | 'tutor' | 'admin';
export type SupportedLanguage = 
  | 'en' // English
  | 'am' // Amharic
  | 'om' // Afaan Oromoo
  | 'ti' // Tigrinya
  | 'so' // Somali
  | 'ar' // Arabic (العربية)
  | 'fr' // French (Français)
  | 'es' // Spanish (Español)
  | 'de' // German (Deutsch)
  | 'zh' // Chinese (中文)
  | 'sw'; // Swahili (Kiswahili)

export type AdminDesignation = 
  | 'super_admin' 
  | 'academic_coordinator' 
  | 'finance_officer' 
  | 'operations_manager' 
  | 'counselor';

export interface AdminPermissions {
  canVerifyPayments: boolean;
  canVerifyTutors: boolean;
  canPostJobs: boolean;
  canApproveReports: boolean;
  canManageApplications: boolean;
  canAssignRoles: boolean; // restricted strictly to super_admin
}

export interface SubAdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  designation: AdminDesignation;
  roleTitle: string;
  status: 'active' | 'suspended';
  addedAt: string;
  lastActive?: string;
  permissions: AdminPermissions;
}

export interface CurrentUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  adminDesignation?: AdminDesignation;
  permissions?: AdminPermissions;
}

// 19 Requests for Parent / Student Registration (from official Google Form)
export interface ParentRegistration19 {
  id: string;
  submittedAt: string;
  // Step 1: Student & Parent Profile (1-5)
  studentFullName: string;
  parentFullName: string;
  email: string;
  phoneNumber1: string;
  phoneNumber2: string;
  // Step 2: Location & Communication (6-11)
  telegramUsername: string;
  availableCommunicationTime: string[];
  communicationMethod: string[];
  city: string;
  subcity: string;
  specificArea: string;
  // Step 3: Academic Requirements & Schedule (12-18)
  studentGradeLevel: string[];
  studentCurrentSchool: string;
  requestedSubjects: string;
  tutorProgramSubscription: string[];
  tutorDaysPerWeek: string[];
  tutorPreferredTimeBlock: string[];
  hourlySubscriptionTier: string;
  // Step 4: Plan, Verification & Notes (19)
  yearlyPlanCommitment: string;
  additionalNotes?: string;
  transactionReference?: string;
  receiptScreenshotUrl?: string;
  status: 'pending' | 'verified' | 'contacted';
}

// 21 Requests for Tutor Registration (from official Google Form)
export interface TutorRegistration21 {
  id: string;
  submittedAt: string;
  // Step 1: Personal & Contact (1-8)
  profilePictureUrl: string;
  fullName: string;
  gender: 'Male' | 'Female';
  phoneNumber: string;
  mobileNumber: string;
  city: string;
  specificArea: string;
  email: string;
  telegramUsername: string;
  // Step 2: Religion & Qualifications (9-13)
  religion: 'Orthodox' | 'Muslim' | 'Protestant' | 'Other';
  qualificationTier: 'PhD' | 'MSc/MA' | 'BSc/BA/LLB' | 'Student(University)' | 'Certificate';
  fieldOfStudy: string;
  studentAcademicYear?: string;
  tutorTeachingPreferences: string[];
  // Step 3: Teaching Preferences & Experience (14-19)
  jobSitePreference: string[];
  expNationalCurriculum: 'Yes' | 'No';
  yearsOfExperience: string;
  expInternationalCurriculum: 'Yes' | 'No' | 'Maybe';
  internationalCurriculums: string[];
  leadershipExperience: 'Yes' | 'No' | 'Maybe';
  // Step 4: Locations, Documents & Agreement (20-21)
  preferredLocations: string[]; // >= 2 places
  nationalIdUrl: string;
  universityStudentIdUrl?: string;
  cvResumeUrl: string;
  coverLetterText?: string;
  agreedTerms: boolean;
  commissionModel?: '70_percent_single' | '25_percent_monthly' | '60_percent_first_month' | '23_percent_monthly';
  status: 'pending_review' | 'approved' | 'rejected';
}

export interface EducationalLevelItem {
  id: string;
  title: string;
  grades: string;
  description: string;
  image: string;
  rating: number;
  highlight: string;
  subjects: string[];
  badge: string;
}

export interface PaymentRecord {
  id: string;
  parentId: string;
  parentName: string;
  parentEmail: string;
  studentName: string;
  month: string;
  method: 'Telebirr' | 'Commercial Bank of Ethiopia (CBE)' | 'Awash Bank' | 'Other Bank';
  reference: string;
  amount: number;
  screenshotUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  adminNotes?: string;
}

export interface TutorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  specialties: string[];
  education: string;
  membershipStatus: 'unpaid' | 'pending_verification' | 'verified';
  membershipMethod?: string;
  membershipReference?: string;
  membershipReceiptUrl?: string;
  membershipDate?: string;
  rating?: number;
  studentsCount?: number;
  totalHours?: number;
  hourlyRate?: number;
  bio?: string;
  verifiedBadges?: string[];
  subjects?: string[];
}

export interface TutoringJob {
  id: string;
  title: string;
  grade: string;
  subject: string;
  location: string;
  rate: string;
  monthlyEstimate: number; // in ETB
  schedule: string;
  description: string;
  status: 'open' | 'assigned' | 'closed';
  postedDate: string;
  requirements?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  tutorId: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  coverNote: string;
  status: 'pending' | 'approved' | 'declined';
  commissionChoice?: '60_percent_first_month' | '23_percent_monthly';
  commissionStatus: 'unpaid' | 'pending_verification' | 'approved' | 'rejected';
  commissionMethod?: string;
  commissionReference?: string;
  commissionReceiptUrl?: string;
  appliedDate: string;
}

export interface MonthlyReport {
  id: string;
  tutorId: string;
  tutorName: string;
  studentName: string;
  parentEmail: string;
  month: string;
  totalHours: number;
  overallScore: 'Excellent (Straight A / 90%+)' | 'Very Good (B+ to A / 80-89%)' | 'Good - Steady Improvement (70-79%)' | 'Needs More Attention / Practice (<70%)';
  strengths: string;
  improvements: string;
  status: 'pending_admin' | 'approved_for_parent';
  parentDecision: 'pending' | 'accepted' | 'declined';
  parentFeedback?: string;
  submittedDate: string;
  adminApprovedDate?: string;
  parentRespondedDate?: string;
}

export interface TutorMonthlyPayout {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone?: string;
  studentName: string;
  month: string;
  teachingHours: number;
  amount: number;
  method: 'Telebirr' | 'Commercial Bank of Ethiopia (CBE)' | 'Awash Bank' | 'Other Bank';
  reference: string;
  receiptScreenshotUrl: string;
  disbursedDate: string;
  notes?: string;
  status: 'sent' | 'received';
}
