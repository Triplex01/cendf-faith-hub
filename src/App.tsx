import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "@/lib/apollo-client";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Enseignements from "./pages/Enseignements";
import Documents from "./pages/Documents";
import Archives from "./pages/Archives";
import Radio from "./pages/Radio";
import Actualites from "./pages/Actualites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <AuthProvider>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ApolloProvider>
  </ErrorBoundary>
);

export default App;
