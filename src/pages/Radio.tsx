import PageLayout from "@/components/PageLayout";
import { Play, Pause, Headphones, Clock, Calendar, Radio as RadioIcon, MapPin, ArrowRight, Volume2, X, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, RadioStationSchema } from "@/components/StructuredData";
import radioImage from "@/assets/radio-studio.jpg";
import emissionEcclesia from "@/assets/emission-ecclesia.jpg";
import emissionRnc from "@/assets/emission-rnc.jpg";
import logoRadioEspoir from "@/assets/logo-radio-espoir.png";
import logoRnc from "@/assets/logo-rnc.png";
import logoRadioSanwi from "@/assets/logo-radio-sanwi.png";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";
import podcastEnseignant from "@/assets/podcast-enseignant.jpg";
import podcastCatholique from "@/assets/podcast-catholique.jpg";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EcclesiaTVPlayer from "@/components/EcclesiaTVPlayer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CatholicRadio {
  id: string;
  name: string;
  frequency: string;
  location: string;
  streamUrl: string;
  description: string;
  logo: string;
  website: string;
}

const catholicRadios: CatholicRadio[] = [
  {
    id: "espoir",
    name: "Radio Espoir",
    frequency: "102.8 FM",
    location: "Abidjan",
    streamUrl: "https://dc1.serverse.com/proxy/radioespoir/stream",
    description: "La radio catholique d'Abidjan, au cœur de la foi ivoirienne",
    logo: logoRadioEspoir,
    website: "https://www.radioespoir.ci/",
  },
  {
    id: "voix-evangile",
    name: "La Voix de l'Évangile",
    frequency: "102.5 FM",
    location: "Nationale",
    streamUrl: "http://84.16.232.202:7139/stream",
    description: "Radio Nationale Catholique de Côte d'Ivoire",
    logo: logoRnc,
    website: "http://rnc-ci.net/",
  },
  {
    id: "paix-sanwi",
    name: "Radio Paix Sanwi",
    frequency: "89.2 FM",
    location: "Aboisso",
    streamUrl: "https://dc1.serverse.com/proxy/rda/stream",
    description: "La voix de la paix dans la région du Sud-Comoé",
    logo: logoRadioSanwi,
    website: "http://www.radiopaixsanwi.ci/",
  },
];

const schedule = [
  { time: "06:00", program: "Prière du Matin", type: "Prière", radio: "Toutes" },
  { time: "08:00", program: "Ecclesia Magazine", type: "Magazine", radio: "La Voix de l'Évangile" },
  { time: "10:00", program: "Enseignement Biblique", type: "Formation", radio: "Radio Espoir" },
  { time: "12:00", program: "Angélus", type: "Prière", radio: "Toutes" },
  { time: "14:00", program: "Musique Sacrée", type: "Musical", radio: "Radio Paix Sanwi" },
  { time: "16:00", program: "Catéchèse Familiale", type: "Formation", radio: "Radio Espoir" },
  { time: "18:00", program: "Vêpres et Adoration", type: "Prière", radio: "Toutes" },
  { time: "20:00", program: "Débat Spirituel", type: "Talk-show", radio: "La Voix de l'Évangile" },
];

interface Emission {
  title: string;
  description: string;
  radio: string;
  schedule: string;
  image: string;
  fullDescription?: string;
}

const emissions: Emission[] = [
  {
    title: "Ecclesia Magazine",
    description: "Magazine d'actualité de l'Église catholique en Côte d'Ivoire",
    radio: "La Voix de l'Évangile",
    schedule: "Jeudi 8h-8h55",
    image: emissionEcclesia,
    fullDescription: "Ecclesia Magazine est le rendez-vous hebdomadaire de l'actualité de l'Église catholique en Côte d'Ivoire et dans le monde. Chaque semaine, découvrez les événements marquants, les interviews exclusives et les témoignages inspirants de notre communauté de foi.",
  },
  {
    title: "Préparons Ensemble Dimanche",
    description: "Préparation liturgique et spirituelle pour le dimanche",
    radio: "Radio Nationale Catholique",
    schedule: "Samedi 18h",
    image: emissionRnc,
    fullDescription: "Chaque samedi, préparez-vous spirituellement pour le dimanche avec nos prêtres et animateurs. Méditation de l'Évangile, chants liturgiques et enseignements pour vivre pleinement la messe dominicale.",
  },
  {
    title: "Questions de Doctrine",
    description: "Approfondissement de la foi avec la Commission Doctrinale",
    radio: "Radio Espoir",
    schedule: "Mercredi 20h",
    image: radioImage,
    fullDescription: "L'émission de référence pour approfondir votre connaissance de la foi catholique. En collaboration avec la Commission Épiscopale pour la Doctrine de la Foi, nos théologiens répondent à vos questions et expliquent les enseignements de l'Église.",
  },
];

