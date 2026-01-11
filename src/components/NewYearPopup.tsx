import { useState, useEffect } from "react";
import { X, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import voeux2026 from "@/assets/voeux-2026.jpg";

const NewYearPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Vérifier si le popup a déjà été affiché cette session
    const hasSeenPopup = sessionStorage.getItem("cendf-new-year-2026");
    if (!hasSeenPopup) {
      // Délai de 1 seconde avant d'afficher
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("cendf-new-year-2026", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image des vœux */}
            <div className="relative">
              <img 
                src={voeux2026} 
                alt="Vœux 2026 - La Commission Épiscopale pour la Doctrine de la Foi"
                className="w-full h-auto"
              />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Sparkles animation */}
              <div className="absolute top-4 left-4">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gradient-to-r from-primary to-secondary text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span className="font-display font-bold text-lg">BONNE ET SAINTE ANNÉE 2026</span>
                <Heart className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-sm text-white/90">
                Que l'Église, éclairée par l'Esprit Saint, progresse dans l'intelligence de la foi
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2 bg-white text-primary rounded-full font-semibold hover:bg-yellow-50 transition-colors"
              >
                Amen ! Continuer sur le site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewYearPopup;
