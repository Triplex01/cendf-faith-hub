import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Enseignements from "./pages/Enseignements";
import Documents from "./pages/Documents";
import Archives from "./pages/Archives";
import Radio from "./pages/Radio";
import Actualites from "./pages/Actualites";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/enseignements" element={<Enseignements />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/actualites/:slug" element={<ArticleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
