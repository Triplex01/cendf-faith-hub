import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, Plus, Search, Edit3, Trash2, Eye, Upload,
  Save, X, Calendar
} from "lucide-react";

// Demo data - in production these come from DB
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
  status: "published" | "draft";
  accessLevel: "all" | "digital" | "paper" | "premium";
}

const initialMagazines: Magazine[] = [
  { id: 1, title: "Credo", number: "N°006", period: "Mars", cover: credoCover006, headline: "La Liturgie, Vie de l'Église", status: "published", accessLevel: "all" },
  { id: 2, title: "Credo", number: "N°004", period: "Décembre-Janvier", cover: credoCover004, headline: "L'Homme dans l'Histoire et Aujourd'hui", status: "published", accessLevel: "all" },
  { id: 3, title: "Credo", number: "N°003", period: "Novembre", cover: credoCover003, headline: "Au-delà de la Mort, Dieu Notre Vie", status: "published", accessLevel: "digital" },
  { id: 4, title: "Credo", number: "N°002", period: "Année du Jubilé", cover: credoCover002, headline: "Jésus-Christ, Espérance de l'Humanité", status: "published", accessLevel: "all" },
  { id: 5, title: "Credo", number: "N°001", period: "Synodalité", cover: credoCover001, headline: "L'Église dans le Temps", status: "published", accessLevel: "premium" },
];

const accessLabels: Record<string, string> = {
  all: "Tous les abonnés",
  digital: "Digital & Premium",
  paper: "Papier & Premium",
  premium: "Premium uniquement",
};

const AdminMagazines = () => {
  const { toast } = useToast();
  const [magazines, setMagazines] = useState<Magazine[]>(initialMagazines);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState<Magazine | null>(null);

  const filtered = magazines.filter(m =>
    m.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!editing) return;
    setMagazines(prev => prev.map(m => m.id === editing.id ? editing : m));
    setEditing(null);
    toast({ title: "Magazine mis à jour", description: `${editing.number} sauvegardé.` });
  };

  const handleDelete = (id: number) => {
    setMagazines(prev => prev.filter(m => m.id !== id));
    toast({ title: "Magazine supprimé" });
  };

  const handleToggleStatus = (id: number) => {
    setMagazines(prev => prev.map(m =>
      m.id === id ? { ...m, status: m.status === "published" ? "draft" : "published" } : m
    ));
    toast({ title: "Statut mis à jour" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Magazines
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{magazines.length} magazines</p>
        </div>
        <Button variant="burgundy" className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Ajouter un magazine
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher..."
          className="pl-10 h-11 bg-card"
        />
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-foreground">Modifier {editing.number}</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Titre principal</label>
                <Input
                  value={editing.headline}
                  onChange={(e) => setEditing({ ...editing, headline: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Numéro</label>
                  <Input value={editing.number} onChange={(e) => setEditing({ ...editing, number: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Période</label>
                  <Input value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Accès</label>
                <select
                  value={editing.accessLevel}
                  onChange={(e) => setEditing({ ...editing, accessLevel: e.target.value as any })}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="all">Tous les abonnés</option>
                  <option value="digital">Digital & Premium</option>
                  <option value="paper">Papier & Premium</option>
                  <option value="premium">Premium uniquement</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setEditing(null)} className="flex-1 gap-2">
                  <X className="w-4 h-4" /> Annuler
                </Button>
                <Button variant="burgundy" onClick={handleSave} className="flex-1 gap-2">
                  <Save className="w-4 h-4" /> Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Magazine</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Accès</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Statut</th>
                <th className="text-right text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mag) => (
                <tr key={mag.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={mag.cover} alt={mag.headline} className="w-10 h-14 rounded object-cover shadow-sm" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{mag.headline}</p>
                        <p className="text-xs text-muted-foreground">{mag.number} · {mag.period}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-muted-foreground">{accessLabels[mag.accessLevel]}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggleStatus(mag.id)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                        mag.status === "published"
                          ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {mag.status === "published" ? "Publié" : "Brouillon"}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => setEditing(mag)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Modifier">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(mag.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMagazines;
