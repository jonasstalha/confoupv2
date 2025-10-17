import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserByFirebaseUid } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';

export default function Login() {
  const { t } = useLanguage();
  const { firebaseUser, user, setUser } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation to avoid empty requests (prevents 400 from Firebase REST endpoint)
    if (!formData.email || !formData.password) {
      toast({ variant: 'destructive', title: t('common.error'), description: t('auth.provideEmailPassword') });
      setLoading(false);
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userData = await getUserByFirebaseUid(userCredential.user.uid);
      if (userData) {
        setUser(userData as any);
        // Redirect based on role
        if ((userData as any).role === 'entreprise') setLocation('/entreprise/dashboard');
        else if ((userData as any).role === 'particulier') setLocation('/particulier/dashboard');
        else if ((userData as any).role === 'bureau') setLocation('/bureau/dashboard');
      } else {
        // No backend user record found — send to register flow
        setLocation('/auth/register');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: error.message,
      });
      console.error('Login error', error);
    } finally {
      setLoading(false);
    }
  };

  // If already authenticated and we have user info, redirect away from login
  useEffect(() => {
    if (user) {
      const role = (user as any).role;
      if (role === 'entreprise') setLocation('/entreprise/dashboard');
      else if (role === 'particulier') setLocation('/particulier/dashboard');
      else if (role === 'bureau') setLocation('/bureau/dashboard');
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      
      const userData = await getUserByFirebaseUid(result.user.uid);
      if (userData) {
        setUser(userData as any);
        if ((userData as any).role === 'entreprise') {
          setLocation('/entreprise/dashboard');
        } else if ((userData as any).role === 'particulier') {
          setLocation('/particulier/dashboard');
        } else if ((userData as any).role === 'bureau') {
          setLocation('/bureau/dashboard');
        }
      } else {
        setLocation('/auth/register');
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
          <CardTitle className="text-2xl font-bold">{t('auth.signIn')}</CardTitle>
          <CardDescription>
            {t('auth.email')} {t('common.or').toLowerCase()} Google
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleLogin}
            disabled={loading}
            data-testid="button-google-login"
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

          <form onSubmit={handleEmailLogin} className="space-y-4">
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
                data-testid="input-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading} data-testid="button-login">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('auth.signIn')}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">{t('auth.noAccount')} </span>
            <Link href="/auth/register" className="text-primary hover:underline" data-testid="link-register">
              {t('auth.signUp')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
