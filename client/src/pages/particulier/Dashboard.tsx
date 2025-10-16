import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Search, Mic, Heart, Star, Filter } from 'lucide-react';
import { BoDocument, Favorite } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function ParticulierDashboard() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: boDocuments = [], isLoading } = useQuery<BoDocument[]>({
    queryKey: ['/api/bo-documents/latest'],
  });

  const { data: favorites = [] } = useQuery<Favorite[]>({
    queryKey: [`/api/favorites/by-user/${user?.id}`],
    enabled: !!user,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (boDocumentId: string) =>
      apiRequest('POST', '/api/favorites', { userId: user?.id, boDocumentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/by-user/${user?.id}`] });
      toast({
        title: language === 'fr' ? 'Ajouté aux favoris' : 'تمت الإضافة إلى المفضلة',
      });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (favoriteId: string) =>
      apiRequest('DELETE', `/api/favorites/${favoriteId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/by-user/${user?.id}`] });
      toast({
        title: language === 'fr' ? 'Retiré des favoris' : 'تمت الإزالة من المفضلة',
      });
    },
  });

  const filteredDocs = boDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summaryFr?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const isFavorite = (docId: string) => favorites.some((f) => f.boDocumentId === docId);
  const getFavoriteId = (docId: string) => favorites.find((f) => f.boDocumentId === docId)?.id;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('particulier.smartSearch')}</h1>
        <p className="text-muted-foreground">
          {language === 'fr'
            ? 'Recherchez dans les publications officielles avec l\'IA'
            : 'ابحث في المنشورات الرسمية بالذكاء الاصطناعي'}
        </p>
      </div>

      {/* Search Bar */}
      <Card className="border-ring/30">
        <CardContent className="p-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t('particulier.smartSearch')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base border-ring/20 focus:border-ring"
                data-testid="input-search"
              />
            </div>
            <Button size="icon" variant="outline" className="h-12 w-12" data-testid="button-voice-search">
              <Mic className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t('common.filters')}:</span>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]" data-testid="select-category-filter">
                <SelectValue placeholder={t('common.category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="regulatory">Réglementaire</SelectItem>
                <SelectItem value="legal">Légal</SelectItem>
                <SelectItem value="tax">Fiscal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recent Publications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{t('particulier.recentPublications')}</h2>
          <Badge variant="secondary">{filteredDocs.length} résultats</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => {
            const favorite = isFavorite(doc.id);
            return (
              <Card
                key={doc.id}
                className="hover-elevate transition-all"
                data-testid={`card-document-${doc.id}`}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2">{doc.title}</CardTitle>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        if (favorite) {
                          const favId = getFavoriteId(doc.id);
                          if (favId) removeFavoriteMutation.mutate(favId);
                        } else {
                          addFavoriteMutation.mutate(doc.id);
                        }
                      }}
                      data-testid={`button-favorite-${doc.id}`}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorite ? 'fill-destructive text-destructive' : ''}`}
                      />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{doc.category}</Badge>
                    <Badge
                      variant={doc.priority === 'urgent' ? 'destructive' : 'secondary'}
                    >
                      {doc.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {language === 'fr' ? doc.summaryFr : doc.summaryAr || doc.summaryFr}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(doc.publishDate).toLocaleDateString('fr-FR')}</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {doc.reference}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
