import PageLayout from "@/components/PageLayout";
import { Archive, Calendar, Book, Video, Image, Search, Filter, X, Play, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import archivesImage from "@/assets/archives.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const archiveCategories = [
  {
    icon: Book,
    title: "Documents Historiques",
    description: "Textes fondateurs et documents d'archives depuis 1960",
    count: 234,
    color: "primary",
    id: "documents",
  },
  {
    icon: Video,
    title: "Vidéos d'Archives",
    description: "Célébrations et événements marquants de l'Église",
    count: 89,
    color: "secondary",
    id: "videos",
  },
  {
    icon: Image,
    title: "Photothèque",
    description: "Collection de photographies historiques",
    count: 567,
    color: "primary",
    id: "photos",
  },
  {
    icon: Archive,
    title: "Correspondances",
    description: "Lettres et échanges épistolaires d'importance",
    count: 145,
    color: "secondary",
    id: "correspondances",
  },
];

const archiveItems = [
  {
    id: 1,
    title: "Lettre de fondation du diocèse",
    category: "documents",
    year: "1960",
    description: "Document officiel de création du diocèse après l'indépendance",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    id: 2,
    title: "Première messe célébrée au diocèse",
    category: "videos",
    year: "1960",
    description: "Enregistrement vidéo historique de la première messe",
    type: "Vidéo",
    duration: "45 min",
  },
  {
    id: 3,
    title: "Construction de la cathédrale - Phase 1",
    category: "photos",
    year: "1975",
    description: "Série de photographies documentant la construction",
    type: "Album",
    count: "24 photos",
  },
  {
    id: 4,
    title: "Correspondance avec le Vatican",
    category: "correspondances",
    year: "1985",
    description: "Échanges officiels avec le Saint-Siège",
    type: "PDF",
    size: "890 KB",
  },
  {
    id: 5,
    title: "Visite du Pape Jean-Paul II",
    category: "photos",
    year: "1990",
    description: "Photographies de la visite pastorale historique",
    type: "Album",
    count: "156 photos",
  },
  {
    id: 6,
    title: "Ordination des premiers prêtres ivoiriens",
    category: "videos",
    year: "1968",
    description: "Cérémonie d'ordination filmée",
    type: "Vidéo",
    duration: "1h 20min",
  },
  {
    id: 7,
    title: "Décret sur l'évangélisation en milieu rural",
    category: "documents",
    year: "1980",
    description: "Orientations pastorales pour les campagnes",
    type: "PDF",
    size: "2.1 MB",
  },
  {
    id: 8,
    title: "Lettre du premier évêque africain",
    category: "correspondances",
    year: "1970",
    description: "Lettre pastorale inaugurale",
    type: "PDF",
    size: "560 KB",
  },
];

const timelineEvents = [
  {
    year: "2020",
    title: "Célébration des 60 ans du diocèse",
    description: "Grande célébration marquant six décennies d'évangélisation",
  },
  {
    year: "2010",
    title: "Visite Pastorale du Pape Benoît XVI",
    description: "Moment historique pour l'Église en Côte d'Ivoire",
  },
  {
    year: "1995",
    title: "Premier Synode Diocésain",
    description: "Rassemblement pour définir les orientations pastorales",
  },
  {
    year: "1980",
    title: "Création du Centre de Formation",
    description: "Fondation du centre de formation des catéchistes",
  },
  {
    year: "1960",
    title: "Fondation du Diocèse",
    description: "Établissement officiel du diocèse après l'indépendance",
  },
];

const Archives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof archiveItems[0] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const years = useMemo(() => {
    return [...new Set(archiveItems.map(item => item.year))].sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  const filteredItems = useMemo(() => {
    return archiveItems.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesYear = !selectedYear || item.year === selectedYear;
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setShowResults(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedYear(null);
    setShowResults(false);
  };

  const getItemIcon = (category: string) => {
    switch (category) {
      case "documents": return Book;
      case "videos": return Video;
      case "photos": return Image;
      case "correspondances": return Archive;
      default: return Book;
    }
  };

  return (
    <PageLayout 
      title="Archives" 
      subtitle="Préserver la mémoire, transmettre l'héritage de foi"
      backgroundImage={archivesImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher dans les archives..." 
                  className="pl-12 h-14 text-lg rounded-xl border-border focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button variant="burgundy" size="lg" className="h-14 px-8" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtres:
              </span>
              <select
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-primary outline-none"
                value={selectedYear || ""}
                onChange={(e) => {
                  setSelectedYear(e.target.value || null);
                  setShowResults(true);
                }}
              >
                <option value="">Toutes les années</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {(selectedCategory || selectedYear || searchQuery) && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  <X className="w-4 h-4 mr-1" />
                  Effacer les filtres
                </Button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {archiveCategories.map((cat, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat.id)}
                className={`bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border cursor-pointer group text-center ${
                  selectedCategory === cat.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                  cat.color === "primary" ? "bg-gradient-burgundy" : "bg-gradient-gold"
                }`}>
                  <cat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {cat.description}
                </p>
                <span className="text-secondary font-bold text-lg">
                  {cat.count} éléments
                </span>
              </div>
            ))}
          </div>

          {/* Search Results */}
          {showResults && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Résultats ({filteredItems.length})
                </h2>
              </div>
              
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Archive className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">Aucun résultat trouvé</p>
                  <p className="text-muted-foreground text-sm mt-2">Essayez de modifier vos critères de recherche</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => {
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 gap-2"
                            onClick={() => setSelectedItem(item)}
                          >
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
            </div>
          )}

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
              Chronologie Historique
            </h2>
            <div className="relative">
              {/* Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />
              
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background shadow-burgundy z-10" />
                  
                  {/* Content */}
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
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {selectedItem?.year}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                {selectedItem?.type}
              </span>
            </div>
            <p className="text-foreground">{selectedItem?.description}</p>
            <div className="pt-4 border-t border-border">
              {selectedItem?.category === "videos" ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Button variant="burgundy" size="lg" className="gap-2">
                    <Play className="w-6 h-6" />
                    Lancer la vidéo
                  </Button>
                </div>
              ) : selectedItem?.category === "photos" ? (
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
                    Télécharger ({selectedItem?.size})
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

export default Archives;
