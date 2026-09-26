import React from 'react';
import { CurrentUser, ActiveView, SupportedLanguage } from '../types';
import { TranslationDictionary } from '../data/translations';

interface AccessDeniedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
  attemptedView: ActiveView;
  onSwitchAccount: () => void;
  onNavigateSafe: (view: ActiveView) => void;
  t: TranslationDictionary;
  language?: SupportedLanguage;
}

const ACCESS_DENIED_TEXTS: Record<SupportedLanguage, {
  title: string;
  subtitle: string;
  authenticated: string;
  destination: string;
  policyNote: string;
  ruleTutor: string;
  ruleParent: string;
  ruleAdmin: string;
  switchBtn: string;
  returnMyDash: string;
  returnHome: string;
  restrictedPortal: string;
}> = {
  en: {
    title: 'Access Denied: Role Mismatch',
    subtitle: 'Separation of Parent, Tutor & Administrator Environments',
    authenticated: 'Currently Authenticated:',
    destination: 'Target Destination:',
    policyNote: 'Under Ador Tutorial Center security policy:',
    ruleTutor: 'Tutors cannot access the Parent Portal or Admin Hub to safeguard billing and records.',
    ruleParent: 'Parents cannot access the Tutor workspace or Admin Hub to preserve applicant and grading data.',
    ruleAdmin: 'Administrative tools are strictly restricted and require verified executive credentials.',
    switchBtn: 'Switch / Sign In with Appropriate Account',
    returnMyDash: 'Return to My Authorized Dashboard',
    returnHome: 'Return to Official Website Home',
    restrictedPortal: 'Restricted Portal',
  },
  am: {
    title: 'መዳረሻ ተከልክሏል፡ የተጠቃሚ ሚና አለመዛመድ',
    subtitle: 'የወላጅ፣ የመምህር እና የአስተዳዳሪ ስርዓቶች ጥበቃ',
    authenticated: 'በአሁኑ ሰዓት የገቡበት ሚና:',
    destination: 'መድረሻ ክፍል:',
    policyNote: 'በአዶር ቱቶሪያል ደህንነት ፖሊሲ መሰረት:',
    ruleTutor: 'የወላጆች የክፍያ እና የተማሪዎች መረጃ ሚስጥራዊነትን ለመጠበቅ መምህራን ወደ ወላጅ እና አድሚን ክፍል መግባት አይችሉም።',
    ruleParent: 'የመምህራንን ማመልከቻ እና ገምጋሚ መረጃ ለመጠበቅ ወላጆች ወደ መምህራን የስራ ክፍል መግባት አይችሉም።',
    ruleAdmin: 'የአስተዳዳሪ የስራ ክፍሎች ጥብቅ ጥበቃ የተደረገባቸው እና የተፈቀደላቸው የስራ ኃላፊዎች ብቻ ናቸው።',
    switchBtn: 'ተስማሚ በሆነ አካውንት ይቀይሩ / ይግቡ',
    returnMyDash: 'ወደ ተፈቀደልኝ ዳሽቦርድ ተመለስ',
    returnHome: 'ወደ ዋናው ድረ-ገጽ ተመለስ',
    restrictedPortal: 'የተገደበ ፖርታል',
  },
  om: {
    title: 'Eeyyama Dhorkame: Gahee Qoodaa Wal-dhabuu',
    subtitle: 'Nageenya Kutaa Maatii, Barsiisaa fi Bulchiinsaa',
    authenticated: 'Amma kan Seentan:',
    destination: 'Bakka Deemuu Barbaaddan:',
    policyNote: 'Akka imaammata nageenya Ador Tutorial Center:',
    ruleTutor: 'Barsiisonni kaffaltii fi odeeffannoo maatii eeguuf kutaa maatii ykn bulchiinsaa seenuu hin danda’an.',
    ruleParent: 'Maatiin ragaa qacarrii fi madaallii barsiisotaa eeguuf kutaa barsiisaa seenuu hin danda’an.',
    ruleAdmin: 'Meeshaaleen bulchiinsaa eeyyama hoggantootaatiin qofa kan banamaniidha.',
    switchBtn: 'Akkaawuntii Sirriitti Jijjiiri / Seeni',
    returnMyDash: 'Gara Daashboordii Kiyya Eeyyamametti Deebi’i',
    returnHome: 'Gara Fuula Jalqabaatti Deebi’i',
    restrictedPortal: 'Kutaa Daangeffame',
  },
  ti: {
    title: 'ምእታው ተኸልኪሉ፡ ናይ ተጠቃሚ ግደ ዘይምጥጣም',
    subtitle: 'ዕቝባ መርበብ ወለዲ፣ መምህራንን ኣመሓደርትን',
    authenticated: 'ሕጂ ዝኣተኹምሉ ሚና:',
    destination: 'ዝድለ ዘሎ ክፍሊ:',
    policyNote: 'ብመሰረት ፖሊሲ ድሕንነት ማእከል ኣዶር ቱቶርያል:',
    ruleTutor: 'መምህራን ምስጢራዊነት ወለዲ ንምሕላው ናብ ክፍሊ ወለዲ ወይ ኣመሓዳሪ ክኣትዉ ኣይፍቀድን።',
    ruleParent: 'ወለዲ መረዳእታ መምህራንን መመልከቲታትን ንምዕቃብ ናብ ክፍሊ መምህራን ክኣትዉ ኣይፍቀድን።',
    ruleAdmin: 'ናይ ኣመሓዳሪ መሳርሒታት ብጽኑዕ ዝተሓለዉን ፍቓድ ንዘለዎም ጥራይ ዝኽፈቱን እዮም።',
    switchBtn: 'ብዝግባእ ኣካውንት ቀይር / እቶ',
    returnMyDash: 'ናብ ዝተፈቕደለይ ዳሽቦርድ ተመለስ',
    returnHome: 'ናብቲ ቀንዲ መርበብ ተመለስ',
    restrictedPortal: 'ዝተገደበ ፖርታል',
  },
  so: {
    title: 'Helitaanka Waa La Diiday: Doorka Aan Is Waafaqsanayn',
    subtitle: 'Ilaalinta Qaybaha Waalidiinta, Macallimiinta iyo Maamulka',
    authenticated: 'Hadda Lagu Soo Galay:',
    destination: 'Meesha La Beegsanayo:',
    policyNote: 'Sida ku cad sharciga amniga ee Xarunta Ador Tutorial:',
    ruleTutor: 'Macallimiintu ma geli karaan bogga Waalidka ama Maamulka si loo ilaaliyo xogta maaliyadda.',
    ruleParent: 'Waalidiintu ma geli karaan bogga Macallinka ama Maamulka si loo ilaaliyo xogta codsadayaasha.',
    ruleAdmin: 'Qalabka maamulka waa mid si adag loo ilaaliyo loona baahan yahay oggolaansho buuxa.',
    switchBtn: 'Ku Beddel / Ku Gal Koontada Ku Habboon',
    returnMyDash: 'Ku Noqo Dashboordkaaga La Oggol Yahay',
    returnHome: 'Ku Noqo Bogga Hore ee Rasmiga ah',
    restrictedPortal: 'Qaybta Xaddidan',
  },
  ar: {
    title: 'تم رفض الوصول: عدم تطابق الدور',
    subtitle: 'الفصل الأمني بين بيئات أولياء الأمور والمعلمين والإدارة',
    authenticated: 'تم تسجيل الدخول حالياً كـ:',
    destination: 'الوجهة المطلوبة:',
    policyNote: 'وفقاً لسياسة الأمان الصارمة لمركز أودور للدروس الخصوصية:',
    ruleTutor: 'لا يمكن للمعلمين الوصول إلى بوابة أولياء الأمور أو الإدارة لحماية خصوصية الفواتير والتقارير.',
    ruleParent: 'لا يمكن لأولياء الأمور الوصول إلى بوابة المعلمين أو لوحة الإدارة لحفظ بيانات التقييم والمتقدمين.',
    ruleAdmin: 'أدوات الإدارة التنفيذية محمية ومخصصة حصرياً للمديرين المعتمدين.',
    switchBtn: 'تبديل / تسجيل الدخول بالحساب المصرح به',
    returnMyDash: 'العودة إلى لوحة التحكم المصرح بها',
    returnHome: 'العودة إلى الصفحة الرئيسية للموقع',
    restrictedPortal: 'بوابة مقيدة',
  },
  fr: {
    title: 'Accès Refusé : Rôle Incompatible',
    subtitle: 'Séparation Sécurisée des Espaces Parents, Tuteurs et Administration',
    authenticated: 'Connecté actuellement en tant que :',
    destination: 'Destination visée :',
    policyNote: 'Selon la politique de sécurité du Centre de Tutorat Ador :',
    ruleTutor: 'Les tuteurs ne peuvent pas accéder au portail des parents ou à l\'administration afin de protéger la confidentialité.',
    ruleParent: 'Les parents ne peuvent pas accéder à l\'espace tuteurs ou à l\'administration pour préserver les évaluations.',
    ruleAdmin: 'Les outils d\'administration sont strictement réservés aux directeurs autorisés.',
    switchBtn: 'Changer de Compte / Se Connecter',
    returnMyDash: 'Retourner à Mon Espace Autorisé',
    returnHome: 'Retourner à l\'Accueil du Site',
    restrictedPortal: 'Portail Restreint',
  },
  es: {
    title: 'Acceso Denegado: Discordancia de Rol',
    subtitle: 'Separación de Entornos de Padres, Tutores y Administración',
    authenticated: 'Autenticado actualmente como:',
    destination: 'Destino solicitado:',
    policyNote: 'Bajo la política de seguridad de Ador Tutorial Center:',
    ruleTutor: 'Los tutores no pueden acceder al Portal de Padres o Administración para proteger la confidencialidad.',
    ruleParent: 'Los padres no pueden acceder al espacio de Tutores o Administración para resguardar las evaluaciones.',
    ruleAdmin: 'Las herramientas administrativas están estrictamente protegidas con credenciales directivas.',
    switchBtn: 'Cambiar de Cuenta / Iniciar Sesión',
    returnMyDash: 'Volver a Mi Panel Autorizado',
    returnHome: 'Volver al Inicio del Sitio Web',
    restrictedPortal: 'Portal Restringido',
  },
  de: {
    title: 'Zugriff Verweigert: Rollenkonflikt',
    subtitle: 'Sichere Trennung von Eltern-, Tutoren- und Verwaltungsbereichen',
    authenticated: 'Aktuell angemeldet als:',
    destination: 'Zielbereich:',
    policyNote: 'Gemäß der Sicherheitsrichtlinie des Ador Tutorial Centers:',
    ruleTutor: 'Tutoren haben keinen Zugriff auf das Elternportal oder die Verwaltung, um Abrechnungsdaten zu schützen.',
    ruleParent: 'Eltern haben keinen Zugriff auf den Tutorenbereich oder die Verwaltung, um Bewertungsdaten zu schützen.',
    ruleAdmin: 'Verwaltungswerkzeuge sind streng geschützt und erfordern autorisierte Direktionsrechte.',
    switchBtn: 'Konto wechseln / Anmelden',
    returnMyDash: 'Zurück zu Meinem Erlaubten Dashboard',
    returnHome: 'Zurück zur Startseite',
    restrictedPortal: 'Eingeschränktes Portal',
  },
  zh: {
    title: '访问被拒绝：角色不匹配',
    subtitle: '家长、导师与管理人员系统严格安全隔离',
    authenticated: '当前认证身份：',
    destination: '目标访问区域：',
    policyNote: '根据 Ador 辅导中心的安全与隐私政策：',
    ruleTutor: '导师无法访问家长门户或管理中心，以保护家长账单与学生机密档案。',
    ruleParent: '家长无法访问导师工作台或管理中心，以保护申请人资质与考核信息。',
    ruleAdmin: '行政管理工具受到严格受限，需要经过验证的管理层权限。',
    switchBtn: '切换 / 登录对应授权账号',
    returnMyDash: '返回我的专属工作面板',
    returnHome: '返回官方网站首页',
    restrictedPortal: '受限门户',
  },
  sw: {
    title: 'Ufikiaji Umekataliwa: Kutokulingana kwa Jukumu',
    subtitle: 'Ulinzi na Mgawanyo wa Maeneo ya Wazazi, Wakufunzi na Utawala',
    authenticated: 'Akaunti Iliyoingia Sasa:',
    destination: 'Eneo Unalotaka Kwenda:',
    policyNote: 'Kulingana na sera ya usalama ya Kituo cha Mafunzo cha Ador:',
    ruleTutor: 'Wakufunzi hawawezi kuingia lango la Wazazi au Utawala ili kulinda rekodi za malipo.',
    ruleParent: 'Wazazi hawawezi kuingia eneo la Wakufunzi au Utawala ili kulinda tathmini za waombaji.',
    ruleAdmin: 'Zana za utawala zimelindwa vikali na zinahitaji ruhusa ya wakurugenzi pekee.',
    switchBtn: 'Badilisha / Ingia na Akaunti Sahihi',
    returnMyDash: 'Rudi kwenye Dashibodi Yangu Iliyoidhinishwa',
    returnHome: 'Rudi kwenye Ukurasa Mkuu wa Tovuti',
    restrictedPortal: 'Lango Lililozuiwa',
  },
};

