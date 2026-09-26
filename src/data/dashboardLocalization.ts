import { SupportedLanguage } from '../types';

// Map known Ethiopian & International names into each supported language script/orthography
export const LOCALIZED_PERSON_NAMES: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  'Almaz Mengistu': {
    en: 'Almaz Mengistu',
    am: 'አልማዝ መንግስቱ',
    om: 'Almaz Mangistuu',
    ti: 'ኣልማዝ መንግስቱ',
    so: 'Almaz Mengistu',
    ar: 'ألماز منغستو',
    fr: 'Almaz Mengistu',
    es: 'Almaz Mengistu',
    de: 'Almaz Mengistu',
    zh: '阿尔马兹·门吉斯图',
    sw: 'Almaz Mengistu',
  },
  'Dawit Yohannes': {
    en: 'Dawit Yohannes',
    am: 'ዳዊት ዮሐንስ',
    om: 'Daawit Yohaannis',
    ti: 'ዳዊት ዮሃንስ',
    so: 'Dawit Yohannes',
    ar: 'داويت يوهانس',
    fr: 'Dawit Yohannes',
    es: 'Dawit Yohannes',
    de: 'Dawit Yohannes',
    zh: '达维特·约翰内斯',
    sw: 'Dawit Yohannes',
  },
  'Samuel Kassahun': {
    en: 'Samuel Kassahun',
    am: 'ሳሙኤል ካሳሁን',
    om: 'Saamu\'eel Kaasaahuun',
    ti: 'ሳሙኤል ካሳሁን',
    so: 'Samuel Kassahun',
    ar: 'صامويل كاساهون',
    fr: 'Samuel Kassahun',
    es: 'Samuel Kassahun',
    de: 'Samuel Kassahun',
    zh: '塞缪尔·卡萨洪',
    sw: 'Samuel Kassahun',
  },
  'Liya Daniel': {
    en: 'Liya Daniel',
    am: 'ሊያ ዳንኤል',
    om: 'Liyaa Daani\'eel',
    ti: 'ሊያ ዳንኤል',
    so: 'Liya Daniel',
    ar: 'ليا دانيال',
    fr: 'Liya Daniel',
    es: 'Liya Daniel',
    de: 'Liya Daniel',
    zh: '莉亚·丹尼尔',
    sw: 'Liya Daniel',
  },
  'Yafet Dawit': {
    en: 'Yafet Dawit',
    am: 'ያፌት ዳዊት',
    om: 'Yafeet Daawit',
    ti: 'ያፌት ዳዊት',
    so: 'Yafet Dawit',
    ar: 'يافيت داويت',
    fr: 'Yafet Dawit',
    es: 'Yafet Dawit',
    de: 'Yafet Dawit',
    zh: '亚菲特·达维特',
    sw: 'Yafet Dawit',
  },
  'Kassahun Bekele': {
    en: 'Kassahun Bekele',
    am: 'ካሳሁን በቀለ',
    om: 'Kaasaahuun Baqqalaa',
    ti: 'ካሳሁን በቀለ',
    so: 'Kassahun Bekele',
    ar: 'كاساهون بيكيلي',
    fr: 'Kassahun Bekele',
    es: 'Kassahun Bekele',
    de: 'Kassahun Bekele',
    zh: '卡萨洪·贝克勒',
    sw: 'Kassahun Bekele',
  },
  'Bethlehem Tadesse': {
    en: 'Bethlehem Tadesse',
    am: 'ቤተልሔም ታደሰ',
    om: 'Beeteliheem Taaddasaa',
    ti: 'ቤተልሄም ታደሰ',
    so: 'Bethlehem Tadesse',
    ar: 'بيت لحم تاديسي',
    fr: 'Bethlehem Tadesse',
    es: 'Bethlehem Tadesse',
    de: 'Bethlehem Tadesse',
    zh: '伯利恒·塔德塞',
    sw: 'Bethlehem Tadesse',
  },
  'Abebe Kebede': {
    en: 'Abebe Kebede',
    am: 'አበበ ከበደ',
    om: 'Abebe Kabbadaa',
    ti: 'ኣበበ ከበደ',
    so: 'Abebe Kebede',
    ar: 'أبيبي كيبيدي',
    fr: 'Abebe Kebede',
    es: 'Abebe Kebede',
    de: 'Abebe Kebede',
    zh: '阿贝贝·凯贝德',
    sw: 'Abebe Kebede',
  },
  'Abebe Kebede (MSc)': {
    en: 'Abebe Kebede (MSc)',
    am: 'አበበ ከበደ (ኤምኤስሲ)',
    om: 'Abebe Kabbadaa (MSc)',
    ti: 'ኣበበ ከበደ (ኤምኤስሲ)',
    so: 'Abebe Kebede (MSc)',
    ar: 'أبيبي كيبيدي (ماجستير)',
    fr: 'Abebe Kebede (MSc)',
    es: 'Abebe Kebede (MSc)',
    de: 'Abebe Kebede (MSc)',
    zh: '阿贝贝·凯贝德 (理学硕士)',
    sw: 'Abebe Kebede (MSc)',
  },
  'Dr. Elias Solomon': {
    en: 'Dr. Elias Solomon',
    am: 'ዶ/ር ኤልያስ ሰለሞን',
    om: 'Dr. Eeliyaas Solomoon',
    ti: 'ዶ/ር ኤልያስ ሰለሞን',
    so: 'Dr. Elias Solomon',
    ar: 'د. إلياس سليمان',
    fr: 'Dr. Elias Solomon',
    es: 'Dr. Elias Solomon',
    de: 'Dr. Elias Solomon',
    zh: '埃利亚斯·所罗门 博士',
    sw: 'Dkt. Elias Solomon',
  },
  'Aster Tesfaye': {
    en: 'Woizero Aster Tesfaye',
    am: 'ወ/ሮ አስቴር ተስፋዬ',
    om: 'Aadde Asteer Tasfaayee',
    ti: 'ወ/ሮ ኣስቴር ተስፋየ',
    so: 'Marwo Aster Tesfaye',
    ar: 'السيدة أستير تسفاي',
    fr: 'Mme Aster Tesfaye',
    es: 'Sra. Aster Tesfaye',
    de: 'Frau Aster Tesfaye',
    zh: '阿斯特·特斯法耶 夫人',
    sw: 'Bi. Aster Tesfaye',
  },
  'Eyerusalem Melaku': {
    en: 'Eyerusalem Melaku',
    am: 'እየሩሳሌም መላኩ',
    om: 'Iyyarusaalem Mallaakuu',
    ti: 'እየሩሳሌም መላኩ',
    so: 'Eyerusalem Melaku',
    ar: 'أورشليم ميلاكو',
    fr: 'Eyerusalem Melaku',
    es: 'Eyerusalem Melaku',
    de: 'Eyerusalem Melaku',
    zh: '耶路撒冷·梅拉库',
    sw: 'Eyerusalem Melaku',
  },
  'Eyerusalem Melaku (Director)': {
    en: 'Eyerusalem Melaku (Director)',
    am: 'እየሩሳሌም መላኩ (ዋና ዳይሬክተር)',
    om: 'Iyyarusaalem Mallaakuu (Daarektara)',
    ti: 'እየሩሳሌም መላኩ (ዋና ዳይሬክተር)',
    so: 'Eyerusalem Melaku (Agaasime)',
    ar: 'أورشليم ميلاكو (المديرة العامة)',
    fr: 'Eyerusalem Melaku (Directrice)',
    es: 'Eyerusalem Melaku (Directora)',
    de: 'Eyerusalem Melaku (Direktorin)',
    zh: '耶路撒冷·梅拉库 (总监)',
    sw: 'Eyerusalem Melaku (Mkurugenzi)',
  }
};

export function getLocalizedPersonName(name: string | undefined, lang: SupportedLanguage | string = 'en'): string {
  if (!name) return '';
  const clean = name.trim();
  const found = LOCALIZED_PERSON_NAMES[clean];
  if (found && (found as any)[lang]) {
    return (found as any)[lang];
  }
  // Try sub-match (e.g. if name contains '(Almaz)')
  for (const [key, mapping] of Object.entries(LOCALIZED_PERSON_NAMES)) {
    if (clean.includes(key)) {
      const translatedPart = (mapping as any)[lang] || key;
      return clean.replace(key, translatedPart);
    }
  }
  return name;
}

// Localize Month & Payment periods
export const LOCALIZED_MONTHS: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  'First Month (Meskerem / Month 1)': {
    en: 'First Month (Meskerem / Month 1)',
    am: 'የመጀመሪያ ወር (መስከረም / ወር 1)',
    om: 'Ji’a Tokkoffaa (Fulbaana / Ji’a 1)',
    ti: 'ቀዳማይ ወርሒ (መስከረም / ወርሒ 1)',
    so: 'Bisha Koowaad (Meskerem)',
    ar: 'الشهر الأول (مسكريم / الشهر 1)',
    fr: 'Premier Mois (Meskerem / Mois 1)',
    es: 'Primer Mes (Meskerem / Mes 1)',
    de: 'Erster Monat (Meskerem / Monat 1)',
    zh: '第一个月 (梅斯克雷姆 / 第1月)',
    sw: 'Mwezi wa Kwanza (Meskerem)',
  },
  'Second Month (Tikimt / Month 2)': {
    en: 'Second Month (Tikimt / Month 2)',
    am: 'ሁለተኛ ወር (ጥቅምት / ወር 2)',
    om: 'Ji’a Lammaffaa (Onkololeessa / Ji’a 2)',
    ti: 'ካልኣይ ወርሒ (ጥቅምቲ / ወርሒ 2)',
    so: 'Bisha Labaad (Tikimt)',
    ar: 'الشهر الثاني (طقمت / الشهر 2)',
    fr: 'Deuxième Mois (Tikimt / Mois 2)',
    es: 'Segundo Mes (Tikimt / Mes 2)',
    de: 'Zweiter Monat (Tikimt / Monat 2)',
    zh: '第二个月 (蒂克姆特 / 第2月)',
    sw: 'Mwezi wa Pili (Tikimt)',
  },
  'Registration Fee': {
    en: 'Registration Fee',
    am: 'የምዝገባ ክፍያ',
    om: 'Kaffaltii Galmee',
    ti: 'ክፍሊት ምዝገባ',
    so: 'Lacagta Diiwaangelinta',
    ar: 'رسوم التسجيل',
    fr: 'Frais d\'inscription',
    es: 'Tarifa de Registro',
    de: 'Anmeldegebühr',
    zh: '注册费',
    sw: 'Ada ya Usajili',
  },
  'Tutor 500 ETB Membership': {
    en: 'Tutor 500 ETB Membership Fee',
    am: 'የመምህራን 500 ብር የአባልነት ክፍያ',
    om: 'Kaffaltii Miseensummaa Barsiisotaa 500 ETB',
    ti: 'ናይ መማህራን 500 ቅርሺ ክፍሊት ኣባልነት',
    so: 'Lacagta Xubinnimada Macallinka ee 500 ETB',
    ar: 'رسوم عضوية المعلم 500 بر',
    fr: 'Frais d\'adhésion tuteur 500 ETB',
    es: 'Cuota de Membresía de Tutor 500 ETB',
    de: 'Tutor-Mitgliedsbeitrag 500 ETB',
    zh: '教师500比尔会员认证费',
    sw: 'Ada ya Uanachama wa Mkufunzi 500 ETB',
  }
};

