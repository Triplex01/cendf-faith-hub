import PageLayout from "@/components/PageLayout";
import { Archive, Calendar, Book, Video, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import archivesImage from "@/assets/archives.jpg";

const archiveCategories = [
  {
    icon: Book,
    title: "Documents Historiques",
    description: "Textes fondateurs et documents d'archives depuis 1960",
    count: 234,
    color: "primary",
  },
  {
    icon: Video,
    title: "Vidéos d'Archives",
    description: "Célébrations et événements marquants de l'Église",
    count: 89,
    color: "secondary",
  },
  {
    icon: Image,
    title: "Photothèque",
    description: "Collection de photographies historiques",
    count: 567,
    color: "primary",
  },
  {
    icon: Archive,
    title: "Correspondances",
    description: "Lettres et échanges épistolaires d'importance",
    count: 145,
    color: "secondary",
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
  return (
    <PageLayout 
      title="Archives" 
      subtitle="Préserver la mémoire, transmettre l'héritage de foi"
      backgroundImage={archivesImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Rechercher dans les archives..." 
                className="pl-12 h-14 text-lg rounded-xl border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {archiveCategories.map((cat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer group text-center"
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
    </PageLayout>
  );
};

export default Archives;
