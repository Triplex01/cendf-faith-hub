import PageLayout from "@/components/PageLayout";
import { DocumentCard } from "@/components/DocumentCard";
import { LoadingGrid, ErrorMessage, EmptyState } from "@/components/LoadingStates";
import { FileText, Download, Eye, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocuments } from "@/hooks/useDocuments";
import { useState } from "react";

const documentCategories = [
  { name: "Tous", count: 156 },
  { name: "Encycliques", count: 24 },
  { name: "Lettres Pastorales", count: 45 },
  { name: "Décrets", count: 32 },
  { name: "Homélies", count: 55 },
];

const Documents = () => {
  // Récupérer les documents depuis WordPress via GraphQL
  const { documents, loading, error, hasNextPage, loadMore } = useDocuments({ first: 12 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleDownload = (url: string, title: string) => {
    // Valider l'URL
    if (!url || !url.startsWith('http')) {
      console.error('Invalid download URL');
      return;
    }

    // Nettoyer le titre pour éviter XSS
    const sanitizedTitle = title
      .replace(/[<>:"\/\\|?*\x00-\x1F]/g, '') // Supprimer les caractères dangereux
      .trim()
      .substring(0, 255); // Limiter la longueur

    // Télécharger le document
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizedTitle;
    link.target = '_blank';
    link.rel = 'noopener noreferrer'; // Sécurité
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrer les documents selon la recherche
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <PageLayout 
      title="Documents Officiels" 
      subtitle="Accédez aux textes officiels et aux publications du CENDF"
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher un document..." 
                  className="pl-12 h-14 text-lg rounded-xl border-border focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {documentCategories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    index === selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && <LoadingGrid count={12} type="document" />}
          
          {/* Error State */}
          {error && (
            <ErrorMessage 
              message="Impossible de charger les documents. Veuillez réessayer."
              onRetry={() => window.location.reload()}
            />
          )}
          
          {/* Empty State */}
          {!loading && !error && filteredDocuments.length === 0 && (
            <EmptyState 
              message={searchQuery ? "Aucun document ne correspond à votre recherche." : "Aucun document disponible pour le moment."}
              icon={<FileText className="w-16 h-16 mx-auto" />}
            />
          )}

          {/* Documents Grid */}
          {!loading && !error && filteredDocuments.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <DocumentCard 
                    key={doc.id} 
                    document={doc}
                    onDownload={handleDownload}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasNextPage && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg" onClick={loadMore}>
                    Charger plus de documents
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Documents;