export function getLocalizedMonth(month: string | undefined, lang: SupportedLanguage | string = 'en'): string {
  if (!month) return '';
  const clean = month.trim();
  const found = LOCALIZED_MONTHS[clean];
  if (found && (found as any)[lang]) {
    return (found as any)[lang];
  }
  return month;
}

// Localize Progress Scores in reports
export const LOCALIZED_SCORES: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  'Very Good (B+ to A / 80-89%)': {
    en: 'Very Good (B+ to A / 80-89%)',
    am: 'በጣም ጥሩ (B+ እስከ A / 80-89%)',
    om: 'Baay\'ee Gaarii (B+ hanga A / 80-89%)',
    ti: 'ኣዝዩ ፅቡቕ (B+ ክሳብ A / 80-89%)',
    so: 'Aad u Wanaagsan (B+ ilaa A)',
    ar: 'جيد جداً (B+ إلى A / 80-89%)',
    fr: 'Très Bien (B+ à A / 80-89%)',
    es: 'Muy Bueno (B+ a A / 80-89%)',
    de: 'Sehr Gut (B+ bis A / 80-89%)',
    zh: '非常好 (B+ 至 A / 80-89%)',
    sw: 'Nzuri Sana (B+ hadi A / 80-89%)',
  },
  'Excellent (Straight A / 90%+)': {
    en: 'Excellent (Straight A / 90%+)',
    am: 'እጅግ በጣም ጥሩ (ቀጥታ A / 90%+)',
    om: 'Olaanaa (A Qulqulluu / 90%+)',
    ti: 'ብሉጽ (ቀጥታ A / 90%+)',
    so: 'Heersare (A / 90%+)',
    ar: 'ممتاز (امتياز A / 90%+)',
    fr: 'Excellent (A / 90%+)',
    es: 'Excelente (A / 90%+)',
    de: 'Ausgezeichnet (A / 90%+)',
    zh: '优秀 (全优 A / 90%+)',
    sw: 'Bora Kabisa (A / 90%+)',
  },
  'A (Excellent Progress)': {
    en: 'A (Excellent Progress)',
    am: 'A (እጅግ በጣም ጥሩ)',
    om: 'A (Gamaaggama Gaarii)',
    ti: 'A (ብሉጽ ዕቤት)',
    so: 'A (Horumar Wanaagsan)',
    ar: 'A (تقدم ممتاز)',
    fr: 'A (Progrès Excellent)',
    es: 'A (Excelente Progreso)',
    de: 'A (Hervorragender Fortschritt)',
    zh: 'A (极佳/表现优秀)',
    sw: 'A (Maendeleo Mazuri)'
  },
  'A- (Strong Work)': {
    en: 'A- (Strong Work)',
    am: 'A- (ጠንካራ ስራ)',
    om: 'A- (Hojii Cimsaa)',
    ti: 'A- (ጽቡቕ ስራሕ)',
    so: 'A- (Shaqo Adag)',
    ar: 'A- (عمل قوي ومثابر)',
    fr: 'A- (Travail Solide)',
    es: 'A- (Trabajo Sólido)',
    de: 'A- (Starke Leistung)',
    zh: 'A- (良好/踏实优秀)',
    sw: 'A- (Kazi Imara)'
  }
};

export function getLocalizedScore(score: string | undefined, lang: SupportedLanguage | string = 'en'): string {
  if (!score) return '';
  const clean = score.trim();
  const found = LOCALIZED_SCORES[clean];
  if (found && (found as any)[lang]) {
    return (found as any)[lang];
  }
  return score;
}

// Localize Action Buttons & Table Headers
export const LOCALIZED_ACTIONS: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  approve: {
    en: 'Approve',
    am: 'አጽድቅ',
    om: 'Mirkaneessi',
    ti: 'ኣጽድቕ',
    so: 'Oggolow',
    ar: 'اعتماد',
    fr: 'Approuver',
    es: 'Aprobar',
    de: 'Genehmigen',
    zh: '批准',
    sw: 'Idhinisha',
  },
  reject: {
    en: 'Reject',
    am: 'ውድቅ አድርግ',
    om: 'Kufisi',
    ti: 'ንጸጎ',
    so: 'Diid',
    ar: 'رفض',
    fr: 'Rejeter',
    es: 'Rechazar',
    de: 'Ablehnen',
    zh: '拒绝',
    sw: 'Kataa',
  },
  viewReceipt: {
    en: 'View Receipt',
    am: 'ደረሰኝ እይ',
    om: 'Nagahee Ilaali',
    ti: 'ቅብሊት ርአ',
    so: 'Fiiri Rasiidka',
    ar: 'عرض الإيصال',
    fr: 'Voir le reçu',
    es: 'Ver Recibo',
    de: 'Beleg ansehen',
    zh: '查看收据',
    sw: 'Tazama Risiti',
  },
  readFullReport: {
    en: 'Read Full Report',
    am: 'ሙሉውን ሪፖርት አንብብ',
    om: 'Gabaasa Guutuu Dubbisi',
    ti: 'ምሉእ ጸብጻብ ኣንብብ',
    so: 'Akhri Warbixinta Buuxda',
    ar: 'قراءة التقرير بالكامل',
    fr: 'Lire le rapport complet',
    es: 'Leer Informe Completo',
    de: 'Vollständigen Bericht lesen',
    zh: '阅读完整报告',
    sw: 'Soma Ripoti Kamili',
  },
  collapseView: {
    en: 'Collapse View',
    am: 'እይታን አሳንስ',
    om: 'Gabaabsi',
    ti: 'ኣሕጽር',
    so: 'Soo Koob',
    ar: 'طي العرض',
    fr: 'Réduire',
    es: 'Contraer',
    de: 'Einklappen',
    zh: '折叠视图',
    sw: 'Kunja',
  },
  openInDialog: {
    en: 'Open in Dialog',
    am: 'በመስኮት ክፈት',
    om: 'Foddaadhaan Bani',
    ti: 'ብመስኮት ክፈት',
    so: 'Ku Fur Daaqad',
    ar: 'فتح في نافذة',
    fr: 'Ouvrir en fenêtre',
    es: 'Abrir en Ventana',
    de: 'Im Dialog öffnen',
    zh: '在弹窗中打开',
    sw: 'Fungua Dirishani',
  },
  approveForParent: {
    en: 'Approve & Dispatch to Parent',
    am: 'አጽድቅና ለወላጅ ላክ',
    om: 'Mirkaneessii Warratti Ergi',
    ti: 'ኣጽዲቕካ ናብ ወለዲ ላእኽ',
    so: 'Oggolow oo u dir Waalidka',
    ar: 'اعتماد وإرسال إلى ولي الأمر',
    fr: 'Approuver et envoyer au parent',
    es: 'Aprobar y Enviar al Padre',
    de: 'Genehmigen und an Eltern senden',
    zh: '批准并发送给家长',
    sw: 'Idhinisha na Utume kwa Mzazi',
  },
  close: {
    en: 'Close',
    am: 'ዝጋ',
    om: 'Cufi',
    ti: 'ዕጸው',
    so: 'Xidh',
    ar: 'إغلاق',
    fr: 'Fermer',
    es: 'Cerrar',
    de: 'Schließen',
    zh: '关闭',
    sw: 'Funga',
  },
  statusApproved: {
    en: 'Verified & Approved',
    am: 'የተረጋገጠ እና የጸደቀ',
    om: 'Mirkanaa\'ee Fudhatama Argate',
    ti: 'ዝተረጋገጸን ዝተጸደቐን',
    so: 'La Xaqiijiyay & La Oggolaaday',
    ar: 'تم التحقق والاعتماد',
    fr: 'Vérifié et approuvé',
    es: 'Verificado y Aprobado',
    de: 'Verifiziert und genehmigt',
    zh: '已验证并批准',
    sw: 'Imethibitishwa na Kuidhinishwa',
  },
  statusPending: {
    en: 'Pending Verification',
    am: 'በማረጋገጥ ላይ ያለ',
    om: 'Adeemsa Mirkaneessaa Irra Jira',
    ti: 'ኣብ ምርግጋጽ ዘሎ',
    so: 'Sugaya Xaqiijin',
    ar: 'قيد التحقق',
    fr: 'En attente de vérification',
    es: 'Pendiente de Verificación',
    de: 'Ausstehende Verifizierung',
    zh: '待验证',
    sw: 'Inasubiri Uthibitisho',
  }
};

export function getLocalizedActionText(actionKey: string, lang: SupportedLanguage | string = 'en'): string {
  const found = LOCALIZED_ACTIONS[actionKey];
  if (found && (found as any)[lang]) {
    return (found as any)[lang];
  }
  return actionKey;
}

// Localized Tutor Education Strings
export function getLocalizedTutorEducation(lang: SupportedLanguage | string = 'en'): string {
  switch (lang) {
    case 'am':
      return 'የሂሳብ ትምህርት ሁለተኛ ዲግሪ (አአዩ) • የ5+ ዓመታት የማስተማር ልምድ';
    case 'om':
      return 'Digrii Lammaffaa Herregaan (Yuunivarsiitii Finfinnee) • Muuxannoo Barsiisummaa Waggaa 5+';
    case 'ti':
      return 'ካልኣይ ዲግሪ ብትምህርቲ ሒሳብ (አአዩ) • ናይ 5+ ዓመታት ናይ ምምሃር ተሞክሮ';
    case 'so':
      return 'Shahaadada Labaad ee Xisaabta (Jaamacadda Addis Ababa) • Waayo-aragnimo 5+ Sano';
    case 'ar':
      return 'ماجستير في الرياضيات (جامعة أديس أبابا) • خبرة تدريس لأكثر من 5 سنوات';
    case 'fr':
      return 'Master en Mathématiques (Université d\'Addis-Abeba) • 5+ ans d\'expérience';
    case 'es':
      return 'Maestría en Matemáticas (Universidad de Adís Abeba) • Más de 5 años de experiencia';
    case 'de':
      return 'M.Sc. Mathematik (Universität Addis Abeba) • Über 5 Jahre Unterrichtserfahrung';
    case 'zh':
      return '数学理学硕士 (亚的斯亚贝巴大学) • 5年以上高水平辅导经验';
    case 'sw':
      return 'Shahada ya Uzamili ya Hisabati (Chuo Kikuu cha Addis Ababa) • Uzoefu wa miaka 5+';
    default:
      return 'M.Sc. Mathematics (AAU) • 5+ Years High School & College Tutoring';
  }
}

