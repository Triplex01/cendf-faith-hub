import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  BookOpen, User, Settings, LogOut, Search, ChevronRight,
  Star, Crown, CreditCard, Phone, Mail, MapPin, Edit3,
  X, ArrowLeft, ZoomIn, ZoomOut, ChevronLeft, Maximize2, Minimize2
} from "lucide-react";
import logoCendf from "@/assets/logo-cendf.png";

// Magazine covers
import credoCover001 from "@/assets/credo-cover-001.png";
import credoCover002 from "@/assets/credo-cover-002.png";
import credoCover003 from "@/assets/credo-cover-003.png";
import credoCover004 from "@/assets/credo-cover-004.png";
import credoCover006 from "@/assets/credo-cover-006.png";

interface Magazine {
  id: number;
  title: string;
  number: string;
  period: string;
  cover: string;
  headline: string;
  pdfUrl: string;
}

const magazines: Magazine[] = [
  { id: 1, title: "Credo", number: "N°006", period: "Mars", cover: credoCover006, headline: "La Liturgie, Vie de l'Église", pdfUrl: "/documents/livret-biblique.pdf" },
  { id: 2, title: "Credo", number: "N°004", period: "Décembre-Janvier", cover: credoCover004, headline: "L'Homme dans l'Histoire et Aujourd'hui", pdfUrl: "/documents/livret-biblique.pdf" },
  { id: 3, title: "Credo", number: "N°003", period: "Novembre", cover: credoCover003, headline: "Au-delà de la Mort, Dieu Notre Vie", pdfUrl: "/documents/livret-biblique.pdf" },
  { id: 4, title: "Credo", number: "N°002", period: "Année du Jubilé", cover: credoCover002, headline: "Jésus-Christ, Espérance de l'Humanité", pdfUrl: "/documents/livret-biblique.pdf" },
  { id: 5, title: "Credo", number: "N°001", period: "Synodalité", cover: credoCover001, headline: "L'Église dans le Temps", pdfUrl: "/documents/livret-biblique.pdf" },
];

