import PageLayout from "@/components/PageLayout";
import { FileText, Download, Eye, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const documentCategories = [
  { name: "Tous", count: 156 },
  { name: "Encycliques", count: 24 },
  { name: "Lettres Pastorales", count: 45 },
  { name: "Décrets", count: 32 },
  { name: "Homélies", count: 55 },
];

const documents = [
  {
    title: "Lettre Pastorale sur l'Évangélisation en Afrique",
    category: "Lettres Pastorales",
    date: "10 Décembre 2025",
    size: "2.4 MB",
    type: "PDF",
  },
  {
    title: "Décret sur la Formation des Catéchistes",
    category: "Décrets",
    date: "28 Novembre 2025",
    size: "1.8 MB",
    type: "PDF",
  },
  {
    title: "Homélie de la Fête de Noël 2024",
    category: "Homélies",
    date: "25 Décembre 2024",
    size: "890 KB",
    type: "PDF",
  },
  {
    title: "Instruction sur la Liturgie en Langue Vernaculaire",
    category: "Décrets",
    date: "15 Novembre 2025",
    size: "3.1 MB",
    type: "PDF",
  },
  {
    title: "Message pour la Journée Mondiale de la Jeunesse",
    category: "Lettres Pastorales",
    date: "1 Novembre 2025",
    size: "1.2 MB",
    type: "PDF",
  },
  {
    title: "Réflexion sur la Doctrine Sociale de l'Église",
    category: "Encycliques",
    date: "20 Octobre 2025",
    size: "4.5 MB",
    type: "PDF",
  },
];

const Documents = () => {
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
                />
              </div>
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {documentCategories.map((cat, index) => (
                <button
                  key={index}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-burgundy transition-all">
                    <FileText className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                      {doc.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {doc.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {doc.date}
                  </span>
                  <span>{doc.size}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    Voir
                  </Button>
                  <Button variant="burgundy" size="sm" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus de documents
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Documents;
