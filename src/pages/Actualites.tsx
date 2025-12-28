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

const missions = [
  {
    title: "Évangélisation",
    description: "Porter la Bonne Nouvelle du Christ à tous, particulièrement aux plus éloignés de la foi.",
    icon: Globe,
  },
  {
    title: "Formation",
    description: "Former les fidèles à une connaissance approfondie de la doctrine et de la spiritualité catholique.",
    icon: Users,
  },
  {
    title: "Charité",
    description: "Servir les plus pauvres et vulnérables à travers des actions concrètes de solidarité.",
    icon: Heart,
  },
];

// Images de fallback
const fallbackImages = [basiliqueYamoussoukro, reunionEglise, interieurBasilique, basiliqueNotredame];

// Icônes pour les événements
const eventIcons = [Church, Users, Heart, Globe];

const Actualites = () => {
  // Récupérer les articles depuis WordPress
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts({ per_page: 4 });
  
  // Récupérer les événements depuis WordPress
  const { data: events, isLoading: eventsLoading, error: eventsError } = useEvents({ per_page: 4 });

  const isLoading = postsLoading || eventsLoading;

  return (
    <PageLayout 
      title="Actualités & Missions" 
      subtitle="Restez connectés à la vie de l'Église en Côte d'Ivoire"
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Carousel */}
          <div className="mb-20">
            <HeroCarousel slides={carouselSlides} />
          </div>

          {/* Missions Section */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center">
              Nos Missions
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Le CENDF œuvre pour la croissance spirituelle de tous les fidèles à travers trois axes fondamentaux
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {missions.map((mission, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 text-center group"
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-burgundy flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-burgundy">
                    <mission.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {mission.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured News and Events Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured News - Données WordPress */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                À la Une
              </h2>
              
              {postsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Chargement des actualités...</span>
                </div>
              ) : postsError ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Impossible de charger les actualités.</p>
                  <p className="text-sm mt-2">Vérifiez la connexion WordPress.</p>
                </div>
              ) : posts && posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post, index) => {
                    const featuredImage = getFeaturedImage(post) || fallbackImages[index % fallbackImages.length];
                    const excerpt = stripHtml(post.excerpt.rendered).slice(0, 150) + "...";
                    const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Actualité";
                    
                    return (
                      <article
                        key={post.id}
                        className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                            <img
                              src={featuredImage}
                              alt={stripHtml(post.title.rendered)}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.currentTarget.src = fallbackImages[index % fallbackImages.length];
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                {category}
                              </span>
                              <span className="text-muted-foreground text-sm flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatWPDate(post.date)}
                              </span>
                            </div>
                            <h3 
                              className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                            <p className="text-muted-foreground mb-4">
                              {excerpt}
                            </p>
                            <Link to={`/actualites/${post.slug}`}>
                              <Button variant="link" className="p-0 h-auto text-primary gap-2">
                                Lire la suite <ArrowRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Aucune actualité disponible pour le moment.</p>
                </div>
              )}
            </div>

            {/* Upcoming Events - Données WordPress */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Prochains Événements
              </h2>
              <div className="bg-card rounded-xl border border-border p-6">
                {eventsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : eventsError ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <p>Impossible de charger les événements.</p>
                  </div>
                ) : events && events.length > 0 ? (
                  <div className="space-y-6">
                    {events.map((event, index) => {
                      const EventIcon = eventIcons[index % eventIcons.length];
                      const eventDate = event.acf?.date 
                        ? new Date(event.acf.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                        : new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
                      const eventTime = event.acf?.time || "À confirmer";
                      const eventLocation = event.acf?.location || "Lieu à confirmer";
                      
                      return (
                        <div
                          key={event.id}
                          className={`flex gap-4 ${
                            index !== events.length - 1 ? "pb-6 border-b border-border" : ""
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                            <EventIcon className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h4 
                              className="font-display font-bold text-foreground mb-1"
                              dangerouslySetInnerHTML={{ __html: event.title.rendered }}
                            />
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3" />
                              {eventDate} à {eventTime}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {eventLocation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <p>Aucun événement à venir.</p>
                  </div>
                )}
              </div>
              <Link to="/evenements">
                <Button variant="burgundy" className="w-full mt-6">
                  Voir tous les événements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Actualites;