// Localized Service Badges and Chips (for Image 2 issue fix)
export function getLocalizedProgramChips(programId: 'tech' | 'lang' | 'ethics', lang: SupportedLanguage | string = 'en'): { chips: string[]; badge: string; enrollBtn: string } {
  const isAm = lang === 'am';
  const isOm = lang === 'om';
  const isTi = lang === 'ti';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';
  const isEs = lang === 'es';
  const isDe = lang === 'de';
  const isZh = lang === 'zh';
  const isSw = lang === 'sw';

  if (programId === 'tech') {
    let chips = ['Python & Scratch', 'Web Dev', 'MS Office & AI Tools', 'Digital Safety'];
    let badge = 'Certified Mentors';
    let enrollBtn = 'Enroll in Program';

    if (isAm) {
      chips = ['ፓይተን እና ስክራች', 'ዌብ ዲቨሎፕመንት', 'ኤምኤስ ኦፊስ እና AI', 'ዲጂታል ደህንነት'];
      badge = 'ብቁ አሰልጣኞች';
      enrollBtn = 'በፕሮግራሙ ይመዝገቡ';
    } else if (isOm) {
      chips = ['Paayitenii fi Iskiraach', 'Ijaarsa Weebii', 'MS Office fi AI', 'Nageenya Diijitaalaa'];
      badge = 'Leenjistoota Eebbifaman';
      enrollBtn = 'Sagantaa Kanatti Galmaa\'aa';
    } else if (isTi) {
      chips = ['ፓይተንን ስክራችን', 'ዌብ ዲቨሎፕመንት', 'ኤምኤስ ኦፊስን AI', 'ዲጂታል ድሕንነት'];
      badge = 'ብቑዓት መምህራን';
      enrollBtn = 'ኣብዚ መደብ ተመዝገቡ';
    } else if (isAr) {
      chips = ['بايثون وسكراتش', 'تطوير المواقع', 'أوفيس وأدوات AI', 'الأمان الرقمي'];
      badge = 'مدربون معتمدون';
      enrollBtn = 'سجّل في البرنامج';
    } else if (isZh) {
      chips = ['Python与Scratch', '网页开发', 'Office办公与AI工具', '数字安全'];
      badge = '认证导师指导';
      enrollBtn = '立即报名';
    } else if (isFr) {
      chips = ['Python & Scratch', 'Dév Web', 'MS Office & Outils IA', 'Sécurité Numérique'];
      badge = 'Mentors Certifiés';
      enrollBtn = 'S\'inscrire au programme';
    } else if (isSw) {
      chips = ['Python & Scratch', 'Uundaji wa Tovuti', 'MS Office & AI', 'Usalama wa Kidijitali'];
      badge = 'Wakufunzi Walioidhinishwa';
      enrollBtn = 'Jiunge na Mpango';
    }

    return { chips, badge, enrollBtn };
  }

  if (programId === 'lang') {
    let chips = ['English & IELTS', 'Afaan Oromoo', 'Amharic & Tigrinya', 'French & Arabic'];
    let badge = 'Native & Bilingual';
    let enrollBtn = 'Enroll in Program';

    if (isAm) {
      chips = ['እንግሊዝኛ እና IELTS', 'አፋን ኦሮሞ', 'አማርኛ እና ትግርኛ', 'ፈረንሳይኛ እና አረብኛ'];
      badge = 'የአፍ መፍቻ እና የሁለት ቋንቋ';
      enrollBtn = 'በፕሮግራሙ ይመዝገቡ';
    } else if (isOm) {
      chips = ['Afaan Ingilizii fi IELTS', 'Afaan Oromoo', 'Amaaraa fi Tigrinyi', 'Firaansisii fi Arabaa'];
      badge = 'Dubbattoota Dhalootaa';
      enrollBtn = 'Sagantaa Kanatti Galmaa\'aa';
    } else if (isTi) {
      chips = ['እንግሊዝኛን IELTS', 'ኣፋን ኦሮሞ', 'ኣምሓርኛን ትግርኛን', 'ፈረንሳይኛን ዓረብኛን'];
      badge = 'ናይ ቋንቋ መበቆላውያን';
      enrollBtn = 'ኣብዚ መደብ ተመዝገቡ';
    } else if (isAr) {
      chips = ['الإنجليزية وIELTS', 'عفان أورومو', 'الأمهرية والتغرينية', 'الفرنسية والعربية'];
      badge = 'متحدثون أصليون وثنائيو اللغة';
      enrollBtn = 'سجّل في البرنامج';
    } else if (isZh) {
      chips = ['英语与IELTS雅思', '奥罗莫语', '阿姆哈拉语与提格雷语', '法语与阿拉伯语'];
      badge = '母语及双语专家';
      enrollBtn = '立即报名';
    } else if (isFr) {
      chips = ['Anglais & IELTS', 'Afaan Oromo', 'Amharique & Tigrigna', 'Français & Arabe'];
      badge = 'Locuteurs Natifs & Bilingues';
      enrollBtn = 'S\'inscrire au programme';
    } else if (isSw) {
      chips = ['Kiingereza & IELTS', 'Kioromo', 'Kiamhari & Kitigrinya', 'Kifaransa & Kiarabu'];
      badge = 'Wazungumzaji Asilia';
      enrollBtn = 'Jiunge na Mpango';
    }

    return { chips, badge, enrollBtn };
  }

  // ethics
  let chips = ['Academic Integrity', 'Emotional IQ (EQ)', 'Leadership', 'Discipline & Habits'];
  let badge = 'Life-Long Value';
  let enrollBtn = 'Enroll in Program';

  if (isAm) {
    chips = ['የትምህርት ታማኝነት', 'የስሜት ብስለት (EQ)', 'አመራርነት', 'ዲሲፕሊን እና ልማድ'];
    badge = 'ዘላቂ የህይወት እሴት';
    enrollBtn = 'በፕሮግራሙ ይመዝገቡ';
  } else if (isOm) {
    chips = ['Amanamummaa Barnootaa', 'Qalbii Miiraa (EQ)', 'Hoggansa', 'Naamusa fi Amala'];
    badge = 'Gatii Umrii Guutuu';
    enrollBtn = 'Sagantaa Kanatti Galmaa\'aa';
  } else if (isTi) {
    chips = ['ናይ ትምህርቲ ተኣማንነት', 'ስምዒታዊ ብስለት (EQ)', 'መሪሕነት', 'ስነ-ስርዓትን ልምድን'];
    badge = 'ዘላቒ ናይ ህይወት ክብርታት';
    enrollBtn = 'ኣብዚ መደብ ተመዝገቡ';
  } else if (isAr) {
    chips = ['الأمانة الأكاديمية', 'الذكاء العاطفي (EQ)', 'مهارات القيادة', 'الانضباط والعادات'];
    badge = 'قيمة دائمة للحياة';
    enrollBtn = 'سجّل في البرنامج';
  } else if (isZh) {
    chips = ['学术诚信', '情商培养 (EQ)', '领导力提升', '自律与良好习惯'];
    badge = '终身受益的核心价值';
    enrollBtn = '立即报名';
  } else if (isFr) {
    chips = ['Intégrité Académique', 'Quotient Émotionnel (QE)', 'Leadership', 'Discipline & Habitudes'];
    badge = 'Valeur à Vie';
    enrollBtn = 'S\'inscrire au programme';
  } else if (isSw) {
    chips = ['Uadilifu wa Masomo', 'Ukomavu wa Kihisia (EQ)', 'Uongozi', 'Nidhamu na Tabia'];
    badge = 'Thamani ya Kudumu';
    enrollBtn = 'Jiunge na Mpango';
  }

  return { chips, badge, enrollBtn };
}

// Localize user role badge in header / banner
export function getLocalizedRoleName(role: string, lang: SupportedLanguage | string = 'en'): string {
  const r = role.toLowerCase().trim();
  const map: Record<string, Record<string, string>> = {
    tutor: {
      en: 'Tutor', am: 'አስተማሪ', om: 'Barsiisaa', ti: 'መምህር', so: 'Macallin',
      ar: 'معلم', fr: 'Tuteur', es: 'Tutor', de: 'Tutor', zh: '教师', sw: 'Mkufunzi'
    },
    parent: {
      en: 'Parent', am: 'ወላጅ', om: 'Maatii', ti: 'ወላዲ', so: 'Waalid',
      ar: 'ولي أمر', fr: 'Parent', es: 'Padre/Madre', de: 'Elternteil', zh: '家长', sw: 'Mzazi'
    },
    admin: {
      en: 'Admin', am: 'አስተዳዳሪ', om: 'Gulaalaa', ti: 'ኣመሓዳሪ', so: 'Maamule',
      ar: 'مسؤول', fr: 'Administrateur', es: 'Administrador', de: 'Administrator', zh: '管理员', sw: 'Msimamizi'
    }
  };

  if (map[r] && map[r][lang]) {
    return map[r][lang];
  }
  return role;
}

