import { useState, useRef, useEffect } from "react";
import { Play, Pause, X, Headphones, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import podcastEnseignant from "@/assets/podcast-enseignant.jpg";
import podcastCatholique from "@/assets/podcast-catholique.jpg";
import emissionEcclesia from "@/assets/emission-ecclesia.jpg";

interface Podcast {
  id: number;
  title: string;
  host: string;
  duration: string;
  date: string;
  image: string;
  description: string;
  audioUrl?: string;
  plays: number;
}

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Je deviens enseignant dans l'Enseignement Catholique",
    host: "Commission Éducation",
    duration: "35 min",
    date: "8 Janvier 2026",
    image: podcastEnseignant,
    description: "Découvrez le parcours pour devenir enseignant dans l'Enseignement Catholique de Côte d'Ivoire. Formation, vocation et mission au service de la jeunesse.",
    plays: 1542,
  },
  {
    id: 2,
    title: "Les Podcasts de l'Enseignement Catholique",
    host: "Radio Nationale Catholique",
    duration: "45 min",
    date: "5 Janvier 2026",
    image: podcastCatholique,
    description: "Série de podcasts sur la foi et l'éducation catholique. Des témoignages inspirants et des enseignements pratiques pour vivre sa foi au quotidien.",
    plays: 2341,
  },
  {
    id: 3,
    title: "Ecclesia Magazine - Actualité de l'Église",
    host: "Père Thomas Adjobi",
    duration: "55 min",
    date: "2 Janvier 2026",
    image: emissionEcclesia,
    description: "Magazine hebdomadaire sur l'actualité de l'Église catholique en Côte d'Ivoire et dans le monde. Interviews, reportages et analyses.",
    plays: 1876,
  },
];

interface PodcastSectionProps {
  variant?: "full" | "compact";
  showTitle?: boolean;
}

const PodcastSection = ({ variant = "full", showTitle = true }: PodcastSectionProps) => {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (podcast: Podcast) => {
    if (playingId === podcast.id) {
      // Toggle pause/play
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // Start new podcast
      setSelectedPodcast(podcast);
      setPlayingId(podcast.id);
      setIsPlaying(true);
    }
  };

  const handleClosePlayer = () => {
    audioRef.current?.pause();
    setSelectedPodcast(null);
    setPlayingId(null);
    setIsPlaying(false);
  };

  if (variant === "compact") {
    return (
      <div className="space-y-4">
        {podcasts.slice(0, 3).map((podcast) => (
          <div
            key={podcast.id}
            onClick={() => setSelectedPodcast(podcast)}
            className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <img 
                src={podcast.image} 
                alt={podcast.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                {podcast.title}
              </h4>
              <p className="text-xs text-muted-foreground">{podcast.host}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {podcast.duration}
              </div>
            </div>
          </div>
        ))}

        {/* Podcast Player Modal */}
        <PodcastPlayerModal 
          podcast={selectedPodcast}
          isOpen={!!selectedPodcast}
          onClose={handleClosePlayer}
          isPlaying={isPlaying}
          onTogglePlay={() => handlePlay(selectedPodcast!)}
        />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Podcasts
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Derniers <span className="text-primary">Podcasts</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Écoutez nos émissions et enseignements où que vous soyez
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {podcasts.map((podcast) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => setSelectedPodcast(podcast)}
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
                  <button 
                    className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(podcast);
                    }}
                  >
                    {playingId === podcast.id && isPlaying ? (
                      <Pause className="w-7 h-7 text-white" />
                    ) : (
                      <Play className="w-7 h-7 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Headphones className="w-3 h-3" />
                    Podcast
                  </span>
                </div>

                {/* Info at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">
                    {podcast.title}
                  </h3>
                  <p className="text-white/70 text-sm">{podcast.host}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {podcast.duration}
                  </span>
                  <span>{podcast.plays.toLocaleString()} écoutes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/radio">
            <Button variant="outline" className="gap-2">
              Voir tous les podcasts
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Podcast Player Modal */}
        <PodcastPlayerModal 
          podcast={selectedPodcast}
          isOpen={!!selectedPodcast}
          onClose={handleClosePlayer}
          isPlaying={isPlaying}
          onTogglePlay={() => handlePlay(selectedPodcast!)}
        />
      </div>
    </section>
  );
};

// Podcast Player Modal Component
interface PodcastPlayerModalProps {
  podcast: Podcast | null;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const PodcastPlayerModal = ({ podcast, isOpen, onClose, isPlaying, onTogglePlay }: PodcastPlayerModalProps) => {
  const [progress, setProgress] = useState(0);

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  if (!podcast) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Podcast Image */}
            <div className="relative aspect-square">
              <img 
                src={podcast.image} 
                alt={podcast.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Podcast info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full mb-3">
                  Podcast
                </span>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  {podcast.title}
                </h3>
                <p className="text-white/70 text-sm mb-1">{podcast.host}</p>
                <p className="text-white/50 text-xs">{podcast.date}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="p-6 bg-card">
              <p className="text-muted-foreground text-sm mb-4">
                {podcast.description}
              </p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{Math.floor(progress * 0.35)}:00</span>
                  <span>{podcast.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h8.5c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1z"/>
                  </svg>
                </button>

                <button 
                  onClick={onTogglePlay}
                  className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1" />
                  )}
                </button>

                <button className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/>
                  </svg>
                </button>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-4">
                {podcast.plays.toLocaleString()} écoutes
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PodcastSection;
