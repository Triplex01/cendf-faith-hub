import { Radio, Play, Pause, Volume2, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import radioImage from "@/assets/radio-studio.jpg";

interface CatholicRadio {
  id: string;
  name: string;
  frequency: string;
  location: string;
  streamUrl: string;
  description: string;
  logo?: string;
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

const podcasts = [
  {
    title: "La Foi au Quotidien",
    duration: "45 min",
    episode: "Épisode 24",
  },
  {
    title: "Méditations du Matin",
    duration: "15 min",
    episode: "Épisode 156",
  },
  {
    title: "Questions de Doctrine",
    duration: "60 min",
    episode: "Épisode 42",
  },
];

const RadiosSection = () => {
  const [playingRadio, setPlayingRadio] = useState<string | null>(null);
  const [loadingRadio, setLoadingRadio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleRadio = (radio: CatholicRadio) => {
    if (playingRadio === radio.id) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingRadio(null);
    } else {
      // Stop current if any
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Start new radio
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
    <section id="radios" className="py-24 bg-deep-black text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Émissions & Radios
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Les <span className="text-gradient-gold">Radios Catholiques</span>
            </h2>
            <p className="font-secondary text-lg text-primary-foreground/70 leading-relaxed mb-8">
              Découvrez les radios catholiques de Côte d'Ivoire. Chaque station diffuse 
              des programmes spirituels, des enseignements doctrinaux et de la musique sacrée 24h/24.
            </p>

            {/* Radio Cards */}
            <div className="space-y-4 mb-8">
              {catholicRadios.map((radio) => (
                <div
                  key={radio.id}
                  className={`relative rounded-xl p-4 border transition-all duration-300 ${
                    playingRadio === radio.id
                      ? "bg-primary/20 border-primary"
                      : "bg-primary-foreground/5 border-primary-foreground/10 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Play Button */}
                    <button
                      onClick={() => handleToggleRadio(radio)}
                      disabled={loadingRadio === radio.id}
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        playingRadio === radio.id
                          ? "bg-gradient-gold animate-pulse"
                          : "bg-gradient-burgundy hover:scale-105"
                      }`}
                    >
                      {loadingRadio === radio.id ? (
                        <div className="w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : playingRadio === radio.id ? (
                        <Pause className="w-6 h-6 text-primary-foreground" />
                      ) : (
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      )}
                    </button>

                    {/* Radio Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-display font-bold text-lg">{radio.name}</h4>
                        {playingRadio === radio.id && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-secondary rounded-full text-xs font-medium text-primary-foreground">
                            <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                            EN DIRECT
                          </span>
                        )}
                      </div>
                      <p className="text-primary-foreground/60 text-sm">
                        {radio.frequency} • {radio.location}
                      </p>
                      <p className="text-primary-foreground/50 text-xs mt-1">
                        {radio.description}
                      </p>
                    </div>

                    {/* Radio Icon */}
                    <div className="hidden sm:flex w-12 h-12 bg-primary/10 rounded-xl items-center justify-center">
                      <Radio className={`w-6 h-6 text-primary ${playingRadio === radio.id ? "animate-pulse" : ""}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Podcasts Preview */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-secondary" />
                Derniers Podcasts
              </h3>
              <div className="flex flex-wrap gap-3">
                {podcasts.map((podcast, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-2 bg-primary-foreground/5 rounded-full border border-primary-foreground/10 hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{podcast.title}</span>
                    <span className="text-xs text-primary-foreground/50">{podcast.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/radio">
              <Button variant="goldOutline" size="lg" className="gap-2">
                Voir toutes les émissions
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={radioImage}
                alt="Studios des radios catholiques"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent" />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-primary">3</p>
                    <p className="text-xs text-primary-foreground/70">Radios</p>
                  </div>
                  <div className="w-px h-12 bg-primary-foreground/20" />
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-secondary">24/7</p>
                    <p className="text-xs text-primary-foreground/70">Diffusion</p>
                  </div>
                  <div className="w-px h-12 bg-primary-foreground/20" />
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-primary">100+</p>
                    <p className="text-xs text-primary-foreground/70">Podcasts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadiosSection;