// Localize Ethiopian and international tutoring locations across all supported languages
export function getLocalizedLocation(locationStr: string, lang: SupportedLanguage | string = 'en'): string {
  if (!locationStr) return '';
  if (lang === 'en') return locationStr;

  const loc = locationStr.trim();
  const l = lang;

  if (loc.includes('Kazanchis, Addis Ababa')) {
    const map: Record<string, string> = {
      am: 'ካዛንቺስ፣ አዲስ አበባ',
      om: 'Kaazaanchiis, Finfinnee',
      ti: 'ካዛንቺስ፣ ኣዲስ ኣበባ',
      so: 'Kazanchis, Addis Ababa',
      ar: 'كازانتشيس، أديس أبابا',
      fr: 'Kazanchis, Addis-Abeba',
      es: 'Kazanchis, Adís Abeba',
      de: 'Kazanchis, Addis Abeba',
      zh: '卡赞奇斯，亚的斯亚贝巴',
      sw: 'Kazanchis, Addis Ababa',
    };
    return map[l] || loc;
  }

  if (loc.includes('Bole Atlas, Addis Ababa (In-Person)') || loc.includes('Bole Atlas, Addis Ababa')) {
    const hasInPerson = loc.includes('In-Person');
    const map: Record<string, string> = {
      am: hasInPerson ? 'ቦሌ አትላስ፣ አዲስ አበባ (በአካል)' : 'ቦሌ አትላስ፣ አዲስ አበባ',
      om: hasInPerson ? 'Bolee Atlaas, Finfinnee (Qaamaan)' : 'Bolee Atlaas, Finfinnee',
      ti: hasInPerson ? 'ቦሌ ኣትላስ፣ ኣዲስ ኣበባ (ብኣካል)' : 'ቦሌ ኣትላስ፣ ኣዲስ ኣበባ',
      so: hasInPerson ? 'Bole Atlas, Addis Ababa (Qof ahaan)' : 'Bole Atlas, Addis Ababa',
      ar: hasInPerson ? 'بولي أطلس، أديس أبابا (حضورياً)' : 'بولي أطلس، أديس أبابا',
      fr: hasInPerson ? 'Bole Atlas, Addis-Abeba (En présentiel)' : 'Bole Atlas, Addis-Abeba',
      es: hasInPerson ? 'Bole Atlas, Adís Abeba (Presencial)' : 'Bole Atlas, Adís Abeba',
      de: hasInPerson ? 'Bole Atlas, Addis Abeba (Präsenz)' : 'Bole Atlas, Addis Abeba',
      zh: hasInPerson ? '博乐阿特拉斯，亚的斯亚贝巴 (线下)' : '博乐阿特拉斯，亚的斯亚贝巴',
      sw: hasInPerson ? 'Bole Atlas, Addis Ababa (Ana kwa ana)' : 'Bole Atlas, Addis Ababa',
    };
    return map[l] || loc;
  }

  if (loc.includes('CMC Michael, Addis Ababa (In-Person)') || loc.includes('CMC Michael, Addis Ababa')) {
    const hasInPerson = loc.includes('In-Person');
    const map: Record<string, string> = {
      am: hasInPerson ? 'ሲኤምሲ ሚካኤል፣ አዲስ አበባ (በአካል)' : 'ሲኤምሲ ሚካኤል፣ አዲስ አበባ',
      om: hasInPerson ? 'CMC Mikaa\'eel, Finfinnee (Qaamaan)' : 'CMC Mikaa\'eel, Finfinnee',
      ti: hasInPerson ? 'ሲኤምሲ ሚካኤል፣ ኣዲስ ኣበባ (ብኣካል)' : 'ሲኤምሲ ሚካኤል፣ ኣዲስ ኣበባ',
      so: hasInPerson ? 'CMC Michael, Addis Ababa (Qof ahaan)' : 'CMC Michael, Addis Ababa',
      ar: hasInPerson ? 'سي إم سي ميكائيل، أديس أبابا (حضورياً)' : 'سي إم سي ميكائيل، أديس أبابا',
      fr: hasInPerson ? 'CMC Michael, Addis-Abeba (En présentiel)' : 'CMC Michael, Addis-Abeba',
      es: hasInPerson ? 'CMC Michael, Adís Abeba (Presencial)' : 'CMC Michael, Adís Abeba',
      de: hasInPerson ? 'CMC Michael, Addis Abeba (Präsenz)' : 'CMC Michael, Addis Abeba',
      zh: hasInPerson ? 'CMC米迦勒，亚的斯亚贝巴 (线下)' : 'CMC米迦勒，亚的斯亚贝巴',
      sw: hasInPerson ? 'CMC Michael, Addis Ababa (Ana kwa ana)' : 'CMC Michael, Addis Ababa',
    };
    return map[l] || loc;
  }

  if (loc.includes('Sarbet / Old Airport (In-Person or Hybrid)') || loc.includes('Sarbet / Old Airport')) {
    const hasHybrid = loc.includes('Hybrid');
    const map: Record<string, string> = {
      am: hasHybrid ? 'ሳርቤት / ብሉይ አውሮፕላን ማረፊያ (በአካል ወይም ድብልቅ)' : 'ሳርቤት / ብሉይ አውሮፕላን ማረፊያ',
      om: hasHybrid ? 'Saarbeet / Buufata Xiyyara Moofaa (Qaamaan ykn Makuu)' : 'Saarbeet / Buufata Xiyyara Moofaa',
      ti: hasHybrid ? 'ሳርቤት / ብሉይ መዕረፍ ነፈርቲ (ብኣካል ወይ ድቡልቕ)' : 'ሳርቤት / ብሉይ መዕረፍ ነፈርቲ',
      so: hasHybrid ? 'Sarbet / Garoonka Diyaaradaha Hore (Qof ahaan ama Isku-dhafan)' : 'Sarbet / Garoonka Diyaaradaha Hore',
      ar: hasHybrid ? 'ساربيت / المطار القديم (حضورياً أو مدمج)' : 'ساربيت / المطار القديم',
      fr: hasHybrid ? 'Sarbet / Ancien Aéroport (Présentiel ou Hybride)' : 'Sarbet / Ancien Aéroport',
      es: hasHybrid ? 'Sarbet / Antiguo Aeropuerto (Presencial o Híbrido)' : 'Sarbet / Antiguo Aeropuerto',
      de: hasHybrid ? 'Sarbet / Alter Flughafen (Präsenz oder Hybrid)' : 'Sarbet / Alter Flughafen',
      zh: hasHybrid ? '萨尔贝特 / 老机场 (线下或线上混合)' : '萨尔贝特 / 老机场',
      sw: hasHybrid ? 'Sarbet / Uwanja wa Ndege wa Zamani (Ana kwa ana au Mseto)' : 'Sarbet / Uwanja wa Ndege wa Zamani',
    };
    return map[l] || loc;
  }

  if (loc.includes('Addis Ababa, Ethiopia')) {
    const map: Record<string, string> = {
      am: 'አዲስ አበባ፣ ኢትዮጵያ',
      om: 'Finfinnee, Itoophiyaa',
      ti: 'ኣዲስ ኣበባ፣ ኢትዮጵያ',
      so: 'Addis Ababa, Itoobiya',
      ar: 'أديس أبابا، إثيوبيا',
      fr: 'Addis-Abeba, Éthiopie',
      es: 'Adís Abeba, Etiopía',
      de: 'Addis Abeba, Äthiopien',
      zh: '亚的斯亚贝巴，埃塞俄比亚',
      sw: 'Addis Ababa, Ethiopia',
    };
    return map[l] || loc;
  }

  if (loc.includes('Addis Ababa')) {
    const map: Record<string, string> = {
      am: 'አዲስ አበባ',
      om: 'Finfinnee',
      ti: 'ኣዲስ ኣበባ',
      so: 'Addis Ababa',
      ar: 'أديس أبابا',
      fr: 'Addis-Abeba',
      es: 'Adís Abeba',
      de: 'Addis Abeba',
      zh: '亚的斯亚贝巴',
      sw: 'Addis Ababa',
    };
    return loc.replace('Addis Ababa', map[l] || 'Addis Ababa');
  }

  return loc;
}

// Localize tutoring subjects across all supported languages
export function getLocalizedSubject(subjectStr: string, lang: SupportedLanguage | string = 'en'): string {
  if (!subjectStr) return '';
  if (lang === 'en') return subjectStr;

  const s = subjectStr.trim();
  const l = lang;

  if (s.includes('Mathematics & Physics') || s.includes('Math & Physics')) {
    const map: Record<string, string> = {
      am: 'ሂሳብ እና ፊዚክስ',
      om: 'Herrega fi Fiiziksii',
      ti: 'ሒሳብን ፊዚክስን',
      so: 'Xisaab & Fiisigis',
      ar: 'الرياضيات والفيزياء',
      fr: 'Mathématiques et Physique',
      es: 'Matemáticas y Física',
      de: 'Mathematik & Physik',
      zh: '数学与物理',
      sw: 'Hisabati na Fizikia',
    };
    return map[l] || s;
  }

  if (s.includes('Physics & Chemistry')) {
    const map: Record<string, string> = {
      am: 'ፊዚክስ እና ኬሚስትሪ',
      om: 'Fiiziksii fi Keemistirii',
      ti: 'ፊዚክስን ኬሚስትሪን',
      so: 'Fiisigis & Kimistari',
      ar: 'الفيزياء والكيمياء',
      fr: 'Physique et Chimie',
      es: 'Física y Química',
      de: 'Physik & Chemie',
      zh: '物理与化学',
      sw: 'Fizikia na Kemia',
    };
    return map[l] || s;
  }

  if (s.includes('Elementary Mathematics & Amharic Reading') || s.includes('Math & Amharic Literacy') || s.includes('Math & Amharic Reading')) {
    const map: Record<string, string> = {
      am: 'የመጀመሪያ ደረጃ ሂሳብ እና አማርኛ ማንበብ/መጻፍ',
      om: 'Herrega Sadarkaa Tokkoffaa fi Dubbisa Afaan Amaaraa',
      ti: 'ናይ ቀዳማይ ብርኪ ሒሳብን ንባብ ኣምሓርኛን',
      so: 'Xisaabta Dugsiga Hoose & Akhriska Amxaariga',
      ar: 'الرياضيات الابتدائية وقراءة اللغة الأمهرية',
      fr: 'Mathématiques Élémentaires et Lecture Amharique',
      es: 'Matemáticas Primarias y Lectura en Amárico',
      de: 'Grundschulmathematik & Amharisch-Lesen',
      zh: '小学数学与阿姆哈拉语阅读',
      sw: 'Hisabati ya Msingi na Kusoma Kiamhari',
    };
    return map[l] || s;
  }

  if (s.includes('Cambridge IGCSE Extended Mathematics & Physics')) {
    const map: Record<string, string> = {
      am: 'ካምብሪጅ IGCSE የተራዘመ ሂሳብ እና ፊዚክስ',
      om: 'Kaambiriij IGCSE Herrega Bal\'aa fi Fiiziksii',
      ti: 'ካምብሪጅ IGCSE ዝተዘርግሐ ሒሳብን ፊዚክስን',
      so: 'Cambridge IGCSE Xisaab & Fiisigis Horumarsan',
      ar: 'كامبريدج IGCSE الرياضيات الموسعة والفيزياء',
      fr: 'Cambridge IGCSE Mathématiques Avancées et Physique',
      es: 'Cambridge IGCSE Matemáticas Avanzadas y Física',
      de: 'Cambridge IGCSE Erweiterte Mathematik & Physik',
      zh: '剑桥IGCSE高级拓展数学与物理',
      sw: 'Cambridge IGCSE Hisabati Iliyopanuliwa na Fizikia',
    };
    return map[l] || s;
  }

  if (s.includes('Grade 8 Ministry Exam Math & General Science')) {
    const map: Record<string, string> = {
      am: 'የ8ኛ ክፍል ሚኒስቴር ፈተና ሂሳብ እና አጠቃላይ ሳይንስ',
      om: 'Qormaata Ministeeraa Kutaa 8ffaa Herrega fi Saayinsii Waligalaa',
      ti: 'ናይ 8ይ ክፍሊ ፈተና ሚኒስቴር ሒሳብን ሓፈሻዊ ሳይንስን',
      so: 'Imtixaanka Wasaaradda Fasalka 8aad Xisaab & Sayniska Guud',
      ar: 'امتحان الوزارة للصف الثامن في الرياضيات والعلوم العامة',
      fr: 'Examen Ministériel 8e Année Mathématiques et Sciences Générales',
      es: 'Examen Ministerial de 8.° Grado: Matemáticas y Ciencias Generales',
      de: 'Ministeriumsprüfung 8. Klasse Mathematik & Allgemeine Naturwissenschaften',
      zh: '八年级统考升学数学与综合科学',
      sw: 'Mtihani wa Wizara wa Kidato cha 8 Hisabati na Sayansi ya Jumla',
    };
    return map[l] || s;
  }

  if (s.includes('English & IELTS')) {
    const map: Record<string, string> = {
      am: 'እንግሊዝኛ እና IELTS',
      om: 'Afaan Ingilizii fi IELTS',
      ti: 'ቋንቋ እንግሊዝን IELTSን',
      so: 'Ingiriisi & IELTS',
      ar: 'اللغة الإنجليزية و IELTS',
      fr: 'Anglais & IELTS',
      es: 'Inglés e IELTS',
      de: 'Englisch & IELTS',
      zh: '英语与雅思 (IELTS)',
      sw: 'Kiingereza na IELTS',
    };
    return map[l] || s;
  }

  // Generic subject replacements
  const words: Record<string, Record<string, string>> = {
    Mathematics: { am: 'ሂሳብ', om: 'Herrega', ti: 'ሒሳብ', so: 'Xisaab', ar: 'الرياضيات', fr: 'Mathématiques', es: 'Matemáticas', de: 'Mathematik', zh: '数学', sw: 'Hisabati' },
    Physics: { am: 'ፊዚክስ', om: 'Fiiziksii', ti: 'ፊዚክስ', so: 'Fiisigis', ar: 'الفيزياء', fr: 'Physique', es: 'Física', de: 'Physik', zh: '物理', sw: 'Fizikia' },
    Chemistry: { am: 'ኬሚስትሪ', om: 'Keemistirii', ti: 'ኬሚስትሪ', so: 'Kimistari', ar: 'الكيمياء', fr: 'Chimie', es: 'Química', de: 'Chemie', zh: '化学', sw: 'Kemia' },
    Biology: { am: 'ባዮሎጂ', om: 'Baayoloojii', ti: 'ባዮሎጂ', so: 'Bayoloji', ar: 'الأحياء', fr: 'Biologie', es: 'Biología', de: 'Biologie', zh: '生物', sw: 'Biolojia' }
  };

  let res = s;
  Object.keys(words).forEach(k => {
    if (res.includes(k) && words[k][l]) {
      res = res.replace(new RegExp(k, 'g'), words[k][l]);
    }
  });

  return res;
}

