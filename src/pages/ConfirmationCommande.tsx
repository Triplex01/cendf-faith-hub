import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, ArrowLeft, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

import basiliqueCover from "@/assets/basilique-notredame.jpg";

const ConfirmationCommande = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const token = searchParams.get("token");

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <PageLayout
      title="Confirmation de commande"
      subtitle="Merci pour votre achat"
      backgroundImage={basiliqueCover}
    >
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-2xl shadow-elegant border border-border p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/30 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Paiement réussi !
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Votre commande a été confirmée avec succès. Vous recevrez un SMS ou email de confirmation de PayDunya.
            </p>

            {token && (
              <div className="bg-muted/50 rounded-xl p-4 mb-6 inline-block">
                <p className="text-xs text-muted-foreground mb-1">Référence de transaction</p>
                <p className="font-mono text-sm font-semibold text-foreground">{token}</p>
              </div>
            )}

            {/* Order steps */}
            <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Prochaines étapes
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>Vous recevrez une confirmation par SMS/email</li>
                <li>Notre équipe préparera votre commande</li>
                <li>Vous serez contacté pour la livraison ou le retrait</li>
              </ol>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="burgundy" asChild>
                <Link to="/boutique">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continuer mes achats
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              🔒 Transaction sécurisée via PayDunya — Mode Test
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ConfirmationCommande;