interface Podcast {
  id: number;
  title: string;
  host: string;
  duration: string;
  date: string;
  plays: number;
  image: string;
  description: string;
}

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Je deviens enseignant dans l'Enseignement Catholique",
    host: "Commission Éducation",
    duration: "35 min",
    date: "8 Janvier 2026",
    plays: 1542,
    image: podcastEnseignant,
    description: "Découvrez le parcours pour devenir enseignant dans l'Enseignement Catholique de Côte d'Ivoire.",
  },
  {
    id: 2,
    title: "Les Podcasts de l'Enseignement Catholique",
    host: "Radio Nationale Catholique",
    duration: "45 min",
    date: "5 Janvier 2026",
    plays: 2341,
    image: podcastCatholique,
    description: "Série de podcasts sur la foi et l'éducation catholique.",
  },
  {
    id: 3,
    title: "Comprendre l'Eucharistie",
    host: "Père Marie-Joseph",
    duration: "1h 02min",
    date: "2 Janvier 2026",
    plays: 1876,
    image: emissionEcclesia,
    description: "Approfondissement de notre compréhension du sacrement de l'Eucharistie.",
  },
  {
    id: 4,
    title: "Les saints africains : témoins de la foi",
    host: "Sœur Bernadette",
    duration: "38 min",
    date: "28 Décembre 2025",
    plays: 987,
    image: radioImage,
    description: "Découvrez la vie et le témoignage des saints du continent africain.",
  },
];

