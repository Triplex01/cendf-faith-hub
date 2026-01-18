import { Church, BookOpen, Users, Heart, ArrowRight, Cross, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import reunionEglise from "@/assets/reunion-eglise.jpg";

const objectives = [
  {
    icon: BookOpen,
    title: "Doctrine",
    description: "Garder et promouvoir l'intégrité de la doctrine catholique",
  },
  {
    icon: Users,
    title: "Formation",
    description: "Former les fidèles à une foi éclairée et vivante",
  },
  {
    icon: Heart,
    title: "Vigilance",
    description: "Protéger contre les dérives et déviations doctrinales",
  },
  {
    icon: Globe,
    title: "Mission",
    description: "Évangéliser dans le respect des cultures africaines",
  },
];

const AboutSection = () => {
  return (
    <section id="a-propos" className="py-24 bg-gradient-divine">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            À Propos
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            La <span className="text-primary">CEDF</span>
          </h2>
          <p className="font-secondary text-lg text-muted-foreground leading-relaxed">
            La Commission Épiscopale pour la Doctrine de la Foi représente, à l'échelle nationale, 
            le Dicastère pour la Doctrine de la Foi. Elle œuvre pour la promotion 
            et la défense de la foi catholique en Côte d'Ivoire, au service de l'Église universelle.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-burgundy rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={reunionEglise}
                alt="Réunion de la CEDF avec les évêques"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                  <Church className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display text-primary-foreground font-bold text-lg">
                    Conférence Épiscopale
                  </p>
                  <p className="text-primary-foreground/70 text-sm">
                    Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Notre Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                La CEDF, l'une des dix commissions de la Conférence des Évêques Catholiques de Côte d'Ivoire (CECCI),
                a pour mission principale de veiller à la pureté de la doctrine catholique 
                et de promouvoir une formation solide des fidèles.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dans un contexte marqué par l'émergence de nouvelles réalités, elle remplit une mission essentielle : 
                promouvoir et protéger le dépôt de la foi catholique, face aux dérives qui pourraient l'altérer.
              </p>
            </div>

            {/* Objectives Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {objectives.map((obj, index) => (
                <div
                  key={index}
                  className="group p-4 bg-card rounded-xl border border-border shadow-card hover:shadow-elegant hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <obj.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {obj.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/a-propos">
              <Button variant="burgundy" size="lg" className="gap-2">
                En savoir plus
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
