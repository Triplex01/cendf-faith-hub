import PageLayout from "@/components/PageLayout";
import { Church, BookOpen, Users, Heart, Globe, Cross, Shield, Target, Award, Calendar, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

const missions = [
  {
    icon: Shield,
    title: "Garder la Foi",
    description: "Veiller à la pureté et à l'intégrité de la doctrine catholique transmise par les Apôtres et le Magistère de l'Église.",
  },
  {
    icon: BookOpen,
    title: "Enseigner",
    description: "Former les fidèles, catéchistes et agents pastoraux à une connaissance approfondie de la foi catholique.",
  },
  {
    icon: Globe,
    title: "Évangéliser",
    description: "Porter la Bonne Nouvelle du Christ à tous les peuples de Côte d'Ivoire dans le respect des cultures locales.",
  },
  {
    icon: Heart,
    title: "Accompagner",
    description: "Soutenir spirituellement les communautés chrétiennes dans leur chemin de foi et de sainteté.",
  },
];

const values = [
  { icon: Cross, label: "Fidélité au Christ" },
  { icon: Church, label: "Communion ecclésiale" },
  { icon: Users, label: "Service fraternel" },
  { icon: Target, label: "Excellence pastorale" },
];

const timeline = [
  {
    year: "1960",
    title: "Création de la Conférence Épiscopale",
    description: "Fondation de la CECCI après l'indépendance de la Côte d'Ivoire.",
  },
  {
    year: "1985",
    title: "Institution de la CENDF",
    description: "Création officielle de la Commission pour la Doctrine de la Foi.",
  },
  {
    year: "2000",
    title: "Jubilé et Renouveau",
    description: "Grande célébration et nouveaux programmes de formation.",
  },
  {
    year: "2015",
    title: "Modernisation",
    description: "Lancement des outils numériques et de la radio en ligne.",
  },
  {
    year: "2024",
    title: "Aujourd'hui",
    description: "Poursuite de la mission avec de nouveaux défis pastoraux.",
  },
];

const team = [
  {
    role: "Président",
    title: "Son Excellence Monseigneur",
    name: "Jean-Pierre Kutwa",
    diocese: "Archidiocèse d'Abidjan",
  },
  {
    role: "Secrétaire",
    title: "Père",
    name: "Thomas Adjobi",
    diocese: "Secrétariat de la CENDF",
  },
  {
    role: "Membre",
    title: "Monseigneur",
    name: "Paul-Siméon Ahouanan",
    diocese: "Archidiocèse de Bouaké",
  },
];

const APropos = () => {
  return (
    <PageLayout 
      title="À Propos de la CENDF" 
      subtitle="Commission Épiscopale Nationale pour la Doctrine de la Foi"
      backgroundImage={basiliqueYamoussoukro}
    >
      {/* Introduction Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Notre Identité
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Une Commission au Service de la <span className="text-primary">Foi</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                La Commission Épiscopale Nationale pour la Doctrine de la Foi (CENDF) est un organe 
                de la Conférence des Évêques Catholiques de Côte d'Ivoire (CECCI). Elle a pour mission 
                principale de veiller à l'intégrité de la doctrine catholique et de promouvoir une 
                formation solide des fidèles.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                En communion avec le Saint-Siège et sous la direction des évêques, la CENDF accompagne 
                les diocèses dans l'enseignement de la foi, la formation des catéchistes, la diffusion 
                des documents magistériels et la réponse aux questions doctrinales.
              </p>
              <div className="flex flex-wrap gap-4">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border"
                  >
                    <value.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{value.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-burgundy rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={reunionEglise}
                  alt="Réunion de la CENDF"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-20 bg-gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Nos Missions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Au Service de l'Église et des Fidèles
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              La CENDF œuvre dans quatre domaines fondamentaux pour le bien de l'Église en Côte d'Ivoire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((mission, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-elegant hover:border-primary/30 transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-burgundy flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-burgundy">
                  <mission.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {mission.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Notre Histoire
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Jalons de notre Parcours
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />
            
            {timeline.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background shadow-burgundy z-10" />
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}>
                  <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/30 transition-all">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-bold mb-3">
                      {event.year}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-soft-beige">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Notre Équipe
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Les Responsables de la CENDF
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-elegant transition-all text-center group"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-burgundy flex items-center justify-center mb-6 shadow-burgundy group-hover:scale-110 transition-transform">
                  <Users className="w-12 h-12 text-primary-foreground" />
                </div>
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium mb-3">
                  {member.role}
                </span>
                <p className="text-sm text-muted-foreground mb-1">{member.title}</p>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.diocese}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-deep-black text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Contactez la <span className="text-gradient-gold">CENDF</span>
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              Pour toute question doctrinale, demande de formation ou collaboration pastorale, 
              n'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">contact@cendf.ci</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+225 27 22 XX XX XX</span>
              </div>
            </div>
            <Link to="/contact">
              <Button variant="gold" size="lg">
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default APropos;