// Localize tutoring schedules, days, and times
export function getLocalizedSchedule(schedStr: string, lang: SupportedLanguage | string = 'en'): string {
  if (!schedStr) return '';
  if (lang === 'en') return schedStr;

  const sch = schedStr.trim();
  const l = lang;

  if (sch.includes('Mon, Wed, Fri afternoons') || sch.includes('Mon, Wed, Fri • 4:30 PM - 6:30 PM')) {
    const map: Record<string, string> = {
      am: 'ሰኞ፣ ረቡዕ፣ አርብ • ከቀኑ 10:30 - 12:30 (ከሰዓት)',
      om: 'Wixata, Roobii, Jimmata waaree booda (10:30 - 12:30)',
      ti: 'ሰኑይ፣ ረቡዕ፣ ዓርቢ ድሕሪ ቐትሪ (10:30 - 12:30)',
      so: 'Isniin, Arbaco, Jimco galabkii (4:30 PM - 6:30 PM)',
      ar: 'الإثنين، الأربعاء، الجمعة بعد الظهر (4:30 م - 6:30 م)',
      fr: 'Lun, Mer, Ven après-midi (16h30 - 18h30)',
      es: 'Lun, Mié, Vie por la tarde (4:30 PM - 6:30 PM)',
      de: 'Mo, Mi, Fr nachmittags (16:30 - 18:30 Uhr)',
      zh: '周一、周三、周五 下午 (4:30 - 6:30)',
      sw: 'Jumatatu, Jumatano, Ijumaa mchana (Saa 10:30 - 12:30)',
    };
    return map[l] || sch;
  }

  if (sch.includes('Monday & Thursday afternoons')) {
    const map: Record<string, string> = {
      am: 'ሰኞ እና ሐሙስ ከሰዓት',
      om: 'Wixata fi Kamisa waaree booda',
      ti: 'ሰኑይን ሓሙስን ድሕሪ ቐትሪ',
      so: 'Isniin & Khamiis galabkii',
      ar: 'الإثنين والخميس بعد الظهر',
      fr: 'Lundi et Jeudi après-midi',
      es: 'Lunes y Jueves por la tarde',
      de: 'Montag & Donnerstag nachmittags',
      zh: '周一和周四 下午',
      sw: 'Jumatatu na Alhamisi mchana',
    };
    return map[l] || sch;
  }

  if (sch.includes('Saturday & Sunday mornings')) {
    const map: Record<string, string> = {
      am: 'ቅዳሜ እና እሁድ ጥዋት',
      om: 'Sanbata fi Dilbata ganama',
      ti: 'ቀዳምን ሰንበትን ንግሆ',
      so: 'Sabti & Axad subaxdii',
      ar: 'السبت والأحد صباحاً',
      fr: 'Samedi et Dimanche matin',
      es: 'Sábado y Domingo por la mañana',
      de: 'Samstag & Sonntag vormittags',
      zh: '周六和周日 上午',
      sw: 'Jumamosi na Jumapili asubuhi',
    };
    return map[l] || sch;
  }

  if (sch.includes('Tuesday, Thursday, Saturday')) {
    const map: Record<string, string> = {
      am: 'ማክሰኞ፣ ሐሙስ፣ ቅዳሜ',
      om: 'Kibxata, Kamisa, Sanbata',
      ti: 'ሰሉስ፣ ሓሙስ፣ ቀዳም',
      so: 'Talaado, Khamiis, Sabti',
      ar: 'الثلاثاء والخميس والسبت',
      fr: 'Mardi, Jeudi, Samedi',
      es: 'Martes, Jueves, Sábado',
      de: 'Dienstag, Donnerstag, Samstag',
      zh: '周二、周四、周六',
      sw: 'Jumanne, Alhamisi, Jumamosi',
    };
    return map[l] || sch;
  }

  return sch;
}

// Localize educational grades
export function getLocalizedGrade(gradeStr: string, lang: SupportedLanguage | string = 'en'): string {
  if (!gradeStr) return '';
  if (lang === 'en') return gradeStr;

  const g = gradeStr.trim();
  const l = lang;

  if (g.includes('Grade 12 (Natural Science)') || g.includes('Grade 12')) {
    const hasNatural = g.includes('Natural');
    const map: Record<string, string> = {
      am: hasNatural ? '12ኛ ክፍል (የተፈጥሮ ሳይንስ)' : '12ኛ ክፍል',
      om: hasNatural ? 'Kutaa 12ffaa (Saayinsii Uumamaa)' : 'Kutaa 12ffaa',
      ti: hasNatural ? '12ይ ክፍሊ (ተፈጥሮ ሳይንስ)' : '12ይ ክፍሊ',
      so: hasNatural ? 'Fasalka 12aad (Sayniska Dabiiciga ah)' : 'Fasalka 12aad',
      ar: hasNatural ? 'الصف 12 (العلوم الطبيعية)' : 'الصف 12',
      fr: hasNatural ? '12e Année (Sciences Naturelles)' : '12e Année',
      es: hasNatural ? '12.° Grado (Ciencias Naturales)' : '12.° Grado',
      de: hasNatural ? '12. Klasse (Naturwissenschaften)' : '12. Klasse',
      zh: hasNatural ? '高三/12年级 (理科/自然科学)' : '高三/12年级',
      sw: hasNatural ? 'Kidato cha 12 (Sayansi Asilia)' : 'Kidato cha 12',
    };
    return map[l] || g;
  }

  if (g.includes('Grade 8 (Regional Ministry Exam)') || g.includes('Grade 8')) {
    const hasRegional = g.includes('Regional') || g.includes('Ministry');
    const map: Record<string, string> = {
      am: hasRegional ? '8ኛ ክፍል (የክልል ሚኒስቴር ፈተና)' : '8ኛ ክፍል',
      om: hasRegional ? 'Kutaa 8ffaa (Qormaata Naannoo)' : 'Kutaa 8ffaa',
      ti: hasRegional ? '8ይ ክፍሊ (ፈተና ክልል)' : '8ይ ክፍሊ',
      so: hasRegional ? 'Fasalka 8aad (Imtixaanka Gobolka)' : 'Fasalka 8aad',
      ar: hasRegional ? 'الصف 8 (امتحان الوزارة الإقليمي)' : 'الصف 8',
      fr: hasRegional ? '8e Année (Examen Régional)' : '8e Année',
      es: hasRegional ? '8.° Grado (Examen Ministerial Regional)' : '8.° Grado',
      de: hasRegional ? '8. Klasse (Regionale Ministeriumsprüfung)' : '8. Klasse',
      zh: hasRegional ? '初二/8年级 (区域统考)' : '初二/8年级',
      sw: hasRegional ? 'Kidato cha 8 (Mtihani wa Mkoa)' : 'Kidato cha 8',
    };
    return map[l] || g;
  }

  if (g.includes('Grade 4')) {
    const map: Record<string, string> = {
      am: '4ኛ ክፍል', om: 'Kutaa 4ffaa', ti: '4ይ ክፍሊ', so: 'Fasalka 4aad',
      ar: 'الصف 4', fr: '4e Année', es: '4.° Grado', de: '4. Klasse', zh: '小学四年级', sw: 'Kidato cha 4'
    };
    return map[l] || g;
  }

  if (g.includes('IGCSE')) {
    const map: Record<string, string> = {
      am: 'IGCSE (ዓለም አቀፍ ሥርዓተ ትምህርት)',
      om: 'IGCSE (Sirna Barnootaa Idil-addunyaa)',
      ti: 'IGCSE (ዓለምለኸ ስርዓተ ትምህርቲ)',
      so: 'IGCSE (Manhajka Caalamiga ah)',
      ar: 'IGCSE (المنهج الدولي)',
      fr: 'IGCSE (Programme International)',
      es: 'IGCSE (Currículo Internacional)',
      de: 'IGCSE (Internationales Curriculum)',
      zh: 'IGCSE (国际课程体系)',
      sw: 'IGCSE (Mtaala wa Kimataifa)'
    };
    return map[l] || g;
  }

  return g;
}

// Localize pricing rates
export function getLocalizedRate(rateStr: string, lang: SupportedLanguage | string = 'en'): string {
  if (!rateStr) return '';
  if (lang === 'en') return rateStr;

  const l = lang;
  let out = rateStr;

  const perHourMap: Record<string, string> = {
    am: 'ብር / በሰዓት',
    om: 'ETB / sa\'aatiitti',
    ti: 'ብር / ኣብ ሰዓት',
    so: 'ETB / saacaddii',
    ar: 'بر إثيوبي / ساعة',
    fr: 'ETB / heure',
    es: 'ETB / hora',
    de: 'ETB / Stunde',
    zh: '比尔 / 小时',
    sw: 'ETB / saa',
  };

  const perMonthMap: Record<string, string> = {
    am: 'ሰዓት/በወር',
    om: 'sa\'aatii/ji\'atti',
    ti: 'ሰዓታት/ኣብ ወርሒ',
    so: 'saacadood/bishiiba',
    ar: 'ساعة/شهرياً',
    fr: 'h/mois',
    es: 'hrs/mes',
    de: 'Std./Monat',
    zh: '小时/月',
    sw: 'saa/mwezi',
  };

  const daysWeekMap: Record<string, string> = {
    am: 'ቀናት/በሳምንት',
    om: 'guyyoota/torbaanitti',
    ti: 'መዓልትታት/ኣብ ሰሙን',
    so: 'maalmood/todbaadkii',
    ar: 'أيام/أسبوعياً',
    fr: 'jours/semaine',
    es: 'días/semana',
    de: 'Tage/Woche',
    zh: '天/周',
    sw: 'siku/wiki',
  };

  const hrsDayMap: Record<string, string> = {
    am: 'ሰዓት/በቀን',
    om: 'sa\'aatii/guyyaatti',
    ti: 'ሰዓት/ኣብ መዓልቲ',
    so: 'saacadood/maalintii',
    ar: 'ساعة/يومياً',
    fr: 'heures/jour',
    es: 'hrs/día',
    de: 'Std./Tag',
    zh: '小时/天',
    sw: 'saa/siku',
  };

  if (perHourMap[l]) {
    out = out.replace(/ETB\s*\/\s*hour/g, perHourMap[l]);
  }
  if (perMonthMap[l]) {
    out = out.replace(/hrs\/month/g, perMonthMap[l]).replace(/hours\/month/g, perMonthMap[l]);
  }
  if (daysWeekMap[l]) {
    out = out.replace(/days\/week/g, daysWeekMap[l]);
  }
  if (hrsDayMap[l]) {
    out = out.replace(/hrs\/day/g, hrsDayMap[l]);
  }

  return out;
}

