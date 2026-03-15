import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen, Users, CreditCard, Newspaper, TrendingUp,
  ArrowUpRight, Eye, Clock, ChevronRight
} from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscriptions: 0,
    totalArticles: 0,
    totalMagazines: 5,
  });
  const [recentSubs, setRecentSubs] = useState<any[]>([]);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const [subsRes, articlesRes, profilesRes] = await Promise.all([
      supabase.from("subscriptions").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("articles").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("profiles").select("id"),
    ]);

    const activeSubs = subsRes.data?.filter(s => s.status === "active") || [];

    setStats({
      totalSubscribers: profilesRes.data?.length || 0,
      activeSubscriptions: activeSubs.length,
      totalArticles: articlesRes.data?.length || 0,
      totalMagazines: 5,
    });

    setRecentSubs(subsRes.data || []);
    setRecentArticles(articlesRes.data || []);
  };

  const statCards: StatCard[] = [
    { label: "Abonnés actifs", value: String(stats.activeSubscriptions), change: "+12%", icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Magazines publiés", value: String(stats.totalMagazines), change: "+1", icon: BookOpen, color: "bg-secondary/10 text-secondary" },
    { label: "Articles publiés", value: String(stats.totalArticles), change: "+3", icon: Newspaper, color: "bg-accent/10 text-accent" },
    { label: "Revenus du mois", value: "—", change: "—", icon: CreditCard, color: "bg-muted text-muted-foreground" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble de la plateforme CEDF</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5 hover:shadow-card transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-secondary font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent subscriptions */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-foreground flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Abonnements récents
            </h2>
            <Link to="/gestion/paiements" className="text-xs text-primary hover:underline flex items-center gap-1">
              Tout voir <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {recentSubs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">Aucun abonnement</p>
          ) : (
            <div className="space-y-3">
              {recentSubs.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{sub.billing_name || "Abonné"}</p>
                    <p className="text-xs text-muted-foreground capitalize">Credo {sub.plan}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      sub.status === "active" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                    }`}>
                      {sub.status === "active" ? "Actif" : "Inactif"}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent articles */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-foreground flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              Dernières actualités
            </h2>
            <Link to="/gestion/actualites" className="text-xs text-primary hover:underline flex items-center gap-1">
              Tout voir <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {recentArticles.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">Aucun article publié</p>
          ) : (
            <div className="space-y-3">
              {recentArticles.map((art) => (
                <div key={art.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{art.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(art.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                    art.status === "published" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                  }`}>
                    {art.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="font-display font-bold text-foreground mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Ajouter un magazine", icon: BookOpen, path: "/gestion/magazines" },
            { label: "Publier un article", icon: Newspaper, path: "/gestion/actualites" },
            { label: "Voir les paiements", icon: CreditCard, path: "/gestion/paiements" },
            { label: "Voir les statistiques", icon: Eye, path: "/gestion/statistiques" },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:bg-muted hover:border-primary/20 transition-all group"
            >
              <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
