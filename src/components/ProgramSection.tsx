import { Link } from "react-router-dom";
import { Clock, Calendar, Radio, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrograms } from "@/hooks/useWordPress";

const ProgramSection = () => {
  const { data: programs, isLoading } = usePrograms({ per_page: 4 });

  // Obtenir le jour actuel en français
  const getCurrentDay = () => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[new Date().getDay()];
  };

  // Filtrer les programmes du jour
  const todayPrograms = programs?.filter(program => {
    const dayOfWeek = program.acf?.day_of_week || '';
    const currentDay = getCurrentDay();
    return dayOfWeek.toLowerCase().includes(currentDay.toLowerCase()) || 
           dayOfWeek.toLowerCase().includes('tous les jours');
  }) || [];

  const displayPrograms = todayPrograms.length > 0 ? todayPrograms : programs?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{getCurrentDay()}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Programme du Jour
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les émissions prévues aujourd'hui sur Radio Espoir
          </p>
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPrograms.map((program, index) => (
              <div
                key={program.id}
                className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 relative overflow-hidden"
              >
                {/* Time Badge */}
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {program.acf?.time_slot || '00:00'}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {program.title.rendered}
                </h3>
                
                {program.acf?.host && (
                  <p className="text-muted-foreground text-sm mb-3">
                    Animé par {program.acf.host}
                  </p>
                )}

                {/* Type Badge */}
                {program.acf?.type && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                    <Radio className="w-3 h-3" />
                    {program.acf.type}
                  </span>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-burgundy opacity-0 group-hover:opacity-5 transition-opacity"></div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/radio">
            <Button variant="burgundy" size="lg" className="gap-2">
              Voir la grille complète
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
