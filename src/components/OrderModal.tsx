import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, CreditCard, CheckCircle2, User, MapPin } from "lucide-react";
import paydunyaPaymentMethods from "@/assets/paydunya-payment-methods.png";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    name: string;
    price: number;
    image: string;
  } | null;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);

const OrderModal = ({ open, onOpenChange, product }: OrderModalProps) => {
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "info") {
      setStep("payment");
    }
  };

  const handlePaymentChoice = (method: string) => {
    setStep("success");
  };

  const handleClose = () => {
    setStep("info");
    setForm({ name: "", email: "", phone: "", city: "" });
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto border-border">
        {step === "info" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Commander
              </DialogTitle>
            </DialogHeader>

            {/* Product summary */}
            <div className="flex items-center gap-4 p-3 bg-muted rounded-xl mb-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-foreground text-sm truncate">{product.name}</p>
                <p className="text-primary font-bold text-lg">{formatPrice(product.price)}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Nom complet
                  </Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      required
                      placeholder="Jean Dupont"
                      className="pl-9"
                      value={form.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Téléphone
                  </Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      required
                      type="tel"
                      placeholder="07 XX XX XX XX"
                      className="pl-9"
                      value={form.phone}
                      onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    required
                    type="email"
                    placeholder="jean@email.com"
                    className="pl-9"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="city" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Ville de livraison
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="city"
                    required
                    placeholder="Abidjan"
                    className="pl-9"
                    value={form.city}
                    onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))}
                  />
                </div>
              </div>
              <Button type="submit" variant="burgundy" className="w-full py-5 text-base">
                Continuer vers le paiement
              </Button>
            </form>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-foreground">
                Choisir un moyen de paiement
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-2">
              {/* Payment methods */}
              {[
                { id: "orange", name: "Orange Money", color: "bg-orange-500", icon: "🟠" },
                { id: "wave", name: "Wave", color: "bg-blue-500", icon: "🔵" },
                { id: "mtn", name: "MTN Mobile Money", color: "bg-yellow-500", icon: "🟡" },
                { id: "card", name: "Visa / Mastercard", color: "bg-indigo-500", icon: "💳" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentChoice(method.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/30 transition-all duration-200 group"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {method.name}
                  </span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {formatPrice(product.price)}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <img src={paydunyaPaymentMethods} alt="Moyens de paiement" className="h-10 object-contain opacity-60" />
            </div>

            <Button variant="ghost" className="w-full mt-2" onClick={() => setStep("info")}>
              ← Retour
            </Button>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">Commande enregistrée !</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Votre commande pour <strong>{product.name}</strong> a été prise en compte. 
              Vous serez contacté(e) sous 24h pour confirmer votre commande.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a href="tel:0779104515" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                <Phone className="w-4 h-4" />
                07 79 10 45 15
              </a>
              <a href="mailto:production@cedfci.org" className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                <Mail className="w-4 h-4" />
                production@cedfci.org
              </a>
            </div>
            <Button variant="burgundy" className="mt-4" onClick={handleClose}>
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
