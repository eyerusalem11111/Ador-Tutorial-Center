import { PaymentRecord, TutorProfile, TutoringJob, JobApplication, MonthlyReport, SubAdminUser, TutorMonthlyPayout } from '../types';

// Helper to create clean, realistic digital receipt data URLs
export function createReceiptPlaceholder(type: 'telebirr' | 'cbe' | 'awash', txRef: string, amount: string, payer: string, month: string): string {
  const isTelebirr = type === 'telebirr';
  const bgColor = isTelebirr ? '#006cb7' : type === 'cbe' ? '#68257d' : '#005a9c';
  const brand = isTelebirr ? 'telebirr' : type === 'cbe' ? 'Commercial Bank of Ethiopia' : 'Awash Bank';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="780" viewBox="0 0 600 780">
    <defs>
      <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgColor}" />
        <stop offset="100%" stop-color="${bgColor}ee" />
      </linearGradient>
    </defs>
    <rect width="600" height="780" fill="#f8fafc" />
    <rect x="24" y="24" width="552" height="732" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="24" y="24" width="552" height="130" rx="16" fill="url(#headerGrad)" />
    <rect x="24" y="130" width="552" height="24" fill="url(#headerGrad)" />
    
    <!-- Header -->
    <text x="300" y="70" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">
      ${brand.toUpperCase()}
    </text>
    <text x="300" y="100" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" fill="#ffffff" opacity="0.85" text-anchor="middle">
      Official Transaction Receipt Confirmation
    </text>

    <!-- Amount Badge -->
    <rect x="180" y="180" width="240" height="64" rx="32" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
    <text x="300" y="220" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="800" fill="#15803d" text-anchor="middle">
      ${amount} ETB
    </text>
    <text x="300" y="265" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#16a34a" text-anchor="middle">
      ✔ Payment Successful
    </text>

    <!-- Line Divider -->
    <line x1="60" y1="290" x2="540" y2="290" stroke="#f1f5f9" stroke-width="2" stroke-dasharray="6,6" />

    <!-- Details Table -->
    <g transform="translate(60, 320)">
      <text x="0" y="20" font-family="sans-serif" font-size="13" fill="#64748b">Receiver Name:</text>
      <text x="480" y="20" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a" text-anchor="end">Ador Tutorial Center</text>

      <text x="0" y="60" font-family="sans-serif" font-size="13" fill="#64748b">Account / Telebirr:</text>
      <text x="480" y="60" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a" text-anchor="end">1000293849182 / 0911223344</text>

      <text x="0" y="100" font-family="sans-serif" font-size="13" fill="#64748b">Payer / Student:</text>
      <text x="480" y="100" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a" text-anchor="end">${payer}</text>

      <text x="0" y="140" font-family="sans-serif" font-size="13" fill="#64748b">Payment Purpose:</text>
      <text x="480" y="140" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a" text-anchor="end">${month}</text>

      <text x="0" y="180" font-family="sans-serif" font-size="13" fill="#64748b">Transaction Reference:</text>
      <text x="480" y="180" font-family="monospace" font-size="13" font-weight="700" fill="#1e293b" text-anchor="end">${txRef}</text>

      <text x="0" y="220" font-family="sans-serif" font-size="13" fill="#64748b">Date &amp; Time:</text>
      <text x="480" y="220" font-family="sans-serif" font-size="13" fill="#475569" text-anchor="end">2026-09-14 10:45 AM EAT</text>

      <text x="0" y="260" font-family="sans-serif" font-size="13" fill="#64748b">Status:</text>
      <text x="480" y="260" font-family="sans-serif" font-size="13" font-weight="700" fill="#16a34a" text-anchor="end">COMPLETED</text>
    </g>

    <!-- Footer Stamp -->
    <rect x="60" y="630" width="480" height="70" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
    <text x="300" y="660" font-family="sans-serif" font-size="12" font-weight="600" fill="#475569" text-anchor="middle">
      Verified through Ador Tutorial Center Automated Gateway
    </text>
    <text x="300" y="682" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">
      Addis Ababa, Ethiopia • Support: @AdorTutorCenter
    </text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function createPayoutReceiptPlaceholder(
  type: 'telebirr' | 'cbe' | 'awash',
  txRef: string,
  amount: string,
  tutorName: string,
  monthAndStudent: string
): string {
  const isTelebirr = type === 'telebirr';
  const bgColor = isTelebirr ? '#006cb7' : type === 'cbe' ? '#68257d' : '#005a9c';
  const brand = isTelebirr ? 'telebirr' : type === 'cbe' ? 'Commercial Bank of Ethiopia' : 'Awash Bank';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="780" viewBox="0 0 600 780">
    <defs>
      <linearGradient id="payoutGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgColor}" />
        <stop offset="100%" stop-color="${bgColor}dd" />
      </linearGradient>
    </defs>
    <rect width="600" height="780" fill="#f8fafc" />
    <rect x="24" y="24" width="552" height="732" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="24" y="24" width="552" height="130" rx="16" fill="url(#payoutGrad)" />
    
    <text x="300" y="70" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">
      ${brand.toUpperCase()} PAYOUT REMITTANCE
    </text>
    <text x="300" y="100" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" fill="#ffffff" opacity="0.9" text-anchor="middle">
      Ador Tutorial Center Administration &bull; Official Tutor Remittance
    </text>

    <!-- Amount Badge -->
    <rect x="160" y="180" width="280" height="64" rx="32" fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
    <text x="300" y="220" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="800" fill="#047857" text-anchor="middle">
      ${amount} ETB
    </text>
    <text x="300" y="265" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" fill="#059669" text-anchor="middle">
      ✔ Disbursed to Tutor Account
    </text>

    <!-- Line Divider -->
    <line x1="60" y1="290" x2="540" y2="290" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6,6" />

    <!-- Details Table -->
    <g transform="translate(60, 320)">
      <text x="0" y="20" font-family="sans-serif" font-size="13" fill="#64748b">Sender Organization:</text>
      <text x="480" y="20" font-family="sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">Ador Tutorial Center Admin</text>

      <text x="0" y="60" font-family="sans-serif" font-size="13" fill="#64748b">Recipient Tutor:</text>
      <text x="480" y="60" font-family="sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">${tutorName}</text>

      <text x="0" y="100" font-family="sans-serif" font-size="13" fill="#64748b">Tutoring Period / Student:</text>
      <text x="480" y="100" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a" text-anchor="end">${monthAndStudent}</text>

      <text x="0" y="140" font-family="sans-serif" font-size="13" fill="#64748b">Disbursed Channel:</text>
      <text x="480" y="140" font-family="sans-serif" font-size="13" font-weight="600" fill="#0f172a" text-anchor="end">${brand}</text>

      <text x="0" y="180" font-family="sans-serif" font-size="13" fill="#64748b">Transaction Reference:</text>
      <text x="480" y="180" font-family="monospace" font-size="13" font-weight="700" fill="#1e293b" text-anchor="end">${txRef}</text>

      <text x="0" y="220" font-family="sans-serif" font-size="13" fill="#64748b">Date &amp; Timestamp:</text>
      <text x="480" y="220" font-family="sans-serif" font-size="13" fill="#475569" text-anchor="end">2026-09-18 04:30 PM EAT</text>

      <text x="0" y="260" font-family="sans-serif" font-size="13" fill="#64748b">Status:</text>
      <text x="480" y="260" font-family="sans-serif" font-size="13" font-weight="700" fill="#059669" text-anchor="end">CONFIRMED &amp; DISBURSED</text>
    </g>

    <!-- Footer Stamp -->
    <rect x="60" y="630" width="480" height="70" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="300" y="660" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">
      Official Ador Tutorial Finance Disbursal Voucher
    </text>
    <text x="300" y="682" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="middle">
      Addis Ababa, Ethiopia &bull; Finance Hotline: +251 911 22 33 44
    </text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-001',
    parentId: 'parent-1',
    parentName: 'Almaz Mengistu',
    parentEmail: 'almaz.m@gmail.com',
    studentName: 'Samuel Kassahun',
    month: 'First Month (Meskerem / Month 1)',
    method: 'Telebirr',
    reference: 'TB839201948',
    amount: 4500,
    screenshotUrl: createReceiptPlaceholder('telebirr', 'TB839201948', '4,500.00', 'Samuel Kassahun (Almaz)', 'Meskerem 1st Month'),
    status: 'approved',
    date: '2026-09-02',
    adminNotes: 'Verified with Telebirr statement by Admin.',
  },
  {
    id: 'pay-002',
    parentId: 'parent-1',
    parentName: 'Almaz Mengistu',
    parentEmail: 'almaz.m@gmail.com',
    studentName: 'Liya Daniel',
    month: 'Registration Fee',
    method: 'Commercial Bank of Ethiopia (CBE)',
    reference: 'CBE984210382',
    amount: 1500,
    screenshotUrl: createReceiptPlaceholder('cbe', 'CBE984210382', '1,500.00', 'Liya Daniel (Almaz)', 'Registration Fee'),
    status: 'approved',
    date: '2026-09-05',
    adminNotes: 'Confirmed in CBE Business Branch.',
  },
  {
    id: 'pay-003',
    parentId: 'parent-1',
    parentName: 'Almaz Mengistu',
    parentEmail: 'almaz.m@gmail.com',
    studentName: 'Samuel Kassahun',
    month: 'Second Month (Tikimt / Month 2)',
    method: 'Telebirr',
    reference: 'TB991204857',
    amount: 4500,
    screenshotUrl: createReceiptPlaceholder('telebirr', 'TB991204857', '4,500.00', 'Samuel Kassahun', 'Tikimt 2nd Month'),
    status: 'pending',
    date: '2026-09-15',
  },
  {
    id: 'pay-004',
    parentId: 'parent-2',
    parentName: 'Dawit Yohannes',
    parentEmail: 'dawit.y@gmail.com',
    studentName: 'Yafet Dawit',
    month: 'First Month (Meskerem / Month 1)',
    method: 'Commercial Bank of Ethiopia (CBE)',
    reference: 'CBE449019283',
    amount: 5200,
    screenshotUrl: createReceiptPlaceholder('cbe', 'CBE449019283', '5,200.00', 'Yafet Dawit', 'Meskerem 1st Month'),
    status: 'pending',
    date: '2026-09-15',
  }
];

