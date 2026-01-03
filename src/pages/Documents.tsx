import PageLayout from "@/components/PageLayout";
import { FileText, Download, Eye, Calendar, Search, Filter, X, SortAsc, SortDesc, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Import des images de couverture
import docLivretBiblique from "@/assets/doc-livret-biblique.jpg";
import docLettrePastorale from "@/assets/doc-lettre-pastorale.jpg";
import docDecret from "@/assets/doc-decret.jpg";
import docHomelie from "@/assets/doc-homelie.jpg";
import docEncyclique from "@/assets/doc-encyclique.jpg";

const documentCategories = [
  { name: "Tous", id: "all" },
  { name: "Encycliques", id: "encycliques" },
  { name: "Lettres Pastorales", id: "lettres" },
  { name: "Décrets", id: "decrets" },
  { name: "Homélies", id: "homelies" },
  { name: "Livrets", id: "livrets" },
];

const documents = [
  {
    id: 1,
    title: "Livret Biblique 2023-2024",
    category: "livrets",
    categoryLabel: "Livrets",
    date: "Février 2024",
    dateSort: "2024-02-01",
    size: "2.8 MB",
    type: "PDF",
    description: "Guide biblique annuel pour accompagner les fidèles dans la lecture et la méditation de la Parole de Dieu tout au long de l'année liturgique.",
    cover: docLivretBiblique,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 2,
    title: "Lettre Pastorale sur l'Évangélisation en Afrique",
    category: "lettres",
    categoryLabel: "Lettres Pastorales",
    date: "10 Décembre 2025",
    dateSort: "2025-12-10",
    size: "2.4 MB",
    type: "PDF",
    description: "Cette lettre aborde les défis et les opportunités de l'évangélisation dans le contexte africain contemporain, en mettant l'accent sur l'inculturation de la foi.",
    cover: docLettrePastorale,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 3,
    title: "Décret sur la Formation des Catéchistes",
    category: "decrets",
    categoryLabel: "Décrets",
    date: "28 Novembre 2025",
    dateSort: "2025-11-28",
    size: "1.8 MB",
    type: "PDF",
    description: "Nouvelles directives pour la formation et l'accompagnement des catéchistes dans nos diocèses.",
    cover: docDecret,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 4,
    title: "Homélie de la Fête de Noël 2024",
    category: "homelies",
    categoryLabel: "Homélies",
    date: "25 Décembre 2024",
    dateSort: "2024-12-25",
    size: "890 KB",
    type: "PDF",
    description: "Réflexion sur le mystère de l'Incarnation et son message d'espérance pour notre temps.",
    cover: docHomelie,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 5,
    title: "Instruction sur la Liturgie en Langue Vernaculaire",
    category: "decrets",
    categoryLabel: "Décrets",
    date: "15 Novembre 2025",
    dateSort: "2025-11-15",
    size: "3.1 MB",
    type: "PDF",
    description: "Orientations pour l'utilisation des langues locales dans les célébrations liturgiques.",
    cover: docDecret,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 6,
    title: "Message pour la Journée Mondiale de la Jeunesse",
    category: "lettres",
    categoryLabel: "Lettres Pastorales",
    date: "1 Novembre 2025",
    dateSort: "2025-11-01",
    size: "1.2 MB",
    type: "PDF",
    description: "Encouragements et orientations spirituelles pour les jeunes de notre diocèse.",
    cover: docLettrePastorale,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 7,
    title: "Réflexion sur la Doctrine Sociale de l'Église",
    category: "encycliques",
    categoryLabel: "Encycliques",
    date: "20 Octobre 2025",
    dateSort: "2025-10-20",
    size: "4.5 MB",
    type: "PDF",
    description: "Analyse approfondie des principes de la doctrine sociale dans le contexte ivoirien.",
    cover: docEncyclique,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 8,
    title: "Homélie du Dimanche de Pâques 2025",
    category: "homelies",
    categoryLabel: "Homélies",
    date: "20 Avril 2025",
    dateSort: "2025-04-20",
    size: "750 KB",
    type: "PDF",
    description: "Méditation sur la résurrection du Christ et son impact dans notre vie quotidienne.",
    cover: docHomelie,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    id: 9,
    title: "Encyclique sur la Protection de l'Environnement",
    category: "encycliques",
    categoryLabel: "Encycliques",
    date: "1 Septembre 2025",
    dateSort: "2025-09-01",
    size: "5.2 MB",
    type: "PDF",
    description: "Appel à la responsabilité écologique dans la lumière de notre foi catholique.",
    cover: docEncyclique,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
];

type SortField = "date" | "title";
type SortOrder = "asc" | "desc";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);

  const filteredAndSortedDocs = useMemo(() => {
    let result = documents.filter(doc => {
      const matchesSearch = searchQuery === "" || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      if (sortField === "date") {
        const comparison = a.dateSort.localeCompare(b.dateSort);
        return sortOrder === "desc" ? -comparison : comparison;
      } else {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === "desc" ? -comparison : comparison;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortField, sortOrder]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: documents.length };
    documents.forEach(doc => {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleDownload = (doc: typeof documents[0]) => {
    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.href = doc.downloadUrl;
    link.download = `${doc.title.replace(/\s+/g, "-")}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Téléchargement de "${doc.title}" démarré`, {
      description: `Taille: ${doc.size}`,
    });
  };

  const handleView = (doc: typeof documents[0]) => {
    setSelectedDoc(doc);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortField("date");
    setSortOrder("desc");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all";

  return (
    <PageLayout 
      title="Documents Officiels" 
      subtitle="Accédez aux textes officiels et aux publications du CENDF"
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher un document..." 
                    className="pl-12 h-14 text-lg rounded-xl border-border focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="burgundy" size="lg" className="h-14 px-8">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {documentCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name} ({categoryCounts[cat.id] || 0})
                </button>
              ))}
            </div>

            {/* Sort and Clear */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Trier par:
              </span>
              <Button 
                variant={sortField === "date" ? "burgundy" : "outline"} 
                size="sm"
                onClick={() => toggleSort("date")}
                className="gap-2"
              >
                Date
                {sortField === "date" && (sortOrder === "desc" ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />)}
              </Button>
              <Button 
                variant={sortField === "title" ? "burgundy" : "outline"} 
                size="sm"
                onClick={() => toggleSort("title")}
                className="gap-2"
              >
                Titre
                {sortField === "title" && (sortOrder === "desc" ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />)}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  <X className="w-4 h-4 mr-1" />
                  Effacer les filtres
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {filteredAndSortedDocs.length} document{filteredAndSortedDocs.length > 1 ? "s" : ""} trouvé{filteredAndSortedDocs.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Documents Grid */}
          {filteredAndSortedDocs.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Aucun document trouvé</p>
              <p className="text-muted-foreground text-sm mt-2">Essayez de modifier vos critères de recherche</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Effacer les filtres
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group"
                >
                  {/* Image de couverture */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={doc.cover}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium">
                      {doc.categoryLabel}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {doc.date}
                      </span>
                      <span>{doc.size}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => handleView(doc)}
                      >
                        <Eye className="w-4 h-4" />
                        Voir
                      </Button>
                      <Button 
                        variant="burgundy" 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download className="w-4 h-4" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredAndSortedDocs.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Charger plus de documents
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Document Preview Modal */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl pr-8">{selectedDoc?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {selectedDoc?.categoryLabel}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selectedDoc?.date}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
                {selectedDoc?.size}
              </span>
            </div>
            
            <p className="text-foreground leading-relaxed">{selectedDoc?.description}</p>
            
            {/* Document Preview with Cover */}
            <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
              <div className="aspect-[3/4] max-h-[500px] relative">
                <img
                  src={selectedDoc?.cover}
                  alt={selectedDoc?.title}
                  className="w-full h-full object-contain bg-background"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button
                    variant="burgundy"
                    size="lg"
                    className="gap-2"
                    onClick={() => selectedDoc && window.open(selectedDoc.downloadUrl, "_blank")}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ouvrir le PDF
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={() => setSelectedDoc(null)}
              >
                Fermer
              </Button>
              <Button 
                variant="burgundy" 
                className="flex-1 gap-2"
                onClick={() => selectedDoc && handleDownload(selectedDoc)}
              >
                <Download className="w-4 h-4" />
                Télécharger ({selectedDoc?.size})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Documents;
