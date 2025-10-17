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
import { apiRequest, queryClient } from '@/lib/queryClient';
import { addEntrepriseBox } from '@/lib/db';

export default function AddEntreprise() {
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
  await addEntrepriseBox({ bureauUserId: user?.id, ...formData, status: 'active' });

      queryClient.invalidateQueries({ queryKey: ['entrepriseBoxes', user?.id] });
      toast({
        title: 'Entreprise ajoutée avec succès',
      });
      setLocation('/bureau/dashboard');
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
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('bureau.addEntreprise')}</CardTitle>
          <CardDescription>
            Ajoutez une nouvelle entreprise à gérer
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  data-testid="input-location"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setLocation('/bureau/dashboard')}
                data-testid="button-cancel"
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit" className="flex-1" disabled={loading} data-testid="button-submit">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('common.save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
