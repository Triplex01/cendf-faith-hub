import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import OrderModal from "@/components/OrderModal";
import { 
  BookOpen, 
  Phone,
  Mail,
  CheckCircle2,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
  Calendar,
  Eye
} from "lucide-react";

import basiliqueCover from "@/assets/basilique-notredame.jpg";
import paydunyaPaymentMethods from "@/assets/paydunya-payment-methods.png";

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
  topics: string[];
}

const magazines: Magazine[] = [
  {
    id: 1,
    title: "Credo",
    number: "N°006",
    period: "Mars",
    cover: credoCover006,
    headline: "La Liturgie, Vie de l'Église",
    topics: ["Histoire de la Liturgie", "Philosophie et Liturgie", "Liturgie et Traditions"],
  },
  {
    id: 2,
    title: "Credo",
    number: "N°004",
    period: "Décembre-Janvier",
    cover: credoCover004,
    headline: "L'Homme dans l'Histoire et Aujourd'hui",
    topics: ["L'Homme vu par nos Traditions Africaines", "Être Témoin de l'Espérance"],
  },
  {
    id: 3,
    title: "Credo",
    number: "N°003",
    period: "Novembre",
    cover: credoCover003,
    headline: "Au-delà de la Mort, Dieu Notre Vie",
    topics: ["Le Dieu Juif", "Dieu dans nos Traditions Africaines", "Dieu des Philosophes"],
  },
  {
    id: 4,
    title: "Credo",
    number: "N°002",
    period: "Année du Jubilé",
    cover: credoCover002,
    headline: "Jésus-Christ, Espérance de l'Humanité",
    topics: ["Synodalité à l'Espérance", "Pape Léon XIV : L'Exhortation Apostolique"],
  },
  {
    id: 5,
    title: "Credo",
    number: "N°001",
    period: "Synodalité",
    cover: credoCover001,
    headline: "L'Église dans le Temps : Communion, Participation et Mission",
    topics: ["La Sainte Écriture au Cœur du Cheminement Synodal", "Communion et Participation"],
  },
];

