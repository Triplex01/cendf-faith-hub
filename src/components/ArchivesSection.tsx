import { Archive, Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import archivesImage from "@/assets/archives.jpg";

const archiveCategories = [
  { name: "Lettres apostoliques", count: 156 },
  { name: "Homélies", count: 342 },
  { name: "Documents conciliaires", count: 89 },
  { name: "Encycliques", count: 67 },
  { name: "Décrets", count: 124 },
  { name: "Instructions", count: 98 },
];

const ArchivesSection = () => {
  return (
    <section id="archives" className="py-24 bg-soft-beige">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Archives
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Patrimoine <span className="text-primary">Doctrinal</span>
            </h2>
            <p className="font-secondary text-lg text-muted-foreground leading-relaxed mb-8">
              Accédez à notre riche collection d'archives regroupant des siècles de sagesse catholique. 
              Des textes fondateurs aux documents contemporains, explorez l'héritage de notre foi.
            </p>

            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher dans les archives..."
                className="w-full pl-12 pr-4 py-4 bg-background rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-primary"
              />
              <Button variant="gold" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 gap-2">
                <Filter className="w-4 h-4" />
                Filtrer
              </Button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-3">
              {archiveCategories.map((category, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/40 hover:shadow-card cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Archive className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="burgundy" size="lg" className="mt-8 gap-2">
              Explorer toutes les archives
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-burgundy rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={archivesImage}
                alt="Archives et manuscrits anciens de l'Église"
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/70 via-deep-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1 h-12 bg-primary rounded-full" />
                  <div>
                    <p className="text-primary-foreground font-display text-2xl font-bold">876</p>
                    <p className="text-primary-foreground/70 text-sm">Documents numérisés</p>
                  </div>
                </div>
                <p className="font-secondary text-primary-foreground/80 italic">
                  "Préservons le trésor de la foi transmis par nos ancêtres dans la foi."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchivesSection;
