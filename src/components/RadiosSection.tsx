import { Radio, Play, Pause, Headphones, ArrowRight, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import logoRadioEspoir from "@/assets/logo-radio-espoir.png";
import logoRnc from "@/assets/logo-rnc.png";
import logoRadioSanwi from "@/assets/logo-radio-sanwi.png";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";
import EcclesiaTVPlayer from "@/components/EcclesiaTVPlayer";

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
            <span className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <Tv className="w-4 h-4" />
              Partenaires Médias
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Nos <span className="text-gradient-gold">Partenaires Médias</span>
            </h2>
            <p className="font-secondary text-lg text-primary-foreground/70 leading-relaxed mb-8">
              La foi à portée d'écoute
            </p>

            {/* Radio Cards with Logos */}
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
                    {/* Radio Logo */}
                    <a 
                      href={radio.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    >
                      <img 
                        src={radio.logo} 
                        alt={`Logo ${radio.name}`}
                        className="w-14 h-14 object-contain"
                      />
                    </a>

                    {/* Radio Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                      <p className="text-primary-foreground/50 text-xs mt-1 line-clamp-1">
                        {radio.description}
                      </p>
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={() => handleToggleRadio(radio)}
                      disabled={loadingRadio === radio.id}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all shrink-0 ${
                        playingRadio === radio.id
                          ? "bg-gradient-gold animate-pulse"
                          : "bg-gradient-burgundy hover:scale-105"
                      }`}
                    >
                      {loadingRadio === radio.id ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      ) : playingRadio === radio.id ? (
                        <Pause className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <Play className="w-5 h-5 text-primary-foreground ml-1" />
                      )}
                    </button>
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

          {/* Ecclesia TV Player */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl opacity-30 blur-xl hidden sm:block" />
            <div className="relative">
              <EcclesiaTVPlayer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadiosSection;