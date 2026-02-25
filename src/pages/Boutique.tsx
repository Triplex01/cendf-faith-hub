import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCart, 
  Heart,
  Search,
  Phone,
  Mail,
  CheckCircle2,
  Star,
  BookOpen,
  Crown,
  Sparkles
} from "lucide-react";

import basiliqueCover from "@/assets/basilique-notredame.jpg";
import productChapelet from "@/assets/product-chapelet.jpg";
import bookDictionnaire from "@/assets/book-dictionnaire-theologie.png";
import bookOecumenisme from "@/assets/book-oecumenisme.jpg";
import bookAmour from "@/assets/book-amour-foi.jpg";
import booksManuelCredo from "@/assets/books-manuel-credo.jpg";
import paydunyaPaymentMethods from "@/assets/paydunya-payment-methods.png";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Dictionnaire de Théologie Africaine",
    price: 25000,
    image: bookDictionnaire,
    category: "Livres",
    description: "Ouvrage de référence sous la direction de Nathanaël Yaovi SOEDE et Laurenti MAGESA",
    inStock: true,
  },
  {
    id: 2,
    name: "Œcuménisme et Politique",
    price: 24000,
    image: bookOecumenisme,
    category: "Livres",
    description: "Réflexion pour des élections sans morts en Afrique par le Père Marius Hervé Djadji",
    inStock: true,
  },
  {
    id: 3,
    name: "L'amour seul est digne de foi",
    price: 15000,
    image: bookAmour,
    category: "Livres",
    description: "Œuvre spirituelle de Hans-Urs von Balthasar, Éditions Parole et Silence",
    inStock: true,
  },
  {
    id: 4,
    name: "Le Manuel CEDF",
    price: 1000,
    image: booksManuelCredo,
    category: "Documents",
    description: "Guide de la Commission Épiscopale pour la Doctrine de la Foi en CI",
    inStock: true,
  },
  {
    id: 5,
    name: "Magazine Credo",
    price: 1500,
    image: booksManuelCredo,
    category: "Magazines",
    description: "Revue spécialisée de la CEDF - La foi expliquée, la foi vécue",
    inStock: true,
  },
  {
    id: 6,
    name: "Chapelet en bois d'olivier",
    price: 5000,
    image: productChapelet,
    category: "Chapelets",
    description: "Chapelet artisanal en bois d'olivier de Terre Sainte",
    inStock: true,
  },
];

const categories = ["Tous", "Chapelets", "Livres", "Médailles", "Décoration", "Encens", "Icônes", "Bougies", "Statues"];