// Localize Calendar Dates and Month-Year strings across all supported languages
export function getLocalizedDate(dateStr: string, lang: SupportedLanguage | string = 'en'): string {
  if (!dateStr) return '';
  if (lang === 'en') return dateStr;

  const monthsMap: Record<string, Record<string, string>> = {
    January: { am: 'ጃንዋሪ', om: 'Amajjii', ti: 'ጥሪ', so: 'Janaayo', ar: 'يناير', fr: 'Janvier', es: 'Enero', de: 'Januar', zh: '1月', sw: 'Januari' },
    February: { am: 'ፌብሩዋሪ', om: 'Guraandhala', ti: 'ለካቲት', so: 'Febraayo', ar: 'فبراير', fr: 'Février', es: 'Febrero', de: 'Februar', zh: '2月', sw: 'Februari' },
    March: { am: 'ማርች', om: 'Bitooteessa', ti: 'መጋቢት', so: 'Maarso', ar: 'مارس', fr: 'Mars', es: 'Marzo', de: 'März', zh: '3月', sw: 'Machi' },
    April: { am: 'ኤፕሪል', om: 'Ebla', ti: 'ሚያዝያ', so: 'Abriil', ar: 'أبريل', fr: 'Avril', es: 'Abril', de: 'April', zh: '4月', sw: 'Aprili' },
    May: { am: 'ሜይ', om: 'Caamsaa', ti: 'ግንቦት', so: 'Maajo', ar: 'مايو', fr: 'Mai', es: 'Mayo', de: 'Mai', zh: '5月', sw: 'Mei' },
    June: { am: 'ጁን', om: 'Waxabajjii', ti: 'ሰነ', so: 'Juun', ar: 'يونيو', fr: 'Juin', es: 'Junio', de: 'Juni', zh: '6月', sw: 'Juni' },
    July: { am: 'ጁላይ', om: 'Adoolessa', ti: 'ሓምለ', so: 'Luuliyo', ar: 'يوليو', fr: 'Juillet', es: 'Julio', de: 'Juli', zh: '7月', sw: 'Julai' },
    August: { am: 'ኦገስት', om: 'Hagayya', ti: 'ነሓሰ', so: 'Ogowst', ar: 'أغسطس', fr: 'Août', es: 'Agosto', de: 'August', zh: '8月', sw: 'Agosti' },
    September: { am: 'ሴፕቴምበር', om: 'Fulbaana', ti: 'መስከረም', so: 'Sebteembar', ar: 'سبتمبر', fr: 'Septembre', es: 'Septiembre', de: 'September', zh: '9月', sw: 'Septemba' },
    October: { am: 'ኦክቶበር', om: 'Onkololeessa', ti: 'ጥቅምቲ', so: 'Oktoobar', ar: 'أكتوبر', fr: 'Octobre', es: 'Octubre', de: 'Oktober', zh: '10月', sw: 'Oktoba' },
    November: { am: 'ኖቬምበር', om: 'Sadaasa', ti: 'ሕዳር', so: 'Nofeembar', ar: 'نوفمبر', fr: 'Novembre', es: 'Noviembre', de: 'November', zh: '11月', sw: 'Novemba' },
    December: { am: 'ዲሴምበር', om: 'Muddee', ti: 'ታሕሳስ', so: 'Diseembar', ar: 'ديسمبر', fr: 'Décembre', es: 'Diciembre', de: 'Dezember', zh: '12月', sw: 'Desemba' },
  };

  let res = dateStr;
  Object.keys(monthsMap).forEach(month => {
    if (res.includes(month)) {
      const trans = monthsMap[month][lang];
      if (trans) res = res.replace(new RegExp(month, 'g'), trans);
    }
  });

  return res;
}

// Localize all toast notification messages dynamically across all 11 languages
export function getLocalizedToastMessage(msg: string, lang: SupportedLanguage | string = 'en'): string {
  if (!msg) return '';
  if (lang === 'en') return msg;

  const l = lang;

  // Pattern-based matchers
  if (msg.includes('Monthly payout voucher and receipt screenshot successfully sent to')) {
    const nameMatch = msg.replace('Monthly payout voucher and receipt screenshot successfully sent to ', '').replace('!', '');
    const name = getLocalizedPersonName(nameMatch, lang);
    const map: Record<string, string> = {
      am: `ወርሃዊ የክፍያ ደረሰኝ ስክሪንሾት ለ${name} በተሳካ ሁኔታ ተልኳል!`,
      om: `Nagaheen kaffaltii fi iskiriinshootiin gara ${name}tti milkaa'inaan ergameera!`,
      ti: `ናይ ወርሒ ክፍሊት ደረሰኝ ናብ ${name} ብዓወት ተላኢኹ!`,
      so: `Rasiidka bixinta lacagta ee bisha waxaa si guul leh loogu diray ${name}!`,
      ar: `تم إرسال إيصال الدفع الشهري بنجاح إلى ${name}!`,
      fr: `Le reçu de paiement mensuel a été envoyé avec succès à ${name} !`,
      es: `¡El comprobante de pago mensual se envió con éxito a ${name}!`,
      de: `Monatlicher Auszahlungsbeleg erfolgreich an ${name} gesendet!`,
      zh: `每月导师款项收据与转账凭证已成功发送给 ${name}！`,
      sw: `Stakabadhi ya malipo ya mwezi imetumwa kwa ufanisi kwa ${name}!`,
    };
    return map[l] || msg;
  }

  if (msg.includes('500 ETB membership receipt submitted for admin verification!')) {
    const map: Record<string, string> = {
      am: 'የ 500 ብር የአባልነት ደረሰኝ ለአስተዳዳሪ ማረጋገጫ ገብቷል!',
      om: 'Nagaheen miseensummaa Qarshii 500 mirkaneessaaf dhiyaateera!',
      ti: 'ናይ 500 ብር ኣባልነት ደረሰኝ ንምርግጋጽ ቀሪቡ ኣሎ!',
      so: 'Rasiidka xubinnimada ee 500 ETB waxaa loo gudbiyay xaqiijinta maamulka!',
      ar: 'تم إرسال إيصال عضوية 500 بر لمراجعة الإدارة!',
      fr: 'Reçu d\'adhésion de 500 ETB soumis pour vérification !',
      es: '¡Comprobante de membresía de 500 ETB enviado para verificación!',
      de: 'Mitgliedschaftsbeleg über 500 ETB zur Überprüfung eingereicht!',
      zh: '500比尔教师会员凭证已提交管理员审核！',
      sw: 'Stakabadhi ya uanachama ya 500 ETB imewasilishwa kwa ukaguzi!',
    };
    return map[l] || msg;
  }

  if (msg.includes('500 ETB receipt screenshot loaded!')) {
    const map: Record<string, string> = {
      am: 'የ 500 ብር የክፍያ ደረሰኝ ስክሪንሾት ተጭኗል!',
      om: 'Iskiriinshootiin nagahee Qarshii 500 fe\'ameera!',
      ti: 'ናይ 500 ብር ደረሰኝ ስክሪንሾት ተጻዒኑ!',
      so: 'Sawirka rasiidka 500 ETB waa la soo galiyay!',
      ar: 'تم تحميل لقطة شاشة إيصال 500 بر!',
      fr: 'Capture d\'écran du reçu de 500 ETB chargée !',
      es: '¡Captura del recibo de 500 ETB cargada!',
      de: 'Screenshot des 500-ETB-Belegs geladen!',
      zh: '已上传500比尔收据截图！',
      sw: 'Picha ya stakabadhi ya 500 ETB imepakiwa!',
    };
    return map[l] || msg;
  }

  if (msg.includes('Monthly report submitted to Ador Admin for dispatch to parent!')) {
    const map: Record<string, string> = {
      am: 'ወርሃዊ የሂደት ሪፖርት ለወላጅ እንዲላክ ለአስተዳዳሪ ቀርቧል!',
      om: 'Gabaasni ji\'aa maatiif akka darbuuf maamulaaf dhiyaateera!',
      ti: 'ወርሓዊ ጸብጻብ ናብ ወላዲ ንኽለኣኽ ንኣመሓዳሪ ቀሪቡ!',
      so: 'Warbixinta bisha waxaa loo gudbiyay maamulka si loogu diro waalidka!',
      ar: 'تم إرسال التقرير الشهري للإدارة لإرساله إلى ولي الأمر!',
      fr: 'Rapport mensuel soumis à l\'administration pour transmission aux parents !',
      es: '¡Informe mensual enviado a administración para remitir a los padres!',
      de: 'Monatsbericht an den Administrator zur Weiterleitung an die Eltern übermittelt!',
      zh: '月度学生教学报告已提交管理员审核并转交家长！',
      sw: 'Ripoti ya mwezi imewasilishwa kwa msimamizi kutumwa kwa wazazi!',
    };
    return map[l] || msg;
  }

  if (msg.includes('Placement commission proof submitted for Ador Admin verification!')) {
    const map: Record<string, string> = {
      am: 'የምደባ ኮሚሽን ማረጋገጫ ለአስተዳዳሪ ምርመራ ገብቷል!',
      om: 'Ragaan komishinii ramaddii mirkaneessaaf maamulaaf dhiyaateera!',
      ti: 'መረዳእታ ኮሚሽን ምደባ ንኣመሓዳሪ ቀሪቡ!',
      so: 'Caddeynta komishanka meeleynta waxaa loo gudbiyay maamulka!',
      ar: 'تم تقديم إثبات عمولة التعيين لمراجعة الإدارة!',
      fr: 'Preuve de commission de placement soumise à vérification !',
      es: '¡Comprobante de comisión de colocación enviado para verificación!',
      de: 'Vermittlungsprovisionsnachweis zur Prüfung eingereicht!',
      zh: '家教配对佣金转账凭证已提交管理员审核！',
      sw: 'Uthibitisho wa kamisheni ya kazi umewasilishwa kwa msimamizi!',
    };
    return map[l] || msg;
  }

  if (msg.includes('applied for') && msg.includes('successfully!')) {
    const map: Record<string, string> = {
      am: 'ለስራው በተሳካ ሁኔታ አመልክተዋል! ሁኔታ: በአስተዳዳሪ ምርመራ ላይ።',
      om: 'Hojiichaaf milkaa\'inaan iyyattaniittu! Haalli: Qorannoo jala jira.',
      ti: 'ነቲ ስራሕ ብዓወት ኣመሊኽኩም! ኩነታት: ኣብ ምክትታል ይርከብ።',
      so: 'Si guul leh ayaad ugu codsatay shaqada! Xaaladda: Dib u eegis maamul.',
      ar: 'تم التقديم على الوظيفة بنجاح! الحالة: قيد مراجعة الإدارة.',
      fr: 'Candidature enregistrée avec succès ! Statut : en cours d\'examen.',
      es: '¡Postulación enviada con éxito! Estado: En revisión por administración.',
      de: 'Erfolgreich für die Stelle beworben! Status: In Prüfung.',
      zh: '已成功申请该职位！当前状态：管理员审核中。',
      sw: 'Umeomba kazi hii kwa ufanisi! Hali: Inakaguliwa na msimamizi.',
    };
    return map[l] || msg;
  }

  if (msg.includes('Parent payment marked as approved')) {
    const map: Record<string, string> = {
      am: 'የወላጅ ክፍያ ጸድቋል!',
      om: 'Kaffaltiin maatii mirkanaa\'eera!',
      ti: 'ክፍሊት ወላዲ ጸዲቑ!',
      so: 'Lacag-bixinta waalidka waa la oggolaaday!',
      ar: 'تم اعتماد دفع ولي الأمر بنجاح!',
      fr: 'Paiement des parents approuvé !',
      es: '¡Pago del tutor legal aprobado!',
      de: 'Elternzahlung genehmigt!',
      zh: '家长学费支付已确认核准！',
      sw: 'Malipo ya mzazi yameidhinishwa!',
    };
    return map[l] || msg;
  }

  if (msg.includes('Parent payment marked as rejected')) {
    const map: Record<string, string> = {
      am: 'የወላጅ ክፍያ ውድቅ ተደርጓል!',
      om: 'Kaffaltiin maatii kuffifameera!',
      ti: 'ክፍሊት ወላዲ ውድቂ ኾይኑ!',
      so: 'Lacag-bixinta waalidka waa la diiday!',
      ar: 'تم رفض دفعة ولي الأمر!',
      fr: 'Paiement des parents rejeté !',
      es: '¡Pago de padres rechazado!',
      de: 'Elternzahlung abgelehnt!',
      zh: '家长学费支付已标记拒绝！',
      sw: 'Malipo ya mzazi yamekataliwa!',
    };
    return map[l] || msg;
  }

  if (msg.includes('Tutor 500 ETB membership marked as verified')) {
    const map: Record<string, string> = {
      am: 'የአስተማሪ 500 ብር አባልነት ተረጋግጧል!',
      om: 'Miseensummaan barsiisaa Qarshii 500 mirkanaa\'eera!',
      ti: 'ናይ መምህር 500 ብር ኣባልነት ተረጋጊጹ!',
      so: 'Xubinnimada macallinka ee 500 ETB waa la xaqiijiyay!',
      ar: 'تم التحقق من عضوية المعلم 500 بر!',
      fr: 'Adhésion tuteur 500 ETB validée !',
      es: '¡Membresía de tutor de 500 ETB verificada!',
      de: 'Lehrer-Mitgliedschaft (500 ETB) verifiziert!',
      zh: '教师500比尔会员已通过验证！',
      sw: 'Uanachama wa mkufunzi wa 500 ETB umethibitishwa!',
    };
    return map[l] || msg;
  }

  if (msg.includes('Placement commission marked as approved')) {
    const map: Record<string, string> = {
      am: 'የምደባ ኮሚሽን ጸድቋል! ውሉ ተግባራዊ ተደርጓል።',
      om: 'Komishiniin ramaddii mirkanaa\'eera! Waliigalteen ragga\'eera.',
      ti: 'ኮሚሽን ምደባ ጸዲቑ! ውዕል ተኸቲሉ ኣሎ።',
      so: 'Komishanka meeleynta waa la oggolaaday! Heshiiskii waa la cusbooneysiiyay.',
      ar: 'تم اعتماد عمولة التعيين وتفعيل العقد!',
      fr: 'Commission de placement approuvée ! Contrat actualisé.',
      es: '¡Comisión de colocación aprobada! Contrato actualizado.',
      de: 'Vermittlungsprovision genehmigt! Vertrag aktualisiert.',
      zh: '家教配对佣金已核准！合约已正式生效。',
      sw: 'Kamisheni ya kazi imeidhinishwa! Mkataba umesasishwa.',
    };
    return map[l] || msg;
  }

  if (msg.includes('Report verified by Admin and dispatched to Parent')) {
    const map: Record<string, string> = {
      am: 'ሪፖርቱ በአስተዳዳሪ ተረጋግጦ ለወላጅ ማረጋገጫ ተልኳል!',
      om: 'Gabaasni maamulaan mirkanaa\'ee maatiif ergameera!',
      ti: 'ጸብጻብ ብኣመሓዳሪ ተረጋጊጹ ንወላዲ ተላኢኹ!',
      so: 'Warbixinta waxaa xaqiijiyay maamulka waxaana loo diray waalidka!',
      ar: 'تم اعتماد التقرير من الإدارة وإرساله لولي الأمر للمصادقة!',
      fr: 'Rapport validé par l\'admin et transmis aux parents !',
      es: '¡Informe verificado por administración y enviado a los padres!',
      de: 'Bericht vom Administrator verifiziert und an die Eltern gesendet!',
      zh: '教学报告已由管理员审核并下发给家长！',
      sw: 'Ripoti imethibitishwa na msimamizi na kutumwa kwa wazazi!',
    };
    return map[l] || msg;
  }

  if (msg.includes('Tutor accepted for job!')) {
    const map: Record<string, string> = {
      am: 'አስተማሪው ለስራው ተቀባይነት አግኝቷል! የ 60%/23% የኮሚሽን ካርድ ተከፍቷል።',
      om: 'Barsiisaan hojiichaaf fudhatama argateera! Kaardiin komishinii 60%/23% banameera.',
      ti: 'መምህር ነቲ ስራሕ ተቐባልነት ረኺቡ! ናይ 60%/23% ኮሚሽን ካርድ ተኸፊቱ።',
      so: 'Macallinka waa la aqbalay shaqada! Kaarka komishanka 60%/23% waa la furay.',
      ar: 'تم قبول المعلم للوظيفة! وفُتحت بطاقة العمولة (60% / 23%).',
      fr: 'Tuteur accepté ! Carte de commission 60%/23% débloquée.',
      es: '¡Tutor aceptado para el puesto! Opciones de comisión 60%/23% habilitadas.',
      de: 'Tutor für die Stelle akzeptiert! Provisionskarte 60%/23% freigeschaltet.',
      zh: '导师已被录用！60%/23%佣金方案已解锁。',
      sw: 'Mkufunzi amekubaliwa kwa kazi! Kadi ya kamisheni 60%/23% imefunguliwa.',
    };
    return map[l] || msg;
  }

  if (msg.includes('Monthly progress report approved and signed off')) {
    const map: Record<string, string> = {
      am: 'ወርሃዊ የሂደት ሪፖርቱ በወላጅ ጸድቆ ተፈርሟል።',
      om: 'Gabaasni ji\'aa maatiidhaan mirkanaa\'ee mallatteeffameera.',
      ti: 'ወርሓዊ ጸብጻብ ብወላዲ ጸዲቑ ተፈሪሙ።',
      so: 'Warbixinta bisha waxaa oggolaaday oo saxiixay waalidka.',
      ar: 'تمت مصادقة التقرير الشهري وتوقيعه من قبل ولي الأمر.',
      fr: 'Rapport mensuel validé et signé par le parent.',
      es: '¡Informe mensual aprobado y firmado por los padres!',
      de: 'Monatlicher Fortschrittsbericht genehmigt und von den Eltern abgezeichnet.',
      zh: '月度学习进展报告已由家长审核并签字确认。',
      sw: 'Ripoti ya maendeleo ya mwezi imeidhinishwa na kusainiwa na mzazi.',
    };
    return map[l] || msg;
  }

  if (msg.includes('Receipt uploaded successfully!')) {
    const map: Record<string, string> = {
      am: 'ደረሰኝ በተሳካ ሁኔታ ተጭኗል! በአዶር አስተዳደር እየተመረመረ ነው።',
      om: 'Nagaheen milkaa\'inaan fe\'ameera! Bulchiinsa Adoriin qoratamaa jira.',
      ti: 'ደረሰኝ ብዓወት ተጻዒኑ! ብኣመሓዳሪ ኣዶር ይምርመር ኣሎ።',
      so: 'Rasiidka si guul leh ayaa loo soo galiyay! Waxaa dib u eegaya maamulka Ador.',
      ar: 'تم تحميل الإيصال بنجاح وهو قيد مراجعة إدارة مركز أدور.',
      fr: 'Reçu téléchargé avec succès ! En cours d\'examen par l\'administration Ador.',
      es: '¡Recibo subido con éxito! En revisión por la administración de Ador.',
      de: 'Beleg erfolgreich hochgeladen! Wird von der Ador-Leitung überprüft.',
      zh: '收据上传成功！Ador中心管理员正在核验中。',
      sw: 'Stakabadhi imepakiwa kwa ufanisi! Inakaguliwa na usimamizi wa Ador.',
    };
    return map[l] || msg;
  }

  if (msg.includes('Copied') && msg.includes('to clipboard')) {
    const map: Record<string, string> = {
      am: 'ወደ ቅንጥብ ሰሌዳ ተገልብጧል!',
      om: 'Gara gabatee garagalchaatti kophifameera!',
      ti: 'ናብ ሰሌዳ ተገሊቢጡ!',
      so: 'Waa la koobiyay!',
      ar: 'تم النسخ إلى الحافظة بنجاح!',
      fr: 'Copié dans le presse-papiers !',
      es: '¡Copiado al portapapeles!',
      de: 'In die Zwischenablage kopiert!',
      zh: '已复制到剪贴板！',
      sw: 'Imenakiliwa kwenye ubao!',
    };
    return map[l] || msg;
  }

  return msg;
}

