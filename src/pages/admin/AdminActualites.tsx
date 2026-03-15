import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Newspaper, Plus, Search, Edit3, Trash2, Save, X,
  Clock, Eye, EyeOff
} from "lucide-react";

const AdminActualites = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editArticle, setEditArticle] = useState<any>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "", status: "draft" });

  useEffect(() => {
    loadArticles();

    // Realtime subscription
    const channel = supabase
      .channel("admin-articles")
      .on("postgres_changes", { event: "*", schema: "public", table: "articles" }, () => loadArticles())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const loadArticles = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setArticles(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const payload = { ...form, slug, published_at: form.status === "published" ? new Date().toISOString() : null };

    if (editArticle) {
      const { error } = await supabase.from("articles").update(payload).eq("id", editArticle.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Article mis à jour" });
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Article créé" });
    }

    setShowEditor(false);
    setEditArticle(null);
    setForm({ title: "", slug: "", excerpt: "", content: "", category: "", status: "draft" });
  };

  const handleEdit = (article: any) => {
    setEditArticle(article);
    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || "",
      content: article.content || "",
      category: article.category || "",
      status: article.status,
    });
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", variant: "destructive" }); return; }
    toast({ title: "Article supprimé" });
  };

  const handleToggleStatus = async (article: any) => {
    const newStatus = article.status === "published" ? "draft" : "published";
    await supabase.from("articles").update({
      status: newStatus,
      published_at: newStatus === "published" ? new Date().toISOString() : null,
    }).eq("id", article.id);
    toast({ title: newStatus === "published" ? "Article publié" : "Article dépublié" });
  };

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            Actualités
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{articles.length} articles</p>
        </div>
        <Button variant="burgundy" className="gap-2 shrink-0" onClick={() => {
          setEditArticle(null);
          setForm({ title: "", slug: "", excerpt: "", content: "", category: "", status: "draft" });
          setShowEditor(true);
        }}>
          <Plus className="w-4 h-4" />
          Nouvel article
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="pl-10 h-11 bg-card" />
      </div>

      {/* Editor modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-foreground">
                {editArticle ? "Modifier l'article" : "Nouvel article"}
              </h3>
              <button onClick={() => setShowEditor(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Titre *</label>
                <Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} className="h-11" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Catégorie</label>
                  <Input value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Statut</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Extrait</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Contenu</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={8}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowEditor(false)} className="flex-1 gap-2">
                  <X className="w-4 h-4" /> Annuler
                </Button>
                <Button variant="burgundy" onClick={handleSave} className="flex-1 gap-2">
                  <Save className="w-4 h-4" /> {editArticle ? "Mettre à jour" : "Créer"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Aucun article</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Titre</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Catégorie</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Statut</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Date</th>
                  <th className="text-right text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((art) => (
                  <tr key={art.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-sm text-foreground truncate max-w-xs">{art.title}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{art.category || "—"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(art)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                          art.status === "published"
                            ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {art.status === "published" ? "Publié" : "Brouillon"}
                      </button>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(art.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => handleEdit(art)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(art.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActualites;
