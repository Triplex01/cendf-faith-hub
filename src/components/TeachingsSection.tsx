import { BookOpen, Cross, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import teachingImage from "@/assets/teaching-priest.jpg";

const teachings = [
  {
    icon: BookOpen,
    title: "Catéchisme",
    description: "Approfondissez votre connaissance de la doctrine catholique à travers nos enseignements structurés.",
  },
  {
    icon: Cross,
    title: "Doctrine de la Foi",
    description: "Explorez les fondements de notre foi à travers les textes magistériels et les enseignements des Pères de l'Église.",
  },
  {
    icon: Heart,
    title: "Vie Spirituelle",
    description: "Nourrissez votre vie intérieure avec des méditations, prières et réflexions quotidiennes.",
  },
  {
    icon: Users,
    title: "Formation",
    description: "Participez à nos programmes de formation pour les catéchistes, animateurs et laïcs engagés.",
  },
];

const TeachingsSection = () => {
  return (
    <section id="enseignements" className="py-24 bg-gradient-divine">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Enseignements
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Grandir dans la <span className="text-primary">Foi</span>
          </h2>
          <p className="font-secondary text-lg text-muted-foreground leading-relaxed">
            Le CENDF met à votre disposition une riche bibliothèque d'enseignements pour approfondir 
            votre foi et votre compréhension de la doctrine catholique.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-gold rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={teachingImage}
                alt="Évêque africain enseignant les Écritures"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-secondary text-primary-foreground/90 italic text-lg">
                  "Allez donc, de toutes les nations faites des disciples..."
                </p>
                <p className="text-primary text-sm mt-2 font-medium">— Matthieu 28:19</p>
              </div>
            </div>
          </div>

          {/* Teaching Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {teachings.map((teaching, index) => (
              <Link
                to="/enseignements"
                key={index}
                className="group p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-elegant hover:border-primary/30 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <teaching.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {teaching.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {teaching.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachingsSection;
