import PageLayout from "@/components/PageLayout";
import { BookOpen, Users, GraduationCap, Heart, Cross, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import teachingImage from "@/assets/teaching-priest.jpg";

const categories = [
  {
    icon: Cross,
    title: "Catéchèse",
    description: "Formation approfondie aux fondements de la foi catholique",
    count: 45,
  },
  {
    icon: BookOpen,
    title: "Doctrine Sociale",
    description: "L'enseignement de l'Église sur les questions sociales",
    count: 32,
  },
  {
    icon: Heart,
    title: "Vie Spirituelle",
    description: "Croître dans la prière et la vie intérieure",
    count: 58,
  },
  {
    icon: Church,
    title: "Liturgie",
    description: "Comprendre et vivre les célébrations de l'Église",
    count: 27,
  },
  {
    icon: Users,
    title: "Vie Familiale",
    description: "L'Église au service de la famille chrétienne",
    count: 39,
  },
  {
    icon: GraduationCap,
    title: "Formation Continue",
    description: "Approfondissement pour les catéchistes et animateurs",
    count: 21,
  },
];

const recentTeachings = [
  {
    title: "Le Carême : temps de conversion et de grâce",
    author: "Père Jean-Marie Kouassi",
    date: "15 Décembre 2025",
    duration: "45 min",
  },
  {
    title: "La miséricorde divine dans l'Évangile de Luc",
    author: "Père Aimé Brou",
    date: "10 Décembre 2025",
    duration: "1h 20min",
  },
  {
    title: "Marie, Mère de l'Église et notre Mère",
    author: "Sœur Marie-Claire",
    date: "5 Décembre 2025",
    duration: "55 min",
  },
];

const Enseignements = () => {
  return (
    <PageLayout 
      title="Enseignements" 
      subtitle="Nourrir votre foi par la Parole et la Doctrine"
      backgroundImage={teachingImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Categories Grid */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Catégories d'Enseignements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-secondary/30 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
                      <cat.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {cat.description}
                      </p>
                      <span className="text-xs font-medium text-secondary">
                        {cat.count} enseignements
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Teachings */}
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Derniers Enseignements
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {recentTeachings.map((teaching, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                      {teaching.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Par {teaching.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{teaching.date}</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                      {teaching.duration}
                    </span>
                  </div>
                  <Button variant="burgundy" size="sm">
                    Écouter
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Enseignements;
