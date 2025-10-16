import { useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function EntrepriseOnboarding() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    sector: '',
    registrationNumber: '',
    activityType: '',
    location: '',
    contactPerson: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/entreprise-profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Profil créé avec succès',
        });
        setLocation('/entreprise/dashboard');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Informations de votre entreprise</CardTitle>
          <CardDescription>
            Complétez votre profil pour recevoir des alertes personnalisées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                  data-testid="input-company-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Secteur *</Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  required
                  data-testid="input-sector"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Numéro d'enregistrement</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationNumber: e.target.value })
                  }
                  data-testid="input-registration-number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityType">Type d'activité</Label>
                <Input
                  id="activityType"
                  value={formData.activityType}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                  data-testid="input-activity-type"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  data-testid="input-location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">Personne de contact</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  data-testid="input-contact-person"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading} data-testid="button-submit-onboarding">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continuer'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
