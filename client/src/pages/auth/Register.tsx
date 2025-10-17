import { useState, useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUser, getUserByFirebaseUid } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import { UserRole } from '@shared/schema';

export default function Register() {
  const { t } = useLanguage();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: '' as UserRole | '',
  });

  useEffect(() => {
    const roleParam = new URLSearchParams(searchParams).get('role') as UserRole;
    if (roleParam && ['entreprise', 'particulier', 'bureau'].includes(roleParam)) {
      setFormData((prev) => ({ ...prev, role: roleParam }));
    }
  }, [searchParams]);

  const createUserInBackend = async (firebaseUid: string, email: string, displayName: string, role: UserRole) => {
    return createUser({ firebaseUid, email, displayName, role });
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.role) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('auth.chooseRole'),
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userData = await createUserInBackend(
        userCredential.user.uid,
        formData.email,
        formData.displayName,
        formData.role as UserRole
      );

      setUser(userData);

      if (formData.role === 'entreprise') {
        setLocation('/entreprise/onboarding');
      } else if (formData.role === 'particulier') {
        setLocation('/particulier/dashboard');
      } else if (formData.role === 'bureau') {
        setLocation('/bureau/onboarding');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (!formData.role) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('auth.chooseRole'),
      });
      return;
    }

    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      
      const existing = await getUserByFirebaseUid(result.user.uid);

      if (!existing) {
        const userData = await createUserInBackend(
          result.user.uid,
          result.user.email!,
          result.user.displayName || result.user.email!.split('@')[0],
          formData.role as UserRole
        );
        setUser(userData);

        if (formData.role === 'entreprise') {
          setLocation('/entreprise/onboarding');
        } else if (formData.role === 'particulier') {
          setLocation('/particulier/dashboard');
        } else if (formData.role === 'bureau') {
          setLocation('/bureau/onboarding');
        }
      } else {
        setUser(existing as any);
        setLocation(`/${(existing as any).role}/dashboard`);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('auth.signUp')}</CardTitle>
          <CardDescription>
            {t('auth.chooseRole')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">{t('auth.chooseRole')}</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
            >
              <SelectTrigger id="role" data-testid="select-role">
                <SelectValue placeholder={t('auth.chooseRole')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entreprise">{t('nav.entreprise')}</SelectItem>
                <SelectItem value="particulier">{t('nav.particulier')}</SelectItem>
                <SelectItem value="bureau">{t('nav.bureau')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleRegister}
            disabled={loading || !formData.role}
            data-testid="button-google-register"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SiGoogle className="h-4 w-4" />
            )}
            {t('auth.signInWithGoogle')}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                ou
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">{t('auth.displayName')}</Label>
              <Input
                id="displayName"
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
                data-testid="input-displayname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                data-testid="input-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !formData.role}
              data-testid="button-register"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('auth.signUp')}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.hasAccount')} </span>
            <Link href="/auth/login" className="text-primary hover:underline" data-testid="link-login">
              {t('auth.signIn')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