export const INITIAL_TUTORS: TutorProfile[] = [
  {
    id: 'tutor-1',
    name: 'Kassahun Bekele',
    email: 'kassahun.b@gmail.com',
    phone: '+251 912 345 678',
    avatarUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=250&q=80',
    specialties: ['Mathematics (Grades 9-12)', 'Physics', 'SAT Math Preparation'],
    education: 'B.Sc. Civil Engineering (AAU) • 5+ Years High School Tutoring',
    membershipStatus: 'pending_verification',
    membershipMethod: 'Telebirr',
    membershipReference: 'TB-MEMB-500-11',
    membershipReceiptUrl: createReceiptPlaceholder('telebirr', 'TB-MEMB-500-11', '500.00', 'Kassahun Bekele', 'Tutor 500 ETB Membership'),
    membershipDate: '2026-09-14',
  },
  {
    id: 'tutor-2',
    name: 'Bethlehem Tadesse',
    email: 'bethlehem.t@gmail.com',
    phone: '+251 922 456 789',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    specialties: ['Chemistry', 'Biology', 'English for Cambridge IGCSE'],
    education: 'M.Sc. Biomedical Science (Addis Ababa University)',
    membershipStatus: 'verified',
    membershipMethod: 'Commercial Bank of Ethiopia (CBE)',
    membershipReference: 'CBE-MB-8201',
    membershipReceiptUrl: createReceiptPlaceholder('cbe', 'CBE-MB-8201', '500.00', 'Bethlehem Tadesse', 'Tutor 500 ETB Membership'),
    membershipDate: '2026-09-08',
  }
];