const Boutique = () => {
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null);
  const [orderModal, setOrderModal] = useState<{ open: boolean; product: any }>({ open: false, product: null });

  const handleOrderMagazine = (mag: Magazine) => {
    setOrderModal({
      open: true,
      product: { id: mag.id, name: `${mag.title} ${mag.number} — ${mag.headline}`, price: 1500, image: mag.cover },
    });
  };

  return (
    <PageLayout
      title="Magazine Credo"
      subtitle="Mensuel Catholique de la Commission Épiscopale pour la Doctrine de la Foi"
      backgroundImage={basiliqueCover}
    >
      {/* Order Modal */}
      <OrderModal
        open={orderModal.open}
        onOpenChange={(open) => setOrderModal(prev => ({ ...prev, open }))}
        product={orderModal.product}
      />

      {/* Featured / Latest Issue */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Cover */}
            <div className="relative group flex justify-center">
              <div className="relative w-[280px] md:w-[360px] shadow-2xl rounded-lg overflow-hidden group-hover:shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)] transition-shadow duration-500">
                <img 
                  src={magazines[0].cover} 
                  alt={`${magazines[0].title} ${magazines[0].number}`}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                <Star className="w-3 h-3 fill-current" />
                Dernier numéro
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {magazines[0].title}{" "}
                <span className="text-primary">{magazines[0].number}</span>
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
                {magazines[0].period}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-primary mb-4">
                {magazines[0].headline}
              </h3>
              <div className="space-y-2 mb-8">
                {magazines[0].topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-secondary rounded-full" />
                    <span className="text-muted-foreground font-medium text-sm">{topic}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="burgundy" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => handleOrderMagazine(magazines[0])}
                >
                  Commander ce numéro
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link to="/inscription?plan=paper">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto border-primary/20">
                    S'abonner
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Issues Grid - Jeune Afrique style */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Archives
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Tous les numéros
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {magazines.map((mag) => (
              <div 
                key={mag.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedMagazine(selectedMagazine?.id === mag.id ? null : mag)}
              >
                {/* Cover */}
                <div className="relative rounded-lg overflow-hidden shadow-card group-hover:shadow-elegant transition-all duration-300 mb-3">
                  <img
                    src={mag.cover}
                    alt={`${mag.title} ${mag.number}`}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOrderMagazine(mag); }}
                        className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center shadow-lg hover:bg-background transition-colors"
                        aria-label="Commander"
                      >
                        <BookOpen className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedMagazine(mag); }}
                        className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center shadow-lg hover:bg-background transition-colors"
                        aria-label="Voir les détails"
                      >
                        <Eye className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <p className="text-xs text-muted-foreground font-medium">
                  {mag.number} · {mag.period}
                </p>
                <p className="text-sm font-bold text-foreground line-clamp-2 mt-0.5 group-hover:text-primary transition-colors">
                  {mag.headline}
                </p>
              </div>
            ))}
          </div>

          {/* Selected magazine detail */}
          {selectedMagazine && (
            <div className="max-w-3xl mx-auto mt-10 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-elegant animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedMagazine.cover} 
                  alt={selectedMagazine.headline}
                  className="w-32 md:w-40 rounded-lg shadow-lg self-center md:self-start"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{selectedMagazine.period}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">{selectedMagazine.headline}</h3>
                  <div className="space-y-1.5 mb-6">
                    {selectedMagazine.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1 h-4 bg-secondary rounded-full" />
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="burgundy" size="sm" className="gap-2" onClick={() => handleOrderMagazine(selectedMagazine)}>
                      <BookOpen className="w-4 h-4" />
                      Commander — 1 500 FCFA
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-burgundy" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <div className="h-px w-8 md:w-12 bg-primary/30" />
              <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                Abonnement
              </span>
              <div className="h-px w-8 md:w-12 bg-primary/30" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Abonnez-vous à <span className="italic text-primary">Credo</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-lg font-secondary leading-relaxed px-4">
              La foi expliquée, la foi vécue — Recevez chaque parution directement chez vous.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-0 max-w-5xl mx-auto">
            {/* Digital Plan */}
            <div className="relative bg-card border border-border p-6 md:p-10 rounded-2xl md:rounded-l-2xl md:rounded-r-none shadow-card group hover:shadow-elegant transition-all duration-500">
              <div className="mb-6 md:mb-8">
                <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-primary/60 mb-3 md:mb-4" />
                <h3 className="font-display text-xs md:text-sm font-bold text-primary tracking-[0.2em] uppercase mb-1 md:mb-2">
                  Numérique
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">Accès PDF complet</p>
              </div>
              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl md:text-5xl font-bold text-foreground">5</span>
                  <span className="text-muted-foreground text-base md:text-lg">.000</span>
                </div>
                <p className="text-muted-foreground/60 text-xs md:text-sm mt-1">FCFA / an</p>
              </div>
              <ul className="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                {["4 parutions par an en PDF", "Archives numériques incluses", "Accès immédiat"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link to="/inscription?plan=digital">
                <Button variant="outline" className="w-full border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 transition-all text-xs md:text-sm">
                  S'abonner
                </Button>
              </Link>
            </div>

            {/* Paper Plan - Featured */}
            <div className="relative bg-card border-2 border-primary/30 p-6 md:p-10 md:-my-4 rounded-2xl z-10 shadow-elegant group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-primary text-primary-foreground rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  Populaire
                </span>
              </div>
              <div className="mb-6 md:mb-8 pt-2">
                <Crown className="w-7 h-7 md:w-8 md:h-8 text-secondary mb-3 md:mb-4" />
                <h3 className="font-display text-xs md:text-sm font-bold text-primary tracking-[0.2em] uppercase mb-1 md:mb-2">
                  Papier
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">Livraison à domicile</p>
              </div>
              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl md:text-5xl font-bold text-foreground">15</span>
                  <span className="text-muted-foreground text-base md:text-lg">.000</span>
                </div>
                <p className="text-muted-foreground/60 text-xs md:text-sm mt-1">FCFA / an</p>
              </div>
              <ul className="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                {["4 parutions papier livrées", "Accès numérique offert", "Livraison gratuite en CI", "Numéros spéciaux inclus"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link to="/inscription?plan=paper">
                <Button variant="burgundy" className="w-full shadow-lg shadow-primary/20 text-xs md:text-base py-4 md:py-5">
                  S'abonner maintenant
                </Button>
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-card border border-border p-6 md:p-10 rounded-2xl md:rounded-r-2xl md:rounded-l-none shadow-card group hover:shadow-elegant transition-all duration-500">
              <div className="mb-6 md:mb-8">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-secondary/70 mb-3 md:mb-4" />
                <h3 className="font-display text-xs md:text-sm font-bold text-primary tracking-[0.2em] uppercase mb-1 md:mb-2">
                  Intégral
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">Papier + Digital + Bonus</p>
              </div>
              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl md:text-5xl font-bold text-foreground">15</span>
                  <span className="text-muted-foreground text-base md:text-lg">.000</span>
                </div>
                <p className="text-muted-foreground/60 text-xs md:text-sm mt-1">FCFA / an</p>
              </div>
              <ul className="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                {["Tout Credo Papier inclus", "Documents exclusifs CEDF", "Invitations aux événements", "Mention dans la revue"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary/60 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link to="/inscription?plan=premium">
                <Button variant="outline" className="w-full border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 transition-all text-xs md:text-sm">
                  S'abonner
                </Button>
              </Link>
            </div>
          </div>

          {/* Payment & Contact */}
          <div className="max-w-3xl mx-auto mt-10 md:mt-16">
            <div className="text-center">
              <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6 font-secondary">
                Moyens de paiement acceptés
              </p>
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="bg-card rounded-xl px-6 md:px-8 py-3 md:py-4 border border-border shadow-card">
                  <img 
                    src={paydunyaPaymentMethods} 
                    alt="Orange Money, Wave, MTN, Visa, Mastercard"
                    className="h-8 md:h-12 object-contain opacity-70"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-xs md:text-sm">
                <a href="tel:0779104515" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                  <Phone className="w-4 h-4" />
                  07 79 10 45 15
                </a>
                <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
                <a href="tel:0507427398" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                  <Phone className="w-4 h-4" />
                  05 07 42 73 98
                </a>
                <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
                <a href="mailto:production@cedfci.org" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                  <Mail className="w-4 h-4" />
                  production@cedfci.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Boutique;
