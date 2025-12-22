import PageLayout from "@/components/PageLayout";
import HeroCarousel from "@/components/HeroCarousel";
import { NewsCard } from "@/components/NewsCard";
import { LoadingGrid, ErrorMessage } from "@/components/LoadingStates";
import { Calendar, MapPin, Users, ArrowRight, Church, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import heroImage from "@/assets/hero-church.jpg";
import teachingImage from "@/assets/teaching-priest.jpg";
import archivesImage from "@/assets/archives.jpg";
import radioImage from "@/assets/radio-studio.jpg";

const carouselSlides = [
  {
    image: heroImage,
    title: "Grande Messe de Noël 2025",
    subtitle: "Célébration solennelle à la Cathédrale avec toute la communauté diocésaine",
  },
  {
    image: teachingImage,
    title: "Retraite Spirituelle de l'Avent",
    subtitle: "Trois jours de prière et de méditation pour préparer nos cœurs à Noël",
  },
  {
    image: archivesImage,
    title: "Inauguration du Nouveau Centre Pastoral",
    subtitle: "Un espace moderne dédié à la formation et à la vie communautaire",
  },
  {
    image: radioImage,
    title: "Lancement de la Web Radio",
    subtitle: "La foi maintenant accessible en streaming 24h/24 sur internet",
  },
];

const upcomingEvents = [
  {
    icon: Church,
    title: "Messe de Noël",
    date: "25 Décembre 2025",
    time: "10:00",
    location: "Cathédrale Notre-Dame",
  },
  {
    icon: Users,
    title: "Rassemblement des Jeunes",
    date: "28 Décembre 2025",
    time: "15:00",
    location: "Centre Pastoral",
  },
  {
    icon: Heart,
    title: "Action Caritative",
    date: "1 Janvier 2026",
    time: "09:00",
    location: "Paroisse St-Joseph",
  },
  {
    icon: Globe,
    title: "Journée Missionnaire",
    date: "6 Janvier 2026",
    time: "08:00",
    location: "Diocèse",
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

const Actualites = () => {
  // Récupérer les actualités depuis WordPress via GraphQL
  const { news, loading, error, hasNextPage, loadMore } = useNews({ first: 6 });

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
            {/* Featured News - GraphQL Data */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                À la Une
              </h2>
              
              {/* Loading State */}
              {loading && <LoadingGrid count={4} type="news" />}
              
              {/* Error State */}
              {error && (
                <ErrorMessage 
                  message="Impossible de charger les actualités. Veuillez réessayer."
                  onRetry={() => window.location.reload()}
                />
              )}
              
              {/* News Grid */}
              {!loading && !error && (
                <>
                  <div className="grid gap-6">
                    {news.slice(0, 4).map((post) => (
                      <NewsCard 
                        key={post.id} 
                        post={post}
                        onReadMore={(slug) => console.log('Navigate to:', slug)}
                      />
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasNextPage && (
                    <div className="text-center mt-6">
                      <Button variant="outline" onClick={loadMore}>
                        Charger plus d'actualités
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Prochains Événements
              </h2>
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      index !== upcomingEvents.length - 1 ? "pb-6 border-b border-border" : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <event.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        {event.date} à {event.time}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="burgundy" className="w-full mt-6">
                Voir tous les événements
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Actualites;
