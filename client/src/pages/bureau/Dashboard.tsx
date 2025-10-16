import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Plus, Building2, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EntrepriseBox, BoxWithAlerts } from '@shared/schema';

export default function BureauDashboard() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const { data: boxes = [], isLoading } = useQuery<BoxWithAlerts[]>({
    queryKey: [`/api/entreprise-boxes/by-bureau/${user?.id}`],
    enabled: !!user,
  });

  const totalAlerts = boxes.reduce((sum, box) => sum + (box.alerts?.length || 0), 0);
  const activeBoxes = boxes.filter((box) => box.status === 'active').length;
  const unresolvedAlerts = boxes.reduce(
    (sum, box) => sum + (box.alerts?.filter((a) => !a.isResolved).length || 0),
    0
  );

  const donutData = [
    { name: 'Actives', value: activeBoxes },
    { name: 'Inactives', value: boxes.length - activeBoxes },
  ];

  const trendData = [
    { month: 'Jan', alerts: 12 },
    { month: 'Fév', alerts: 19 },
    { month: 'Mar', alerts: 15 },
    { month: 'Avr', alerts: 25 },
    { month: 'Mai', alerts: 22 },
    { month: 'Jun', alerts: 30 },
  ];

  const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-4))'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('bureau.overview')}</h1>
          <p className="text-muted-foreground">
            {language === 'fr'
              ? 'Gérez toutes vos entreprises depuis un seul endroit'
              : 'إدارة جميع شركاتك من مكان واحد'}
          </p>
        </div>
        <Link href="/bureau/add-entreprise">
          <Button className="gap-2" data-testid="button-add-entreprise">
            <Plus className="h-4 w-4" />
            {t('bureau.addEntreprise')}
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entreprises</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-boxes">{boxes.length}</div>
            <p className="text-xs text-muted-foreground">{activeBoxes} actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes totales</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-alerts">{totalAlerts}</div>
            <p className="text-xs text-destructive">{unresolvedAlerts} non résolues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('bureau.topRisks')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-top-risks">3</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('bureau.pendingActions')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-pending-actions">12</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Statut des entreprises</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tendance des alertes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="alerts"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Entreprise Boxes */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Mes entreprises</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boxes.map((box) => (
            <Link key={box.id} href={`/bureau/entreprise/${box.id}`}>
              <Card className="hover-elevate cursor-pointer transition-all" data-testid={`card-box-${box.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{box.companyName}</CardTitle>
                    <Badge variant={box.status === 'active' ? 'default' : 'secondary'}>
                      {box.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{box.sector}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Alertes:</span>
                      <span className="font-semibold">{box.alerts?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Non résolues:</span>
                      <span className="font-semibold text-destructive">
                        {box.alerts?.filter((a) => !a.isResolved).length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Localisation:</span>
                      <span className="font-medium">{box.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {boxes.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  {language === 'fr'
                    ? 'Aucune entreprise gérée pour le moment'
                    : 'لا توجد شركات مُدارة حالياً'}
                </p>
                <Link href="/bureau/add-entreprise">
                  <Button className="gap-2" data-testid="button-add-first-entreprise">
                    <Plus className="h-4 w-4" />
                    {t('bureau.addEntreprise')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
