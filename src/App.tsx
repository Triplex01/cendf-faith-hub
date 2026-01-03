import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { RadioProvider } from "@/contexts/RadioContext";
import PageLoader from "@/components/PageLoader";
import FloatingRadioPlayer from "@/components/FloatingRadioPlayer";
import AIAssistant from "@/components/AIAssistant";
import Index from "./pages/Index";
import Enseignements from "./pages/Enseignements";
import EnseignementDetail from "./pages/EnseignementDetail";
import Documents from "./pages/Documents";
import Archives from "./pages/Archives";
import Radio from "./pages/Radio";
import Actualites from "./pages/Actualites";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import Boutique from "./pages/Boutique";
import BibleEnLigne from "./pages/BibleEnLigne";
import SaintDuJour from "./pages/SaintDuJour";
import Prieres from "./pages/Prieres";
import CalendrierLiturgique from "./pages/CalendrierLiturgique";
import Missions from "./pages/Missions";
import Activites from "./pages/Activites";
import NotFound from "./pages/NotFound";

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
      <PageLoader isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/enseignements" element={<Enseignements />} />
        <Route path="/enseignement/:slug" element={<EnseignementDetail />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/actualites/:slug" element={<ArticleDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/bible" element={<BibleEnLigne />} />
        <Route path="/saint-du-jour" element={<SaintDuJour />} />
        <Route path="/prieres" element={<Prieres />} />
        <Route path="/calendrier-liturgique" element={<CalendrierLiturgique />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/activites" element={<Activites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingRadioPlayer />
      <AIAssistant />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RadioProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </RadioProvider>
  </QueryClientProvider>
);

export default App;
