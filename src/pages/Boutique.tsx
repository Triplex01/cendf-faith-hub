import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  ShoppingCart, 
  Heart,
  Search,
  Phone,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Smartphone,
  Loader2,
  CheckCircle2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import basiliqueCover from "@/assets/basilique-notredame.jpg";
import productChapelet from "@/assets/product-chapelet.jpg";
import bookDictionnaire from "@/assets/book-dictionnaire-theologie.png";
import bookOecumenisme from "@/assets/book-oecumenisme.jpg";
import bookAmour from "@/assets/book-amour-foi.jpg";
import booksManuelCredo from "@/assets/books-manuel-credo.jpg";
import paydunyaPaymentMethods from "@/assets/paydunya-payment-methods.png";

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

// Données de démonstration avec images réelles
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
  const [searchParams] = useSearchParams();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"orange" | "wave">("orange");
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Handle payment success return
  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      toast({
        title: "✅ Paiement réussi",
        description: "Votre commande a été confirmée. Merci pour votre achat !",
      });
      clearCart();
    }
  }, [searchParams]);

  // Gérer les favoris
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        toast({
          title: "Retiré des favoris",
          description: "L'article a été retiré de vos favoris",
        });
        return prev.filter(id => id !== productId);
      } else {
        toast({
          title: "Ajouté aux favoris",
          description: "L'article a été ajouté à vos favoris",
        });
        return [...prev, productId];
      }
    });
  };

  // Filtrer les produits
  const filteredProducts = demoProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ajouter au panier
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  // Formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CI", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Processus de paiement via PayDunya
  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro de téléphone valide",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke("paydunya-checkout", {
        body: {
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: cartTotal,
          customerName,
          customerEmail,
          customerPhone: phoneNumber,
        },
      });

      if (error) throw error;

      if (data?.success && data?.url) {
        toast({
          title: "Redirection vers PayDunya",
          description: "Vous allez être redirigé vers la page de paiement sécurisée...",
        });
        // Redirect to PayDunya payment page
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || "Erreur lors de la création du paiement");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Erreur de paiement",
        description: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
                    <div className="relative aspect-square bg-muted overflow-hidden">
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
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center transition-colors ${
                          wishlist.includes(product.id) 
                            ? "text-primary" 
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        aria-label={wishlist.includes(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-xs text-gold font-semibold uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="font-display font-bold text-foreground mt-1 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-burgundy">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          variant="burgundy"
                          size="sm"
                          onClick={() => handleAddToCart(product)}
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
                          key={item.id}
                          className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-6 h-6 rounded bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 text-destructive ml-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-display text-xl font-bold text-burgundy">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="burgundy"
                      className="w-full gap-2"
                      onClick={() => setIsPaymentOpen(true)}
                    >
                      <Smartphone className="w-4 h-4" />
                      Payer par Mobile Money
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal - PayDunya */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-display">
              Paiement sécurisé via PayDunya
            </DialogTitle>
          </DialogHeader>

          {/* Customer Info */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nom complet</label>
              <Input
                placeholder="Votre nom"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email (optionnel)</label>
              <Input
                type="email"
                placeholder="votre@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Logos PayDunya - Moyens de paiement acceptés */}
          <div className="flex justify-center mb-4">
            <div className="bg-muted/50 rounded-xl p-4 w-full">
              <img 
                src={paydunyaPaymentMethods} 
                alt="Orange Money, Mixx, Wave, Visa, Mastercard, E-Money, Wizall, MTN, Moov"
                className="h-14 mx-auto object-contain"
              />
              <p className="text-xs text-center text-muted-foreground mt-2">
                Moyens de paiement acceptés via PayDunya
              </p>
            </div>
          </div>

          {/* Montant */}
          <div className="p-4 bg-gradient-to-r from-primary to-primary/80 rounded-xl text-primary-foreground">
            <p className="text-sm text-primary-foreground/80 mb-1">Montant à payer</p>
            <p className="font-display text-3xl font-bold">
              {formatPrice(cartTotal)}
            </p>
            <p className="text-xs text-primary-foreground/60 mt-1">
              {cart.length} article(s) dans votre panier
            </p>
          </div>

          {/* Numéro de téléphone */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Numéro de téléphone
            </label>
            <Input
              type="tel"
              placeholder="07 XX XX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Entrez votre numéro Mobile Money pour le paiement
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-muted/30 p-4 rounded-xl border border-border mt-4">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Comment ça marche ?
            </h4>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Remplissez vos informations ci-dessus</li>
              <li>Cliquez sur <strong>"Payer"</strong> pour être redirigé vers PayDunya</li>
              <li>Choisissez votre moyen de paiement (Orange Money, Wave, MTN, Visa...)</li>
              <li>Confirmez le paiement et recevez votre confirmation</li>
            </ol>
          </div>

          <Button
            variant="burgundy"
            className="w-full gap-2 mt-4"
            onClick={handlePayment}
            disabled={isProcessing || !phoneNumber}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirection vers PayDunya...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Payer {formatPrice(cartTotal)} via PayDunya
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-2">
            🔒 Paiement sécurisé via PayDunya — Mode Test
          </p>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Boutique;
