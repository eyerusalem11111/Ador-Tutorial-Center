import { SupportedLanguage } from '../types';

export interface LocalizedTestimonial {
  id: string;
  name: string;
  role: string;
  textKey: string;
  rating: number;
  highlight: string;
}

export const LOCALIZED_TESTIMONIALS: Record<SupportedLanguage, LocalizedTestimonial[]> = {
  en: [
    {
      id: 't-1',
      name: 'Dr. Elias Solomon',
      role: 'Parent (Bole Subcity)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Kindergarten & Grade 3 Twins',
    },
    {
      id: 't-2',
      name: 'Wro. Tigist Hailu',
      role: 'Parent (Sarbet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Grade 8 Ministry Exam Success',
    },
    {
      id: 't-3',
      name: 'Ato Selamu Fikru',
      role: 'Parent (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Reliable Progress Reports',
    },
  ],
  am: [
    {
      id: 't-1',
      name: 'ዶ/ር ኤልያስ ሰለሞን',
      role: 'ወላጅ (ቦሌ ክፍለ ከተማ)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'የ3ኛ ክፍል መንታ ተማሪዎች ውጤት',
    },
    {
      id: 't-2',
      name: 'ወ/ሮ ትዕግስት ኃይሉ',
      role: 'ወላጅ (ሳርቤት)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'የ8ኛ ክፍል ሚኒስትሪ ፈተና ብልጫ',
    },
    {
      id: 't-3',
      name: 'አቶ ሰላሙ ፍቅሩ',
      role: 'ወላጅ (ሲኤምሲ)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'ተከታታይ የሳምንት እድገት ሪፖርቶች',
    },
  ],
  om: [
    {
      id: 't-1',
      name: 'Dr. Eliyaas Solomoon',
      role: 'Maatii (Kutaa Boolee)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Milkaa’ina Barattoota Kutaa 3ffaa',
    },
    {
      id: 't-2',
      name: 'Aadde Tigist Haayiluu',
      role: 'Maatii (Saarbeet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Qormaata Biyyoolessaa Kutaa 8ffaa',
    },
    {
      id: 't-3',
      name: 'Obbo Salaamu Fiqqiruu',
      role: 'Maatii (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Gabaasa Torbanii Amanamaa',
    },
  ],
  ti: [
    {
      id: 't-1',
      name: 'ዶ/ር ኤልያስ ሰሎሞን',
      role: 'ወላዲ (ክፍለ ከተማ ቦሌ)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'ናይ 3ይ ክፍሊ መንታ ተምሃሮ ውጽኢት',
    },
    {
      id: 't-2',
      name: 'ወ/ሮ ትዕግስቲ ሃይሉ',
      role: 'ወላዲት (ሳርቤት)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'ፈተና ሚኒስትሪ 8ይ ክፍሊ ዓወት',
    },
    {
      id: 't-3',
      name: 'ኣቶ ሰላሙ ፍቕሩ',
      role: 'ወላዲ (ሲኤምሲ)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'ቀጻሊ ናይ ሰሙን ጸብጻብ',
    },
  ],
  so: [
    {
      id: 't-1',
      name: 'Dr. Ilyaas Suleymaan',
      role: 'Waalid (Degmada Bole)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Guusha Ardayda Fasalka 3aad',
    },
    {
      id: 't-2',
      name: 'Marwo Tigist Haylu',
      role: 'Waalid (Sarbet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Imtixaanka Fasalka 8aad',
    },
    {
      id: 't-3',
      name: 'Mudane Salamu Fikru',
      role: 'Waalid (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Warbixinta Toddobaadlaha ah',
    },
  ],
  ar: [
    {
      id: 't-1',
      name: 'د. إلياس سليمان',
      role: 'ولي أمر (بلدية بولي)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'تفوق توأمين في الصف الثالث',
    },
    {
      id: 't-2',
      name: 'السيدة تيغيست هايلو',
      role: 'ولية أمر (ساربيت)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'نجاح امتحان الوزارة للصف الثامن',
    },
    {
      id: 't-3',
      name: 'السيد سلامو فكرو',
      role: 'ولي أمر (سي إم سي)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'تقارير تقدم أسبوعية موثوقة',
    },
  ],
  fr: [
    {
      id: 't-1',
      name: 'Dr. Elias Solomon',
      role: 'Parent d\'élève (Bole)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Progression rapide en 3e année',
    },
    {
      id: 't-2',
      name: 'Mme. Tigist Hailu',
      role: 'Parent d\'élève (Sarbet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Excellence à l\'examen de 8e année',
    },
    {
      id: 't-3',
      name: 'M. Selamu Fikru',
      role: 'Parent d\'élève (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Rapports pédagogiques hebdomadaires',
    },
  ],
  es: [
    {
      id: 't-1',
      name: 'Dr. Elías Salomón',
      role: 'Padre de familia (Bole)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Progreso excelente en 3er grado',
    },
    {
      id: 't-2',
      name: 'Sra. Tigist Hailu',
      role: 'Madre de familia (Sarbet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Éxito en el examen ministerial de 8vo grado',
    },
    {
      id: 't-3',
      name: 'Sr. Selamu Fikru',
      role: 'Padre de familia (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Informes semanales transparentes',
    },
  ],
  de: [
    {
      id: 't-1',
      name: 'Dr. Elias Solomon',
      role: 'Elternteil (Stadtteil Bole)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Großer Fortschritt in Klasse 3',
    },
    {
      id: 't-2',
      name: 'Frau Tigist Hailu',
      role: 'Elternteil (Sarbet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Erfolg bei der Abschlussprüfung Klasse 8',
    },
    {
      id: 't-3',
      name: 'Herr Selamu Fikru',
      role: 'Elternteil (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Zuverlässige wöchentliche Lernberichte',
    },
  ],
  zh: [
    {
      id: 't-1',
      name: '埃利亚斯·所罗门 博士',
      role: '学生家长 (博莱区)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: '三年级双胞胎成绩显著提高',
    },
    {
      id: 't-2',
      name: '蒂吉斯特·海卢 女士',
      role: '学生家长 (萨尔贝特)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: '八年级教育部统一考试全A',
    },
    {
      id: 't-3',
      name: '塞拉穆·菲克鲁 先生',
      role: '学生家长 (CMC区)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: '每周学情报告透明可靠',
    },
  ],
  sw: [
    {
      id: 't-1',
      name: 'Dkt. Elias Solomon',
      role: 'Mzazi (Eneo la Bole)',
      textKey: 'testimonial1',
      rating: 5,
      highlight: 'Maendeleo ya Mapacha Darasa la 3',
    },
    {
      id: 't-2',
      name: 'Bi. Tigist Hailu',
      role: 'Mzazi (Sarbet)',
      textKey: 'testimonial2',
      rating: 5,
      highlight: 'Ufaulu wa Mtihani wa Darasa la 8',
    },
    {
      id: 't-3',
      name: 'Bw. Selamu Fikru',
      role: 'Mzazi (CMC)',
      textKey: 'testimonial3',
      rating: 5,
      highlight: 'Ripoti za Kila Wiki za Kuaminika',
    },
  ],
};

export function getLocalizedTestimonials(lang: SupportedLanguage | string = 'en'): LocalizedTestimonial[] {
  return (LOCALIZED_TESTIMONIALS as any)[lang] || LOCALIZED_TESTIMONIALS.en;
}
