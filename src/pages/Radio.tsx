import PageLayout from "@/components/PageLayout";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LoadingSpinner, ErrorMessage } from "@/components/LoadingStates";
import { Radio as RadioIcon, Play, Pause, Volume2, Headphones, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRadioPrograms } from "@/hooks/useRadioPrograms";
import radioImage from "@/assets/radio-studio.jpg";

const schedule = [
  { time: "06:00", program: "Prière du Matin", type: "En direct" },
  { time: "08:00", program: "Les Échos de la Foi", type: "Magazine" },
  { time: "10:00", program: "Enseignement Biblique", type: "Formation" },
  { time: "12:00", program: "Angélus", type: "Prière" },
  { time: "14:00", program: "Musique Sacrée", type: "Musical" },
  { time: "16:00", program: "Catéchèse Familiale", type: "Formation" },
  { time: "18:00", program: "Vêpres et Adoration", type: "Prière" },
  { time: "20:00", program: "Débat Spirituel", type: "Talk-show" },
];

const Radio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Récupérer les programmes radio depuis WordPress via GraphQL
  const { programs, loading, error } = useRadioPrograms({ first: 10 });

  // Programme en cours (on peut le récupérer du premier programme ou définir une logique)
  const currentProgram = programs.length > 0 ? programs[0] : null;

  return (
    <PageLayout 
      title="Radio & Podcasts" 
      subtitle="La foi à portée d'écoute, 24h/24"
      backgroundImage={radioImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Live Radio Player */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-primary to-primary-glow rounded-2xl p-8 shadow-elegant text-primary-foreground">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider">En Direct</span>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-24 h-24 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-all group"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-primary-foreground group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-10 h-10 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display text-3xl font-bold mb-2">Radio CENDF</h2>
                  {currentProgram ? (
                    <>
                      <p className="text-primary-foreground/80 text-lg mb-1">
                        Programme en cours : <strong>{currentProgram.title}</strong>
                      </p>
                      <p className="text-primary-foreground/60 text-sm">
                        {currentProgram.excerpt?.replace(/<[^>]*>/g, '').trim() || 'Émission en direct'}
                      </p>
                    </>
                  ) : (
                    <p className="text-primary-foreground/80 text-lg">
                      Émission en direct
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-full px-6 py-3">
                  <Volume2 className="w-5 h-5" />
                  <div className="w-24 h-2 bg-primary-foreground/30 rounded-full">
                    <div className="w-3/4 h-full bg-secondary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule and Podcasts */}
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
                      <span className="font-medium text-foreground">{item.program}</span>
                    </div>
                    <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Podcasts - GraphQL Data */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Headphones className="w-6 h-6 text-secondary" />
                Programmes Récents
              </h2>
              
              {/* Loading State */}
              {loading && <LoadingSpinner className="py-12" />}
              
              {/* Error State */}
              {error && (
                <ErrorMessage 
                  message="Impossible de charger les programmes."
                  onRetry={() => window.location.reload()}
                />
              )}
              
              {/* Programs List */}
              {!loading && !error && (
                <>
                  <div className="space-y-4">
                    {programs.slice(0, 5).map((program) => {
                      const cleanExcerpt = program.excerpt?.replace(/<[^>]*>/g, '').trim() || '';
                      
                      return (
                        <div
                          key={program.id}
                          className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            <button className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-gradient-burgundy transition-all flex-shrink-0">
                              <Play className="w-5 h-5 text-primary group-hover:text-primary-foreground ml-0.5" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors truncate">
                                {program.title}
                              </h3>
                              {cleanExcerpt && (
                                <p className="text-muted-foreground text-sm line-clamp-2">
                                  {cleanExcerpt}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Voir tous les programmes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Radio;
