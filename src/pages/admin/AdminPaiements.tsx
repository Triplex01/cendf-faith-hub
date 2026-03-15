import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import {
  CreditCard, Search, Download, Users, TrendingUp,
  Clock, Filter
} from "lucide-react";

const planPrices: Record<string, number> = { digital: 5000, papier: 10000, premium: 15000 };

const AdminPaiements = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();

    const channel = supabase
      .channel("admin-subs")
      .on("postgres_changes", { event: "*", schema: "public", table: "subscriptions" }, () => loadSubscriptions())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const loadSubscriptions = async () => {
    const { data } = await supabase.from("subscriptions").select("*").order("created_at", { ascending: false });
    setSubscriptions(data || []);
    setLoading(false);
  };

  const activeSubs = subscriptions.filter(s => s.status === "active");
  const totalRevenue = activeSubs.reduce((sum, s) => sum + (planPrices[s.plan] || 0), 0);

  const filtered = subscriptions.filter(s => {
    const matchesSearch = (s.billing_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.billing_phone || "").includes(searchQuery);
    const matchesFilter = filterStatus === "all" || s.status === filterStatus || (filterStatus === "inactive" && s.status !== "active");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-primary" />
          Paiements & Abonnements
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Suivi de la traçabilité des paiements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Total abonnés</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{subscriptions.length}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-xs text-muted-foreground">Actifs</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{activeSubs.length}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground">Revenus estimés</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalRevenue.toLocaleString("fr-FR")} FCFA</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher par nom ou téléphone..." className="pl-10 h-11 bg-card" />
        </div>
        <div className="flex gap-1 bg-card rounded-xl border border-border p-1 w-fit">
          {(["all", "active", "inactive"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Tous" : f === "active" ? "Actifs" : "Inactifs"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Aucun abonnement trouvé</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Abonné</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Formule</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Montant</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3">Statut</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-sm text-foreground">{sub.billing_name || "—"}</p>
                        <p className="text-xs text-muted-foreground">{sub.billing_phone || sub.billing_city || "—"}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground capitalize">Credo {sub.plan}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm font-medium text-foreground">
                        {(planPrices[sub.plan] || 0).toLocaleString("fr-FR")} FCFA
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        sub.status === "active" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                      }`}>
                        {sub.status === "active" ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                      </span>
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

export default AdminPaiements;
