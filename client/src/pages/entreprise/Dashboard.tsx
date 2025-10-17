import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, TrendingUp, Shield, Activity, Bell } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BoDocument, AlertWithDocument } from '@shared/schema';
import { getAlertsByUser, getBoDocumentsLatest } from '@/lib/db';

export default function EntrepriseDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const { data: alerts = [], isLoading: alertsLoading } = useQuery<AlertWithDocument[]>({
    queryKey: ['alerts', user?.id],
    queryFn: () => getAlertsByUser(user?.id as string),
    enabled: !!user,
  });

  const { data: boDocuments = [], isLoading: docsLoading } = useQuery<BoDocument[]>({
    queryKey: ['boDocuments', 'latest'],
    queryFn: () => getBoDocumentsLatest(),
  });

  const unreadAlerts = alerts.filter((a) => !a.isRead).length;
  const alertsByCategory = alerts.reduce((acc, alert) => {
    const cat = alert.document?.category || 'other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(alertsByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const pieData = [
    { name: 'Réglementaire', value: alertsByCategory.regulatory || 0 },
    { name: 'Légal', value: alertsByCategory.legal || 0 },
    { name: 'Fiscal', value: alertsByCategory.tax || 0 },
    { name: 'Autre', value: alertsByCategory.other || 0 },
  ];

  const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-1))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  if (alertsLoading || docsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.welcome')}, {user?.displayName}</h1>
        <p className="text-muted-foreground">{t('entreprise.insights')}</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('entreprise.totalAlerts')}</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-alerts">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {unreadAlerts} non lues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('entreprise.activeRegulations')}</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-active-regulations">
              {boDocuments.filter((d) => d.priority === 'urgent').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Prioritaires
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('entreprise.complianceScore')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-compliance-score">92%</div>
            <p className="text-xs text-chart-5">
              +5% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('entreprise.recentActivity')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-recent-activity">
              {boDocuments.slice(0, 5).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Alertes par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Latest BO Updates */}
      <Card>
        <CardHeader>
          <CardTitle>{t('entreprise.latestUpdates')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {boDocuments.slice(0, 5).map((doc) => (
              <div
                key={doc.id}
                className="flex items-start justify-between gap-4 p-4 rounded-lg border hover-elevate"
                data-testid={`card-bo-document-${doc.id}`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{doc.title}</h4>
                    <Badge variant={doc.priority === 'urgent' ? 'destructive' : 'secondary'}>
                      {doc.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{doc.summaryFr}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{doc.category}</span>
                    <span>•</span>
                    <span>{new Date(doc.publishDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                {alerts.some((a) => a.boDocumentId === doc.id && !a.isRead) && (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
