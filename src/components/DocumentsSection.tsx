import { FileText, Download, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const documents = [
  {
    title: "Encyclique Lumen Fidei",
    category: "Magistère",
    date: "29 juin 2013",
    description: "La lumière de la foi : cette expression de la tradition de l'Église.",
  },
  {
    title: "Catéchisme de l'Église Catholique",
    category: "Doctrine",
    date: "11 octobre 1992",
    description: "Exposition organique et synthétique de la foi catholique.",
  },
  {
    title: "Dei Verbum",
    category: "Concile Vatican II",
    date: "18 novembre 1965",
    description: "Constitution dogmatique sur la Révélation divine.",
  },
  {
    title: "Lettre pastorale des évêques",
    category: "Épiscopat ivoirien",
    date: "15 août 2024",
    description: "Message aux fidèles de Côte d'Ivoire pour la paix et la réconciliation.",
  },
];

const DocumentsSection = () => {
  return (
    <section id="documents" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Documents
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Textes <span className="text-secondary">Magistériels</span>
            </h2>
          </div>
          <Link to="/documents">
            <Button variant="goldOutline" className="gap-2 self-start md:self-auto">
              Voir tous les documents
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="group relative p-6 bg-card rounded-xl border border-border hover:border-primary/40 shadow-card hover:shadow-elegant transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-gold transition-all duration-300">
                  <FileText className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-medium rounded">
                      {doc.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {doc.date}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.description}
                  </p>
                </div>
                <button className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
