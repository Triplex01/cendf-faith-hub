import PageLayout from "@/components/PageLayout";
import { Calendar, MapPin, Users, Clock, ArrowRight, Radio, BookOpen, Heart, Music, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import basilique from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import teachingPriest from "@/assets/teaching-priest.jpg";
import radioStudio from "@/assets/radio-studio.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

const activities = [
  {
    id: 1,
    title: "Messe Dominicale Radiodiffusée",
    category: "Liturgie",
    description: "Célébration eucharistique diffusée en direct sur Radio Espoir chaque dimanche, permettant aux fidèles de participer spirituellement.",
    image: interieurBasilique,
    schedule: "Dimanche 8h00",
    location: "Chapelle CENDF",
    participants: "500+ auditeurs",
    icon: Church,
    color: "bg-purple-500"
  },
  {
    id: 2,
    title: "École de Prière",
    category: "Formation",
    description: "Sessions hebdomadaires d'apprentissage de la prière contemplative, méditation biblique et lectio divina.",
    image: teachingPriest,
    schedule: "Mercredi 18h00",
    location: "Salle St Jean-Paul II",
    participants: "30 participants",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "Émissions Radio Espoir",
    category: "Évangélisation",
    description: "Production et animation d'émissions spirituelles, catéchétiques et musicales pour évangéliser par les ondes.",
    image: radioStudio,
    schedule: "Tous les jours",
    location: "Studio Radio Espoir",
    participants: "10 000+ auditeurs",
    icon: Radio,
    color: "bg-amber-500"
  },
  {
    id: 4,
    title: "Chorale Liturgique",
    category: "Musique Sacrée",
    description: "Animation des célébrations par des chants liturgiques et louanges, répétitions régulières et concerts spirituels.",
    image: reunionEglise,
    schedule: "Samedi 15h00",
    location: "Chapelle CENDF",
    participants: "25 choristes",
    icon: Music,
    color: "bg-rose-500"
  },
  {
    id: 5,
    title: "Visites aux Malades",
    category: "Charité",
    description: "Accompagnement spirituel et soutien moral aux personnes malades dans les hôpitaux et à domicile.",
    image: basilique,
    schedule: "Vendredi 10h00",
    location: "CHU & Domiciles",
    participants: "15 bénévoles",
    icon: Heart,
    color: "bg-red-500"
  },
  {
    id: 6,
    title: "Retraite Spirituelle Mensuelle",
    category: "Vie Spirituelle",
    description: "Journée de recueillement, conférences spirituelles, confession et adoration eucharistique.",
    image: interieurBasilique,
    schedule: "1er Samedi du mois",
    location: "Centre de Retraite",
    participants: "50 retraitants",
    icon: Church,
    color: "bg-indigo-500"
  }
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

const youtubeChannelUrl = "https://www.youtube.com";

const featuredYoutubeVideos: Array<{ id: string; title: string }> = [];

const activityPhotos = [reunionEglise, interieurBasilique, basilique, teachingPriest, radioStudio];

const Activites = () => {
  return (
    <PageLayout title="Nos Activités" subtitle="Une communauté vivante au service de la foi et de la fraternité">

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={reunionEglise} 
            alt="Activités communautaires" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-amber-500 text-white mb-4">Vie Communautaire</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Nos <span className="text-amber-400">Activités</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
              Une communauté vivante au service de la foi et de la fraternité
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              Notre vie communautaire
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
              Activités Régulières
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Participez à nos différentes activités pour grandir dans la foi et la communion fraternelle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <Badge className={`absolute top-4 left-4 ${activity.color} text-white`}>
                    {activity.category}
                  </Badge>
                  
                  {/* Icon */}
                  <div className={`absolute bottom-4 right-4 w-12 h-12 ${activity.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-amber-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-amber-500" />
                      <span>{activity.participants}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* YouTube + Photos */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <header className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Chaîne YouTube
                </h2>
                <p className="text-muted-foreground mt-2">
                  Retrouvez les activités enregistrées, enseignements et temps forts en vidéo.
                </p>
              </header>

              {featuredYoutubeVideos.length > 0 ? (
                <div className="grid gap-4">
                  {featuredYoutubeVideos.slice(0, 2).map((v) => (
                    <div key={v.id} className="rounded-xl overflow-hidden border border-border">
                      <div className="aspect-video bg-muted">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                          title={v.title}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-foreground">{v.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-6 text-center">
                  <p className="text-foreground font-medium">Aucune vidéo sélectionnée</p>
                  <p className="text-muted-foreground mt-1">
                    Ajoutez vos vidéos YouTube (IDs) dans cette page pour les mettre en avant.
                  </p>
                </div>
              )}

              <div className="mt-6">
                <Button asChild variant="secondary">
                  <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                    Ouvrir la chaîne YouTube
                  </a>
                </Button>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              <header className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Photos d’activités
                </h2>
                <p className="text-muted-foreground mt-2">
                  Moments de fraternité, prière et service au sein de la communauté.
                </p>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {activityPhotos.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative rounded-xl overflow-hidden border border-border bg-muted"
                  >
                    <img
                      src={src}
                      alt={`Photo d’activité CENDF ${i + 1}`}
                      className="w-full h-full object-cover aspect-square"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
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
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex flex-col items-center justify-center text-white shrink-0">
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
                    <ArrowRight className="w-5 h-5 text-amber-500" />
                  </motion.div>
                ))}
              </div>

              <Button asChild className="mt-8 bg-amber-600 hover:bg-amber-700">
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
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">
                    Participez à nos événements
                  </h3>
                  <p className="text-amber-200">
                    Rejoignez-nous pour vivre des moments de grâce et de communion fraternelle.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
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
            <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-8">
              Contactez-nous pour rejoindre l'une de nos activités ou proposer une nouvelle initiative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-amber-700 hover:bg-amber-50">
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
