import PageLayout from "@/components/PageLayout";
import { Heart, Users, BookOpen, Church, Globe, HandHeart, Cross, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import basilique from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import teachingPriest from "@/assets/teaching-priest.jpg";

const missions = [
  {
    icon: BookOpen,
    title: "Évangélisation",
    description: "Annoncer la Bonne Nouvelle de Jésus-Christ à travers les médias, les enseignements et les rencontres communautaires.",
    color: "from-amber-500 to-yellow-600"
  },
  {
    icon: Heart,
    title: "Charité & Solidarité",
    description: "Soutenir les plus démunis, les malades et les personnes âgées à travers des actions caritatives concrètes.",
    color: "from-rose-500 to-red-600"
  },
  {
    icon: Users,
    title: "Formation Chrétienne",
    description: "Former les fidèles à une vie chrétienne authentique par des catéchèses, retraites et séminaires.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Church,
    title: "Vie Liturgique",
    description: "Célébrer les sacrements et animer la prière communautaire pour nourrir la foi des fidèles.",
    color: "from-purple-500 to-violet-600"
  },
  {
    icon: Globe,
    title: "Mission Médiatique",
    description: "Diffuser la parole de Dieu via Radio Espoir et les plateformes numériques pour toucher le plus grand nombre.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: HandHeart,
    title: "Accompagnement Spirituel",
    description: "Offrir un soutien spirituel personnalisé aux fidèles dans leur cheminement de foi.",
    color: "from-orange-500 to-amber-600"
  }
];

const communityValues = [
  { title: "Foi", description: "Vivre pleinement notre foi catholique" },
  { title: "Communion", description: "Être unis dans l'amour fraternel" },
  { title: "Service", description: "Servir l'Église et la société" },
  { title: "Témoignage", description: "Rayonner de la joie de l'Évangile" }
];

const Missions = () => {
  return (
    <PageLayout title="Nos Missions" subtitle="Au service de l'Évangile et de la communauté chrétienne">

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={basilique} 
            alt="Basilique Notre Dame" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Cross className="w-16 h-16 mx-auto mb-6 text-amber-400" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Nos <span className="text-amber-400">Missions</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 leading-relaxed">
              "Allez donc, de toutes les nations faites des disciples" - Matthieu 28, 19
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Community Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Notre Communauté</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
                La CENDF : Une Famille Unie dans la Foi
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                La Commission Épiscopale pour la Doctrine de la Foi (CENDF) est une institution catholique 
                dynamique dédiée à l'évangélisation et au service de l'Église en Côte d'Ivoire. 
                Fondée sur les valeurs de foi, de charité et de communion fraternelle, nous œuvrons 
                ensemble pour annoncer la Bonne Nouvelle du Christ.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                À travers Radio Espoir, nos retraites spirituelles et nos diverses activités 
                pastorales, nous touchons des milliers de fidèles chaque jour, les accompagnant 
                dans leur chemin de foi.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {communityValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
                  >
                    <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <h3 className="font-bold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={reunionEglise} 
                  alt="Réunion communautaire" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium">
                    "Là où deux ou trois sont réunis en mon nom, je suis au milieu d'eux."
                  </p>
                  <p className="text-amber-400 text-sm mt-2">- Matthieu 18, 20</p>
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-amber-500/30 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Ce que nous faisons</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
              Nos Axes Missionnaires
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Au service de l'Évangile et de la communauté chrétienne
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mission.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <mission.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{mission.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={teachingPriest} 
            alt="Enseignement" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-amber-800/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-amber-100">
              Ensemble, portons la lumière du Christ à tous ceux qui cherchent l'espérance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-amber-900 hover:bg-amber-50">
                <Link to="/activites">Découvrir nos Activités</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Nous Contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Missions;
