import { FileText, Archive, Download, Calendar, ArrowRight, Book, Video, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Import des images de couverture
import docLivretBiblique from "@/assets/doc-livret-biblique.jpg";
import docLettrePastorale from "@/assets/doc-lettre-pastorale.jpg";
import docDecret from "@/assets/doc-decret.jpg";

const recentDocuments = [
  {
    title: "Livret Biblique 2023-2024",
    category: "Livrets",
    date: "Février 2024",
    description: "Guide biblique annuel pour la méditation de la Parole.",
    cover: docLivretBiblique,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    title: "Lettre Pastorale sur l'Évangélisation",
    category: "Lettres",
    date: "Décembre 2025",
    description: "Défis et opportunités de l'évangélisation en Afrique.",
    cover: docLettrePastorale,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
  {
    title: "Décret sur la Formation des Catéchistes",
    category: "Décrets",
    date: "Novembre 2025",
    description: "Nouvelles directives pour la formation des catéchistes.",
    cover: docDecret,
    downloadUrl: "/documents/livret-biblique.pdf",
  },
];

const handleDownload = (doc: typeof recentDocuments[0]) => {
  const link = document.createElement("a");
  link.href = doc.downloadUrl;
  link.download = `${doc.title.replace(/\s+/g, "-")}.pdf`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success(`Téléchargement de "${doc.title}" démarré`);
};

const archiveStats = [
  { icon: Book, label: "Documents", count: 234 },
  { icon: Video, label: "Vidéos", count: 89 },
  { icon: ImageIcon, label: "Photos", count: 567 },
  { icon: Archive, label: "Archives", count: 145 },
];

const DocumentsArchivesSection = () => {
  return (
    <section id="documents-archives" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Enseignements
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Documents & <span className="text-secondary">Archives</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Accédez aux textes officiels, documents magistériels et archives historiques 
              de l'Église catholique en Côte d'Ivoire.
            </p>
          </div>
          <Link to="/documents-archives">
            <Button variant="goldOutline" className="gap-2 self-start md:self-auto">
              Voir tous les enseignements
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Documents Récents
            </h3>
            <div className="space-y-4">
              {recentDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="group flex gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/40 shadow-card hover:shadow-elegant transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={doc.cover}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                        {doc.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {doc.date}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {doc.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {doc.description}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => handleDownload(doc)}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100 self-center"
                    title={`Télécharger ${doc.title}`}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Archives Stats */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Archive className="w-5 h-5 text-secondary" />
              Archives Historiques
            </h3>
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-muted-foreground mb-6">
                Explorez notre riche collection d'archives regroupant des décennies 
                de documents, photos et vidéos historiques de l'Église.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {archiveStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-muted/50 rounded-xl hover:bg-primary/10 transition-colors group cursor-pointer"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <p className="font-display font-bold text-2xl text-foreground">
                      {stat.count}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/documents-archives">
                <Button variant="burgundy" className="w-full gap-2">
                  Explorer les archives
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsArchivesSection;
