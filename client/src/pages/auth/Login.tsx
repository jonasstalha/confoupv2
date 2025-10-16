import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';

export default function Login() {
  const { t } = useLanguage();
  const { setUser } = useAuth();
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

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const response = await fetch(`/api/users/by-firebase-uid/${userCredential.user.uid}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // Redirect based on role
        if (userData.role === 'entreprise') {
          setLocation('/entreprise/dashboard');
        } else if (userData.role === 'particulier') {
          setLocation('/particulier/dashboard');
        } else if (userData.role === 'bureau') {
          setLocation('/bureau/dashboard');
        }
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      
      const response = await fetch(`/api/users/by-firebase-uid/${result.user.uid}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        if (userData.role === 'entreprise') {
          setLocation('/entreprise/dashboard');
        } else if (userData.role === 'particulier') {
          setLocation('/particulier/dashboard');
        } else if (userData.role === 'bureau') {
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
