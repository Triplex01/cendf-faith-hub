import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Church, BookOpen, Users, Heart, Globe, Cross, Shield, Target, Award, Calendar, MapPin, Mail, Phone, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/StructuredData";
import { motion, AnimatePresence } from "framer-motion";
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
    year: "1542",
    title: "Origine du Dicastère",
    description: "Paul III fonde la Congrégation de l'Inquisition pour la sauvegarde de la foi.",
  },
  {
    year: "1965",
    title: "Réforme de Paul VI",
    description: "La Congrégation devient 'Congrégation pour la Doctrine de la Foi', axée sur la promotion.",
  },
  {
    year: "1967",
    title: "Appel aux Commissions Nationales",
    description: "Le Cardinal Ottaviani encourage la création de Commissions doctrinales nationales.",
  },
  {
    year: "2011",
    title: "Dynamisation en Côte d'Ivoire",
    description: "Mgr Alain-Clément Amiézi, évêque d'Odienné, relance la mission de la Commission.",
  },
  {
    year: "2022",
    title: "Ère du Dicastère",
    description: "La Congrégation devient officiellement 'Dicastère pour la Doctrine de la Foi'.",
  },
  {
    year: "2024",
    title: "Nouveau Dynamisme",
    description: "Sous Mgr Beby Gaspard, président de la Commission, renforcement de la structure et des actions.",
  },
];

// Organigramme data structure
const organigramme = {
  president: {
    id: "president",
    role: "Président de la Commission",
    title: "Son Excellence Monseigneur",
    name: "Beby Gaspard",
    diocese: "Commission Doctrine de la Foi et Catéchèse",
    color: "from-primary to-amber-600",
    icon: Church,
  },
  secretaire: {
    id: "secretaire",
    role: "Secrétaire Exécutif",
    title: "Révérend Père",
    name: "Benjamin K. Koné",
    diocese: "Commission pour la Doctrine de la Foi",
    color: "from-secondary to-red-700",
    icon: BookOpen,
  },
  departments: [
    {
      id: "dept-formation",
      role: "Département Formation",
      title: "Responsable",
      name: "Formation Doctrinale",
      diocese: "Séminaires et formations continues",
      color: "from-blue-600 to-indigo-700",
      icon: BookOpen,
      subDepts: [
        { name: "Formation du Clergé", desc: "Séminaires théologiques" },
        { name: "Formation des Catéchistes", desc: "Sessions doctrinales" },
      ]
    },
    {
      id: "dept-medias",
      role: "Département Médias",
      title: "Responsable",
      name: "Communication & Médias",
      diocese: "Radio, TV et plateformes numériques",
      color: "from-purple-600 to-violet-700",
      icon: Globe,
      subDepts: [
        { name: "Radio Espoir", desc: "Diffusion doctrinale" },
        { name: "Réseaux Sociaux", desc: "Présence numérique" },
      ]
    },
    {
      id: "dept-publications",
      role: "Département Publications",
      title: "Responsable",
      name: "Éditions & Archives",
      diocese: "Documents officiels et archives",
      color: "from-emerald-600 to-teal-700",
      icon: Shield,
      subDepts: [
        { name: "Magazine CREDO", desc: "Publication trimestrielle" },
        { name: "Archives", desc: "Conservation documentaire" },
      ]
    },
    {
      id: "dept-consulteurs",
      role: "Consulteurs Théologiques",
      title: "Équipe de",
      name: "Théologiens et Experts",
      diocese: "Secrétariat Technique et Scientifique",
      color: "from-orange-600 to-amber-700",
      icon: Users,
      subDepts: [
        { name: "Experts Dogmatiques", desc: "Analyse doctrinale" },
        { name: "Experts Moraux", desc: "Questions éthiques" },
      ]
    },
  ]
};

const objectives = [
  "Structurer et organiser la Commission",
  "Assurer la formation et la sensibilisation du clergé et des fidèles",
  "Défendre et promouvoir la doctrine catholique face aux défis actuels",
  "Développer la présence médiatique et numérique de la Commission",
  "Renforcer les relations entre l'Église et les autorités politiques, civiles et religieuses",
];

