import { useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { createBureauProfile } from '@/lib/db';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function BureauOnboarding() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    legalIdentity: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
  await createBureauProfile({ userId: user?.id, ...formData });
      toast({
        title: 'Profil créé avec succès',
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Informations de votre organisation</CardTitle>
          <CardDescription>
            Complétez votre profil Bureau d'Étude
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Nom de l'organisation *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                required
                data-testid="input-organization-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="legalIdentity">Identité légale</Label>
              <Input
                id="legalIdentity"
                value={formData.legalIdentity}
                onChange={(e) => setFormData({ ...formData, legalIdentity: e.target.value })}
                data-testid="input-legal-identity"
              />
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
