import { Radio, Headphones, Play, Pause, Volume2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import radioImage from "@/assets/radio-studio.jpg";

const podcasts = [
  {
    title: "La Foi au Quotidien",
    duration: "45 min",
    episode: "Épisode 24",
    description: "Comment vivre sa foi dans le monde moderne",
  },
  {
    title: "Méditations du Matin",
    duration: "15 min",
    episode: "Épisode 156",
    description: "Réflexion sur l'Évangile du jour",
  },
  {
    title: "Questions de Doctrine",
    duration: "60 min",
    episode: "Épisode 42",
    description: "Réponses aux questions sur la foi catholique",
  },
];

const RadioSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="radio" className="py-24 bg-deep-black text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Radio Player */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Radio & Podcasts
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Écoutez la <span className="text-gradient-gold">Parole</span>
            </h2>
            <p className="font-secondary text-lg text-primary-foreground/70 leading-relaxed mb-8">
              Notre radio diffuse 24h/24 des programmes spirituels, des enseignements doctrinaux 
              et de la musique sacrée. Retrouvez également nos podcasts pour approfondir votre foi.
            </p>

            {/* Live Radio Player */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-6 backdrop-blur-sm border border-primary/30 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-primary">EN DIRECT</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/60">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-20 h-1 bg-primary-foreground/20 rounded-full">
                    <div className="w-3/4 h-full bg-primary rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-primary-foreground" />
                  ) : (
                    <Play className="w-7 h-7 text-primary-foreground ml-1" />
                  )}
                </button>
                <div>
                  <h4 className="font-display font-bold text-lg">Radio CENDF</h4>
                  <p className="text-primary-foreground/60 text-sm">
                    Actuellement : Chapelet du Rosaire
                  </p>
                </div>
              </div>
            </div>

            {/* Podcast List */}
            <h3 className="font-display font-bold text-xl mb-4">Derniers Podcasts</h3>
            <div className="space-y-4">
              {podcasts.map((podcast, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 hover:border-primary/40 hover:bg-primary-foreground/10 transition-all cursor-pointer"
                >
                  <button className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-gradient-gold transition-all">
                    <Play className="w-5 h-5 text-primary group-hover:text-primary-foreground ml-0.5" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-primary">{podcast.episode}</span>
                      <span className="flex items-center gap-1 text-xs text-primary-foreground/50">
                        <Clock className="w-3 h-3" />
                        {podcast.duration}
                      </span>
                    </div>
                    <h4 className="font-medium group-hover:text-primary transition-colors">
                      {podcast.title}
                    </h4>
                    <p className="text-sm text-primary-foreground/60 line-clamp-1">
                      {podcast.description}
                    </p>
                  </div>
                  <Headphones className="w-5 h-5 text-primary-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>

            <Button variant="goldOutline" size="lg" className="mt-6 w-full">
              Voir tous les podcasts
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={radioImage}
                alt="Studio de Radio CENDF"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent" />
              <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur-sm rounded-full">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadioSection;
