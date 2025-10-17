import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TopNavigation } from "@/components/TopNavigation";
import { DashboardLayout } from "@/components/DashboardLayout";

import Landing from "@/pages/Landing";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import EntrepriseDashboard from "@/pages/entreprise/Dashboard";
import EntrepriseOnboarding from "@/pages/entreprise/Onboarding";
import ParticulierDashboard from "@/pages/particulier/Dashboard";
import BureauDashboard from "@/pages/bureau/Dashboard";
import BureauOnboarding from "@/pages/bureau/Onboarding";
import AddEntreprise from "@/pages/bureau/AddEntreprise";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Redirect to={`/${user.role}/dashboard`} />;
  }

  return <>{children}</>;
}

function Router() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />

      <Route path="/entreprise/onboarding">
        <ProtectedRoute allowedRole="entreprise">
          <EntrepriseOnboarding />
        </ProtectedRoute>
      </Route>

      <Route path="/entreprise/dashboard">
        <ProtectedRoute allowedRole="entreprise">
          <DashboardLayout>
            <EntrepriseDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/particulier/dashboard">
        <ProtectedRoute allowedRole="particulier">
          <DashboardLayout>
            <ParticulierDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/bureau/onboarding">
        <ProtectedRoute allowedRole="bureau">
          <BureauOnboarding />
        </ProtectedRoute>
      </Route>

      <Route path="/bureau/dashboard">
        <ProtectedRoute allowedRole="bureau">
          <DashboardLayout>
            <BureauDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/bureau/add-entreprise">
        <ProtectedRoute allowedRole="bureau">
          <DashboardLayout>
            <AddEntreprise />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
              <TopNavigation />
              <Router />
              <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