export const INITIAL_JOBS: TutoringJob[] = [
  {
    id: 'job-101',
    title: 'Grade 12 Physics & Chemistry National Exam Preparation',
    grade: 'Grade 12 (Natural Science)',
    subject: 'Physics & Chemistry',
    location: 'Bole Atlas, Addis Ababa (In-Person)',
    rate: '500 ETB / hour (3 days/week, 2 hrs/day)',
    monthlyEstimate: 12000,
    schedule: 'Mon, Wed, Fri • 4:30 PM - 6:30 PM',
    description: 'Looking for an experienced natural science instructor to coach a motivated student preparing for the Ethiopian National University Entrance Examination.',
    status: 'assigned',
    postedDate: '2026-09-10',
    requirements: 'Demonstrated experience with Grade 12 Ethiopian Curriculum.',
  },
  {
    id: 'job-102',
    title: 'Grade 8 Ministry Exam Math & General Science Tutor',
    grade: 'Grade 8 (Regional Ministry Exam)',
    subject: 'Mathematics, General Science & English',
    location: 'CMC Michael, Addis Ababa (In-Person)',
    rate: '450 ETB / hour (16 hours/month)',
    monthlyEstimate: 7200,
    schedule: 'Saturday & Sunday mornings',
    description: 'Help an 8th-grade student solidify math foundations, problem-solving skills, and preparation for upcoming city-wide assessment exams.',
    status: 'open',
    postedDate: '2026-09-12',
    requirements: 'Patient tutor with previous middle-school tutoring references.',
  },
  {
    id: 'job-103',
    title: 'Cambridge IGCSE Extended Mathematics & Physics',
    grade: 'IGCSE (International Curriculum)',
    subject: 'Pure Math 0580 & Physics 0625',
    location: 'Sarbet / Old Airport (In-Person or Hybrid)',
    rate: '650 ETB / hour (20 hours/month)',
    monthlyEstimate: 13000,
    schedule: 'Tuesday, Thursday, Saturday',
    description: 'Family seeking an instructor fluent in English with direct familiarity with British Cambridge International Curriculum past-paper marking schemes.',
    status: 'open',
    postedDate: '2026-09-14',
    requirements: 'Must have past experience teaching Cambridge syllabus.',
  },
  {
    id: 'job-104',
    title: 'Elementary Foundation Tutor (Math & Amharic Literacy)',
    grade: 'Grade 4',
    subject: 'Elementary Mathematics & Amharic Reading',
    location: 'Kazanchis, Addis Ababa',
    rate: '400 ETB / hour (12 hours/month)',
    monthlyEstimate: 4800,
    schedule: 'Monday & Thursday afternoons',
    description: 'Encouraging tutor needed to boost confidence and handwriting/reading fluency in a friendly home environment.',
    status: 'open',
    postedDate: '2026-09-15',
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-501',
    jobId: 'job-101',
    jobTitle: 'Grade 12 Physics & Chemistry National Exam Preparation',
    tutorId: 'tutor-1',
    tutorName: 'Kassahun Bekele',
    tutorEmail: 'kassahun.b@gmail.com',
    tutorPhone: '+251 912 345 678',
    coverNote: 'I have 5 years of experience tutoring Grade 12 students in Bole and CMC with great national entrance scores.',
    status: 'approved',
    commissionChoice: '60_percent_first_month',
    commissionStatus: 'pending_verification',
    commissionMethod: 'Telebirr',
    commissionReference: 'TB-COMM-7200-X',
    commissionReceiptUrl: createReceiptPlaceholder('telebirr', 'TB-COMM-7200-X', '7,200.00', 'Kassahun Bekele (Job 101)', '60% Placement Downpayment'),
    appliedDate: '2026-09-11',
  },
  {
    id: 'app-502',
    jobId: 'job-103',
    jobTitle: 'Cambridge IGCSE Extended Mathematics & Physics',
    tutorId: 'tutor-2',
    tutorName: 'Bethlehem Tadesse',
    tutorEmail: 'bethlehem.t@gmail.com',
    tutorPhone: '+251 922 456 789',
    coverNote: 'Extensive experience with Cambridge past papers and syllabus pacing for Sandford / ICS students.',
    status: 'approved',
    commissionChoice: '23_percent_monthly',
    commissionStatus: 'approved',
    commissionMethod: 'Commercial Bank of Ethiopia (CBE)',
    commissionReference: 'CBE-COMM-2990',
    commissionReceiptUrl: createReceiptPlaceholder('cbe', 'CBE-COMM-2990', '2,990.00', 'Bethlehem Tadesse (Job 103)', '23% Monthly Commission (Meskerem)'),
    appliedDate: '2026-09-13',
  }
];

