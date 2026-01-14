import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BookOpen, 
  Calendar, 
  FileArchive, 
  Users, 
  Settings,
  Newspaper,
  PlusCircle,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Stats {
  articles: number;
  articlesPublished: number;
  enseignements: number;
  events: number;
  documents: number;
  tickerItems: number;
  users: number;
}

interface RecentItem {
  id: string;
  title: string;
  status: string;
  created_at: string;
  type: 'article' | 'enseignement' | 'event';
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    articlesPublished: 0,
    enseignements: 0,
    events: 0,
    documents: 0,
    tickerItems: 0,
    users: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch stats
      const [
        articlesRes, 
        articlesPublishedRes,
        enseignementsRes, 
        eventsRes, 
        documentsRes,
        tickerRes,
        usersRes
      ] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('enseignements').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('documents').select('id', { count: 'exact', head: true }),
        supabase.from('news_ticker').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        articles: articlesRes.count || 0,
        articlesPublished: articlesPublishedRes.count || 0,
        enseignements: enseignementsRes.count || 0,
        events: eventsRes.count || 0,
        documents: documentsRes.count || 0,
        tickerItems: tickerRes.count || 0,
        users: usersRes.count || 0,
      });

      // Fetch recent items
      const [recentArticles, recentEnseignements, recentEvents] = await Promise.all([
        supabase.from('articles').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('enseignements').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(2),
        supabase.from('events').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(2),
      ]);

      const items: RecentItem[] = [
        ...(recentArticles.data || []).map(a => ({ ...a, type: 'article' as const })),
        ...(recentEnseignements.data || []).map(e => ({ ...e, type: 'enseignement' as const })),
        ...(recentEvents.data || []).map(e => ({ ...e, type: 'event' as const })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

      setRecentItems(items);
      setLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Articles',
      value: stats.articles,
      subValue: `${stats.articlesPublished} publiés`,
      icon: FileText,
      href: '/admin/articles',
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Enseignements',
      value: stats.enseignements,
      icon: BookOpen,
      href: '/admin/enseignements',
      color: 'bg-green-500',
    },
    {
      title: 'Événements',
      value: stats.events,
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-purple-500',
    },
    {
      title: 'Documents',
      value: stats.documents,
      icon: FileArchive,
      href: '/admin/documents',
      color: 'bg-orange-500',
    },
  ];

  const quickLinks = [
    { title: 'Articles', description: 'Gérer les actualités', icon: FileText, href: '/admin/articles', color: 'text-blue-500' },
    { title: 'Enseignements', description: 'Catéchèses et formations', icon: BookOpen, href: '/admin/enseignements', color: 'text-green-500' },
    { title: 'Événements', description: 'Calendrier pastoral', icon: Calendar, href: '/admin/events', color: 'text-purple-500' },
    { title: 'Documents', description: 'Fichiers et ressources', icon: FileArchive, href: '/admin/documents', color: 'text-orange-500' },
    { title: 'Ticker Info', description: 'Bandeau d\'actualités', icon: Newspaper, href: '/admin/ticker', color: 'text-pink-500' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500 text-white"><CheckCircle2 className="w-3 h-3 mr-1" />Publié</Badge>;
      case 'draft':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'enseignement': return <BookOpen className="w-4 h-4 text-green-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-purple-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Voir le site
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/articles/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvel article
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.href}>
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                {stat.subValue && (
                  <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
                )}
                {stat.trend && (
                  <div className="flex items-center text-xs text-green-500 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend} ce mois
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Gestion du contenu</CardTitle>
            <CardDescription>Accès rapide aux différentes sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <link.icon className={`h-8 w-8 ${link.color}`} />
                  <div>
                    <p className="font-medium">{link.title}</p>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Messages ticker</span>
              <Badge variant="outline">{stats.tickerItems} actifs</Badge>
            </div>
            {isAdmin && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">Utilisateurs</span>
                <Badge variant="outline">{stats.users}</Badge>
              </div>
            )}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Votre rôle</span>
              <Badge className={isAdmin ? "bg-red-500" : "bg-blue-500"}>
                {isAdmin ? "Administrateur" : "Éditeur"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Derniers contenus ajoutés ou modifiés</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/articles">Voir tout</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucun contenu pour le moment</p>
              <Button asChild className="mt-4">
                <Link to="/admin/articles/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer votre premier article
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getTypeIcon(item.type)}
                    <div>
                      <p className="font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.created_at), "d MMM yyyy 'à' HH:mm", { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/admin/${item.type === 'article' ? 'articles' : item.type === 'enseignement' ? 'enseignements' : 'events'}/${item.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Only Section */}
      {isAdmin && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/admin/users">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-indigo-500">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Utilisateurs</CardTitle>
                    <CardDescription>Gérer les utilisateurs et rôles</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/admin/settings">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gray-500">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Paramètres</CardTitle>
                    <CardDescription>Configuration du site</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
