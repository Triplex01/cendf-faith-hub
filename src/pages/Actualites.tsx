import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, MapPin, ChevronRight, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Images importées
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import eventAbidjan2025 from "@/assets/event-abidjan-2025.jpg";
import eventSynode from "@/assets/event-synode.jpg";
import eventCongresPanafricain from "@/assets/event-congres-panafricain.jpg";
import eventJourneeScientifique from "@/assets/event-journee-scientifique.jpg";
import citationLeonXIV from "@/assets/citation-leon-xiv.jpg";
import citationCardinal from "@/assets/citation-cardinal.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";
import basilique from "@/assets/basilique-notredame.jpg";
import voeux2026 from "@/assets/voeux-2026.jpg";

interface StaticEvent {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  theme: string;
  image: string;
  type: string;
  fullDescription: string;
}

interface Citation {
  id: number;
  author: string;
  title: string;
  date: string;
  quote: string;
  image: string;
  type: string;
  fullText: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

// Événements statiques
const staticEvents: StaticEvent[] = [
  {
    id: 1,
    title: "IIIe Congrès Panafricain du Jubilé Catholique",
    subtitle: "Théologie, Société et Vie Pastorale",
    date: "5-10 Août 2025",
    location: "Abidjan, Côte d'Ivoire",
    theme: "Cheminer ensemble dans l'espérance en tant que Famille de Dieu de l'Église en Afrique",
    image: eventCongresPanafricain,
    type: "Congrès International",
    fullDescription: "Le IIIe Congrès Panafricain du Jubilé Catholique rassemblera des évêques, prêtres, religieux et laïcs de toute l'Afrique pour réfléchir sur le thème 'Cheminer ensemble dans l'espérance en tant que Famille de Dieu de l'Église en Afrique'. Cet événement majeur sera l'occasion de partager des expériences pastorales et de renforcer la communion ecclésiale à l'échelle du continent.",
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
    fullDescription: "Cette grande conférence publique explorera les impacts du Synode sur la synodalité pour l'Église Famille de Dieu en Côte d'Ivoire. Des théologiens, évêques et experts ecclésiaux analyseront comment mettre en œuvre les fruits du synode dans notre contexte local.",
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
    fullDescription: "Abidjan sera le cœur battant du Jubilé de l'Espérance 2025 pour l'Afrique. Cet événement continental réunira des pèlerins de tout le continent pour célébrer ensemble notre foi et notre espérance en Christ.",
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
    fullDescription: "Une journée scientifique consacrée à l'étude et à la réception du Document Final de la XVIe Assemblée du Synode. Organisée par l'Institut Saint Thomas d'Aquin de Yamoussoukro.",
  },
];

// Citations et commentaires
const citations: Citation[] = [
  {
    id: 1,
    author: "Léon XIV",
    title: "Pape",
    date: "Audience Générale du 13 août 2025",
    quote: "L'Évangile ne nous enseigne pas à nier le mal, mais à le reconnaître comme une opportunité douloureuse pour renaître.",
    image: citationLeonXIV,
    type: "Parole du Saint-Père",
    fullText: "Dans son audience générale, le Saint-Père a développé une réflexion profonde sur notre rapport au mal et à la souffrance. Il a souligné que l'Évangile ne nous invite pas à nier les difficultés de la vie, mais à les transformer en occasions de croissance spirituelle.",
  },
  {
    id: 2,
    author: "Cardinal Raniero Cantalamessa",
    title: "Prédicateur de la Maison Pontificale",
    date: "Commentaire du 31 août 2007",
    quote: "La vraie gloire fuit celui qui la poursuit et poursuit celui qui la fuit.",
    image: citationCardinal,
    type: "Commentaire spirituel",
    fullText: "Le Cardinal Cantalamessa, dans ce commentaire spirituel, nous rappelle le paradoxe évangélique de l'humilité. Ceux qui cherchent les honneurs et la reconnaissance mondaine les voient s'échapper, tandis que ceux qui s'abaissent dans le service désintéressé sont élevés par Dieu.",
  },
];

// Articles statiques
const staticArticles: Article[] = [
  {
    id: 1,
    slug: "celebration-noel-2024",
    title: "Célébration de Noël 2024",
    excerpt: "La Commission Épiscopale pour la Doctrine de la Foi a célébré avec ferveur la naissance du Christ lors de la messe de Noël 2024.",
    image: interieurBasilique,
    date: "25 Décembre 2024",
    category: "Célébration",
  },
  {
    id: 2,
    slug: "voeux-nouvel-an-2026",
    title: "Vœux du Nouvel An 2026",
    excerpt: "Que cette nouvelle année soit remplie de la grâce divine et de la paix du Christ pour tous les fidèles de Côte d'Ivoire.",
    image: voeux2026,
    date: "1 Janvier 2026",
    category: "Message",
  },
  {
    id: 3,
    slug: "reunion-commission-janvier",
    title: "Réunion de la Commission Épiscopale",
    excerpt: "Les membres de la Commission se sont réunis pour planifier les activités pastorales de l'année 2026.",
    image: reunionEglise,
    date: "10 Janvier 2026",
    category: "Actualité",
  },
  {
    id: 4,
    slug: "pelerinage-yamoussoukro",
    title: "Pèlerinage à la Basilique de Yamoussoukro",
    excerpt: "Des milliers de fidèles ont participé au pèlerinage annuel à la Basilique Notre-Dame de la Paix.",
    image: basiliqueYamoussoukro,
    date: "15 Janvier 2026",
    category: "Pèlerinage",
  },
  {
    id: 5,
    slug: "formation-catechistes",
    title: "Formation des Catéchistes",
    excerpt: "Une session de formation pour les catéchistes a eu lieu à l'archidiocèse d'Abidjan.",
    image: basilique,
    date: "20 Janvier 2026",
    category: "Formation",
  },
  {
    id: 6,
    slug: "messe-unite-chretiens",
    title: "Messe pour l'Unité des Chrétiens",
    excerpt: "Une messe solennelle a été célébrée à l'occasion de la Semaine de prière pour l'unité des chrétiens.",
    image: interieurBasilique,
    date: "25 Janvier 2026",
    category: "Œcuménisme",
  },
];

const Actualites = () => {
  const [selectedEvent, setSelectedEvent] = useState<StaticEvent | null>(null);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

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
                onClick={() => setSelectedEvent(event)}
                className="group cursor-pointer bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="aspect-video sm:aspect-[4/3] md:aspect-video overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
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
                  <div className="flex items-center text-primary text-sm font-medium">
                    En savoir plus
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
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
            {citations.map((citation) => (
              <motion.div
                key={citation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCitation(citation)}
                className="relative cursor-pointer bg-white/5 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/5] sm:aspect-square overflow-hidden">
                  <img 
                    src={citation.image} 
                    alt={citation.author}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
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

      {/* Section Actualités */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staticArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/actualites/${article.slug}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border block h-full"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-primary font-medium">
                      Lire la suite
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Événement */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-primary font-medium">{selectedEvent.subtitle}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  {selectedEvent.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-secondary" />
                  {selectedEvent.location}
                </span>
              </div>
              <p className="text-foreground">{selectedEvent.fullDescription}</p>
              <p className="text-sm text-muted-foreground italic">Thème: {selectedEvent.theme}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Citation */}
      <Dialog open={!!selectedCitation} onOpenChange={() => setSelectedCitation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedCitation?.author}</DialogTitle>
          </DialogHeader>
          {selectedCitation && (
            <div className="space-y-4">
              <img 
                src={selectedCitation.image} 
                alt={selectedCitation.author}
                className="w-full h-64 object-cover object-top rounded-lg"
              />
              <p className="text-muted-foreground">{selectedCitation.title}</p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                "{selectedCitation.quote}"
              </blockquote>
              <p className="text-foreground">{selectedCitation.fullText}</p>
              <p className="text-sm text-muted-foreground">{selectedCitation.date}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Actualites;