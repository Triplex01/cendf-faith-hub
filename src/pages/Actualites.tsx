import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, MapPin, ChevronRight, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, EventSchema } from "@/components/StructuredData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Images importées
import eventSynode from "@/assets/event-synode.jpg";
import eventCongresPanafricain from "@/assets/event-congres-panafricain.jpg";
import eventJourneeScientifique from "@/assets/event-journee-scientifique.jpg";
import citationLeonXIV from "@/assets/citation-leon-xiv.jpg";
import citationCardinal from "@/assets/citation-cardinal.jpg";
import citationJeanChrisostome from "@/assets/citation-jean-chrisostome.jpg";
import citationCardinalSarah from "@/assets/citation-cardinal-sarah.jpg";
import citationPieX from "@/assets/citation-pie-x.jpg";
import citationSarahAfrique from "@/assets/citation-sarah-afrique.jpg";
import citationBenoitXVI from "@/assets/citation-benoit-xvi.jpg";
import pelerinageImg from "@/assets/basilique-yamoussoukro.jpg";
import reunionImg from "@/assets/news-reunion-cedf.jpg";
import voeuxImg from "@/assets/voeux-2026.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  {
    id: 3,
    author: "Saint Jean Chrysostome",
    title: "Père et Docteur de l'Église",
    date: "Homélie sur le sacerdoce",
    quote: "Les prêtres ont reçu un pouvoir que Dieu n'a donné ni aux anges ni aux archanges… Celui qui offense un prêtre offense Dieu.",
    image: citationJeanChrisostome,
    type: "Parole des Pères",
    fullText: "Saint Jean Chrysostome souligne la dignité incomparable du sacerdoce ministériel. Le prêtre, par l'imposition des mains, reçoit un pouvoir sacramentel — pardonner les péchés et consacrer l'Eucharistie — que même les puissances angéliques n'ont pas reçu. Respecter le prêtre, c'est honorer le Christ qui agit à travers lui.",
  },
  {
    id: 4,
    author: "Cardinal Robert Sarah",
    title: "Cardinal de la Sainte Église romaine",
    date: "Intervention publique",
    quote: "Comment la doctrine de l'Église pourrait-elle changer ? Notre unité ne peut pas se construire autour d'opinions à la mode.",
    image: citationCardinalSarah,
    type: "Parole d'un Cardinal",
    fullText: "Le Cardinal Sarah rappelle avec force que la foi catholique repose sur la Révélation divine et la Tradition apostolique, non sur les fluctuations de l'opinion publique. L'unité de l'Église se construit dans la fidélité à la vérité reçue, non dans l'accommodation aux modes du temps.",
  },
  {
    id: 5,
    author: "Saint Pape Pie X",
    title: "Souverain Pontife",
    date: "25 août 1910",
    quote: "La doctrine catholique nous enseigne que le premier devoir de la charité n'est pas dans la tolérance des convictions erronées.",
    image: citationPieX,
    type: "Magistère pontifical",
    fullText: "Saint Pie X enseigne que la véritable charité ne consiste pas à laisser autrui dans l'erreur sous prétexte de respect, mais à lui transmettre la vérité qui sauve. Tolérer l'erreur n'est pas un acte de bonté ; le premier service de charité est de témoigner de la foi authentique reçue du Christ et de son Église.",
  },
  {
    id: 6,
    author: "Cardinal Robert Sarah",
    title: "Cardinal de la Sainte Église romaine",
    date: "Sur la liturgie en Afrique",
    quote: "La croissance rapide du catholicisme en Afrique appelle une formation théologique et liturgique solide. Sans cela, la célébration risque d'être absorbée par des formes extérieures, au détriment du silence, du recueillement et du caractère sacré de l'Eucharistie.",
    image: citationSarahAfrique,
    type: "Réflexion liturgique",
    fullText: "Le Cardinal Sarah, fin connaisseur de l'Église en Afrique, met en garde contre une liturgie réduite au folklore. La vitalité du catholicisme africain exige une formation rigoureuse pour que les célébrations conservent leur dimension de mystère, d'adoration silencieuse et de communion réelle avec le Christ Eucharistie.",
  },
  {
    id: 7,
    author: "Benoît XVI",
    title: "Pape émérite",
    date: "Homélie du 1er décembre 2007",
    quote: "La célébration de l'Avent est la réponse de l'Église Épouse à l'initiative toujours nouvelle de Dieu Époux, 'qui était et qui vient'. À l'humanité qui n'a plus de temps pour Lui, Dieu offre à nouveau du temps, un nouvel espace pour revenir sur elle-même, pour se remettre en marche, pour retrouver le sens de l'espérance.",
    image: citationBenoitXVI,
    type: "Homélie pontificale",
    fullText: "Benoît XVI, dans cette homélie de l'Avent, présente le temps liturgique comme un don : Dieu, qui se révèle dans l'histoire, offre à l'humanité distraite un espace de conversion. L'Avent n'est pas un simple compte à rebours vers Noël, mais une nouvelle chance offerte de retrouver le sens de l'espérance chrétienne.",
  },
];

