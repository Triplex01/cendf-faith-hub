import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { RadioProvider } from "@/contexts/RadioContext";
import { TVProvider } from "@/contexts/TVContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PageLoader from "@/components/PageLoader";
import FloatingMediaPlayer from "@/components/FloatingMediaPlayer";
import AIAssistant from "@/components/AIAssistant";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";
import Enseignements from "./pages/Enseignements";
import EnseignementDetail from "./pages/EnseignementDetail";
import DocumentsArchives from "./pages/DocumentsArchives";
import Radio from "./pages/Radio";
import Actualites from "./pages/Actualites";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import Boutique from "./pages/Boutique";
import Abonnement from "./pages/Abonnement";
import ConfirmationCommande from "./pages/ConfirmationCommande";
import BibleEnLigne from "./pages/BibleEnLigne";
import SaintDuJour from "./pages/SaintDuJour";
import Prieres from "./pages/Prieres";
import CalendrierLiturgique from "./pages/CalendrierLiturgique";
import Missions from "./pages/Missions";
import Activites from "./pages/Activites";
import APropos from "./pages/APropos";
import FAQ from "./pages/FAQ";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import EspaceAbonne from "./pages/EspaceAbonne";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTopOnNavigate />
      <PageLoader isLoading={isLoading} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/enseignements" element={<Enseignements />} />
        <Route path="/enseignement/:slug" element={<EnseignementDetail />} />
        <Route path="/documents-archives" element={<DocumentsArchives />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/actualites/:slug" element={<ArticleDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/abonnement" element={<Abonnement />} />
        <Route path="/confirmation-commande" element={<ConfirmationCommande />} />
        <Route path="/bible" element={<BibleEnLigne />} />
        <Route path="/saint-du-jour" element={<SaintDuJour />} />
        <Route path="/prieres" element={<Prieres />} />
        <Route path="/calendrier-liturgique" element={<CalendrierLiturgique />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/activites" element={<Activites />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        {/* Auth routes */}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/espace-abonne" element={<EspaceAbonne />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
      <FloatingMediaPlayer />
      <AIAssistant />
      <CookieConsent />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <RadioProvider>
          <TVProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </TVProvider>
        </RadioProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
