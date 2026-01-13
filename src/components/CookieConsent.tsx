import { useState, useEffect } from "react";
import { Cookie, X, Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoCedf from "@/assets/logo-cendf.png";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cedf-cookie-consent");
    if (!consent) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cedf-cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cedf-cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cedf-cookie-consent", JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with Logo */}
            <div className="bg-gradient-burgundy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl p-1.5 shadow-lg">
                  <img src={logoCedf} alt="CEDF" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary-foreground text-lg">
                    Cookies & Confidentialité
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    CEDF Côte d'Ivoire
                  </p>
                </div>
              </div>
              <button
                onClick={handleRejectAll}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site, 
                    analyser le trafic et personnaliser le contenu. En continuant, vous acceptez 
                    notre utilisation des cookies conformément à notre{" "}
                    <a href="/confidentialite" className="text-primary hover:underline font-medium">
                      politique de confidentialité
                    </a>.
                  </p>
                </div>
              </div>

              {/* Cookie Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                      {/* Necessary */}
                      <label className="flex items-center justify-between p-3 bg-background rounded-lg cursor-not-allowed opacity-70">
                        <div>
                          <span className="font-medium text-foreground">Cookies nécessaires</span>
                          <p className="text-xs text-muted-foreground">
                            Essentiels au fonctionnement du site
                          </p>
                        </div>
                        <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </label>

                      {/* Analytics */}
                      <label className="flex items-center justify-between p-3 bg-background rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                        <div>
                          <span className="font-medium text-foreground">Cookies analytiques</span>
                          <p className="text-xs text-muted-foreground">
                            Nous aident à comprendre l'utilisation du site
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                          className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.analytics ? "bg-primary justify-end" : "bg-muted justify-start"
                          }`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full shadow" />
                        </button>
                      </label>

                      {/* Marketing */}
                      <label className="flex items-center justify-between p-3 bg-background rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                        <div>
                          <span className="font-medium text-foreground">Cookies marketing</span>
                          <p className="text-xs text-muted-foreground">
                            Personnalisent les contenus et publicités
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                          className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.marketing ? "bg-primary justify-end" : "bg-muted justify-start"
                          }`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full shadow" />
                        </button>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  {showDetails ? "Masquer" : "Personnaliser"}
                </Button>
                
                <div className="flex-1 flex gap-2 sm:justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRejectAll}
                  >
                    Refuser
                  </Button>
                  
                  {showDetails ? (
                    <Button
                      variant="burgundy"
                      size="sm"
                      onClick={handleAcceptSelected}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Enregistrer
                    </Button>
                  ) : (
                    <Button
                      variant="burgundy"
                      size="sm"
                      onClick={handleAcceptAll}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Accepter tout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