export const INITIAL_REPORTS: MonthlyReport[] = [
  {
    id: 'rep-901',
    tutorId: 'tutor-1',
    tutorName: 'Kassahun Bekele',
    studentName: 'Samuel Kassahun',
    parentEmail: 'almaz.m@gmail.com',
    month: 'First Month (Meskerem / Month 1)',
    totalHours: 18,
    overallScore: 'Very Good (B+ to A / 80-89%)',
    strengths: 'Samuel mastered Newtonian kinematics and projectile motion vectors rapidly. Shows high enthusiasm and completed all 4 practice problem sets on time.',
    improvements: 'Needs extra drill on thermodynamics unit conversions and time management under timed exam conditions. Recommended 30 mins daily revision.',
    status: 'approved_for_parent',
    parentDecision: 'accepted',
    parentFeedback: 'Thank you teacher Kassahun! Samuel has really gained confidence in Physics this month.',
    submittedDate: '2026-09-01',
    adminApprovedDate: '2026-09-02',
    parentRespondedDate: '2026-09-03',
  },
  {
    id: 'rep-902',
    tutorId: 'tutor-1',
    tutorName: 'Kassahun Bekele',
    studentName: 'Samuel Kassahun',
    month: 'Second Month (Tikimt / Month 2)',
    parentEmail: 'almaz.m@gmail.com',
    totalHours: 16,
    overallScore: 'Excellent (Straight A / 90%+)',
    strengths: 'Covered Electrostatics, Coulomb Law, and Electric Field Intensity. Scored 94% on the mid-term mock exam with zero calculation mistakes.',
    improvements: 'Introduce circuit analysis questions from 2012-2015 national exam archives to reinforce current electricity concepts.',
    status: 'approved_for_parent',
    parentDecision: 'pending', // READY FOR PARENT INTERACTIVE APPROVAL/DISPUTE!
    submittedDate: '2026-09-14',
    adminApprovedDate: '2026-09-15',
  },
  {
    id: 'rep-903',
    tutorId: 'tutor-2',
    tutorName: 'Bethlehem Tadesse',
    studentName: 'Yafet Dawit',
    parentEmail: 'dawit.y@gmail.com',
    month: 'First Month (Meskerem / Month 1)',
    totalHours: 14,
    overallScore: 'Good - Steady Improvement (70-79%)',
    strengths: 'Great effort understanding organic chemistry nomenclature and functional group reactions.',
    improvements: 'More practice needed with stoichiometry balancing and lab formula calculations.',
    status: 'pending_admin', // READY FOR ADMIN APPROVAL!
    parentDecision: 'pending',
    submittedDate: '2026-09-15',
  }
];