const Radio = () => {
  const [playingRadio, setPlayingRadio] = useState<string | null>(null);
  const [loadingRadio, setLoadingRadio] = useState<string | null>(null);
  const [selectedEmission, setSelectedEmission] = useState<Emission | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleRadio = (radio: CatholicRadio) => {
    if (playingRadio === radio.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingRadio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      setLoadingRadio(radio.id);
      const audio = new Audio(radio.streamUrl);
      audio.volume = 0.8;
      
      audio.oncanplay = () => {
        setLoadingRadio(null);
        setPlayingRadio(radio.id);
      };
      
      audio.onerror = () => {
        setLoadingRadio(null);
        setPlayingRadio(null);
      };
      
      audio.play().catch(() => {
        setLoadingRadio(null);
      });
      
      audioRef.current = audio;
    }
  };

  // Simulate podcast progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPodcastPlaying && selectedPodcast) {
      interval = setInterval(() => {
        setPodcastProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPodcastPlaying, selectedPodcast]);

  const handlePodcastPlay = () => {
    setIsPodcastPlaying(!isPodcastPlaying);
  };

  const handleClosePodcast = () => {
    setSelectedPodcast(null);
    setIsPodcastPlaying(false);
    setPodcastProgress(0);
  };

  return (
    <>
      <SEO
        title="Radio & Podcasts Catholiques"
        description="Écoutez Radio Espoir 102.8 FM, La Voix de l'Évangile et Radio Paix Sanwi en direct. Podcasts, émissions spirituelles et enseignements catholiques en Côte d'Ivoire."
        keywords="Radio Espoir, radio catholique, podcasts chrétiens, émissions religieuses, Côte d'Ivoire, streaming radio, La Voix de l'Évangile, Radio Paix Sanwi"
        url="/radio"
      />
      <BreadcrumbSchema items={[
        { name: "Accueil", url: "/" },
        { name: "Radio & Podcasts", url: "/radio" }
      ]} />
      <RadioStationSchema />
      <PageLayout 
        title="Émissions & Radios" 
        subtitle="La foi à portée d'écoute"
        backgroundImage={radioImage}
      >
      {/* Section Ecclesia TV - En Direct */}
      <section className="py-16 bg-gradient-to-b from-deep-black to-[#1a1a2e] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              <Tv className="w-4 h-4" />
              Télévision en Direct
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Regardez <span className="text-gradient-gold">Ecclesia TV</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              La chaîne de télévision catholique de Côte d'Ivoire diffuse 24h/24 
              des programmes spirituels, des messes et des enseignements.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <EcclesiaTVPlayer />
          </div>
        </div>
      </section>

      {/* Section Radios en Direct avec Logos */}
      <section className="py-16 bg-deep-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Nos Partenaires
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Nos <span className="text-gradient-gold">Partenaires Médias</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Écoutez en direct les radios catholiques et découvrez Ecclesia TV. 
              Des programmes spirituels, des enseignements et de la musique sacrée 24h/24.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Ecclesia TV Card */}
            <a
              href="https://ecclesiatv.ci/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-2xl p-6 border-2 bg-gradient-to-br from-secondary/20 to-primary/10 border-secondary/40 hover:border-secondary transition-all duration-300 group"
            >
              {/* TV Logo */}
              <div className="block w-24 h-24 rounded-xl overflow-hidden bg-white mx-auto mb-4 group-hover:scale-105 transition-transform p-2">
                <img 
                  src={logoEcclesiaTv} 
                  alt="Logo Ecclesia TV"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TV Info */}
              <div className="text-center mb-4">
                <h3 className="font-display font-bold text-xl mb-1">Ecclesia TV</h3>
                <p className="text-secondary font-semibold">Chaîne TV</p>
                <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mt-1">
                  <Tv className="w-3 h-3" />
                  Nationale
                </div>
                <p className="text-gray-400 text-xs mt-2">La chaîne catholique de Côte d'Ivoire</p>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-xs font-bold">
                <Tv className="w-3 h-3" />
                TV
              </div>
            </a>

            {/* Radio Cards */}
            {catholicRadios.map((radio) => (
              <div
                key={radio.id}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
                  playingRadio === radio.id
                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                    : "bg-white/5 border-white/10 hover:border-primary/40"
                }`}
              >
                {/* Radio Logo */}
                <a 
                  href={radio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-24 h-24 rounded-xl overflow-hidden bg-white mx-auto mb-4 hover:scale-105 transition-transform"
                >
                  <img 
                    src={radio.logo} 
                    alt={`Logo ${radio.name}`}
                    className="w-full h-full object-contain p-2"
                  />
                </a>

                {/* Radio Info */}
                <div className="text-center mb-4">
                  <h3 className="font-display font-bold text-xl mb-1">{radio.name}</h3>
                  <p className="text-primary font-semibold">{radio.frequency}</p>
                  <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    {radio.location}
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{radio.description}</p>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => handleToggleRadio(radio)}
                  disabled={loadingRadio === radio.id}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    playingRadio === radio.id
                      ? "bg-primary text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {loadingRadio === radio.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connexion...
                    </>
                  ) : playingRadio === radio.id ? (
                    <>
                      <Pause className="w-5 h-5" />
                      En lecture
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 ml-0.5" />
                      Écouter
                    </>
                  )}
                </button>

                {/* Live Badge */}
                {playingRadio === radio.id && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-xs font-bold">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Émissions Phares avec images réelles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Émissions <span className="text-primary">Phares</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les émissions emblématiques de nos radios catholiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {emissions.map((emission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedEmission(emission)}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={emission.image}
                    alt={emission.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                      {emission.radio}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {emission.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{emission.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {emission.schedule}
                    </div>
                    <span className="text-primary text-sm font-medium">
                      En savoir plus →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Podcasts avec visuels et audio simulation */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              À réécouter
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Derniers <span className="text-primary">Podcasts</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Écoutez nos émissions et enseignements où que vous soyez
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {podcasts.map((podcast) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPodcast(podcast)}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={podcast.image} 
                    alt={podcast.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-secondary text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Headphones className="w-3 h-3" />
                      Podcast
                    </span>
                  </div>

                  {/* Info at bottom */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display font-bold text-white text-sm leading-tight line-clamp-2">
                      {podcast.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-muted-foreground text-xs mb-2">{podcast.host}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {podcast.duration}
                    </span>
                    <span>{podcast.plays.toLocaleString()} écoutes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3 justify-center">
              <Calendar className="w-6 h-6 text-secondary" />
              Programme du Jour
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 hover:bg-muted/50 transition-colors ${
                    index !== schedule.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-bold text-primary w-16">{item.time}</span>
                  <div className="flex-1">
                    <span className="font-medium text-foreground block">{item.program}</span>
                    <span className="text-xs text-muted-foreground">{item.radio}</span>
                  </div>
                  <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emission Detail Modal */}
      <Dialog open={!!selectedEmission} onOpenChange={() => setSelectedEmission(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="sr-only">{selectedEmission?.title}</DialogTitle>
          </DialogHeader>
          {selectedEmission && (
            <div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={selectedEmission.image} 
                  alt={selectedEmission.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                {selectedEmission.radio}
              </span>
              <h3 className="text-xl font-bold text-foreground mb-2">{selectedEmission.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                {selectedEmission.schedule}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {selectedEmission.fullDescription || selectedEmission.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Podcast Player Modal */}
      <AnimatePresence>
        {selectedPodcast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            onClick={handleClosePodcast}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card rounded-2xl overflow-hidden shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClosePodcast}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Podcast Image */}
              <div className="relative aspect-square">
                <img 
                  src={selectedPodcast.image} 
                  alt={selectedPodcast.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Podcast info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full mb-3">
                    Podcast
                  </span>
                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    {selectedPodcast.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-1">{selectedPodcast.host}</p>
                  <p className="text-white/50 text-xs">{selectedPodcast.date}</p>
                </div>
              </div>

              {/* Player Controls */}
              <div className="p-6 bg-card">
                <p className="text-muted-foreground text-sm mb-4">
                  {selectedPodcast.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${podcastProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{Math.floor(podcastProgress * 0.35)}:00</span>
                    <span>{selectedPodcast.duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-foreground rotate-180" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                    </svg>
                  </button>

                  <button 
                    onClick={handlePodcastPlay}
                    className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-lg"
                  >
                    {isPodcastPlaying ? (
                      <Pause className="w-7 h-7 text-white" />
                    ) : (
                      <Play className="w-7 h-7 text-white ml-1" />
                    )}
                  </button>

                  <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                    </svg>
                  </button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  {selectedPodcast.plays.toLocaleString()} écoutes
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
    </>
  );
};

export default Radio;
