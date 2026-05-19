import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ExternalLink, Loader2, X } from "lucide-react";
import logoCendf from "@/assets/logo-cendf.png";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string | null;
  amount: number;
  description: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(price);

/**
 * Branded payment modal wrapping the Genius Pay checkout.
 * Tries to embed via iframe; if X-Frame-Options blocks it,
 * falls back to a styled "Ouvrir le paiement sécurisé" CTA.
 */
const PaymentModal = ({ open, onOpenChange, checkoutUrl, amount, description }: PaymentModalProps) => {
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    if (open) setIframeError(false);
  }, [open, checkoutUrl]);

  // Auto-detect iframe block after 3.5s if no load event
  useEffect(() => {
    if (!open || !checkoutUrl) return;
    const t = setTimeout(() => setIframeError((prev) => prev), 3500);
    return () => clearTimeout(t);
  }, [open, checkoutUrl]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] p-0 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Branded header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-5 py-4 flex items-center gap-3 shrink-0">
          <img src={logoCendf} alt="CEDF" className="h-10 w-10 rounded-md bg-white p-1" />
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-base leading-tight">Paiement sécurisé CEDF</p>
            <p className="text-xs opacity-90 truncate">{description} — {formatPrice(amount)}</p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs bg-white/15 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            SSL · Genius Pay
          </div>
          <button onClick={() => onOpenChange(false)} className="text-primary-foreground/80 hover:text-primary-foreground p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 bg-muted/30 relative min-h-[420px]">
          {!checkoutUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm">Préparation du paiement sécurisé…</p>
            </div>
          ) : iframeError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4">
              <img src={logoCendf} alt="" className="h-16 opacity-80" />
              <h3 className="font-display font-bold text-foreground text-lg">Continuer vers Genius Pay</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Pour votre sécurité, le paiement s'ouvre dans une nouvelle fenêtre chiffrée certifiée PCI-DSS.
              </p>
              <Button asChild variant="burgundy" className="gap-2">
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  Payer {formatPrice(amount)} <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ) : (
            <>
              <iframe
                src={checkoutUrl}
                title="Paiement Genius Pay"
                className="w-full h-full min-h-[480px] border-0"
                onError={() => setIframeError(true)}
                allow="payment *"
              />
            </>
          )}
        </div>

        {/* Footer reassurance */}
        <div className="bg-card border-t border-border px-5 py-2.5 flex items-center justify-between gap-3 shrink-0 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            Wave · Orange Money · MTN · Moov · Visa/Mastercard
          </span>
          {checkoutUrl && (
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline whitespace-nowrap">
              Ouvrir dans un onglet ↗
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
