// Bilingual support for ConfoUP (French/Arabic)
export type Language = 'fr' | 'ar';

export const translations = {
  fr: {
    // Navigation
    'nav.entreprise': 'Entreprise',
    'nav.particulier': 'Particulier / Étudiant',
    'nav.bureau': 'Bureau d\'Étude',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.logout': 'Déconnexion',
    
    // Landing Page
    'landing.tagline': 'Simplifiez votre conformité officielle avec l\'intelligence artificielle.',
    'landing.taglineAr': 'بسّط امتثالك الرسمي بالذكاء الاصطناعي',
    'landing.subtitle': 'ConfoUP transforme les bulletins officiels complexes en informations claires et actionnables.',
    'landing.cta.entreprise': 'Créer un compte Entreprise',
    'landing.cta.particulier': 'Essayer la recherche intelligente',
    'landing.cta.bureau': 'Créer un compte Bureau d\'Étude',
    
    // Sections
    'section.whoWeAre': 'Qui sommes-nous',
    'section.engagement': 'Notre engagement',
    'section.awareness': 'Sensibilisation',
    'section.contact': 'Contact',
    
    // Authentication
    'auth.signInWithGoogle': 'Se connecter avec Google',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.displayName': 'Nom complet',
    'auth.chooseRole': 'Type de compte',
    'auth.signIn': 'Se connecter',
    'auth.signUp': 'Créer un compte',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.noAccount': 'Pas de compte?',
    'auth.hasAccount': 'Déjà un compte?',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenue',
    'dashboard.home': 'Accueil',
    'dashboard.alerts': 'Alertes',
    'dashboard.analytics': 'Analyses',
    'dashboard.profile': 'Profil',
    'dashboard.search': 'Recherche',
    'dashboard.favorites': 'Favoris',
    'dashboard.boxes': 'Entreprises gérées',
    
    // Entreprise Dashboard
    'entreprise.latestUpdates': 'Dernières mises à jour BO',
    'entreprise.insights': 'Aperçu de votre entreprise',
    'entreprise.activeRegulations': 'Réglementations actives',
    'entreprise.totalAlerts': 'Total des alertes',
    'entreprise.complianceScore': 'Score de conformité',
    'entreprise.recentActivity': 'Activité récente',
    
    // Particulier Dashboard
    'particulier.smartSearch': 'Recherche intelligente',
    'particulier.recentPublications': 'Publications récentes',
    'particulier.savedResults': 'Résultats sauvegardés',
    'particulier.recommendedTopics': 'Sujets recommandés',
    'particulier.voiceSearch': 'Recherche vocale',
    
    // Bureau d'Étude Dashboard
    'bureau.overview': 'Vue d\'ensemble des entreprises',
    'bureau.addEntreprise': 'Ajouter une entreprise',
    'bureau.manageBoxes': 'Gérer les entreprises',
    'bureau.topRisks': 'Principaux risques réglementaires',
    'bureau.pendingActions': 'Actions en attente',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.filters': 'Filtres',
    'common.search': 'Rechercher',
    'common.category': 'Catégorie',
    'common.date': 'Date',
    'common.priority': 'Priorité',
    'common.status': 'Statut',
    'common.or': 'ou',
  },
  ar: {
    // Navigation
    'nav.entreprise': 'شركة',
    'nav.particulier': 'فرد / طالب',
    'nav.bureau': 'مكتب دراسات',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.logout': 'تسجيل الخروج',
    
    // Landing Page
    'landing.tagline': 'بسّط امتثالك الرسمي بالذكاء الاصطناعي',
    'landing.taglineAr': 'بسّط امتثالك الرسمي بالذكاء الاصطناعي',
    'landing.subtitle': 'ConfoUP يحول النشرات الرسمية المعقدة إلى معلومات واضحة وقابلة للتنفيذ',
    'landing.cta.entreprise': 'إنشاء حساب شركة',
    'landing.cta.particulier': 'جرب البحث الذكي',
    'landing.cta.bureau': 'إنشاء حساب مكتب دراسات',
    
    // Sections
    'section.whoWeAre': 'من نحن',
    'section.engagement': 'التزامنا',
    'section.awareness': 'التوعية',
    'section.contact': 'اتصل بنا',
    
    // Authentication
    'auth.signInWithGoogle': 'تسجيل الدخول بواسطة Google',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.displayName': 'الاسم الكامل',
    'auth.chooseRole': 'نوع الحساب',
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.forgotPassword': 'هل نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.home': 'الرئيسية',
    'dashboard.alerts': 'التنبيهات',
    'dashboard.analytics': 'التحليلات',
    'dashboard.profile': 'الملف الشخصي',
    'dashboard.search': 'البحث',
    'dashboard.favorites': 'المفضلة',
    'dashboard.boxes': 'الشركات المُدارة',
    
    // Entreprise Dashboard
    'entreprise.latestUpdates': 'آخر تحديثات الجريدة الرسمية',
    'entreprise.insights': 'نظرة عامة على شركتك',
    'entreprise.activeRegulations': 'اللوائح النشطة',
    'entreprise.totalAlerts': 'إجمالي التنبيهات',
    'entreprise.complianceScore': 'درجة الامتثال',
    'entreprise.recentActivity': 'النشاط الأخير',
    
    // Particulier Dashboard
    'particulier.smartSearch': 'البحث الذكي',
    'particulier.recentPublications': 'المنشورات الأخيرة',
    'particulier.savedResults': 'النتائج المحفوظة',
    'particulier.recommendedTopics': 'المواضيع الموصى بها',
    'particulier.voiceSearch': 'البحث الصوتي',
    
    // Bureau d'Étude Dashboard
    'bureau.overview': 'نظرة عامة على الشركات',
    'bureau.addEntreprise': 'إضافة شركة',
    'bureau.manageBoxes': 'إدارة الشركات',
    'bureau.topRisks': 'أهم المخاطر التنظيمية',
    'bureau.pendingActions': 'الإجراءات المعلقة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.filters': 'الفلاتر',
    'common.search': 'بحث',
    'common.category': 'الفئة',
    'common.date': 'التاريخ',
    'common.priority': 'الأولوية',
    'common.status': 'الحالة',
    'common.or': 'أو',
  },
};

export function useTranslation(lang: Language) {
  return {
    t: (key: string) => translations[lang][key as keyof typeof translations.fr] || key,
    lang,
  };
}
