import PageLayout from "@/components/PageLayout";
import { Play, Headphones, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import radioImage from "@/assets/radio-studio.jpg";
import RadioPlayer from "@/components/RadioPlayer";

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
  {
    title: "Évangélisation et culture africaine",
    host: "Père Jean-Marie",
    duration: "1h 15min",
    date: "8 Déc 2025",
    plays: 3210,
  },
];

const Radio = () => {
  return (
    <PageLayout 
      title="Radio & Podcasts" 
      subtitle="La foi à portée d'écoute, 24h/24 sur 102.8 FM"
      backgroundImage={radioImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Live Radio Player */}
          <div className="max-w-4xl mx-auto mb-20">
            <RadioPlayer variant="full" />
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
