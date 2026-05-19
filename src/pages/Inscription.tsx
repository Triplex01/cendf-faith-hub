import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import PaymentModal from "@/components/PaymentModal";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/lib/countries";
import {
  UserPlus, Mail, Lock, User, Phone, BookOpen, Crown, Sparkles,
  CheckCircle2, Star, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck, Globe2, Loader2
} from "lucide-react";
import logoCendf from "@/assets/logo-cendf.png";
import basiliqueImg from "@/assets/basilique-yamoussoukro-new.jpg";

const plans = [
  { id: "digital", name: "Numérique", price: 5000, icon: BookOpen,
    features: ["4 parutions/an en PDF", "Archives numériques", "Accès immédiat"], popular: false },
  { id: "paper", name: "Papier", price: 10000, icon: Crown,
    features: ["4 parutions papier livrées", "Accès numérique offert", "Livraison gratuite en CI", "Numéros spéciaux"], popular: true },
  { id: "premium", name: "Intégral", price: 15000, icon: Sparkles,
    features: ["Tout Credo Papier", "Documents exclusifs CEDF", "Invitations événements", "Mention dans la revue"], popular: false },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court").max(120, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(200),
  phone: z.string().trim().min(6, "Téléphone invalide").max(20, "Téléphone invalide"),
  password: z.string()
    .min(8, "Min. 8 caractères")
    .max(128, "Max. 128 caractères")
    .regex(/[A-Z]/, "Doit contenir une majuscule")
    .regex(/[a-z]/, "Doit contenir une minuscule")
    .regex(/[0-9]/, "Doit contenir un chiffre"),
});

const Inscription = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  const [step, setStep] = useState<"plan" | "info">(planFromUrl ? "info" : "plan");
  const [selectedPlan, setSelectedPlan] = useState(planFromUrl && ["digital", "paper", "premium"].includes(planFromUrl) ? planFromUrl : "paper");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "" });
  const [payOpen, setPayOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const currentPlan = plans.find(p => p.id === selectedPlan)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast({ title: "Veuillez accepter les conditions et la politique de confidentialité", variant: "destructive" });
      return;
    }
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({ title: "Formulaire invalide", description: first.message, variant: "destructive" });
      return;
    }

    setLoading(true);
    setPayOpen(true);
    setCheckoutUrl(null);

    try {
      const fullPhone = form.phone.startsWith("+") ? form.phone : `${country.dial}${form.phone.replace(/^0+/, "")}`;
      const { data, error } = await supabase.functions.invoke("create-pending-subscription", {
        body: {
          full_name: parsed.data.fullName,
          email: parsed.data.email.toLowerCase(),
          phone: fullPhone,
          country: country.code,
          plan: selectedPlan,
          password: parsed.data.password,
        },
      });

      if (error || !data?.success || !data?.checkout_url) {
        const msg = (data as any)?.error || error?.message || "Erreur lors de la création du paiement";
        toast({ title: "Erreur", description: msg, variant: "destructive" });
        setPayOpen(false);
        setLoading(false);
        return;
      }

      setCheckoutUrl(data.checkout_url);
    } catch (err: any) {
      toast({ title: "Erreur", description: err?.message || "Une erreur est survenue", variant: "destructive" });
      setPayOpen(false);
    } finally {
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
            Réglez votre abonnement en toute sécurité. Votre compte sera créé automatiquement après le paiement.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm text-primary-foreground/90 bg-white/10 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Paiement sécurisé · Genius Pay · SSL
          </div>
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
              S'abonner à Credo
            </h1>
            <p className="text-muted-foreground text-sm">
              Choisissez votre formule, payez en ligne, accédez à votre espace.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {["Formule", "Paiement"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  (i === 0 && step === "plan") || (i === 1 && step === "info") || (i === 0 && step === "info")
                    ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{i + 1}</div>
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                {i === 0 && <div className={`w-8 h-0.5 ${step === "info" ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

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
                        <Star className="w-3 h-3 fill-current" /> Populaire
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
                              <CheckCircle2 className="w-3 h-3 text-secondary" />{f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              <Button variant="burgundy" className="w-full h-12 mt-4 gap-2" onClick={() => setStep("info")}>
                Continuer <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === "info" && (
            <div>
              <button
                onClick={() => setStep("plan")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Retour aux formules
              </button>

              <div className="bg-card rounded-xl border border-border p-5 shadow-card">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border text-sm">
                  <span className="font-bold text-foreground">Formule : {currentPlan.name}</span>
                  <span className="text-primary font-bold ml-auto">{formatPrice(currentPlan.price)}/an</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" /> Nom et prénom *
                    </label>
                    <Input value={form.fullName} onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))}
                      placeholder="Votre nom complet" required maxLength={120} className="h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" /> Email *
                    </label>
                    <Input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="votre@email.com" required maxLength={200} className="h-11" />
                  </div>

                  {/* Country + phone */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-muted-foreground" /> Pays / Téléphone *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={country.code}
                        onChange={(e) => {
                          const c = COUNTRIES.find(c => c.code === e.target.value) || DEFAULT_COUNTRY;
                          setCountry(c);
                        }}
                        className="h-11 rounded-md border border-input bg-background px-2 text-sm w-[150px] shrink-0"
                        aria-label="Pays"
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.dial})</option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none">
                          {country.dial}
                        </span>
                        <Input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm(f => ({ ...f, phone: e.target.value.replace(/[^\d\s-]/g, "") }))}
                          placeholder="07 00 00 00 00"
                          required
                          maxLength={20}
                          className="h-11 pl-16"
                          style={{ paddingLeft: `${country.dial.length * 8 + 16}px` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      Mot de passe * (8+ car., 1 maj., 1 min., 1 chiffre)
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        maxLength={128}
                        className="h-11 pr-12"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                    <input type="checkbox" checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 shrink-0 accent-primary" />
                    <span>
                      J'accepte les{" "}
                      <Link to="/mentions-legales" className="text-primary hover:underline">mentions légales</Link>{" "}
                      et la{" "}
                      <Link to="/confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>.
                    </span>
                  </label>

                  <Button type="submit" variant="burgundy" className="w-full h-12 text-base gap-2" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    {loading ? "Préparation du paiement..." : `Payer ${formatPrice(currentPlan.price)} et créer mon compte`}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-secondary" />
                    Votre compte est créé automatiquement après confirmation du paiement.
                  </p>
                </form>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Déjà un compte ?{" "}
                <Link to="/connexion" className="text-primary font-semibold hover:underline">Se connecter</Link>
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

      <PaymentModal
        open={payOpen}
        onOpenChange={setPayOpen}
        checkoutUrl={checkoutUrl}
        amount={currentPlan.price}
        description={`Abonnement ${currentPlan.name}`}
      />
    </div>
  );
};

export default Inscription;
