import PageLayout from "@/components/PageLayout";
import { Calendar, MapPin, Users, Clock, ArrowRight, Radio, BookOpen, Heart, Music, Church, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import basilique from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import teachingPriest from "@/assets/teaching-priest.jpg";
import radioStudio from "@/assets/radio-studio.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import eventAbidjan2025 from "@/assets/event-abidjan-2025.jpg";
import eventSynode from "@/assets/event-synode.jpg";
import eventCongresPanafricain from "@/assets/event-congres-panafricain.jpg";
import eventJourneeScientifique from "@/assets/event-journee-scientifique.jpg";

const activities = [
  {
    id: 1,
    title: "Messe Dominicale Radiodiffusée",
    category: "Liturgie",
    description: "Célébration eucharistique diffusée en direct sur Radio Espoir chaque dimanche.",
    image: interieurBasilique,
    schedule: "Dimanche 8h00",
    location: "Chapelle CENDF",
    icon: Church,
    color: "from-purple-600 to-purple-700"
  },
  {
    id: 2,
    title: "École de Prière",
    category: "Formation",
    description: "Sessions hebdomadaires de prière contemplative et méditation biblique.",
    image: teachingPriest,
    schedule: "Mercredi 18h00",
    location: "Salle St Jean-Paul II",
    icon: BookOpen,
    color: "from-blue-600 to-blue-700"
  },
  {
    id: 3,
    title: "Émissions Radio",
    category: "Évangélisation",
    description: "Production d'émissions spirituelles et catéchétiques pour évangéliser.",
    image: radioStudio,
    schedule: "Tous les jours",
    location: "Studio Radio",
    icon: Radio,
    color: "from-amber-500 to-amber-600"
  },
  {
    id: 4,
    title: "Chorale Liturgique",
    category: "Musique Sacrée",
    description: "Animation des célébrations par des chants liturgiques et louanges.",
    image: reunionEglise,
    schedule: "Samedi 15h00",
    location: "Chapelle CENDF",
    icon: Music,
    color: "from-rose-600 to-rose-700"
  },
  {
    id: 5,
    title: "Visites aux Malades",
    category: "Charité",
    description: "Accompagnement spirituel aux personnes malades dans les hôpitaux.",
    image: basilique,
    schedule: "Vendredi 10h00",
    location: "CHU & Domiciles",
    icon: Heart,
    color: "from-red-600 to-red-700"
  },
  {
    id: 6,
    title: "Retraite Spirituelle",
    category: "Vie Spirituelle",
    description: "Journée de recueillement, confession et adoration eucharistique.",
    image: basiliqueYamoussoukro,
    schedule: "1er Samedi du mois",
    location: "Centre de Retraite",
    icon: Church,
    color: "from-indigo-600 to-indigo-700"
  }
];

// Photos de la galerie
const galleryPhotos = [
  { src: reunionEglise, title: "Réunion communautaire" },
  { src: interieurBasilique, title: "Célébration eucharistique" },
  { src: basilique, title: "Basilique Notre-Dame" },
  { src: teachingPriest, title: "Enseignement doctrinal" },
  { src: radioStudio, title: "Studios Radio Espoir" },
  { src: basiliqueYamoussoukro, title: "Basilique Yamoussoukro" },
  { src: eventAbidjan2025, title: "Jubilé 2025" },
  { src: eventSynode, title: "Conférence Synodalité" },
  { src: eventCongresPanafricain, title: "Congrès Panafricain" },
  { src: eventJourneeScientifique, title: "Journée Scientifique" },
];

const upcomingEvents = [
  {
    title: "Veillée de Prière pour la Paix",
    date: "15 Janvier 2025",
    time: "20h00 - 00h00"
  },
  {
    title: "Formation des Animateurs Radio",
    date: "22 Janvier 2025",
    time: "09h00 - 17h00"
  },
  {
    title: "Pèlerinage Marial",
    date: "11 Février 2025",
    time: "Journée complète"
  }
];

const Activites = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <PageLayout title="Nos Activités" subtitle="Une communauté vivante au service de la foi et de la fraternité">

      {/* Hero Section avec Carrousel de Photos */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Galerie Photos
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Moments de <span className="text-primary">Vie Communautaire</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez en images les temps forts de notre communauté catholique
            </p>
          </motion.div>

          {/* Carrousel de Photos */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryPhotos.map((photo, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedPhoto(index)}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-colors">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:transform md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                        <p className="text-white text-xs sm:text-sm font-medium text-center">{photo.title}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-12" />
          </Carousel>

          {/* Photo Modal */}
          {selectedPhoto !== null && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <button 
                className="absolute top-4 right-4 text-white text-xl p-2 hover:bg-white/10 rounded-full"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((selectedPhoto - 1 + galleryPhotos.length) % galleryPhotos.length);
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto((selectedPhoto + 1) % galleryPhotos.length);
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              <div className="max-w-4xl max-h-[80vh]">
                <img
                  src={galleryPhotos[selectedPhoto].src}
                  alt={galleryPhotos[selectedPhoto].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <p className="text-white text-center mt-4 text-lg font-medium">
                  {galleryPhotos[selectedPhoto].title}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Notre vie communautaire
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
              Activités <span className="text-secondary">Régulières</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Participez à nos activités pour grandir dans la foi et la communion fraternelle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Icon */}
                  <div className={`absolute bottom-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wide">
                    {activity.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-2 text-foreground group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  
                  {/* Details */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                À venir
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
                Événements Prochains
              </h2>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow flex items-center gap-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex flex-col items-center justify-center text-white shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </motion.div>
                ))}
              </div>

              <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
                <Link to="/actualites">
                  Voir toutes les actualités
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={interieurBasilique} 
                  alt="Événements" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    Participez à nos événements
                  </h3>
                  <p className="text-white/80">
                    Rejoignez-nous pour vivre des moments de grâce.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Envie de Participer ?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Contactez-nous pour rejoindre l'une de nos activités ou proposer une initiative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">Nous Contacter</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/missions">Retour aux Missions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Activites;