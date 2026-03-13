import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  BookOpen,
  Crown,
  Sparkles,
  Star
} from "lucide-react";

import basiliqueCover from "@/assets/basilique-notredame.jpg";
import paydunyaPaymentMethods from "@/assets/paydunya-payment-methods.png";

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
    features: ["4 parutions papier livrées", "Accès numérique offert", "Livraison gratuite en CI", "Numéros spéciaux inclus"],
    popular: true,
  },
  {
    id: "premium",
    name: "Intégral",
    price: 15000,
    icon: Sparkles,
    features: ["Tout Credo Papier inclus", "Documents exclusifs CEDF", "Invitations aux événements", "Mention dans la revue"],
    popular: false,
  },
];

const Abonnement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("paper");
  const [step, setStep] = useState<"plan" | "info" | "payment" | "success">("plan");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const currentPlan = plans.find(p => p.id === selectedPlan)!;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast({ title: "Veuillez remplir tous les champs obligatoires", variant: "destructive" });
      return;
    }
    setStep("payment");
  };

  const handlePaymentSelect = () => {
    setStep("success");
    toast({ title: "Demande d'abonnement enregistrée !", description: "Vous serez contacté(e) sous 24h." });
  };

  if (step === "success") {
    return (
      <PageLayout title="Abonnement confirmé" subtitle="" backgroundImage={basiliqueCover}>
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Demande d'abonnement enregistrée !
            </h2>
            <p className="text-muted-foreground mb-2">
              <strong>Formule :</strong> Credo {currentPlan.name} — {formatPrice(currentPlan.price)}/an
            </p>
            <p className="text-muted-foreground mb-8">
              Notre équipe vous contactera sous 24h pour finaliser votre abonnement et le paiement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/boutique">
                <Button variant="burgundy" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Voir les magazines
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="S'abonner à Credo" subtitle="Choisissez votre formule d'abonnement" backgroundImage={basiliqueCover}>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {["Formule", "Informations", "Paiement"].map((label, i) => {
              const stepIndex = i === 0 ? "plan" : i === 1 ? "info" : "payment";
              const isActive = step === stepIndex || 
                (step === "info" && i === 0) || 
                (step === "payment" && i <= 1);
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:inline ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {i < 2 && <div className={`w-8 md:w-16 h-0.5 ${isActive ? "bg-primary" : "bg-muted"}`} />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Choose plan */}
          {step === "plan" && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                Choisissez votre formule
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? "border-primary bg-primary/5 shadow-elegant"
                          : "border-border bg-card hover:border-primary/30 hover:shadow-card"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-0.5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold uppercase">
                          <Star className="w-3 h-3 fill-current" />
                          Populaire
                        </span>
                      )}
                      <Icon className={`w-8 h-8 mb-4 ${selectedPlan === plan.id ? "text-primary" : "text-muted-foreground"}`} />
                      <h3 className="font-display font-bold text-lg text-foreground mb-1">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="font-display text-3xl font-bold text-foreground">{(plan.price / 1000).toFixed(0)}</span>
                        <span className="text-muted-foreground">.000 FCFA/an</span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Button variant="burgundy" size="lg" onClick={() => setStep("info")} className="gap-2">
                  Continuer avec {currentPlan.name}
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: User info */}
          {step === "info" && (
            <div className="max-w-lg mx-auto">
              <button onClick={() => setStep("plan")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour aux formules
              </button>

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <currentPlan.icon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-display font-bold text-foreground">Credo {currentPlan.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(currentPlan.price)} / an</p>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-6">Vos informations</h3>

                <form onSubmit={handleSubmitInfo} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nom complet *
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Téléphone *
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+225 XX XX XX XX"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      Ville
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))}
                      placeholder="Abidjan"
                    />
                  </div>
                  {selectedPlan !== "digital" && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        Adresse de livraison
                      </label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                        placeholder="Votre adresse complète"
                      />
                    </div>
                  )}
                  <Button type="submit" variant="burgundy" className="w-full mt-4 gap-2">
                    Continuer vers le paiement
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === "payment" && (
            <div className="max-w-lg mx-auto">
              <button onClick={() => setStep("info")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-card">
                {/* Récap */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <currentPlan.icon className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-display font-bold text-foreground">Credo {currentPlan.name}</p>
                      <p className="text-xs text-muted-foreground">{formData.fullName} · {formData.phone}</p>
                    </div>
                  </div>
                  <p className="font-display font-bold text-primary text-lg">{formatPrice(currentPlan.price)}</p>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Choisir un moyen de paiement
                </h3>

                <div className="mb-6">
                  <img 
                    src={paydunyaPaymentMethods}
                    alt="Moyens de paiement"
                    className="h-12 object-contain mx-auto opacity-80"
                  />
                </div>

                {/* Payment options */}
                <div className="space-y-3 mb-8">
                  {[
                    { label: "Orange Money", color: "bg-orange-500" },
                    { label: "Wave", color: "bg-blue-500" },
                    { label: "MTN Mobile Money", color: "bg-yellow-500" },
                    { label: "Visa / Mastercard", color: "bg-gray-700" },
                  ].map((method) => (
                    <button
                      key={method.label}
                      onClick={handlePaymentSelect}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/30 transition-all"
                    >
                      <div className={`w-3 h-3 rounded-full ${method.color}`} />
                      <span className="font-medium text-foreground text-sm">{method.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Paiement sécurisé — Vous serez contacté(e) pour finaliser</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Abonnement;