const Boutique = () => {
  const { toast } = useToast();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        toast({ title: "Retiré des favoris", description: "L'article a été retiré de vos favoris" });
        return prev.filter(id => id !== productId);
      } else {
        toast({ title: "Ajouté aux favoris", description: "L'article a été ajouté à vos favoris" });
        return [...prev, productId];
      }
    });
  };

  const filteredProducts = demoProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast({ title: "Ajouté au panier", description: `${product.name} a été ajouté à votre panier` });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);
  };

  return (
    <PageLayout
      title="Boutique"
      subtitle="Objets de piété pour une vie spirituelle"
      backgroundImage={basiliqueCover}
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "burgundy" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid - Full width, no cart sidebar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-muted-foreground font-medium">Rupture de stock</span>
                    </div>
                  )}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center transition-colors ${
                      wishlist.includes(product.id) ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    aria-label={wishlist.includes(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wide">{product.category}</span>
                  <h3 className="font-display font-bold text-foreground mt-1 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-burgundy">{formatPrice(product.price)}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Contact pour commander
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Aucun produit trouvé</p>
            </div>
          )}

          {/* Contact pour commande */}
          <div className="mt-12 bg-card rounded-2xl border border-border p-8 shadow-card text-center max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Comment commander ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Pour passer commande, contactez-nous directement par téléphone ou par email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:0779104515" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                <Phone className="w-4 h-4" />
                07 79 10 45 15
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a href="mailto:production@cedfci.org" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                <Mail className="w-4 h-4" />
                production@cedfci.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Abonnement Magazine Credo - Style Jeune Afrique Editorial */}
      <section className="py-24 relative overflow-hidden">
        {/* Background editorial */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--burgundy))] via-[hsl(var(--deep-black))] to-[hsl(var(--burgundy)/0.8)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Editorial Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-secondary/60" />
              <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">
                Nos Publications
              </span>
              <div className="h-px w-12 bg-secondary/60" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              La Revue <span className="italic text-secondary">Credo</span>
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto text-lg font-secondary leading-relaxed">
              La foi expliquée, la foi vécue — Votre magazine trimestriel 
              de référence sur la doctrine catholique.
            </p>
          </div>

          {/* Plans Grid - Editorial Cards */}
          <div className="grid md:grid-cols-3 gap-0 max-w-5xl mx-auto">
            {/* Digital Plan */}
            <div className="relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-10 md:rounded-l-2xl group hover:bg-primary-foreground/10 transition-all duration-500">
              <div className="mb-8">
                <BookOpen className="w-8 h-8 text-secondary/70 mb-4" />
                <h3 className="font-display text-sm font-bold text-secondary tracking-[0.2em] uppercase mb-2">
                  Numérique
                </h3>
                <p className="text-primary-foreground/50 text-sm">Accès PDF complet</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-primary-foreground">5</span>
                  <span className="text-primary-foreground/50 text-lg">.000</span>
                </div>
                <p className="text-primary-foreground/40 text-sm mt-1">FCFA / an</p>
              </div>
              <ul className="space-y-3 mb-10">
                {["4 parutions par an en PDF", "Archives numériques incluses", "Accès immédiat"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-primary-foreground/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary/60 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a href="tel:0779104515" className="block">
                <Button variant="outline" className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-secondary/40 transition-all">
                  <Phone className="w-4 h-4 mr-2" />
                  S'abonner
                </Button>
              </a>
            </div>

            {/* Paper Plan - Featured */}
            <div className="relative bg-secondary/10 backdrop-blur-sm border-2 border-secondary/40 p-10 md:-my-4 md:rounded-2xl z-10 shadow-2xl shadow-secondary/10 group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-secondary text-primary-foreground rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  Populaire
                </span>
              </div>
              <div className="mb-8 pt-2">
                <Crown className="w-8 h-8 text-secondary mb-4" />
                <h3 className="font-display text-sm font-bold text-secondary tracking-[0.2em] uppercase mb-2">
                  Papier
                </h3>
                <p className="text-primary-foreground/60 text-sm">Livraison à domicile</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-primary-foreground">10</span>
                  <span className="text-primary-foreground/50 text-lg">.000</span>
                </div>
                <p className="text-primary-foreground/40 text-sm mt-1">FCFA / an</p>
              </div>
              <ul className="space-y-3 mb-10">
                {["4 parutions papier livrées", "Accès numérique offert", "Livraison gratuite en CI", "Numéros spéciaux inclus"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-primary-foreground/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a href="tel:0779104515" className="block">
                <Button variant="burgundy" className="w-full shadow-lg shadow-primary/20 text-base py-5">
                  <Phone className="w-4 h-4 mr-2" />
                  S'abonner maintenant
                </Button>
              </a>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-10 md:rounded-r-2xl group hover:bg-primary-foreground/10 transition-all duration-500">
              <div className="mb-8">
                <Sparkles className="w-8 h-8 text-secondary/70 mb-4" />
                <h3 className="font-display text-sm font-bold text-secondary tracking-[0.2em] uppercase mb-2">
                  Intégral
                </h3>
                <p className="text-primary-foreground/50 text-sm">Papier + Digital + Bonus</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-primary-foreground">15</span>
                  <span className="text-primary-foreground/50 text-lg">.000</span>
                </div>
                <p className="text-primary-foreground/40 text-sm mt-1">FCFA / an</p>
              </div>
              <ul className="space-y-3 mb-10">
                {["Tout Credo Papier inclus", "Documents exclusifs CEDF", "Invitations aux événements", "Mention dans la revue"].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-primary-foreground/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary/60 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a href="tel:0779104515" className="block">
                <Button variant="outline" className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-secondary/40 transition-all">
                  <Phone className="w-4 h-4 mr-2" />
                  S'abonner
                </Button>
              </a>
            </div>
          </div>

          {/* Payment & Contact - Editorial footer */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="text-center">
              <p className="text-primary-foreground/50 text-sm mb-6 font-secondary">
                Moyens de paiement acceptés
              </p>
              <div className="flex justify-center mb-8">
                <div className="bg-primary-foreground/10 rounded-xl px-8 py-4 backdrop-blur-sm border border-primary-foreground/10">
                  <img 
                    src={paydunyaPaymentMethods} 
                    alt="Orange Money, Wave, MTN, Visa, Mastercard"
                    className="h-12 object-contain opacity-80"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                <a href="tel:0779104515" className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors">
                  <Phone className="w-4 h-4" />
                  07 79 10 45 15
                </a>
                <div className="w-1 h-1 rounded-full bg-primary-foreground/20 hidden sm:block" />
                <a href="tel:0507427398" className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors">
                  <Phone className="w-4 h-4" />
                  05 07 42 73 98
                </a>
                <div className="w-1 h-1 rounded-full bg-primary-foreground/20 hidden sm:block" />
                <a href="mailto:production@cedfci.org" className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors">
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
