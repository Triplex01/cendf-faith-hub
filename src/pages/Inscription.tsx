import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  UserPlus, Mail, Lock, User, Phone, BookOpen, Crown, Sparkles,
  CheckCircle2, Star, Eye, EyeOff, ArrowLeft, ArrowRight
} from "lucide-react";
import logoCendf from "@/assets/logo-cendf.png";
import basiliqueImg from "@/assets/basilique-yamoussoukro-new.jpg";

const plans = [
  {
    id: "digital",
    name: "Numérique",
    price: 5000,
    icon: BookOpen,
    features: ["4 parutions/an en PDF", "Archives numériques", "Accès immédiat"],
    popular: false,
  },
  {
    id: "paper",
    name: "Papier",
    price: 10000,
    icon: Crown,
    features: ["4 parutions papier livrées", "Accès numérique offert", "Livraison gratuite en CI", "Numéros spéciaux"],
    popular: true,
  },
  {
    id: "premium",
    name: "Intégral",
    price: 15000,
    icon: Sparkles,
    features: ["Tout Credo Papier", "Documents exclusifs CEDF", "Invitations événements", "Mention dans la revue"],
    popular: false,
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);

const Inscription = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"plan" | "info">("plan");
  const [selectedPlan, setSelectedPlan] = useState("paper");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password || !form.phone) {
      toast({ title: "Veuillez remplir tous les champs", variant: "destructive" });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: "Le mot de passe doit contenir au moins 8 caractères", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(form.email, form.password, form.fullName);
      if (error) {
        toast({ title: "Erreur d'inscription", description: error.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      // Wait a moment for auth to settle, then create subscription
      setTimeout(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("subscriptions").insert({
            user_id: user.id,
            plan: selectedPlan,
            status: "active",
            billing_name: form.fullName,
            billing_phone: form.phone,
          });
        }
        setLoading(false);
        toast({ title: "Compte créé avec succès !", description: "Bienvenue dans votre espace abonné." });
        navigate("/espace-abonne");
      }, 1500);
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue.", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={basiliqueImg} alt="Basilique" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
          <BookOpen className="w-16 h-16 text-secondary mb-6" />
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Rejoignez les abonnés <span className="text-secondary italic">Credo</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg font-secondary max-w-md leading-relaxed">
            Créez votre compte et accédez à l'ensemble de nos publications doctrinales.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 bg-background overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <Link to="/">
              <img src={logoCendf} alt="CEDF" className="h-14 mx-auto mb-4" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Créer un compte
            </h1>
            <p className="text-muted-foreground text-sm">
              Choisissez votre formule puis remplissez vos informations
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {["Formule", "Inscription"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  (i === 0 && step === "plan") || (i === 1 && step === "info") || (i === 0 && step === "info")
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                {i === 0 && <div className={`w-8 h-0.5 ${step === "info" ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Plan selection */}
          {step === "plan" && (
            <div className="space-y-3">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5 shadow-elegant"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold uppercase">
                        <Star className="w-3 h-3 fill-current" />
                        Populaire
                      </span>
                    )}
                    <div className="flex items-center gap-4">
                      <Icon className={`w-8 h-8 shrink-0 ${selectedPlan === plan.id ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h3 className="font-display font-bold text-foreground">{plan.name}</h3>
                          <span className="text-primary font-bold">{formatPrice(plan.price)}/an</span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {plan.features.map((f, i) => (
                            <span key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-secondary" />
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              <Button
                variant="burgundy"
                className="w-full h-12 mt-4 gap-2"
                onClick={() => setStep("info")}
              >
                Continuer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Registration form */}
          {step === "info" && (
            <div>
              <button
                onClick={() => setStep("plan")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour aux formules
              </button>

              <div className="bg-card rounded-xl border border-border p-5 shadow-card">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border text-sm">
                  <span className="font-bold text-foreground">
                    Formule : {plans.find(p => p.id === selectedPlan)?.name}
                  </span>
                  <span className="text-primary font-bold ml-auto">
                    {formatPrice(plans.find(p => p.id === selectedPlan)?.price || 0)}/an
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nom et prénom *
                    </label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))}
                      placeholder="Votre nom complet"
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="votre@email.com"
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Téléphone *
                    </label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+225 XX XX XX XX"
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      Mot de passe * (min. 8 caractères)
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        className="h-11 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="burgundy"
                    className="w-full h-12 text-base gap-2"
                    disabled={loading}
                  >
                    <UserPlus className="w-4 h-4" />
                    {loading ? "Création en cours..." : "Créer mon compte"}
                  </Button>
                </form>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Déjà un compte ?{" "}
                <Link to="/connexion" className="text-primary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          )}

          <div className="text-center mt-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