export const INITIAL_SUBADMINS: SubAdminUser[] = [
  {
    id: 'admin-super-1',
    name: 'Executive Director (Main Admin)',
    email: 'admin@adortutorial.com',
    phone: '+251 91 100 0001',
    designation: 'super_admin',
    roleTitle: 'Super Administrator & Founder',
    status: 'active',
    addedAt: '2026-01-01',
    lastActive: 'Active Now',
    permissions: {
      canVerifyPayments: true,
      canVerifyTutors: true,
      canPostJobs: true,
      canApproveReports: true,
      canManageApplications: true,
      canAssignRoles: true,
    }
  },
  {
    id: 'admin-acad-2',
    name: 'Dr. Alula Kebede (MSc, PhD)',
    email: 'academic@adortutorial.com',
    phone: '+251 91 222 3344',
    designation: 'academic_coordinator',
    roleTitle: 'Academic Director & Curriculum Matcher',
    status: 'active',
    addedAt: '2026-02-15',
    lastActive: '2 hours ago',
    permissions: {
      canVerifyPayments: false,
      canVerifyTutors: true,
      canPostJobs: true,
      canApproveReports: true,
      canManageApplications: true,
      canAssignRoles: false,
    }
  },
  {
    id: 'admin-fin-3',
    name: 'Selamawit Tadesse (BA Acc)',
    email: 'finance@adortutorial.com',
    phone: '+251 91 333 4455',
    designation: 'finance_officer',
    roleTitle: 'Finance & Bank Verification Officer',
    status: 'active',
    addedAt: '2026-03-01',
    lastActive: 'Today, 10:15 AM',
    permissions: {
      canVerifyPayments: true,
      canVerifyTutors: false,
      canPostJobs: false,
      canApproveReports: false,
      canManageApplications: false,
      canAssignRoles: false,
    }
  },
  {
    id: 'admin-counsel-4',
    name: 'Yohannes Bekele',
    email: 'counselor@adortutorial.com',
    phone: '+251 91 444 5566',
    designation: 'counselor',
    roleTitle: 'Student & Parent Academic Counselor',
    status: 'active',
    addedAt: '2026-04-10',
    lastActive: 'Yesterday',
    permissions: {
      canVerifyPayments: false,
      canVerifyTutors: false,
      canPostJobs: false,
      canApproveReports: true,
      canManageApplications: false,
      canAssignRoles: false,
    }
  }
];

