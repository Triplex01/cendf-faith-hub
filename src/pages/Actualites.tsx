import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, MapPin, Users, ArrowRight, Loader2, Clock, Quote, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts, useEvents, getFeaturedImage, formatWPDate, stripHtml } from "@/hooks/useWordPress";
import { motion } from "framer-motion";

// Images importées
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import eventAbidjan2025 from "@/assets/event-abidjan-2025.jpg";
import eventSynode from "@/assets/event-synode.jpg";
import eventCongresPanafricain from "@/assets/event-congres-panafricain.jpg";
import eventJourneeScientifique from "@/assets/event-journee-scientifique.jpg";
import citationLeonXIV from "@/assets/citation-leon-xiv.jpg";
import citationCardinal from "@/assets/citation-cardinal.jpg";

// Événements statiques (basés sur les images uploadées)
const staticEvents = [
  {
    id: 1,
    title: "IIIe Congrès Panafricain du Jubilé Catholique",
    subtitle: "Théologie, Société et Vie Pastorale",
    date: "5-10 Août 2025",
    location: "Abidjan, Côte d'Ivoire",
    theme: "Cheminer ensemble dans l'espérance en tant que Famille de Dieu de l'Église en Afrique",
    image: eventCongresPanafricain,
    type: "Congrès International",
  },
  {
    id: 2,
    title: "Grande Conférence Publique sur la Synodalité",
    subtitle: "Quels impacts pour l'Église Famille de Dieu en CI ?",
    date: "28 Juin 2025 - 09h",
    location: "Auditorium Cathédrale Saint-Paul, Abidjan Plateau",
    theme: "Synode sur la synodalité",
    image: eventSynode,
    type: "Conférence",
  },
  {
    id: 3,
    title: "Abidjan 2025 - Jubilé de l'Espérance",
    subtitle: "Journeying Together in Hope as Church Family of God in Africa",
    date: "5-10 Août 2025",
    location: "Abidjan",
    theme: "Jubilé 2025",
    image: eventAbidjan2025,
    type: "Événement Continental",
  },
  {
    id: 4,
    title: "Journée Scientifique ISTAY",
    subtitle: "Réception du Document Final de la XVIe Assemblée du Synode",
    date: "8 Octobre 2025 - 09h à 17h",
    location: "Institut Saint Thomas d'Aquin, Yamoussoukro",
    theme: "Pour une Église synodale : communion, participation, mission",
    image: eventJourneeScientifique,
    type: "Journée d'étude",
  },
];

// Citations et commentaires (basés sur les images uploadées)
const citations = [
  {
    id: 1,
    author: "Léon XIV",
    title: "Pape",
    date: "Audience Générale du 13 août 2025",
    quote: "L'Évangile ne nous enseigne pas à nier le mal, mais à le reconnaître comme une opportunité douloureuse pour renaître.",
    image: citationLeonXIV,
    type: "Parole du Saint-Père",
  },
  {
    id: 2,
    author: "Cardinal Raniero Cantalamessa",
    title: "Prédicateur de la Maison Pontificale",
    date: "Commentaire du 31 août 2007",
    quote: "La vraie gloire fuit celui qui la poursuit et poursuit celui qui la fuit.",
    image: citationCardinal,
    type: "Commentaire spirituel",
  },
];

const Actualites = () => {
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts({ per_page: 6 });
  const { data: wpEvents, isLoading: eventsLoading } = useEvents({ per_page: 4 });

  return (
    <PageLayout 
      title="Actualités"
      subtitle="Restez informé des dernières actualités de l'Église catholique en Côte d'Ivoire"
    >
      {/* Section Événements à la Une */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              À la Une
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Événements <span className="text-primary">Majeurs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les grands rendez-vous de l'Église catholique en Côte d'Ivoire et en Afrique
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {staticEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-3">{event.subtitle}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-secondary" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm italic border-l-2 border-primary pl-3">
                    {event.theme}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Citations et Paroles */}
      <section className="py-16 bg-deep-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Paroles Inspirantes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Commentaires & <span className="text-gradient-gold">Citations</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Les paroles des évêques et des prêtres pour nourrir notre foi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {citations.map((citation, index) => (
              <motion.div
                key={citation.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={citation.image} 
                    alt={citation.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="inline-block px-3 py-1 bg-primary/80 text-white text-xs font-bold rounded-full w-fit mb-3">
                    {citation.type}
                  </span>
                  <Quote className="w-8 h-8 text-primary/60 mb-2" />
                  <p className="text-white text-lg font-medium leading-relaxed mb-4 italic">
                    "{citation.quote}"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-primary font-bold">{citation.author}</p>
                    <p className="text-gray-400 text-sm">{citation.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{citation.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Actualités WordPress */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dernières <span className="text-primary">Actualités</span>
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
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
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

      {/* Section Événements WordPress */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prochains <span className="text-secondary">Événements</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Participez aux prochains événements de notre communauté
            </p>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : wpEvents && wpEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {wpEvents.map((event: any) => (
                <div 
                  key={event.id}
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
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
                        <Clock className="h-4 w-4" />
                        <span>{formatWPDate(event.acf?.date_evenement || event.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-6">
                Consultez nos événements majeurs ci-dessus
              </p>
              <Button asChild variant="outline">
                <Link to="/activites">Voir toutes les activités</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Actualites;
