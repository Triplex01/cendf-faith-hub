import PageLayout from "@/components/PageLayout";
import { NewsCard } from "@/components/NewsCard";
import { LoadingGrid, ErrorMessage, EmptyState } from "@/components/LoadingStates";
import { Archive, Calendar, Book, Video, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@apollo/client/react";
import { GET_ARCHIVES } from "@/graphql/queries";
import { useState } from "react";
import type { GetArchivesResponse } from "@/graphql/types";
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
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Récupérer les archives depuis WordPress via GraphQL
  const { data, loading, error, fetchMore } = useQuery<GetArchivesResponse>(GET_ARCHIVES, {
    variables: { year: selectedYear, first: 12 },
  });

  const archives = data?.posts?.nodes || [];
  const pageInfo = data?.posts?.pageInfo;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage || loading) return;

    fetchMore({
      variables: {
        year: selectedYear,
        first: 12,
        after: pageInfo.endCursor,
      },
    });
  };

  // Filtrer par recherche
  const filteredArchives = archives.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="max-w-4xl mx-auto mb-20">
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
                      <button
                        onClick={() => setSelectedYear(parseInt(event.year))}
                        className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-bold mb-3 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                      >
                        {event.year}
                      </button>
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

          {/* Archives by Year */}
          {selectedYear && (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Archives de {selectedYear}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedYear(undefined)}
                >
                  Voir toutes les archives
                </Button>
              </div>

              {/* Loading State */}
              {loading && <LoadingGrid count={12} type="news" />}
              
              {/* Error State */}
              {error && (
                <ErrorMessage 
                  message="Impossible de charger les archives. Veuillez réessayer."
                  onRetry={() => window.location.reload()}
                />
              )}
              
              {/* Empty State */}
              {!loading && !error && filteredArchives.length === 0 && (
                <EmptyState 
                  message={`Aucune archive disponible pour l'année ${selectedYear}.`}
                  icon={<Archive className="w-16 h-16 mx-auto" />}
                />
              )}

              {/* Archives Grid */}
              {!loading && !error && filteredArchives.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArchives.map((post) => (
                      <NewsCard 
                        key={post.id} 
                        post={post}
                        onReadMore={(slug) => console.log('Navigate to:', slug)}
                      />
                    ))}
                  </div>
                  
                  {/* Load More */}
                  {pageInfo?.hasNextPage && (
                    <div className="text-center mt-12">
                      <Button variant="outline" size="lg" onClick={loadMore}>
                        Charger plus d'archives
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Archives;
