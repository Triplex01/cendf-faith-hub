import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Calendar,
  FileArchive,
  Users,
  Settings,
  Newspaper,
  LogOut,
  Church,
  Home,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { user, loading, isAdmin, isEditor, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && user && !isAdmin && !isEditor) {
      navigate('/admin/login');
    }
  }, [user, loading, isAdmin, isEditor, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (!isAdmin && !isEditor)) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', href: '/admin' },
    { icon: FileText, label: 'Articles', href: '/admin/articles' },
    { icon: BookOpen, label: 'Enseignements', href: '/admin/enseignements' },
    { icon: Calendar, label: 'Événements', href: '/admin/events' },
    { icon: FileArchive, label: 'Documents', href: '/admin/documents' },
    { icon: Newspaper, label: 'Ticker Info', href: '/admin/ticker' },
  ];

  const adminItems = [
    { icon: Users, label: 'Utilisateurs', href: '/admin/users' },
    { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Church className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold">CENDF Admin</h1>
            <p className="text-xs text-muted-foreground">Back Office</p>
          </div>
        </div>

        <Separator />

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <>
                <Separator className="my-4" />
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Administration
                </p>
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      location.pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </ScrollArea>

        <Separator />

        <div className="p-3 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Voir le site
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
