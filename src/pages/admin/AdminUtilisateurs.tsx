import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, Search, Shield, UserPlus, Clock, Mail, X, Save, Trash2
} from "lucide-react";

const AdminUtilisateurs = () => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: "", role: "editor" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("*"),
    ]);
    setProfiles(profilesRes.data || []);
    setRoles(rolesRes.data || []);
    setLoading(false);
  };

  const getUserRole = (userId: string) => {
    const userRole = roles.find(r => r.user_id === userId);
    return userRole?.role || "user";
  };

  const handleAddRole = async () => {
    // This would require creating the user first, simplified for now
    toast({ title: "Fonctionnalité en cours", description: "L'invitation par email sera bientôt disponible." });
    setShowInvite(false);
  };

  const handleDelete = async (user: any) => {
    if (!confirm(`Supprimer définitivement le compte de ${user.email} ? Cette action est irréversible.`)) return;
    const { error } = await supabase.rpc("admin_delete_user" as any, { _user_id: user.id });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Utilisateur supprimé" });
    loadData();
  };

  const filtered = profiles.filter(p =>
    (p.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleLabels: Record<string, { label: string; color: string }> = {
    admin: { label: "Administrateur", color: "bg-primary/10 text-primary" },
    editor: { label: "Éditeur", color: "bg-secondary/10 text-secondary" },
    user: { label: "Utilisateur", color: "bg-muted text-muted-foreground" },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Utilisateurs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{profiles.length} utilisateurs enregistrés</p>
        </div>
        <Button variant="burgundy" className="gap-2 shrink-0" onClick={() => setShowInvite(true)}>
          <UserPlus className="w-4 h-4" />
          Inviter un collaborateur
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="pl-10 h-11 bg-card" />
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-foreground">Inviter un collaborateur</h3>
              <button onClick={() => setShowInvite(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input value={inviteForm.email} onChange={(e) => setInviteForm(f => ({ ...f, email: e.target.value }))} className="h-11" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Rôle</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="editor">Éditeur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowInvite(false)} className="flex-1">Annuler</Button>
                <Button variant="burgundy" onClick={handleAddRole} className="flex-1 gap-2">
                  <UserPlus className="w-4 h-4" /> Inviter
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Utilisateur</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Email</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Rôle</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Inscrit le</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const role = getUserRole(p.id);
                  const rl = roleLabels[role] || roleLabels.user;
                  return (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{p.full_name || "—"}</p>
                            <p className="text-xs text-muted-foreground md:hidden truncate">{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{p.email}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${rl.color}`}>
                          {rl.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(p.created_at).toLocaleDateString("fr-FR")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUtilisateurs;
