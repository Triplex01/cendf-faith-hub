import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logoCendf from "@/assets/logo-cendf.png";
import {
  LayoutDashboard, BookOpen, Newspaper, CreditCard, BarChart3,
  Settings, LogOut, Menu, X, Users, ChevronRight, Bell
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, path: "/gestion" },
  { id: "magazines", label: "Magazines", icon: BookOpen, path: "/gestion/magazines" },
  { id: "actualites", label: "Actualités", icon: Newspaper, path: "/gestion/actualites" },
  { id: "paiements", label: "Paiements", icon: CreditCard, path: "/gestion/paiements" },
  { id: "statistiques", label: "Statistiques", icon: BarChart3, path: "/gestion/statistiques" },
  { id: "utilisateurs", label: "Utilisateurs", icon: Users, path: "/gestion/utilisateurs" },
  { id: "parametres", label: "Paramètres", icon: Settings, path: "/gestion/parametres" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/gestion/connexion");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center p-2">
            <img src={logoCendf} alt="CEDF" className="w-full h-full object-contain" />
          </div>
          <div className="animate-pulse text-muted-foreground text-sm">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const currentNav = navItems.find(n => location.pathname === n.path) || navItems[0];

  const handleSignOut = async () => {
    await signOut();
    navigate("/gestion/connexion");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-card border-r border-border flex flex-col transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
        ${collapsed ? "w-20" : "w-64"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center p-1 shrink-0">
            <img src={logoCendf} alt="CEDF" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-foreground truncate">Gestion CEDF</p>
              <p className="text-[10px] text-muted-foreground">Administration</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border p-3">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
                <p className="text-[10px] text-secondary font-medium">Administrateur</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
            title={collapsed ? "Déconnexion" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border h-16 flex items-center px-4 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Gestion</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            <span className="font-medium text-foreground">{currentNav.label}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
