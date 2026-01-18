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
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Smartphone
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import basiliqueCover from "@/assets/basilique-notredame.jpg";
import productChapelet from "@/assets/product-chapelet.jpg";
import bookDictionnaire from "@/assets/book-dictionnaire-theologie.png";
import bookOecumenisme from "@/assets/book-oecumenisme.jpg";
import bookAmour from "@/assets/book-amour-foi.jpg";
import booksManuelCredo from "@/assets/books-manuel-credo.jpg";
import mobileMoneyLogos from "@/assets/mobile-money-logos.jpg";

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
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"orange" | "wave">("orange");

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

  // Processus de paiement
  const handlePayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Erreur",
        description: `Veuillez entrer votre numéro ${paymentMethod === "orange" ? "Orange Money" : "Wave"}`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulation d'appel API - Numéro de simulation: 0787830395
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Paiement initié",
        description: `Confirmez le paiement sur votre téléphone ${paymentMethod === "orange" ? "Orange Money" : "Wave"}. Numéro marchand: 0787830395`,
      });

      // Réinitialiser
      clearCart();
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
      subtitle="Articles religieux et objets de piété pour votre vie spirituelle"
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
                      <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-burgundy transition-colors">
                        <Heart className="w-5 h-5" />
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

      {/* Payment Modal - Amélioré avec logos Mobile Money */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-display">
              Paiement Mobile Money
            </DialogTitle>
          </DialogHeader>

          {/* Logos Mobile Money */}
          <div className="flex justify-center mb-4">
            <div className="bg-muted/50 rounded-xl p-4">
              <img 
                src={mobileMoneyLogos} 
                alt="Orange Money, MTN Mobile Money, Moov Money, Wave"
                className="h-16 object-contain"
              />
              <p className="text-xs text-center text-muted-foreground mt-2">
                Modes de paiement acceptés
              </p>
            </div>
          </div>

          <Tabs defaultValue="orange" onValueChange={(v) => setPaymentMethod(v as "orange" | "wave")}>
            <TabsList className="grid w-full grid-cols-4 h-auto p-1">
              <TabsTrigger value="orange" className="flex flex-col gap-1 py-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">OM</span>
                </div>
                <span className="text-xs">Orange</span>
              </TabsTrigger>
              <TabsTrigger value="mtn" className="flex flex-col gap-1 py-2">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <span className="text-black font-bold text-xs">MTN</span>
                </div>
                <span className="text-xs">MTN</span>
              </TabsTrigger>
              <TabsTrigger value="moov" className="flex flex-col gap-1 py-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
                <span className="text-xs">Moov</span>
              </TabsTrigger>
              <TabsTrigger value="wave" className="flex flex-col gap-1 py-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">W</span>
                </div>
                <span className="text-xs">Wave</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orange" className="space-y-4 mt-4">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
                <p className="text-sm text-white/80 mb-1">Montant à payer</p>
                <p className="font-display text-3xl font-bold">
                  {formatPrice(cartTotal)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Numéro Orange Money
                </label>
                <Input
                  type="tel"
                  placeholder="07 87 83 03 95"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  📱 Numéro marchand: <strong>0787830395</strong>
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Instructions Orange Money
                </h4>
                <ol className="text-sm text-orange-600 dark:text-orange-400 space-y-2 list-decimal list-inside">
                  <li>Composez <strong>#144#</strong> ou ouvrez l'app Orange Money</li>
                  <li>Sélectionnez "Paiement marchand"</li>
                  <li>Entrez le code marchand et confirmez avec votre PIN</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="mtn" className="space-y-4 mt-4">
              <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-black">
                <p className="text-sm text-black/70 mb-1">Montant à payer</p>
                <p className="font-display text-3xl font-bold">
                  {formatPrice(cartTotal)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Numéro MTN Mobile Money
                </label>
                <Input
                  type="tel"
                  placeholder="05 XX XX XX XX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  📱 Numéro marchand: <strong>0787830395</strong>
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Instructions MTN MoMo
                </h4>
                <ol className="text-sm text-yellow-700 dark:text-yellow-400 space-y-2 list-decimal list-inside">
                  <li>Composez <strong>*133#</strong> ou ouvrez l'app MoMo</li>
                  <li>Sélectionnez "Payer un marchand"</li>
                  <li>Entrez le code et validez avec votre PIN</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="moov" className="space-y-4 mt-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
                <p className="text-sm text-white/80 mb-1">Montant à payer</p>
                <p className="font-display text-3xl font-bold">
                  {formatPrice(cartTotal)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Numéro Moov Money
                </label>
                <Input
                  type="tel"
                  placeholder="01 XX XX XX XX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  📱 Numéro marchand: <strong>0787830395</strong>
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Instructions Moov Money
                </h4>
                <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-2 list-decimal list-inside">
                  <li>Composez <strong>*155#</strong> ou ouvrez l'app Moov Money</li>
                  <li>Sélectionnez "Paiement"</li>
                  <li>Entrez le code marchand et confirmez</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="wave" className="space-y-4 mt-4">
              <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white">
                <p className="text-sm text-white/80 mb-1">Montant à payer</p>
                <p className="font-display text-3xl font-bold">
                  {formatPrice(cartTotal)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Numéro Wave
                </label>
                <Input
                  type="tel"
                  placeholder="07 87 83 03 95"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  📱 Numéro marchand: <strong>0787830395</strong>
                </p>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Instructions Wave
                </h4>
                <ol className="text-sm text-cyan-600 dark:text-cyan-400 space-y-2 list-decimal list-inside">
                  <li>Ouvrez l'application Wave</li>
                  <li>Scannez le QR Code ou entrez le numéro</li>
                  <li>Confirmez le paiement</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            variant="burgundy"
            className="w-full gap-2 mt-4"
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
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Boutique;
