import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Heart, 
  Cross, 
  Church,
  Play,
  Clock,
  User,
  Calendar,
  Search,
  Filter,
  Video,
  Headphones
} from "lucide-react";
import { useTeachings, getFeaturedImage, formatWPDate, stripHtml } from "@/hooks/useWordPress";
import teachingImage from "@/assets/teaching-priest.jpg";

const categories = [
  { id: "all", icon: BookOpen, title: "Tous", description: "Tous les enseignements" },
  { id: "Fondements", icon: Cross, title: "Catéchèse", description: "Fondements de la foi" },
  { id: "Bible", icon: BookOpen, title: "Études Bibliques", description: "Approfondir les Écritures" },
  { id: "Prière", icon: Heart, title: "Vie Spirituelle", description: "Croître dans la prière" },
  { id: "Vie spirituelle", icon: Church, title: "Liturgie", description: "Vivre les célébrations" },
  { id: "Famille", icon: Users, title: "Vie Familiale", description: "La famille chrétienne" },
];

const Enseignements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: teachings, isLoading } = useTeachings({ per_page: 20 });

  // Filtrer les enseignements
  const filteredTeachings = teachings?.filter((teaching) => {
    const matchesCategory = selectedCategory === "all" || 
      teaching.acf?.category === selectedCategory;
    const matchesSearch = stripHtml(teaching.title.rendered)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <PageLayout 
      title="Enseignements" 
      subtitle="Nourrir votre foi par la Parole et la Doctrine"
      backgroundImage={teachingImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un enseignement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Teachings Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTeachings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachings.map((teaching) => (
                <div
                  key={teaching.id}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={teaching._embedded?.["wp:featuredmedia"]?.[0]?.source_url || teachingImage}
                      alt={stripHtml(teaching.title.rendered)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-secondary/90 text-secondary-foreground rounded-full text-xs font-medium">
                        {teaching.acf?.category || "Enseignement"}
                      </span>
                    </div>

                    {/* Media Type Icons */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {teaching.acf?.audio_url && (
                        <div className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center">
                          <Headphones className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      {teaching.acf?.video_url && (
                        <div className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center">
                          <Video className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {stripHtml(teaching.title.rendered)}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {stripHtml(teaching.content.rendered)}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      {teaching.acf?.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {teaching.acf.author}
                        </span>
                      )}
                      {teaching.acf?.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {teaching.acf.duration}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {teaching.acf?.audio_url && (
                        <Button
                          variant="burgundy"
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => window.open(teaching.acf?.audio_url, '_blank')}
                        >
                          <Headphones className="w-4 h-4" />
                          Écouter
                        </Button>
                      )}
                      {teaching.acf?.video_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => window.open(teaching.acf?.video_url, '_blank')}
                        >
                          <Video className="w-4 h-4" />
                          Voir
                        </Button>
                      )}
                      {!teaching.acf?.audio_url && !teaching.acf?.video_url && (
                        <Button variant="burgundy" size="sm" className="w-full gap-2">
                          <BookOpen className="w-4 h-4" />
                          Lire
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Aucun enseignement trouvé
              </h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}

          {/* Community Section */}
          <div className="mt-20 p-8 md:p-12 bg-gradient-burgundy rounded-2xl text-primary-foreground">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Rejoignez notre communauté d'apprentissage
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Participez à nos sessions d'enseignement en direct, posez vos questions 
                  et grandissez dans la foi avec d'autres frères et sœurs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="hero" size="lg">
                      Nous rejoindre
                    </Button>
                  </Link>
                  <Link to="/radio">
                    <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      Écouter la radio
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">200+</div>
                  <div className="text-sm text-primary-foreground/70">Enseignements</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-sm text-primary-foreground/70">Prédicateurs</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">10k+</div>
                  <div className="text-sm text-primary-foreground/70">Auditeurs</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-primary-foreground/70">Disponible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Enseignements;
