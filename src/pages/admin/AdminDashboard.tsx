import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  BookOpen, 
  Calendar, 
  FileArchive, 
  Users, 
  Settings,
  Newspaper,
  PlusCircle
} from 'lucide-react';

interface Stats {
  articles: number;
  enseignements: number;
  events: number;
  documents: number;
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    enseignements: 0,
    events: 0,
    documents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [articlesRes, enseignementsRes, eventsRes, documentsRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('enseignements').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('documents').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        articles: articlesRes.count || 0,
        enseignements: enseignementsRes.count || 0,
        events: eventsRes.count || 0,
        documents: documentsRes.count || 0,
      });
    };

    fetchStats();
  }, []);

  const menuItems = [
    {
      title: 'Articles',
      description: 'Gérer les actualités et articles',
      icon: FileText,
      href: '/admin/articles',
      count: stats.articles,
      color: 'bg-blue-500',
    },
    {
      title: 'Enseignements',
      description: 'Gérer les enseignements et catéchèses',
      icon: BookOpen,
      href: '/admin/enseignements',
      count: stats.enseignements,
      color: 'bg-green-500',
    },
    {
      title: 'Événements',
      description: 'Gérer les événements et calendrier',
      icon: Calendar,
      href: '/admin/events',
      count: stats.events,
      color: 'bg-purple-500',
    },
    {
      title: 'Documents',
      description: 'Gérer les documents et fichiers',
      icon: FileArchive,
      href: '/admin/documents',
      count: stats.documents,
      color: 'bg-orange-500',
    },
    {
      title: 'Ticker Info',
      description: 'Gérer le bandeau d\'actualités',
      icon: Newspaper,
      href: '/admin/ticker',
      color: 'bg-pink-500',
    },
  ];

  const adminMenuItems = [
    {
      title: 'Utilisateurs',
      description: 'Gérer les utilisateurs et rôles',
      icon: Users,
      href: '/admin/users',
      color: 'bg-indigo-500',
    },
    {
      title: 'Paramètres',
      description: 'Configuration du site',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.email}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/admin/articles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/admin/enseignements/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel enseignement
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/admin/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvel événement
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {menuItems.slice(0, 4).map((item) => (
          <Card key={item.title} className="hover:shadow-lg transition-shadow">
            <Link to={item.href}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.count}</div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Content Management */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Gestion du contenu</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={item.href}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Admin Only Section */}
      {isAdmin && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Administration</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {adminMenuItems.map((item) => (
              <Card key={item.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={item.href}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${item.color}`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
