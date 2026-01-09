import PageLayout from "@/components/PageLayout";
import { FileText, Archive, Download, Eye, Calendar, Search, Filter, X, SortAsc, SortDesc, ExternalLink, Book, Video, Image as ImageIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import archivesImage from "@/assets/archives.jpg";

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
    description: "Cette lettre aborde les défis et les opportunités de l'évangélisation dans le contexte africain contemporain.",
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

const archiveCategories = [
  { icon: Book, title: "Documents Historiques", count: 234, id: "documents", color: "primary" },
  { icon: Video, title: "Vidéos d'Archives", count: 89, id: "videos", color: "secondary" },
  { icon: ImageIcon, title: "Photothèque", count: 567, id: "photos", color: "primary" },
  { icon: Archive, title: "Correspondances", count: 145, id: "correspondances", color: "secondary" },
];

const archiveItems = [
  { id: 1, title: "Lettre de fondation du diocèse", category: "documents", year: "1960", description: "Document officiel de création du diocèse après l'indépendance", type: "PDF", size: "1.2 MB" },
  { id: 2, title: "Première messe célébrée au diocèse", category: "videos", year: "1960", description: "Enregistrement vidéo historique de la première messe", type: "Vidéo", duration: "45 min" },
  { id: 3, title: "Construction de la cathédrale", category: "photos", year: "1975", description: "Série de photographies documentant la construction", type: "Album", count: "24 photos" },
  { id: 4, title: "Correspondance avec le Vatican", category: "correspondances", year: "1985", description: "Échanges officiels avec le Saint-Siège", type: "PDF", size: "890 KB" },
  { id: 5, title: "Visite du Pape Jean-Paul II", category: "photos", year: "1990", description: "Photographies de la visite pastorale historique", type: "Album", count: "156 photos" },
  { id: 6, title: "Ordination des premiers prêtres ivoiriens", category: "videos", year: "1968", description: "Cérémonie d'ordination filmée", type: "Vidéo", duration: "1h 20min" },
];

const timelineEvents = [
  { year: "2020", title: "Célébration des 60 ans du diocèse", description: "Grande célébration marquant six décennies d'évangélisation" },
  { year: "2010", title: "Visite Pastorale du Pape Benoît XVI", description: "Moment historique pour l'Église en Côte d'Ivoire" },
  { year: "1995", title: "Premier Synode Diocésain", description: "Rassemblement pour définir les orientations pastorales" },
  { year: "1980", title: "Création du Centre de Formation", description: "Fondation du centre de formation des catéchistes" },
  { year: "1960", title: "Fondation du Diocèse", description: "Établissement officiel du diocèse après l'indépendance" },
];

type SortField = "date" | "title";
type SortOrder = "asc" | "desc";

const DocumentsArchives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedDoc, setSelectedDoc] = useState<typeof documents[0] | null>(null);
  const [selectedArchiveCategory, setSelectedArchiveCategory] = useState<string | null>(null);
  const [selectedArchiveItem, setSelectedArchiveItem] = useState<typeof archiveItems[0] | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const years = useMemo(() => {
    return [...new Set(archiveItems.map(item => item.year))].sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  const filteredDocs = useMemo(() => {
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

  const filteredArchives = useMemo(() => {
    return archiveItems.filter(item => {
      const matchesCategory = !selectedArchiveCategory || item.category === selectedArchiveCategory;
      const matchesYear = !selectedYear || item.year === selectedYear;
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [selectedArchiveCategory, selectedYear, searchQuery]);

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
    const link = document.createElement("a");
    link.href = doc.downloadUrl;
    link.download = `${doc.title.replace(/\s+/g, "-")}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Téléchargement de "${doc.title}" démarré`, { description: `Taille: ${doc.size}` });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedArchiveCategory(null);
    setSelectedYear(null);
    setSortField("date");
    setSortOrder("desc");
  };

  const getItemIcon = (category: string) => {
    switch (category) {
      case "documents": return Book;
      case "videos": return Video;
      case "photos": return ImageIcon;
      case "correspondances": return Archive;
      default: return Book;
    }
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedArchiveCategory !== null || selectedYear !== null;

  return (
    <PageLayout 
      title="Documents & Archives" 
      subtitle="Textes officiels et patrimoine historique de l'Église en Côte d'Ivoire"
      backgroundImage={archivesImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher dans les documents et archives..." 
                  className="pl-12 h-14 text-lg rounded-xl border-border focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="burgundy" size="lg" className="h-14 px-8">
                <Search className="w-5 h-5" />
              </Button>
            </div>
            {hasActiveFilters && (
              <div className="flex justify-center">
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  <X className="w-4 h-4 mr-1" />
                  Effacer tous les filtres
                </Button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="archives" className="gap-2">
                <Archive className="w-4 h-4" />
                Archives
              </TabsTrigger>
            </TabsList>

            {/* Documents Tab */}
            <TabsContent value="documents">
              {/* Categories Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
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

              {/* Sort */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
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
              </div>

              {/* Results count */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground">
                  {filteredDocs.length} document{filteredDocs.length > 1 ? "s" : ""} trouvé{filteredDocs.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Documents Grid */}
              {filteredDocs.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">Aucun document trouvé</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Effacer les filtres
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group"
                    >
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
                          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => setSelectedDoc(doc)}>
                            <Eye className="w-4 h-4" />
                            Voir
                          </Button>
                          <Button variant="burgundy" size="sm" className="flex-1 gap-2" onClick={() => handleDownload(doc)}>
                            <Download className="w-4 h-4" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Archives Tab */}
            <TabsContent value="archives">
              {/* Archive Categories */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {archiveCategories.map((cat, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedArchiveCategory(selectedArchiveCategory === cat.id ? null : cat.id)}
                    className={`bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border cursor-pointer group text-center ${
                      selectedArchiveCategory === cat.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                      cat.color === "primary" ? "bg-gradient-burgundy" : "bg-gradient-gold"
                    }`}>
                      <cat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-secondary font-bold text-lg">
                      {cat.count} éléments
                    </span>
                  </div>
                ))}
              </div>

              {/* Year Filter */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Année:
                </span>
                <select
                  className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-primary outline-none"
                  value={selectedYear || ""}
                  onChange={(e) => setSelectedYear(e.target.value || null)}
                >
                  <option value="">Toutes les années</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Archive Results */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground">
                  {filteredArchives.length} élément{filteredArchives.length > 1 ? "s" : ""} trouvé{filteredArchives.length > 1 ? "s" : ""}
                </p>
              </div>

              {filteredArchives.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Archive className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">Aucun élément trouvé</p>
                  <Button variant="outline" className="mt-4" onClick={clearFilters}>
                    Effacer les filtres
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {filteredArchives.map((item) => {
                    const ItemIcon = getItemIcon(item.category);
                    return (
                      <div
                        key={item.id}
                        className="bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-burgundy transition-all">
                            <ItemIcon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                              {item.year} • {item.type}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => setSelectedArchiveItem(item)}>
                            <Eye className="w-4 h-4" />
                            Voir
                          </Button>
                          {item.category === "videos" ? (
                            <Button variant="burgundy" size="sm" className="flex-1 gap-2">
                              <Play className="w-4 h-4" />
                              Lire
                            </Button>
                          ) : (
                            <Button variant="burgundy" size="sm" className="flex-1 gap-2">
                              <Download className="w-4 h-4" />
                              Télécharger
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Timeline */}
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                  Chronologie Historique
                </h2>
                <div className="relative">
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />
                  
                  {timelineEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`relative flex items-center mb-12 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background shadow-burgundy z-10" />
                      
                      <div className={`ml-20 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                      }`}>
                        <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/30 transition-all">
                          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-bold mb-3">
                            {event.year}
                          </span>
                          <h3 className="font-display text-xl font-bold text-foreground mb-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
              <Button variant="outline" className="flex-1 gap-2" onClick={() => setSelectedDoc(null)}>
                Fermer
              </Button>
              <Button variant="burgundy" className="flex-1 gap-2" onClick={() => selectedDoc && handleDownload(selectedDoc)}>
                <Download className="w-4 h-4" />
                Télécharger ({selectedDoc?.size})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Archive Detail Modal */}
      <Dialog open={!!selectedArchiveItem} onOpenChange={() => setSelectedArchiveItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selectedArchiveItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {selectedArchiveItem?.year}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                {selectedArchiveItem?.type}
              </span>
            </div>
            <p className="text-foreground">{selectedArchiveItem?.description}</p>
            <div className="pt-4 border-t border-border">
              {selectedArchiveItem?.category === "videos" ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Button variant="burgundy" size="lg" className="gap-2">
                    <Play className="w-6 h-6" />
                    Lancer la vidéo
                  </Button>
                </div>
              ) : selectedArchiveItem?.category === "photos" ? (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    Prévisualiser
                  </Button>
                  <Button variant="burgundy" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default DocumentsArchives;
