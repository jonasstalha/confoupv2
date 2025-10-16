import { Link, useLocation } from 'wouter';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Building2, GraduationCap, Briefcase, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function TopNavigation() {
  const { t } = useLanguage();
  const { user, firebaseUser } = useAuth();
  const [location] = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isAuthPage = location.startsWith('/auth');

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        {!isAuthPage && !user && (
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/register?role=entreprise">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-nav-entreprise">
                <Building2 className="h-4 w-4" />
                {t('nav.entreprise')}
              </Button>
            </Link>
            <Link href="/auth/register?role=particulier">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-nav-particulier">
                <GraduationCap className="h-4 w-4" />
                {t('nav.particulier')}
              </Button>
            </Link>
            <Link href="/auth/register?role=bureau">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-nav-bureau">
                <Briefcase className="h-4 w-4" />
                {t('nav.bureau')}
              </Button>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          
          {firebaseUser ? (
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="gap-2"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              {t('nav.logout')}
            </Button>
          ) : !isAuthPage ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" data-testid="button-nav-login">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm" data-testid="button-nav-register">
                  {t('nav.register')}
                </Button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
