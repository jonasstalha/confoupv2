import { ReactNode } from 'react';
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
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
