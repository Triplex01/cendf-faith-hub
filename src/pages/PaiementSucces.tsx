import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogIn, BookOpen, Mail } from "lucide-react";
import basiliqueCover from "@/assets/basilique-notredame.jpg";

const PaiementSucces = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref") || searchParams.get("reference");

  return (
    <PageLayout
      title="Paiement réussi"
      subtitle="Votre abonnement Credo est confirmé"
      backgroundImage={basiliqueCover}
    >
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-2xl shadow-elegant border border-border p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/15 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Bienvenue parmi les abonnés Credo !
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Votre paiement a été reçu. Votre compte a été créé automatiquement avec l'email et le mot de passe que vous avez choisis. Connectez-vous pour accéder à votre espace.
            </p>

            {ref && (
              <div className="bg-muted/50 rounded-xl p-4 mb-6 inline-block">
                <p className="text-xs text-muted-foreground mb-1">Référence transaction</p>
                <p className="font-mono text-sm font-semibold text-foreground">{ref}</p>
              </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Et maintenant ?
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Cliquez sur « Se connecter » ci-dessous</li>
                <li>Utilisez l'email et le mot de passe du formulaire</li>
                <li>Accédez à vos magazines numériques dans votre espace abonné</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="burgundy" className="gap-2">
                <Link to="/connexion">
                  <LogIn className="w-4 h-4" />
                  Se connecter
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Besoin d'aide ?
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PaiementSucces;