const EspaceAbonne = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"library" | "profile" | "billing">("library");
  const [searchQuery, setSearchQuery] = useState("");
  const [readingMag, setReadingMag] = useState<Magazine | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [subscription, setSubscription] = useState<any>(null);
  const [profile, setProfile] = useState<{ full_name: string; email: string; avatar_url: string | null }>({
    full_name: "",
    email: "",
    avatar_url: null,
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: "", phone: "", city: "" });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/connexion");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      // Fetch profile
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
        if (data) {
          setProfile({ full_name: data.full_name || "", email: data.email, avatar_url: data.avatar_url });
          setProfileForm(f => ({ ...f, full_name: data.full_name || "" }));
        }
      });
      // Fetch subscription
      supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
        if (data) setSubscription(data);
      });
    }
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  const firstName = profile.full_name?.split(" ")[0] || user.email?.split("@")[0] || "Abonné";
  const filteredMags = magazines.filter(m =>
    m.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase.from("profiles").update({
      full_name: profileForm.full_name,
    }).eq("id", user.id);

    if (error) {
      toast({ title: "Erreur", description: "Impossible de mettre à jour le profil.", variant: "destructive" });
    } else {
      setProfile(p => ({ ...p, full_name: profileForm.full_name }));
      setEditingProfile(false);
      toast({ title: "Profil mis à jour !" });
    }
  };

  // === READER MODE ===
  if (readingMag) {
    return (
      <div className={`bg-foreground/95 ${isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"}`}>
        {/* Reader Header */}
        <div className="bg-card/95 backdrop-blur-md border-b border-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setReadingMag(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="font-display font-bold text-foreground text-sm">{readingMag.title} {readingMag.number}</p>
              <p className="text-xs text-muted-foreground">{readingMag.headline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted-foreground w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button onClick={() => setReadingMag(null)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex items-center justify-center" style={{ height: isFullscreen ? "calc(100vh - 48px)" : "calc(100vh - 112px)" }}>
          <iframe
            src={readingMag.pdfUrl}
            title={`${readingMag.title} ${readingMag.number}`}
            className="bg-background rounded-lg shadow-2xl border border-border"
            style={{
              width: `${Math.min(zoom, 100)}%`,
              height: "100%",
              maxWidth: "900px",
              transform: zoom > 100 ? `scale(${zoom / 100})` : undefined,
              transformOrigin: "top center",
            }}
          />
        </div>
      </div>
    );
  }

  // === DASHBOARD ===
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Nav */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logoCendf} alt="CEDF" className="h-10" />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-border" />
            <span className="hidden sm:inline text-sm font-display font-bold text-foreground">Espace Abonné</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="hidden sm:inline font-medium text-foreground">{profile.full_name || user.email}</span>
            </div>
            <button onClick={handleSignOut} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Bonjour, <span className="text-primary">{profile.full_name || firstName}</span> 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Bienvenue dans votre espace abonné Magazine Credo
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-card rounded-xl p-1 border border-border w-fit">
          {[
            { id: "library" as const, label: "Ma Bibliothèque", icon: BookOpen },
            { id: "profile" as const, label: "Mon Profil", icon: User },
            { id: "billing" as const, label: "Facturation", icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* LIBRARY TAB */}
        {activeTab === "library" && (
          <div>
            {/* Search */}
            <div className="relative max-w-md mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un magazine..."
                className="pl-10 h-11 bg-card"
              />
            </div>

            {/* Recommended */}
            <div className="mb-8">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary" />
                Recommandé
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {filteredMags.map((mag) => (
                  <div
                    key={mag.id}
                    className="group cursor-pointer"
                    onClick={() => setReadingMag(mag)}
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-card group-hover:shadow-elegant transition-all duration-300 mb-3">
                      <img
                        src={mag.cover}
                        alt={mag.headline}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center shadow-xl">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{mag.number} · {mag.period}</p>
                    <p className="text-sm font-bold text-foreground line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                      {mag.headline}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* All magazines table */}
            <div>
              <h2 className="font-display text-lg font-bold text-foreground mb-4">Tous les numéros</h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-muted/50 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                  <span>Titre</span>
                  <span>Numéro</span>
                  <span>Période</span>
                  <span>Action</span>
                </div>
                {filteredMags.map((mag) => (
                  <div
                    key={mag.id}
                    className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-4 items-center px-4 md:px-6 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setReadingMag(mag)}
                  >
                    <div className="flex items-center gap-3 md:col-span-1">
                      <img src={mag.cover} alt={mag.headline} className="w-10 h-14 rounded object-cover shadow-sm" />
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">{mag.headline}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{mag.number} · {mag.period}</p>
                      </div>
                    </div>
                    <span className="hidden md:block text-sm text-muted-foreground">{mag.number}</span>
                    <span className="hidden md:block text-sm text-muted-foreground">{mag.period}</span>
                    <Button variant="outline" size="sm" className="gap-1 text-xs shrink-0">
                      Lire
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="max-w-lg">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Mon Profil
                </h2>
                <button
                  onClick={() => {
                    setEditingProfile(!editingProfile);
                    setProfileForm(f => ({ ...f, full_name: profile.full_name }));
                  }}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Edit3 className="w-4 h-4" />
                  {editingProfile ? "Annuler" : "Modifier"}
                </button>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-foreground">{profile.full_name || "—"}</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              {editingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Nom complet</label>
                    <Input
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm(f => ({ ...f, full_name: e.target.value }))}
                      className="h-11"
                    />
                  </div>
                  <Button variant="burgundy" onClick={handleSaveProfile} className="w-full h-11 gap-2">
                    <Settings className="w-4 h-4" />
                    Enregistrer les modifications
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{profile.email}</p>
                    </div>
                  </div>
                  {subscription && (
                    <div className="flex items-center gap-3">
                      <Crown className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Abonnement</p>
                        <p className="text-sm font-medium text-foreground capitalize">
                          Credo {subscription.plan} — <span className="text-secondary">{subscription.status === "active" ? "Actif" : "Inactif"}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === "billing" && (
          <div className="max-w-lg">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card">
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                Facturation
              </h2>

              {subscription ? (
                <div className="space-y-6">
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-foreground capitalize">Credo {subscription.plan}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        subscription.status === "active" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                      }`}>
                        {subscription.status === "active" ? "Actif" : "Inactif"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Depuis le {new Date(subscription.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-foreground">Informations de facturation</h3>
                    {subscription.billing_name && (
                      <div className="flex items-center gap-3 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subscription.billing_name}</span>
                      </div>
                    )}
                    {subscription.billing_phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subscription.billing_phone}</span>
                      </div>
                    )}
                    {subscription.billing_city && (
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subscription.billing_city}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">
                      Pour modifier votre abonnement ou vos informations de facturation, contactez-nous :
                    </p>
                    <div className="flex flex-col gap-2">
                      <a href="tel:0779104515" className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                        <Phone className="w-4 h-4" />
                        07 79 10 45 15
                      </a>
                      <a href="mailto:production@cedfci.org" className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                        <Mail className="w-4 h-4" />
                        production@cedfci.org
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Aucun abonnement actif</p>
                  <Link to="/boutique">
                    <Button variant="burgundy" className="gap-2">
                      <BookOpen className="w-4 h-4" />
                      Voir les abonnements
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EspaceAbonne;