export const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  attemptedView,
  onSwitchAccount,
  onNavigateSafe,
  t,
  language = 'en',
}) => {
  if (!isOpen) return null;

  const at = ACCESS_DENIED_TEXTS[language] || ACCESS_DENIED_TEXTS.en;

  const getDestinationName = (view: ActiveView) => {
    switch (view) {
      case 'parent': return t.navParentPortal || 'Parent & Student Portal';
      case 'tutor': return t.navTutorPortal || 'Tutor Workspace & Job Dispatch';
      case 'admin': return t.navAdminHub || 'Executive Administrator Cockpit';
      default: return at.restrictedPortal;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'tutor': return { text: t.navTutorPortal, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'parent': return { text: t.navParentPortal, color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'admin': return { text: t.navAdminHub, color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      default: return { text: 'Guest', color: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const badge = getRoleBadge(currentUser.role);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-rose-200 overflow-hidden">
        
        {/* Security Warning Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-950 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white px-2 py-0.5 rounded-lg hover:bg-white/10 transition-colors text-xs font-bold"
          >
            ✕
          </button>

          <span className="px-2.5 py-0.5 rounded-full bg-rose-400/20 text-rose-200 text-[10px] font-bold uppercase tracking-wider border border-rose-400/30">
            Role-Based Access Control (RBAC)
          </span>

          <h2 className="text-xl font-black tracking-tight mt-2">
            {at.title}
          </h2>
          <p className="text-xs text-rose-100/80 mt-1">
            {at.subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">{at.authenticated}</span>
              <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] border ${badge.color}`}>
                {badge.text}
              </span>
            </div>
            <p className="font-bold text-slate-800">{currentUser.name} ({currentUser.email})</p>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-500 font-medium">{at.destination}</span>
              <span className="font-bold text-rose-700">{getDestinationName(attemptedView)}</span>
            </div>
          </div>

          <div className="text-xs text-slate-600 leading-relaxed space-y-2">
            <p className="font-semibold text-slate-700">
              {at.policyNote}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li>{at.ruleTutor}</li>
              <li>{at.ruleParent}</li>
              <li>{at.ruleAdmin}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onClose();
                onSwitchAccount();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              {at.switchBtn}
            </button>

            {currentUser.role !== 'guest' && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateSafe(currentUser.role as ActiveView);
                }}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
              >
                {at.returnMyDash}
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onNavigateSafe('website');
              }}
              className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              {at.returnHome}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
