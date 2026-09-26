import { EducationalLevelItem } from '../types';

export const EDUCATIONAL_LEVELS: EducationalLevelItem[] = [
  {
    id: 'early-years',
    title: 'Early Years & Primary Education',
    grades: 'Kindergarten to Grade 5',
    description: 'Interactive foundational tutoring for young learners, building strong English literacy, Amharic phonics, numeracy, and cognitive problem-solving.',
    image: '/educational-levels/early-years.jpg',
    rating: 4.9,
    highlight: 'Foundational Phonics & Math Mastery',
    subjects: ['Basic Math', 'English Reading', 'Amharic', 'Environmental Science', 'Handwriting & Phonics'],
    badge: 'Foundations',
  },
  {
    id: 'grade-6-prep',
    title: 'Grade 6 Ministry Exam Prep',
    grades: 'Grade 6 (Regional Assessment)',
    description: 'Targeted 1-on-1 tutoring and past paper drills designed to help primary students ace their regional Ministry exam with top percentile rankings.',
    image: '/educational-levels/grade-6-prep.jpg',
    rating: 4.9,
    highlight: 'Regional Past Paper Drills',
    subjects: ['Mathematics', 'Integrated Science', 'English', 'Social Studies', 'Amharic / Regional Language'],
    badge: 'Ministry Exam',
  },
  {
    id: 'grade-7-8-prep',
    title: 'Grade 7 & 8 Ministry Exam Prep',
    grades: 'Grade 7 & 8 (National Benchmark)',
    description: 'Comprehensive academic reinforcement for middle school subjects and focused preparation for the Grade 8 regional assessments for top high school placement.',
    image: '/educational-levels/grade-7-8-prep.jpg',
    rating: 4.9,
    highlight: 'Core Subject Mastery & Diagnostic Mocks',
    subjects: ['Mathematics', 'General Science', 'Social Studies', 'English', 'Citizenship Education'],
    badge: 'Ministry Exam',
  },
  {
    id: 'secondary-9-10',
    title: 'Grade 9 & 10 Secondary Fundamentals',
    grades: 'Grade 9 & 10',
    description: 'Building deep conceptual understanding in Natural and Social Sciences to prepare students for national academic streaming and high school excellence.',
    image: '/educational-levels/secondary-9-10.jpg',
    rating: 4.9,
    highlight: 'Natural & Social Science Foundations',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Pure Mathematics', 'English Grammar & Writing'],
    badge: 'Secondary',
  },
  {
    id: 'university-prep-11-12',
    title: 'Grade 11 & 12 University Entrance Prep',
    grades: 'Grade 11 & 12',
    description: 'High-stakes coaching, intensive past exam drills, and scholastic aptitude mastery designed for top national university entrance and medicine/engineering admissions.',
    image: '/educational-levels/university-prep-11-12.jpg',
    rating: 5.0,
    highlight: 'National Entrance Exam Guarantee',
    subjects: ['Advanced Calculus', 'Mechanics & Modern Physics', 'Organic Chemistry', 'Scholastic Aptitude (EUEE)', 'English Aptitude'],
    badge: 'University Prep',
  },
  {
    id: 'international-curricula',
    title: 'International School Curricula',
    grades: 'Cambridge IGCSE, IB & American Diploma',
    description: 'Specialized 1-on-1 tutoring for students enrolled in international and community academies following British Cambridge, IB Diploma, or American curricula.',
    image: '/educational-levels/international-curricula.jpg',
    rating: 4.9,
    highlight: 'IGCSE, IB & SAT Preparation',
    subjects: ['Cambridge Math & Science', 'IB Physics & Math HL', 'AP Calculus', 'SAT Coaching', 'Academic Writing'],
    badge: 'International',
  },
];

export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
  question: string;
  answer: string;
}

export const OFFICIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    questionKey: 'faq1Q',
    answerKey: 'faq1A',
    question: 'What Educational Levels And Subjects Do You Tutor?',
    answer: 'We provide comprehensive 1-on-1 tutoring for all levels, including Kindergarten foundational skills, Primary School, Middle School, and High School. Our tutors specialize in core subjects such as Mathematics, Physics, Chemistry, Biology, English, and Amharic.',
  },
  {
    id: 'faq-2',
    questionKey: 'faq2Q',
    answerKey: 'faq2A',
    question: 'Do You Offer Specific Preparation For The National Ministry Exams?',
    answer: 'Yes! We have intensive exam preparation packages specifically designed for Grade 6 Regional Exams, Grade 8 Ministry Assessments, and Grade 12 National University Entrance Examinations, utilizing past papers and diagnostic test drills.',
  },
  {
    id: 'faq-3',
    questionKey: 'faq3Q',
    answerKey: 'faq3A',
    question: 'How Do You Select Your Tutors, And Are They Qualified?',
    answer: 'Every Ador tutor undergoes a stringent 5-stage vetting process: university transcript verification, national examination score validation, in-person pedagogical interviews, subject matter evaluations, and background security checks.',
  },
  {
    id: 'faq-4',
    questionKey: 'faq4Q',
    answerKey: 'faq4A',
    question: 'How Do Parents Track Their Child’s Academic Progress?',
    answer: 'Parents receive regular weekly lesson summaries, bi-weekly milestone evaluations, and monthly diagnostic grade cards through our Parent Dashboard with direct tutor feedback and supervisory oversight.',
  },
  {
    id: 'faq-5',
    questionKey: 'faq5Q',
    answerKey: 'faq5A',
    question: 'What Are The Tutoring Fees And Payment Methods?',
    answer: 'Our rates range from 250 to 500 ETB per hour depending on grade level and curriculum. We accept secure direct bank transfers via the Commercial Bank of Ethiopia (CBE) and Telebirr with instant receipt validation.',
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  textKey: string;
  text: string;
  rating: number;
  highlight: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Dr. Elias Solomon',
    role: 'Parent (Bole Subcity)',
    textKey: 'testimonial1',
    text: 'Ador Tutorial Center paired my twin daughters in Grade 3 with a remarkably patient and knowledgeable tutor. Their reading and mathematics performance improved dramatically within six weeks.',
    rating: 5,
    highlight: 'Kindergarten & Grade 3 Twins',
  },
  {
    id: 't-2',
    name: 'Wro. Tigist Hailu',
    role: 'Parent (Sarbet)',
    textKey: 'testimonial2',
    text: 'Our son was struggling with Grade 8 physics and math before the regional exam. The Ador tutor conducted rigorous weekly mock tests and helped him achieve straight A marks.',
    rating: 5,
    highlight: 'Grade 8 Ministry Exam Success',
  },
  {
    id: 't-3',
    name: 'Ato Selamu Fikru',
    role: 'Parent (CMC)',
    textKey: 'testimonial3',
    text: 'The transparency of weekly progress reporting and direct communication gave our family complete confidence. The administrative coordination in Addis Ababa is second to none.',
    rating: 5,
    highlight: 'Reliable Progress Reports',
  },
];

export interface SocialLinkItem {
  name: string;
  url: string;
  handle: string;
}

export const OFFICIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'Telegram',
    url: 'http://t.me/ADORTUTORIALACADEMY',
    handle: '@ADORTUTORIALACADEMY',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/adortutor',
    handle: '@adortutor',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@ADORHOMETUTOR',
    handle: '@ADORHOMETUTOR',
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@adortutor',
    handle: '@adortutor',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/profile.php?id=61573369959695',
    handle: 'Ador Tutorial Center',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/251912629431',
    handle: '+251 912 629 431',
  },
];
