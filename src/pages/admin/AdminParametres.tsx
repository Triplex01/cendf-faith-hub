import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings, User, Shield, Palette, Bell, Save, Edit3,
  Globe, Mail
} from "lucide-react";

const AdminParametres = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  const [profileForm, setProfileForm] = useState({ full_name: "", email: user?.email || "" });
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: profileForm.full_name,
    }).eq("id", user.id);
    setSaving(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profil mis à jour" });
    }
  };

  const sections = [
    { id: "profile", label: "Mon profil", icon: User },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Paramètres
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Personnalisez votre espace d'administration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-card rounded-2xl border border-border p-3">
          <nav className="space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          {activeSection === "profile" && (
            <div className="max-w-lg space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Mon profil
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Nom complet</label>
                  <Input
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm(f => ({ ...f, full_name: e.target.value }))}
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <Input value={profileForm.email} disabled className="h-11 bg-muted" />
                  <p className="text-xs text-muted-foreground mt-1">L'email ne peut pas être modifié ici.</p>
                </div>
                <Button variant="burgundy" onClick={handleSaveProfile} disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? "Sauvegarde..." : "Enregistrer"}
                </Button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="max-w-lg space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Sécurité
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h3 className="text-sm font-bold text-foreground mb-1">Mot de passe</h3>
                  <p className="text-xs text-muted-foreground mb-3">Vous pouvez réinitialiser votre mot de passe via email.</p>
                  <Button variant="outline" size="sm" onClick={async () => {
                    if (user?.email) {
                      await supabase.auth.resetPasswordForEmail(user.email, {
                        redirectTo: `${window.location.origin}/gestion/connexion`,
                      });
                      toast({ title: "Email envoyé", description: "Vérifiez votre boîte mail." });
                    }
                  }}>
                    Réinitialiser le mot de passe
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <h3 className="text-sm font-bold text-foreground mb-1">Sessions actives</h3>
                  <p className="text-xs text-muted-foreground">Votre session actuelle est sécurisée et active.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="max-w-lg space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Apparence
              </h2>
              <div className="p-4 bg-muted/50 rounded-xl border border-border">
                <h3 className="text-sm font-bold text-foreground mb-2">Thème de l'interface</h3>
                <div className="flex gap-3">
                  <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-primary bg-background">
                    <div className="w-12 h-8 rounded bg-background border border-border" />
                    <span className="text-xs font-medium text-foreground">Clair</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/50 transition-colors">
                    <div className="w-12 h-8 rounded bg-foreground border border-border" />
                    <span className="text-xs font-medium text-muted-foreground">Sombre</span>
                  </button>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl border border-border">
                <h3 className="text-sm font-bold text-foreground mb-2">Barre latérale</h3>
                <p className="text-xs text-muted-foreground">Cliquez sur l'icône menu ☰ pour réduire la barre latérale.</p>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="max-w-lg space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Nouvel abonnement", desc: "Recevoir une alerte pour chaque nouvel abonné" },
                  { label: "Nouveau commentaire", desc: "Notifications des commentaires sur les articles" },
                  { label: "Rapport hebdomadaire", desc: "Résumé des statistiques chaque lundi" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminParametres;