// Localize toast titles uniformly across all supported languages
export function getLocalizedToastTitle(title: string | undefined, lang: SupportedLanguage | string = 'en'): string | undefined {
  if (!title) return title;
  if (lang === 'en') return title;

  const t = title.trim();
  const l = lang;

  const titles: Record<string, Record<string, string>> = {
    'Verification Pending': {
      am: 'ማረጋገጫ በመጠባበቅ ላይ', om: 'Mirkaneessa Eegaa Jira', ti: 'ምርግጋጽ ዝጽበ',
      so: 'Xaqiijin Sugaysa', ar: 'قيد التحقق', fr: 'Vérification en attente',
      es: 'Verificación pendiente', de: 'Ausstehende Verifizierung', zh: '审核中', sw: 'Inasubiri Uthibitisho'
    },
    'Report Submitted': {
      am: 'ሪፖርት ቀርቧል', om: 'Gabaasni Dhiyaateera', ti: 'ጸብጻብ ቀሪቡ',
      so: 'Warbixin La Gudbiyay', ar: 'تم تقديم التقرير', fr: 'Rapport soumis',
      es: 'Informe presentado', de: 'Bericht übermittelt', zh: '报告已提交', sw: 'Ripoti Imewasilishwa'
    },
    'Commission Submitted': {
      am: 'ኮሚሽን ቀርቧል', om: 'Komishiniin Dhiyaateera', ti: 'ኮሚሽን ቀሪቡ',
      so: 'Komishan La Gudbiyay', ar: 'تم تقديم العمولة', fr: 'Commission soumise',
      es: 'Comisión enviada', de: 'Provision eingereicht', zh: '佣金凭证已提交', sw: 'Kamisheni Imewasilishwa'
    },
    'Receipt Submitted': {
      am: 'ደረሰኝ ገብቷል', om: 'Nagaheen Dhiyaateera', ti: 'ደረሰኝ ቀሪቡ',
      so: 'Rasiid La Gudbiyay', ar: 'تم إرسال الإيصال', fr: 'Reçu envoyé',
      es: 'Recibo enviado', de: 'Beleg eingereicht', zh: '收据已提交', sw: 'Stakabadhi Imewasilishwa'
    },
    'Report Dispatched': {
      am: 'ሪፖርት ተልኳል', om: 'Gabaasni Ergameera', ti: 'ጸብጻብ ተላኢኹ',
      so: 'Warbixin La Diray', ar: 'تم إرسال التقرير', fr: 'Rapport transmis',
      es: 'Informe despachado', de: 'Bericht versandt', zh: '报告已下发', sw: 'Ripoti Imetumwa'
    },
    'Tutor Accepted': {
      am: 'አስተማሪ ተቀባይነት አግኝቷል', om: 'Barsiisaan Fudhatame', ti: 'መምህር ተቐባልነት ረኺቡ',
      so: 'Macallin La Aqbalay', ar: 'تم قبول المعلم', fr: 'Tuteur accepté',
      es: 'Tutor aceptado', de: 'Tutor akzeptiert', zh: '导师已录用', sw: 'Mkufunzi Amekubaliwa'
    },
    'Report Accepted': {
      am: 'ሪፖርት ጸድቋል', om: 'Gabaasni Mirkanaa\'e', ti: 'ጸብጻብ ጸዲቑ',
      so: 'Warbixin La Oggolaaday', ar: 'تم اعتماد التقرير', fr: 'Rapport accepté',
      es: 'Informe aprobado', de: 'Bericht akzeptiert', zh: '报告已核准', sw: 'Ripoti Imeidhinishwa'
    },
    'Report Disputed': {
      am: 'ሪፖርት ተቃውሞ ቀርቦበታል', om: 'Gabaasarratti Mormiin Dhiyaate', ti: 'ጸብጻብ ተቓውሞ ቀሪቡሉ',
      so: 'Warbixin Lagu Murmay', ar: 'اعتراض على التقرير', fr: 'Rapport contesté',
      es: 'Informe disputado', de: 'Bericht beanstandet', zh: '报告异议已记录', sw: 'Ripoti Imepingwa'
    },
    'Receipt Sent': {
      am: 'ደረሰኝ ተልኳል', om: 'Nagaheen Ergameera', ti: 'ደረሰኝ ተላኢኹ',
      so: 'Rasiid La Diray', ar: 'تم إرسال الإيصال', fr: 'Reçu expédié',
      es: 'Comprobante enviado', de: 'Beleg gesendet', zh: '凭证已发送', sw: 'Stakabadhi Imetumwa'
    },
    'Message Sent': {
      am: 'መልእክት ተልኳል', om: 'Ergaan Ergameera', ti: 'መልእኽቲ ተላኢኹ',
      so: 'Farriin La Diray', ar: 'تم إرسال الرسالة', fr: 'Message envoyé',
      es: 'Mensaje enviado', de: 'Nachricht gesendet', zh: '信息已发送', sw: 'Ujumbe Umetumwa'
    }
  };

  if (titles[t] && titles[t][l]) {
    return titles[t][l];
  }
  return title;
}

