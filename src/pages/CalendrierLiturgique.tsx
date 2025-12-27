import PageLayout from "@/components/PageLayout";
import { Calendar, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";

// Couleurs liturgiques
const liturgicalColors: { [key: string]: { bg: string; text: string; name: string } } = {
  vert: { bg: "bg-green-500", text: "text-green-700", name: "Vert - Temps ordinaire" },
  violet: { bg: "bg-purple-600", text: "text-purple-700", name: "Violet - Avent/Carême" },
  blanc: { bg: "bg-gray-100 border border-gray-300", text: "text-gray-700", name: "Blanc - Fêtes" },
  rouge: { bg: "bg-red-600", text: "text-red-700", name: "Rouge - Martyrs/Pentecôte" },
  rose: { bg: "bg-pink-400", text: "text-pink-700", name: "Rose - Gaudete/Laetare" },
};

// Données du calendrier liturgique
const liturgicalEvents = [
  { date: "2024-12-25", title: "Noël - Nativité du Seigneur", color: "blanc", type: "solennite" },
  { date: "2024-12-26", title: "Saint Étienne, premier martyr", color: "rouge", type: "fete" },
  { date: "2024-12-27", title: "Saint Jean, apôtre et évangéliste", color: "blanc", type: "fete" },
  { date: "2024-12-28", title: "Saints Innocents, martyrs", color: "rouge", type: "fete" },
  { date: "2024-12-29", title: "5e jour dans l'octave de Noël", color: "blanc", type: "ferie" },
  { date: "2024-12-30", title: "Sainte Famille", color: "blanc", type: "fete" },
  { date: "2024-12-31", title: "7e jour dans l'octave de Noël", color: "blanc", type: "ferie" },
  { date: "2025-01-01", title: "Sainte Marie, Mère de Dieu", color: "blanc", type: "solennite" },
  { date: "2025-01-06", title: "Épiphanie du Seigneur", color: "blanc", type: "solennite" },
];

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const CalendrierLiturgique = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, (_, i) => i);

  const getEventForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return liturgicalEvents.find(e => e.date === dateStr);
  };

  return (
    <PageLayout
      title="Calendrier liturgique"
      subtitle="Suivez le temps liturgique de l'Église catholique"
      backgroundImage={basiliqueYamoussoukro}
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {months[currentMonth]} {currentYear}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square" />
                  ))}
                  {days.map((day) => {
                    const event = getEventForDay(day);
                    return (
                      <div
                        key={day}
                        className={`aspect-square rounded-lg p-1 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                          event
                            ? "bg-primary/10 hover:bg-primary/20"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span className={`text-sm font-medium ${event ? "text-primary" : "text-foreground"}`}>
                          {day}
                        </span>
                        {event && (
                          <div className={`w-2 h-2 rounded-full mt-1 ${liturgicalColors[event.color]?.bg || "bg-gray-400"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Color Legend */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-medium text-foreground mb-4">Couleurs liturgiques</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(liturgicalColors).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${value.bg}`} />
                        <span className="text-sm text-muted-foreground">{value.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Today's Celebration */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Aujourd'hui
                </h2>
                <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wide">
                    27 décembre 2024
                  </span>
                  <h3 className="font-display font-bold text-foreground mt-1">
                    Saint Jean, apôtre et évangéliste
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fête - Couleur liturgique : Blanc
                  </p>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Prochaines célébrations
                </h2>
                <div className="space-y-3">
                  {liturgicalEvents.slice(0, 5).map((event, index) => (
                    <div key={index} className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-3 h-3 rounded-full ${liturgicalColors[event.color]?.bg || "bg-gray-400"}`} />
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground text-sm">{event.title}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Ressources
                </h2>
                <div className="space-y-2">
                  {[
                    "Lectures du jour",
                    "Saint du jour",
                    "Évangile du jour",
                    "Prière du matin",
                    "Prière du soir",
                  ].map((link) => (
                    <button
                      key={link}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CalendrierLiturgique;
