import PageLayout from "@/components/PageLayout";
import { Play, Pause, Headphones, Clock, Calendar, Radio as RadioIcon, MapPin, ArrowRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import radioImage from "@/assets/radio-studio.jpg";
import emissionEcclesia from "@/assets/emission-ecclesia.jpg";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

interface CatholicRadio {
  id: string;
  name: string;
  frequency: string;
  location: string;
  streamUrl: string;
  description: string;
}

const catholicRadios: CatholicRadio[] = [
  {
    id: "espoir",
    name: "Radio Espoir",
    frequency: "102.8 FM",
    location: "Abidjan",
    streamUrl: "https://dc1.serverse.com/proxy/radioespoir/stream",
    description: "La radio catholique d'Abidjan, au cœur de la foi ivoirienne",
  },
  {
    id: "voix-evangile",
    name: "La Voix de l'Évangile",
    frequency: "102.5 FM",
    location: "Nationale",
    streamUrl: "http://84.16.232.202:7139/stream",
    description: "Radio Nationale Catholique de Côte d'Ivoire",
  },
  {
    id: "paix-sanwi",
    name: "Radio Paix Sanwi",
    frequency: "89.2 FM",
    location: "Aboisso",
    streamUrl: "https://dc1.serverse.com/proxy/rda/stream",
    description: "La voix de la paix dans la région du Sud-Comoé",
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

const emissions = [
  {
    title: "Ecclesia Magazine",
    description: "Magazine d'actualité de l'Église catholique en Côte d'Ivoire",
    radio: "La Voix de l'Évangile",
    schedule: "Jeudi 8h-8h55",
    image: emissionEcclesia,
  },
  {
    title: "Les Échos de la Foi",
    description: "Réflexions et enseignements sur la vie chrétienne au quotidien",
    radio: "Radio Espoir",
    schedule: "Lundi au Vendredi 8h",
    image: radioImage,
  },
  {
    title: "Questions de Doctrine",
    description: "Approfondissement de la foi avec la Commission Doctrinale",
    radio: "Radio Espoir",
    schedule: "Mercredi 20h",
    image: radioImage,
  },
];

const podcasts = [
  {
    title: "La prière contemplative : un chemin vers Dieu",
    host: "Père Thomas Adjobi",
    duration: "45 min",
    date: "18 Déc 2025",
    plays: 1234,
  },
  {
    title: "Comprendre l'Eucharistie",
    host: "Père Marie-Joseph",
    duration: "1h 02min",
    date: "15 Déc 2025",
    plays: 2341,
  },
  {
    title: "Les saints africains : témoins de la foi",
    host: "Sœur Bernadette",
    duration: "38 min",
    date: "12 Déc 2025",
    plays: 987,
  },
  {
    title: "Le pardon dans la vie chrétienne",
    host: "Père Aimé Brou",
    duration: "52 min",
    date: "10 Déc 2025",
    plays: 1567,
  },
];

const Radio = () => {
  const [playingRadio, setPlayingRadio] = useState<string | null>(null);
  const [loadingRadio, setLoadingRadio] = useState<string | null>(null);
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

  return (
    <PageLayout 
      title="Émissions & Radios" 
      subtitle="Les radios catholiques de Côte d'Ivoire - La foi à portée d'écoute"
      backgroundImage={radioImage}
    >
      {/* Section Radios en Direct */}
      <section className="py-16 bg-deep-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              En Direct
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Les <span className="text-gradient-gold">Radios Catholiques</span> de Côte d'Ivoire
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Écoutez en direct les radios catholiques. Chaque station diffuse des programmes 
              spirituels, des enseignements et de la musique sacrée 24h/24.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {catholicRadios.map((radio) => (
              <div
                key={radio.id}
                className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
                  playingRadio === radio.id
                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                    : "bg-white/5 border-white/10 hover:border-primary/40"
                }`}
              >
                {/* Radio Icon */}
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  playingRadio === radio.id ? "bg-gradient-gold" : "bg-gradient-burgundy"
                }`}>
                  <RadioIcon className={`w-8 h-8 text-white ${playingRadio === radio.id ? "animate-pulse" : ""}`} />
                </div>

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

      {/* Section Émissions */}
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
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={emission.image}
                    alt={emission.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-semibold">{emission.radio}</span>
                  <h3 className="font-display font-bold text-lg text-foreground mt-1 mb-2">
                    {emission.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{emission.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {emission.schedule}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule and Podcasts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Schedule */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
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

            {/* Podcasts */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Headphones className="w-6 h-6 text-secondary" />
                Podcasts Récents
              </h2>
              <div className="space-y-4">
                {podcasts.map((podcast, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <button className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-gradient-burgundy transition-all flex-shrink-0">
                        <Play className="w-5 h-5 text-primary group-hover:text-primary-foreground ml-0.5" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors truncate">
                          {podcast.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          Par {podcast.host}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {podcast.duration}
                          </span>
                          <span>{podcast.date}</span>
                          <span>{podcast.plays.toLocaleString()} écoutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                Voir tous les podcasts
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Radio;
