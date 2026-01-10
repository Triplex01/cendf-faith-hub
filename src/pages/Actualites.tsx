import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HeroCarousel from "@/components/HeroCarousel";
import { Calendar, MapPin, Users, ArrowRight, Church, Heart, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts, useEvents, getFeaturedImage, formatWPDate, stripHtml } from "@/hooks/useWordPress";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import basiliqueRome from "@/assets/basilique-rome.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

// Images de fallback pour le carousel et les missions (contenu statique)
const carouselSlides = [
  {
    image: basiliqueYamoussoukro,
    title: "Basilique Notre-Dame de la Paix",
    subtitle: "Yamoussoukro, joyau de l'architecture chrétienne en Afrique",
  },
  {
    image: basiliqueRome,
    title: "Communion avec Rome",
    subtitle: "L'Église de Côte d'Ivoire unie au Saint-Père et à l'Église universelle",
  },
  {
    image: interieurBasilique,
    title: "Beauté de la Liturgie",
    subtitle: "Célébrer la gloire de Dieu à travers l'art sacré et les vitraux",
  },
  {
    image: reunionEglise,
    title: "L'Église en Mission",
    subtitle: "Formation et engagement pastoral au service du peuple de Dieu",
  },
];

const Actualites = () => {
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts({ per_page: 6 });
  const { data: events, isLoading: eventsLoading } = useEvents({ per_page: 4 });

  return (
    <PageLayout 
      title="Actualités"
      subtitle="Restez informé des dernières actualités de l'Église catholique en Côte d'Ivoire"
    >
      <HeroCarousel slides={carouselSlides} />

      {/* Section Actualités */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Dernières Actualités
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Suivez les dernières nouvelles de l'Église catholique en Côte d'Ivoire
            </p>
          </div>

          {postsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : postsError ? (
            <div className="text-center py-12 text-muted-foreground">
              Impossible de charger les actualités pour le moment.
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link 
                  key={post.id} 
                  to={`/actualites/${post.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={getFeaturedImage(post) || basiliqueYamoussoukro} 
                      alt={post.title?.rendered || "Article"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{formatWPDate(post.date)}</span>
                    </div>
                    <h3 
                      className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2"
                      dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }}
                    />
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {stripHtml(post.excerpt?.rendered || "")}
                    </p>
                    <div className="mt-4 flex items-center text-primary font-medium">
                      Lire la suite
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Aucune actualité disponible pour le moment.
            </div>
          )}
        </div>
      </section>

      {/* Section Événements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Événements à Venir
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Participez aux prochains événements de notre communauté
            </p>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {events.map((event: any) => (
                <div 
                  key={event.id}
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-semibold text-foreground mb-2"
                        dangerouslySetInnerHTML={{ __html: event.title?.rendered || "" }}
                      />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.acf?.lieu || "Lieu à confirmer"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{formatWPDate(event.acf?.date_evenement || event.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 shadow-lg text-center">
                <Church className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Messes Dominicales</h3>
                <p className="text-sm text-muted-foreground">Chaque dimanche dans toutes les paroisses</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Œuvres Caritatives</h3>
                <p className="text-sm text-muted-foreground">Actions de solidarité et d'entraide</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Mission</h3>
                <p className="text-sm text-muted-foreground">Évangélisation et témoignage</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Actualites;
