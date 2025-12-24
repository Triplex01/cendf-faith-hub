import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HeroCarousel from "@/components/HeroCarousel";
import { Calendar, MapPin, Users, ArrowRight, Church, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import basiliqueRome from "@/assets/basilique-rome.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

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

const featuredNews = [
  {
    id: "message-noel-eveque",
    title: "Message de Noël de Monseigneur l'Évêque",
    excerpt: "Un appel à la paix et à la réconciliation pour toute la communauté ivoirienne en cette période de fêtes.",
    date: "20 Décembre 2025",
    category: "Message",
    image: basiliqueYamoussoukro,
  },
  {
    id: "ordination-pretres",
    title: "Ordination de 5 nouveaux prêtres",
    excerpt: "Une célébration joyeuse qui renforce le clergé diocésain et témoigne de la vitalité des vocations.",
    date: "15 Décembre 2025",
    category: "Célébration",
    image: reunionEglise,
  },
  {
    id: "formation-catechistes",
    title: "Formation annuelle des catéchistes",
    excerpt: "Plus de 200 catéchistes se forment pour mieux transmettre la foi aux nouvelles générations.",
    date: "10 Décembre 2025",
    category: "Formation",
    image: interieurBasilique,
  },
  {
    id: "action-caritative-noel",
    title: "Grande action caritative de Noël",
    excerpt: "L'Église mobilise ses forces pour apporter joie et réconfort aux plus démunis.",
    date: "18 Décembre 2025",
    category: "Charité",
    image: basiliqueNotredame,
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
            {/* Featured News */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                À la Une
              </h2>
              <div className="space-y-6">
                {featuredNews.map((news, index) => (
                  <article
                    key={index}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 group"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {news.category}
                          </span>
                          <span className="text-muted-foreground text-sm flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {news.date}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {news.excerpt}
                        </p>
                        <Link to={`/actualites/${news.id}`}>
                          <Button variant="link" className="p-0 h-auto text-primary gap-2">
                            Lire la suite <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
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
