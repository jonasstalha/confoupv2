import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ThemeToggle } from './ThemeToggle';
import { Home, Bell, BarChart3, User, Search, Heart, Building2, Briefcase } from 'lucide-react';
import { UserRole } from '@shared/schema';

interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

const menuItems: Record<UserRole, MenuItem[]> = {
  entreprise: [
    { title: 'dashboard.home', url: '/entreprise/dashboard', icon: Home },
    { title: 'dashboard.alerts', url: '/entreprise/alerts', icon: Bell },
    { title: 'dashboard.analytics', url: '/entreprise/analytics', icon: BarChart3 },
    { title: 'dashboard.profile', url: '/entreprise/profile', icon: User },
  ],
  particulier: [
    { title: 'dashboard.home', url: '/particulier/dashboard', icon: Home },
    { title: 'dashboard.search', url: '/particulier/search', icon: Search },
    { title: 'dashboard.favorites', url: '/particulier/favorites', icon: Heart },
    { title: 'dashboard.profile', url: '/particulier/profile', icon: User },
  ],
  bureau: [
    { title: 'dashboard.home', url: '/bureau/dashboard', icon: Home },
    { title: 'dashboard.boxes', url: '/bureau/boxes', icon: Building2 },
    { title: 'dashboard.analytics', url: '/bureau/analytics', icon: BarChart3 },
    { title: 'dashboard.profile', url: '/bureau/profile', icon: User },
  ],
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [location] = useLocation();
  const [showBox, setShowBox] = useState(false);

  if (!user) return null;

  const items = menuItems[user.role as UserRole] || [];

  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                {user.role === 'entreprise' && t('nav.entreprise')}
                {user.role === 'particulier' && t('nav.particulier')}
                {user.role === 'bureau' && t('nav.bureau')}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = location === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.url} data-testid={`link-sidebar-${item.url}`}>
                            <item.icon className="h-4 w-4" />
                            <span>{t(item.title)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {/* Toggle for the display box */}
              <button
                onClick={() => setShowBox((s) => !s)}
                className="px-3 py-1 rounded bg-primary text-white text-sm"
                data-testid="button-toggle-display-box"
              >
                {showBox ? t('dashboard.hideDisplayBox') : t('dashboard.showDisplayBox')}
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 relative">
            {/* Display box overlays the content beneath it when visible */}
            {showBox && (
              <div className="absolute left-6 right-6 top-6 z-30 bg-card border p-4 rounded-md shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{t('dashboard.displayBoxTitle') || 'Display Box'}</h3>
                    <p className="text-sm text-muted-foreground">{t('dashboard.displayBoxDescription') || 'This box overlays content below it. Click hide to dismiss.'}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowBox(false)}
                      className="px-3 py-1 rounded border text-sm"
                      data-testid="button-hide-display-box"
                    >
                      {t('common.hide') || 'Hide'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
