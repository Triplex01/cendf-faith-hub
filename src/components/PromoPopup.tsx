import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import poster from "@/assets/credo-magazines-poster.jpg";

const STORAGE_KEY = "cedf_promo_credo_v1";

const PromoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Magazine Credo disponible"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col"
      >
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 hover:bg-background flex items-center justify-center shadow-lg transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <div className="overflow-y-auto">
          <img
            src={poster}
            alt="Lisez et faites lire Credo — Magazine mensuel catholique de la CEDF"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        <div className="p-4 sm:p-5 border-t border-border bg-card flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link to="/boutique" className="flex-1" onClick={close}>
            <Button variant="burgundy" className="w-full gap-2 text-sm">
              <ShoppingBag className="w-4 h-4" />
              Commander un numéro
            </Button>
          </Link>
          <Link to="/abonnement" className="flex-1" onClick={close}>
            <Button variant="outline" className="w-full gap-2 text-sm border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              S'abonner — 15 000 FCFA/an
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