const staticArticles: Article[] = [
  {
    id: 1,
    slug: "pelerinage-yamoussoukro",
    title: "Pèlerinage à la Basilique de Yamoussoukro",
    excerpt: "Des milliers de fidèles ont participé au pèlerinage annuel à la Basilique Notre-Dame de la Paix de Yamoussoukro.",
    image: pelerinageImg,
    date: "15 janvier 2026",
    category: "Événement",
  },
  {
    id: 2,
    slug: "reunion-commission-janvier",
    title: "Réunion de la Commission Épiscopale",
    excerpt: "Les membres de la Commission se sont réunis pour planifier les activités de l'année 2026.",
    image: reunionImg,
    date: "10 janvier 2026",
    category: "Vie de la CEDF",
  },
  {
    id: 3,
    slug: "voeux-nouvel-an-2026",
    title: "Vœux du Nouvel An 2026",
    excerpt: "Que cette nouvelle année soit remplie de la grâce divine et de la paix du Christ.",
    image: voeuxImg,
    date: "1er janvier 2026",
    category: "Message",
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
      {/* 1. Section Événements à la Une */}
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

      {/* 2. Section Dernières Actualités */}
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

      {/* 3. Section Citations et Paroles */}
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

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            className="max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {citations.map((citation) => (
                <CarouselItem
                  key={citation.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedCitation(citation)}
                    className="relative cursor-pointer bg-white/5 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors h-full"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={citation.image}
                        alt={citation.author}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-5">
                      <span className="inline-block px-3 py-1 bg-primary/80 text-white text-[10px] font-bold rounded-full w-fit mb-2 uppercase tracking-wide">
                        {citation.type}
                      </span>
                      <Quote className="w-6 h-6 text-primary/60 mb-2" />
                      <p className="text-white text-sm md:text-base font-medium leading-relaxed mb-3 italic line-clamp-5">
                        "{citation.quote}"
                      </p>
                      <div className="border-t border-white/20 pt-3">
                        <p className="text-primary font-bold text-sm">{citation.author}</p>
                        <p className="text-gray-400 text-xs">{citation.title}</p>
                        <p className="text-gray-500 text-[10px] mt-1">{citation.date}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-primary/20 border-primary/40 text-white hover:bg-primary hover:text-white" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-primary/20 border-primary/40 text-white hover:bg-primary hover:text-white" />
          </Carousel>
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
              <div>
                <p className="text-primary font-bold text-lg">{selectedCitation.author}</p>
                <p className="text-muted-foreground">{selectedCitation.title}</p>
                <p className="text-sm text-muted-foreground">{selectedCitation.date}</p>
              </div>
              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground text-lg">
                "{selectedCitation.quote}"
              </blockquote>
              <p className="text-foreground">{selectedCitation.fullText}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SEO
        title="Actualités"
        description="Dernières actualités de l'Église catholique en Côte d'Ivoire - Événements, conférences et annonces de la CEDF"
        keywords="actualités catholiques, Côte d'Ivoire, CEDF, événements église, conférence, synodalité"
        url="/actualites"
      />
      <BreadcrumbSchema items={[{ name: "Actualités", url: "/actualites" }]} />
      {staticEvents.map((event) => (
        <EventSchema
          key={event.id}
          name={event.title}
          startDate={event.date}
          location={event.location}
          description={event.fullDescription}
        />
      ))}
    </PageLayout>
  );
};

export default Actualites;
