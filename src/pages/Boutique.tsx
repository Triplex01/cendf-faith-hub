import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  Heart,
  Search,
  Filter,
  CreditCard,
  Phone,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import basiliqueCover from "@/assets/basilique-notredame.jpg";

// Types pour les produits
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

// Données de démonstration - seront remplacées par WordPress
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Chapelet en bois d'olivier",
    price: 5000,
    image: "/placeholder.svg",
    category: "Chapelets",
    description: "Chapelet artisanal en bois d'olivier de Terre Sainte",
    inStock: true,
  },
  {
    id: 2,
    name: "Bible Jérusalem",
    price: 15000,
    image: "/placeholder.svg",
    category: "Livres",
    description: "La Bible de Jérusalem, traduction française de référence",
    inStock: true,
  },
  {
    id: 3,
    name: "Médaille Miraculeuse",
    price: 2500,
    image: "/placeholder.svg",
    category: "Médailles",
    description: "Médaille de la Vierge Miraculeuse en argent",
    inStock: true,
  },
  {
    id: 4,
    name: "Croix murale",
    price: 8000,
    image: "/placeholder.svg",
    category: "Décoration",
    description: "Croix en bois sculpté pour décoration murale",
    inStock: false,
  },
  {
    id: 5,
    name: "Encens de Jérusalem",
    price: 3500,
    image: "/placeholder.svg",
    category: "Encens",
    description: "Encens naturel de Terre Sainte",
    inStock: true,
  },
  {
    id: 6,
    name: "Icône de la Sainte Famille",
    price: 12000,
    image: "/placeholder.svg",
    category: "Icônes",
    description: "Icône peinte à la main style byzantin",
    inStock: true,
  },
];

const categories = ["Tous", "Chapelets", "Livres", "Médailles", "Décoration", "Encens", "Icônes"];

const Boutique = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Filtrer les produits
  const filteredProducts = demoProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ajouter au panier
  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  // Total du panier
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CI", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Processus de paiement Orange Money
  const handlePayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro Orange Money",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulation d'appel API Orange Money
      // À remplacer par votre intégration réelle
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Paiement initié",
        description: "Confirmez le paiement sur votre téléphone Orange Money",
      });

      // Réinitialiser
      setCart([]);
      setIsPaymentOpen(false);
      setPhoneNumber("");
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageLayout
      title="Boutique"
      subtitle="Articles religieux et objets de piété"
      backgroundImage={basiliqueCover}
    >
      <section className="py-20">
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

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border"
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <span className="text-muted-foreground font-medium">
                            Rupture de stock
                          </span>
                        </div>
                      )}
                      <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-xs text-secondary font-medium">
                        {product.category}
                      </span>
                      <h3 className="font-display font-bold text-foreground mt-1 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          variant="burgundy"
                          size="sm"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
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
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card border border-border sticky top-24">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Panier ({cart.length})
                </h3>

                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    Votre panier est vide
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} x {formatPrice(item.product.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-display text-xl font-bold text-primary">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="burgundy"
                      className="w-full gap-2"
                      onClick={() => setIsPaymentOpen(true)}
                    >
                      <CreditCard className="w-4 h-4" />
                      Payer avec Orange Money
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              Paiement Orange Money
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Montant à payer</p>
              <p className="font-display text-2xl font-bold text-primary">
                {formatPrice(cartTotal)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Numéro Orange Money
              </label>
              <Input
                type="tel"
                placeholder="07 XX XX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Vous recevrez une notification sur ce numéro
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                Instructions
              </h4>
              <ol className="text-sm text-orange-600 dark:text-orange-400 space-y-1 list-decimal list-inside">
                <li>Entrez votre numéro Orange Money</li>
                <li>Cliquez sur "Confirmer le paiement"</li>
                <li>Validez sur votre téléphone avec votre code secret</li>
              </ol>
            </div>

            <Button
              variant="burgundy"
              className="w-full gap-2"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Traitement en cours..."
              ) : (
                <>
                  Confirmer le paiement
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Boutique;
