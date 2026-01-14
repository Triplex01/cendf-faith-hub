import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { RadioProvider } from "@/contexts/RadioContext";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLoader from "@/components/PageLoader";
import FloatingRadioPlayer from "@/components/FloatingRadioPlayer";
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

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminArticleForm from "./pages/admin/AdminArticleForm";
import AdminEnseignements from "./pages/admin/AdminEnseignements";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminTicker from "./pages/admin/AdminTicker";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdminRoute) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isAdminRoute]);

  return (
    <>
      <ScrollToTopOnNavigate />
      {!isAdminRoute && <PageLoader isLoading={isLoading} />}
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
        <Route path="/bible" element={<BibleEnLigne />} />
        <Route path="/saint-du-jour" element={<SaintDuJour />} />
        <Route path="/prieres" element={<Prieres />} />
        <Route path="/calendrier-liturgique" element={<CalendrierLiturgique />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/activites" element={<Activites />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="articles/new" element={<AdminArticleForm />} />
          <Route path="articles/:id" element={<AdminArticleForm />} />
          <Route path="enseignements" element={<AdminEnseignements />} />
          <Route path="enseignements/new" element={<AdminArticleForm />} />
          <Route path="enseignements/:id" element={<AdminArticleForm />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminArticleForm />} />
          <Route path="events/:id" element={<AdminArticleForm />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="ticker" element={<AdminTicker />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && (
        <>
          <ScrollToTop />
          <FloatingRadioPlayer />
          <AIAssistant />
          <CookieConsent />
        </>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
