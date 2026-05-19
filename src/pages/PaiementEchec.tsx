import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw, ArrowLeft, HelpCircle, Mail } from "lucide-react";
import basiliqueCover from "@/assets/basilique-notredame.jpg";

const PaiementEchec = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref") || searchParams.get("reference");
  const reason = searchParams.get("reason");

  return (
    <PageLayout
      title="Échec du paiement"
      subtitle="Votre paiement n'a pas pu être traité"
      backgroundImage={basiliqueCover}
    >
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-2xl shadow-elegant border border-border p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-destructive" />
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Paiement non abouti
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Aucun montant n'a été débité. Vous pouvez réessayer immédiatement ou nous contacter si le problème persiste.
            </p>

            {ref && (
              <div className="bg-muted/50 rounded-xl p-4 mb-6 inline-block">
                <p className="text-xs text-muted-foreground mb-1">Référence transaction</p>
                <p className="font-mono text-sm font-semibold text-foreground">{ref}</p>
              </div>
            )}

            {reason && (
              <p className="text-sm text-destructive mb-6 italic">Motif : {reason}</p>
            )}

            <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Causes fréquentes
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Solde insuffisant sur le compte mobile money ou la carte</li>
                <li>Annulation pendant la procédure de paiement</li>
                <li>Délai d'attente dépassé (saisie du code OTP)</li>
                <li>Restriction temporaire de l'opérateur</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="burgundy" className="gap-2">
                <Link to="/inscription">
                  <RefreshCw className="w-4 h-4" />
                  Réessayer le paiement
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Contacter le support
                </Link>
              </Button>
              <Button asChild variant="ghost" className="gap-2">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PaiementEchec;
