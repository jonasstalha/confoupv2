import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, GraduationCap, Briefcase, Shield, Sparkles, TrendingUp, Mail, MapPin, Phone } from 'lucide-react';

export default function Landing() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-ring/30 bg-background/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-background flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ring" />
                Peak Power World
              </span>
            </div>
            
            <h1 className={`text-hero text-background mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t('landing.tagline')}
            </h1>
            
            <p className={`text-xl text-background/80 mb-8 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t('landing.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/auth/register?role=entreprise">
                <Button
                  size="lg"
                  variant="default"
                  className="gap-2 text-base h-12 px-8"
                  data-testid="button-cta-entreprise"
                >
                  <Building2 className="h-5 w-5" />
                  {t('landing.cta.entreprise')}
                </Button>
              </Link>
              <Link href="/auth/register?role=particulier">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base h-12 px-8 bg-background/10 border-background/30 text-background hover:bg-background/20 backdrop-blur-sm"
                  data-testid="button-cta-particulier"
                >
                  <GraduationCap className="h-5 w-5" />
                  {t('landing.cta.particulier')}
                </Button>
              </Link>
              <Link href="/auth/register?role=bureau">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base h-12 px-8 bg-background/10 border-background/30 text-background hover:bg-background/20 backdrop-blur-sm"
                  data-testid="button-cta-bureau"
                >
                  <Briefcase className="h-5 w-5" />
                  {t('landing.cta.bureau')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background" id="who-we-are">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-display text-center mb-12 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t('section.whoWeAre')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Peak Power World</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  ConfoUP est une plateforme de nouvelle génération qui fusionne technologie, simplicité et confiance. 
                  Nous parlons aux professionnels qui veulent rester conformes et s'améliorer continuellement.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Notre marque communique clarté, fiabilité et innovation, aidant les utilisateurs à rester UP dans tous 
                  les sens — conformité UP, performance UP, confiance UP.
                </p>
              </div>
              
              <Card className="border-ring/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-ring/10">
                        <Shield className="h-6 w-6 text-ring" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{language === 'fr' ? 'Confiance' : 'الثقة'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Gestion transparente des données' : 'إدارة شفافة للبيانات'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-ring/10">
                        <Sparkles className="h-6 w-6 text-ring" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{language === 'fr' ? 'Innovation' : 'الابتكار'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Mises à jour régulières des fonctionnalités' : 'تحديثات منتظمة للميزات'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-ring/10">
                        <TrendingUp className="h-6 w-6 text-ring" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{language === 'fr' ? 'Progrès' : 'التقدم'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Outils de suivi des performances' : 'أدوات تتبع الأداء'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-20 bg-muted/30" id="engagement">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-display text-center mb-12 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t('section.engagement')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-t-4 border-t-ring">
                <CardContent className="p-8">
                  <Building2 className="h-12 w-12 text-ring mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{t('nav.entreprise')}</h3>
                  <p className="text-muted-foreground">
                    {language === 'fr' 
                      ? 'Alertes personnalisées et analyses pour votre secteur d\'activité'
                      : 'تنبيهات وتحليلات مخصصة لقطاع نشاطك'}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-t-4 border-t-ring">
                <CardContent className="p-8">
                  <GraduationCap className="h-12 w-12 text-ring mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{t('nav.particulier')}</h3>
                  <p className="text-muted-foreground">
                    {language === 'fr'
                      ? 'Recherche intelligente et résumés IA des documents officiels'
                      : 'بحث ذكي وملخصات ذكاء اصطناعي للوثائق الرسمية'}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-t-4 border-t-ring">
                <CardContent className="p-8">
                  <Briefcase className="h-12 w-12 text-ring mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{t('nav.bureau')}</h3>
                  <p className="text-muted-foreground">
                    {language === 'fr'
                      ? 'Gérez plusieurs entreprises avec des tableaux de bord dédiés'
                      : 'إدارة عدة شركات بلوحات تحكم مخصصة'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background" id="contact">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-display mb-12 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {t('section.contact')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-ring/10">
                  <Mail className="h-6 w-6 text-ring" />
                </div>
                <p className="font-medium">contact@confoup.ma</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-ring/10">
                  <Phone className="h-6 w-6 text-ring" />
                </div>
                <p className="font-medium">+212 XXX-XXXXXX</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-ring/10">
                  <MapPin className="h-6 w-6 text-ring" />
                </div>
                <p className="font-medium">Casablanca, Maroc</p>
              </div>
            </div>

            <Link href="/auth/register">
              <Button size="lg" className="gap-2" data-testid="button-footer-cta">
                {language === 'fr' ? 'Commencer gratuitement' : 'ابدأ مجاناً'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold mb-4">ConfoUP</h4>
                <p className="text-sm text-background/70">
                  {language === 'fr' 
                    ? 'Plateforme intelligente de conformité BO Maroc'
                    : 'منصة ذكية للامتثال للجريدة الرسمية المغربية'}
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">{language === 'fr' ? 'Produit' : 'المنتج'}</h4>
                <ul className="space-y-2 text-sm text-background/70">
                  <li>{t('nav.entreprise')}</li>
                  <li>{t('nav.particulier')}</li>
                  <li>{t('nav.bureau')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">{language === 'fr' ? 'Société' : 'الشركة'}</h4>
                <ul className="space-y-2 text-sm text-background/70">
                  <li>{t('section.whoWeAre')}</li>
                  <li>{t('section.engagement')}</li>
                  <li>{t('section.contact')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">{language === 'fr' ? 'Légal' : 'القانونية'}</h4>
                <ul className="space-y-2 text-sm text-background/70">
                  <li>{language === 'fr' ? 'Conditions d\'utilisation' : 'شروط الاستخدام'}</li>
                  <li>{language === 'fr' ? 'Politique de confidentialité' : 'سياسة الخصوصية'}</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-background/20 text-center text-sm text-background/70">
              © 2025 ConfoUP by Peak Power World. {language === 'fr' ? 'Tous droits réservés.' : 'جميع الحقوق محفوظة.'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