// Localize all job application cards, banners, notes, and notices across all 11 languages
export function getLocalizedJobCardNotice(key: string, lang: SupportedLanguage | string = 'en'): string {
  if (lang === 'en') {
    const enMap: Record<string, string> = {
      appliedDatePrefix: 'Applied:',
      placementApproved: 'Placement Approved!',
      readyForTutoring: 'Ready for Tutoring',
      feeConfirmationNotice: 'See accepted placement banner above to submit your 60% or 23% fee confirmation.',
      appliedUnderAdminReview: 'Applied: Under Admin Review',
      applicationSubmittedNotice: 'Application submitted. You will choose your 60% downpayment or 23% monthly fee once approved.',
      applicationReceivedNotice: 'Your application has been received by Ador Academic Dispatch. Once the coordinator approves your assignment, the two commission fee cards (Option 1: 60% Downpayment vs Option 2: 23% Monthly Commission) will unlock below for you to finalize the contract.'
    };
    return enMap[key] || key;
  }

  const map: Record<string, Record<string, string>> = {
    appliedDatePrefix: {
      am: 'የቀረበበት ቀን:', om: 'Guyyaa Iyyatame:', ti: 'ዝተመልከተሉ ዕለት:', so: 'Taariikhda Codsiga:',
      ar: 'تاريخ التقديم:', fr: 'Date de candidature :', es: 'Fecha de solicitud:', de: 'Beworben am:', zh: '申请日期：', sw: 'Tarehe ya Maombi:'
    },
    placementApproved: {
      am: 'ምደባው ጸድቋል!', om: 'Ramaddiin Mirkanaa\'eera!', ti: 'ምደባ ጸዲቑ!', so: 'Meelaynta waa la Anxiyay!',
      ar: 'تمت الموافقة على التعيين!', fr: 'Affectation approuvée !', es: '¡Asignación aprobada!', de: 'Zuweisung genehmigt!', zh: '教学匹配已批准！', sw: 'Uteuzi Umeidhinishwa!'
    },
    readyForTutoring: {
      am: 'ለማስተማር ዝግጁ', om: 'Barsiisuuf Qophii', ti: 'ንምምሃር ድሉው', so: 'Diyaar u ah Waxbaridda',
      ar: 'جاهز لبدء التدريس', fr: 'Prêt pour le tutorat', es: 'Listo para impartir clases', de: 'Bereit für den Unterricht', zh: '随时可开展授课', sw: 'Tayari kwa Mafunzo'
    },
    feeConfirmationNotice: {
      am: 'የ 60% ወይም 23% ክፍያ ማረጋገጫ ለመላክ ከላይ ያለውን ሰሌዳ ይመልከቱ።',
      om: 'Mirkaneessa kaffaltii 60% ykn 23% galchuuf gabatee fudhatama armaan olii ilaalaa.',
      ti: 'ናይ 60% ወይ 23% ክፍሊት መረጋገጺ ንምልኣኽ ነቲ ላዕሊ ዘሎ ሰሌዳ ርኣዩ።',
      so: 'Fiiri boorka sare si aad u gudbiso xaqiijinta khidmadda 60% ama 23%.',
      ar: 'راجع لوحة القبول أعلاه لإرسال تأكيد رسوم العمولة بنسبة 60% أو 23%.',
      fr: 'Consultez la bannière d\'acceptation ci-dessus pour envoyer votre confirmation de frais de 60 % ou 23 %.',
      es: 'Consulte el banner de asignación aceptada arriba para enviar su confirmación del 60% o 23%.',
      de: 'Siehe obiges Banner zur Einreichung der Bestätigung für 60 % oder 23 % Gebühr.',
      zh: '请查看上方已接受聘用横幅，以提交 60% 或 23% 的佣金确认凭证。',
      sw: 'Angalia bango la uteuzi hapo juu ili kuwasilisha uthibitisho wa ada ya 60% au 23%.'
    },
    appliedUnderAdminReview: {
      am: 'የቀረበ: በአስተዳዳሪ ምርመራ ላይ',
      om: 'Iyyatameera: Qorannoo Bulchaa Jalatti',
      ti: 'ተላኢኹ: ብኣመሓዳሪ ኣብ ምምርማር ይርከብ',
      so: 'La Gudbiyay: Dib u eegis Maamul ku jira',
      ar: 'تم التقديم: قيد مراجعة الإدارة',
      fr: 'Candidature envoyée : en cours d\'examen',
      es: 'Postulado: En revisión administrativa',
      de: 'Eingereicht: Wird vom Administrator geprüft',
      zh: '已提交申请：管理员审核中',
      sw: 'Imewasilishwa: Inakaguliwa na Utawala'
    },
    applicationSubmittedNotice: {
      am: 'ማመልከቻዎ ገብቷል። ሲጸድቅ 60% ቅድመ ክፍያ ወይም 23% ወርሃዊ ክፍያዎን ይመርጣሉ።',
      om: 'Iyyanni keessan galeera. Yommuu mirkanaa\'u kaffaltii dursaa 60% ykn kaffaltii ji\'aa 23% filattu.',
      ti: 'መልከቲኹም ኣትዩ ኣሎ። ምስ ጸደቐ ናይ 60% ቅድመ ክፍሊት ወይ 23% ወርሓዊ ክፍሊት ክትመርጹ ኢኹም።',
      so: 'Codsigaagii waa la helay. Waxaad dooran doontaa 60% horumaris ah ama 23% bishii marka la oggolaado.',
      ar: 'تم إرسال طلبك. ستختار بين دفعة أولى 60% أو عمولة شهرية 23% بمجرد الموافقة.',
      fr: 'Candidature soumise. Vous choisirez votre acompte de 60 % ou 23 % mensuel une fois approuvé.',
      es: 'Solicitud enviada. Elegirá su anticipo del 60% o tarifa mensual del 23% una vez aprobada.',
      de: 'Bewerbung eingereicht. Sie wählen Ihre 60 % Anzahlung oder 23 % Monatsgebühr, sobald diese genehmigt ist.',
      zh: '申请已提交。审核通过后，您可以选择 60% 首月定金或 23% 按月佣金模式。',
      sw: 'Maombi yamewasilishwa. Utachagua malipo ya awali ya 60% au ada ya 23% ya kila mwezi pindi yatakapoidhinishwa.'
    },
    applicationReceivedNotice: {
      am: 'ማመልከቻዎ በአዶር አካዳሚክ መላኪያ ደርሷል። አስተባባሪው ምደባዎን ሲያጸድቁ፣ ውሉን ለመጨረስ ሁለቱ የኮሚሽን አማራጮች (አማራጭ 1: 60% ቅድመ ክፍያ ወይም አማራጭ 2: 23% ወርሃዊ ኮሚሽን) ከዚህ በታች ይከፈታሉ።',
      om: 'Iyyanni keessan kutaa barnootaa Adooriin ga\'eera. Qindeessaan yommuu mirkaneessu, kaardiiwwan kaffaltii komishinii lamaan (Filannoo 1: 60% Dursaa fi Filannoo 2: 23% Ji\'aa) waliigaltee xumuruuf ni banamu.',
      ti: 'መልከቲኹም ናብ ኣካዳሚክ መላእኺ ኣዶር በጺሑ ኣሎ። ኣተሓባባሪ ምደባኹም ምስ ኣጽደቖ፡ ነቲ ውዕል ንምዝዛም ክልቲኦም ናይ ኮሚሽን ኣማራጺታት (ኣማራጺ 1: 60% ቅድመ ክፍሊት ወይ ኣማራጺ 2: 23% ወርሓዊ ኮሚሽን) ኣብ ታሕቲ ክኽፈቱ እዮም።',
      so: 'Codsigaaga waxaa helay Xafiiska Waxbarashada Ador. Marka isuduwaha uu oggolaado, labada kaadh ee khidmadda (Doorashada 1: 60% Hormaris ah iyo Doorashada 2: 23% Bishii) ayaa hoos ka furmi doona si aad u dhammaystirto heshiiska.',
      ar: 'تم استلام طلبك من قِبل إدارة التوجيه الأكاديمي في أَدور. بمجرد موافقة المنسق على تعيينك، سيتم فتح بطاقتي رسوم العمولة أدناه (الخيار 1: دفعة أولى 60% أو الخيار 2: 23% عمولة شهرية) لإتمام العقد.',
      fr: 'Votre candidature a été reçue par le service académique d\'Ador. Une fois que le coordinateur aura validé votre affectation, les deux options de commission (Option 1 : acompte de 60 % ou Option 2 : 23 % mensuel) s\'afficheront ci-dessous pour finaliser votre contrat.',
      es: 'Su solicitud ha sido recibida por la Coordinación Académica de Ador. Una vez que el coordinador apruebe su asignación, se desbloquearán las tarjetas de comisión (Opción 1: anticipo del 60% u Opción 2: 23% mensual) para finalizar el contrato.',
      de: 'Ihre Bewerbung ist beim Akademischen Koordinator von Ador eingegangen. Sobald der Koordinator Ihren Einsatz genehmigt, werden unten die Provisionskarten freigeschaltet (Option 1: 60 % Anzahlung vs. Option 2: 23 % Monatsprovision), um den Vertrag abzuschließen.',
      zh: '您的申请已成功提交至 ADOR 学术调度中心。协调员核准后，系统将解锁下方两种佣金方案（方案 1：60% 首月定金；方案 2：23% 按月佣金），以便您最终确认契约。',
      sw: 'Maombi yako yamepokelewa na Kitengo cha Masomo cha Ador. Mara tu mratibu atakapoidhinisha uteuzi wako, kadi mbili za ada ya kamisheni (Chaguo 1: 60% Malipo ya Awali au Chaguo 2: 23% Kamisheni ya Mwezi) zitafunguliwa hapa chini ili ukamilishe mkataba.'
    }
  };

  if (map[key] && map[key][lang]) {
    return map[key][lang];
  }
  return key;
}