// Organigramme Node Component
const OrgNode = ({ 
  data, 
  isExpanded, 
  onToggle, 
  hasChildren = false,
  level = 0 
}: { 
  data: typeof organigramme.president & { subDepts?: { name: string; desc: string }[] }; 
  isExpanded?: boolean; 
  onToggle?: () => void;
  hasChildren?: boolean;
  level?: number;
}) => {
  const IconComponent = data.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: level * 0.1 }}
      className={`relative group ${level === 0 ? 'z-20' : 'z-10'}`}
    >
      <div
        onClick={onToggle}
        className={`
          relative overflow-hidden rounded-2xl p-6 
          bg-gradient-to-br ${data.color}
          shadow-lg hover:shadow-2xl transition-all duration-500
          ${hasChildren ? 'cursor-pointer' : ''}
          ${level === 0 ? 'ring-4 ring-primary/30' : ''}
          transform hover:scale-[1.02]
        `}
      >
        {/* Sparkle effect */}
        <div className="absolute top-2 right-2 opacity-50">
          <Sparkles className="w-5 h-5 text-white/50" />
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative z-10 text-center text-white">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <IconComponent className="w-8 h-8" />
          </div>
          
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2">
            {data.role}
          </span>
          
          <p className="text-white/80 text-sm mb-1">{data.title}</p>
          <h3 className="font-display text-xl font-bold mb-2">{data.name}</h3>
          <p className="text-white/70 text-sm">{data.diocese}</p>
          
          {hasChildren && (
            <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
              <span className="text-xs">Voir les sous-départements</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Sub departments */}
      <AnimatePresence>
        {isExpanded && data.subDepts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2"
          >
            {data.subDepts.map((sub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-elegant transition-all"
              >
                <h4 className="font-semibold text-foreground text-sm">{sub.name}</h4>
                <p className="text-muted-foreground text-xs">{sub.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const APropos = () => {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  const toggleDept = (id: string) => {
    setExpandedDept(expandedDept === id ? null : id);
  };

  return (
    <PageLayout 
      title="À Propos de la CEDF" 
      subtitle="Commission Épiscopale pour la Doctrine de la Foi de Côte d'Ivoire"
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
                La <strong>Commission Épiscopale pour la Doctrine de la Foi (CEDF)</strong> est l'une des dix 
                commissions de la Conférence des Évêques Catholiques de Côte d'Ivoire (CECCI). Elle représente, 
                à l'échelle nationale, le Dicastère pour la Doctrine de la Foi du Vatican.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dans un contexte ecclésial en mutation, marqué par l'émergence de nouvelles réalités qui interpellent 
                la conscience du peuple de Dieu, la CEDF remplit une mission essentielle : <strong>promouvoir et 
                protéger le dépôt de la foi catholique</strong>, face aux dérives et déviations qui pourraient l'altérer.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Son travail repose sur la Parole de Dieu, la Tradition et le Magistère, avec comme fondement le dogme, 
                qui oriente la théologie, la morale, la spiritualité, l'évangélisation et la liturgie.
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
                  alt="Réunion de la CEDF"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-burgundy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Notre Vision
            </h2>
            <p className="text-xl leading-relaxed opacity-90 italic">
              "Une Église ancrée dans la vérité et rayonnante dans le monde"
            </p>
            <p className="mt-4 opacity-80">
              La CEDF aspire à une Église catholique en Côte d'Ivoire qui soit un phare de vérité et de sainteté, 
              influençant positivement la société.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Nos Objectifs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Les 5 Objectifs Stratégiques
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-elegant transition-all"
              >
                <div className="w-10 h-10 bg-gradient-burgundy rounded-full flex items-center justify-center flex-shrink-0 shadow-burgundy">
                  <span className="text-primary-foreground font-bold">{index + 1}</span>
                </div>
                <p className="text-foreground font-medium pt-2">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Nos Missions
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Au Service de l'Église et des Fidèles
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              La CEDF œuvre dans quatre domaines fondamentaux pour le bien de l'Église en Côte d'Ivoire.
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
      <section className="py-20 bg-soft-beige">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Notre Histoire
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Évolution Historique
            </h2>
            <p className="text-muted-foreground">
              Du Dicastère pour la Doctrine de la Foi à la Commission Épiscopale Nationale
            </p>
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

      {/* Interactive Organigramme Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Notre Structure
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Organigramme
            </h2>
            <p className="text-muted-foreground">
              Découvrez la structure organisationnelle de la Commission Épiscopale pour la Doctrine de la Foi
            </p>
          </div>

          {/* Organigramme Tree */}
          <div className="max-w-6xl mx-auto">
            {/* President - Top Level */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="w-full max-w-md">
                <OrgNode data={organigramme.president} level={0} />
              </div>
            </motion.div>

            {/* Connector line from President */}
            <div className="flex justify-center mb-8">
              <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-secondary" />
            </div>

            {/* Secretary - Second Level */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="w-full max-w-md">
                <OrgNode data={organigramme.secretaire} level={1} />
              </div>
            </motion.div>

            {/* Connector lines to departments */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-4xl">
                <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-secondary to-primary" />
                <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary" />
                {/* Vertical lines to each department */}
                <div className="flex justify-between px-[12.5%] pt-8">
                  <div className="w-0.5 h-8 bg-primary" />
                  <div className="w-0.5 h-8 bg-primary" />
                  <div className="w-0.5 h-8 bg-primary" />
                  <div className="w-0.5 h-8 bg-primary" />
                </div>
              </div>
            </div>

            {/* Departments - Third Level */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {organigramme.departments.map((dept) => (
                <OrgNode
                  key={dept.id}
                  data={dept}
                  level={2}
                  hasChildren={true}
                  isExpanded={expandedDept === dept.id}
                  onToggle={() => toggleDept(dept.id)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-deep-black text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Contactez la <span className="text-gradient-gold">CEDF</span>
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
                <span className="text-sm">contact@cedf-ci.org</span>
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
