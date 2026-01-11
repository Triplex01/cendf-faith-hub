import { Calendar, MapPin, Quote, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import eventAbidjan2025 from "@/assets/event-abidjan-2025.jpg";
import eventSynode from "@/assets/event-synode.jpg";
import eventCongresPanafricain from "@/assets/event-congres-panafricain.jpg";
import citationLeonXIV from "@/assets/citation-leon-xiv.jpg";
import citationCardinal from "@/assets/citation-cardinal.jpg";

interface Event {
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

const events: Event[] = [
  {
    id: 1,
    title: "IIIe Congrès Panafricain",
    subtitle: "Jubilé Catholique 2025",
    date: "5-10 Août 2025",
    location: "Abidjan, Côte d'Ivoire",
    theme: "Cheminer ensemble dans l'espérance",
    image: eventCongresPanafricain,
    type: "Congrès International",
    fullDescription: "Le IIIe Congrès Panafricain du Jubilé Catholique rassemblera des évêques, prêtres, religieux et laïcs de toute l'Afrique pour réfléchir sur le thème 'Cheminer ensemble dans l'espérance en tant que Famille de Dieu de l'Église en Afrique'. Cet événement majeur sera l'occasion de partager des expériences pastorales et de renforcer la communion ecclésiale à l'échelle du continent.",
  },
  {
    id: 2,
    title: "Conférence sur la Synodalité",
    subtitle: "Impacts pour l'Église en CI",
    date: "28 Juin 2025",
    location: "Cathédrale Saint-Paul, Abidjan",
    theme: "Synode sur la synodalité",
    image: eventSynode,
    type: "Conférence",
    fullDescription: "Cette grande conférence publique explorera les impacts du Synode sur la synodalité pour l'Église Famille de Dieu en Côte d'Ivoire. Des théologiens, évêques et experts ecclésiaux analyseront comment mettre en œuvre les fruits du synode dans notre contexte local, en promouvant une Église plus participative et missionnaire.",
  },
  {
    id: 3,
    title: "Jubilé de l'Espérance 2025",
    subtitle: "Abidjan accueille l'Afrique",
    date: "5-10 Août 2025",
    location: "Abidjan",
    theme: "Journeying Together in Hope",
    image: eventAbidjan2025,
    type: "Événement Continental",
    fullDescription: "Abidjan sera le cœur battant du Jubilé de l'Espérance 2025 pour l'Afrique. Cet événement continental réunira des pèlerins de tout le continent pour célébrer ensemble notre foi et notre espérance en Christ. Des célébrations liturgiques grandioses, des conférences théologiques et des moments de fraternité marqueront ces journées exceptionnelles.",
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
    fullText: "Dans son audience générale, le Saint-Père a développé une réflexion profonde sur notre rapport au mal et à la souffrance. Il a souligné que l'Évangile ne nous invite pas à nier les difficultés de la vie, mais à les transformer en occasions de croissance spirituelle. Cette parole résonne particulièrement dans le contexte africain où nos communautés font face à de nombreux défis.",
  },
  {
    id: 2,
    author: "Card. Raniero Cantalamessa",
    title: "Prédicateur de la Maison Pontificale",
    date: "31 août 2007",
    quote: "La vraie gloire fuit celui qui la poursuit et poursuit celui qui la fuit.",
    image: citationCardinal,
    type: "Commentaire spirituel",
    fullText: "Le Cardinal Cantalamessa, dans ce commentaire spirituel, nous rappelle le paradoxe évangélique de l'humilité. Ceux qui cherchent les honneurs et la reconnaissance mondaine les voient s'échapper, tandis que ceux qui s'abaissent dans le service désintéressé sont élevés par Dieu. Cette méditation nous invite à réévaluer nos motivations dans notre engagement pastoral.",
  },
];

const EventsCitationsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            À la Une
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Événements & <span className="text-primary">Paroles d'Église</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Les grands rendez-vous et les paroles inspirantes de nos pasteurs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Events Column */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Événements Majeurs
            </h3>
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedEvent(event)}
                  className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50"
                >
                  <div className="flex">
                    <div className="w-28 h-28 shrink-0 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <span className="text-xs text-secondary font-semibold uppercase">{event.type}</span>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{event.subtitle}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center pr-4">
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Citations Column */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <Quote className="w-5 h-5 text-secondary" />
              Paroles Inspirantes
            </h3>
            <div className="space-y-4">
              {citations.map((citation, index) => (
                <motion.div
                  key={citation.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedCitation(citation)}
                  className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-secondary/50"
                >
                  <div className="flex">
                    <div className="w-28 h-28 shrink-0 overflow-hidden">
                      <img 
                        src={citation.image} 
                        alt={citation.author}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <span className="text-xs text-primary font-semibold uppercase">{citation.type}</span>
                      <p className="text-sm text-foreground italic line-clamp-2 mt-1">"{citation.quote}"</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold text-secondary">{citation.author}</span>
                        <span className="text-xs text-muted-foreground">• {citation.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center pr-4">
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link to="/actualites">
              Toutes les actualités
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="sr-only">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full mb-2">
                {selectedEvent.type}
              </span>
              <h3 className="text-xl font-bold text-foreground mb-1">{selectedEvent.title}</h3>
              <p className="text-primary font-medium text-sm mb-3">{selectedEvent.subtitle}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  {selectedEvent.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {selectedEvent.location}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {selectedEvent.fullDescription}
              </p>
              <p className="text-sm italic border-l-2 border-primary pl-3 text-muted-foreground">
                Thème: {selectedEvent.theme}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Citation Detail Modal */}
      <Dialog open={!!selectedCitation} onOpenChange={() => setSelectedCitation(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="sr-only">{selectedCitation?.author}</DialogTitle>
          </DialogHeader>
          {selectedCitation && (
            <div>
              <div className="aspect-square max-w-[200px] mx-auto rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedCitation.image} 
                  alt={selectedCitation.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                  {selectedCitation.type}
                </span>
                <h3 className="text-xl font-bold text-foreground">{selectedCitation.author}</h3>
                <p className="text-muted-foreground text-sm">{selectedCitation.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedCitation.date}</p>
              </div>
              <blockquote className="text-lg italic text-foreground text-center border-l-4 border-r-4 border-secondary px-4 py-2 mb-4">
                "{selectedCitation.quote}"
              </blockquote>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedCitation.fullText}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventsCitationsSection;