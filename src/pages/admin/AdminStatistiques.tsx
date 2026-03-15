import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart3, Users, BookOpen, Newspaper, Eye,
  TrendingUp, Globe, Clock, Monitor, Smartphone
} from "lucide-react";

const AdminStatistiques = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscribers: 0,
    totalArticles: 0,
    publishedArticles: 0,
    totalMagazines: 5,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [profilesRes, subsRes, articlesRes] = await Promise.all([
      supabase.from("profiles").select("id"),
      supabase.from("subscriptions").select("status"),
      supabase.from("articles").select("status"),
    ]);

    setStats({
      totalUsers: profilesRes.data?.length || 0,
      activeSubscribers: subsRes.data?.filter(s => s.status === "active").length || 0,
      totalArticles: articlesRes.data?.length || 0,
      publishedArticles: articlesRes.data?.filter(a => a.status === "published").length || 0,
      totalMagazines: 5,
    });
  };

  // Mock traffic data for visual presentation
  const trafficData = [
    { day: "Lun", views: 120 },
    { day: "Mar", views: 185 },
    { day: "Mer", views: 160 },
    { day: "Jeu", views: 210 },
    { day: "Ven", views: 195 },
    { day: "Sam", views: 140 },
    { day: "Dim", views: 95 },
  ];
  const maxViews = Math.max(...trafficData.map(d => d.views));

  const topPages = [
    { page: "Accueil", views: 1240, change: "+8%" },
    { page: "Boutique / Abonnements", views: 890, change: "+15%" },
    { page: "Actualités", views: 650, change: "+3%" },
    { page: "Enseignements", views: 520, change: "+12%" },
    { page: "Radio", views: 380, change: "+5%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Statistiques
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Analyse du trafic et de l'engagement</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Utilisateurs inscrits", value: stats.totalUsers, icon: Users, color: "text-primary bg-primary/10" },
          { label: "Abonnés actifs", value: stats.activeSubscribers, icon: TrendingUp, color: "text-secondary bg-secondary/10" },
          { label: "Articles publiés", value: stats.publishedArticles, icon: Newspaper, color: "text-accent bg-accent/10" },
          { label: "Magazines", value: stats.totalMagazines, icon: BookOpen, color: "text-primary bg-primary/10" },
        ].map((m) => (
          <div key={m.label} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-3`}>
              <m.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Traffic chart (visual bar chart) */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-foreground flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Trafic de la semaine
          </h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Derniers 7 jours
          </span>
        </div>
        <div className="flex items-end gap-3 h-48">
          {trafficData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-foreground">{d.views}</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary-glow transition-all duration-500"
                style={{ height: `${(d.views / maxViews) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-display font-bold text-foreground flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-primary" />
            Pages les plus visitées
          </h2>
          <div className="space-y-3">
            {topPages.map((p, i) => (
              <div key={p.page} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.page}</p>
                </div>
                <span className="text-sm text-muted-foreground">{p.views}</span>
                <span className="text-xs text-secondary font-medium">{p.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-display font-bold text-foreground flex items-center gap-2 mb-5">
            <Monitor className="w-5 h-5 text-primary" />
            Appareils
          </h2>
          <div className="space-y-4">
            {[
              { label: "Desktop", pct: 45, icon: Monitor },
              { label: "Mobile", pct: 48, icon: Smartphone },
              { label: "Tablette", pct: 7, icon: Monitor },
            ].map(d => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <d.icon className="w-4 h-4 text-muted-foreground" />
                    {d.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{d.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistiques;