export const INITIAL_TUTOR_PAYOUTS: TutorMonthlyPayout[] = [
  {
    id: 'payout-101',
    tutorId: 'tut-1',
    tutorName: 'Henok Tadesse',
    tutorEmail: 'tutor@adortutorial.com',
    tutorPhone: '+251 911 22 33 44',
    studentName: 'Samuel Kassahun (Grade 11 Physics)',
    month: 'First Month (Meskerem / Month 1)',
    teachingHours: 18,
    amount: 5400,
    method: 'Telebirr',
    reference: 'TB-PO-98214-X',
    receiptScreenshotUrl: createPayoutReceiptPlaceholder('telebirr', 'TB-PO-98214-X', '5,400.00', 'Henok Tadesse', 'Meskerem - Samuel Kassahun'),
    disbursedDate: '2026-09-12',
    notes: 'Monthly payout for 18 completed teaching hours. Exceptional tutor evaluation reported by parent.',
    status: 'received',
  },
  {
    id: 'payout-102',
    tutorId: 'tutor-1',
    tutorName: 'Kassahun Bekele',
    tutorEmail: 'kassahun.b@gmail.com',
    tutorPhone: '+251 912 345 678',
    studentName: 'Samuel Kassahun (Grade 12 Physics)',
    month: 'First Month (Meskerem / Month 1)',
    teachingHours: 16,
    amount: 4800,
    method: 'Commercial Bank of Ethiopia (CBE)',
    reference: 'CBE-PO-448102',
    receiptScreenshotUrl: createPayoutReceiptPlaceholder('cbe', 'CBE-PO-448102', '4,800.00', 'Kassahun Bekele', 'Meskerem - Samuel Kassahun'),
    disbursedDate: '2026-09-10',
    notes: 'Monthly tutoring disbursement for 16 teaching hours.',
    status: 'received',
  },
  {
    id: 'payout-103',
    tutorId: 'tutor-2',
    tutorName: 'Bethlehem Tadesse',
    tutorEmail: 'bethlehem.t@gmail.com',
    tutorPhone: '+251 922 456 789',
    studentName: 'Yafet Dawit (Grade 10 IGCSE)',
    month: 'First Month (Meskerem / Month 1)',
    teachingHours: 20,
    amount: 6000,
    method: 'Telebirr',
    reference: 'TB-PO-771893',
    receiptScreenshotUrl: createPayoutReceiptPlaceholder('telebirr', 'TB-PO-771893', '6,000.00', 'Bethlehem Tadesse', 'Meskerem - Yafet Dawit'),
    disbursedDate: '2026-09-08',
    notes: 'Cambridge IGCSE syllabus pacing completed. Verified by Ador Academic Coordinator.',
    status: 'received',
  }
];
