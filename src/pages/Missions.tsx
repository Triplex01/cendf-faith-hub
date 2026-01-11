import PageLayout from "@/components/PageLayout";
import { BookOpen, Shield, Users, Globe, Radio, FileText, Heart, GraduationCap, Church, Cross, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import basilique from "@/assets/basilique-notredame.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";

const missions = [
  {
    icon: Shield,
    title: "Défense de la Doctrine de la Foi",
    description: "La CENDF veille à la pureté et à l'intégrité de la doctrine catholique en Côte d'Ivoire. Elle examine les questions doctrinales, discerne les courants théologiques et protège les fidèles contre les erreurs et les dérives spirituelles.",
    details: [
      "Examen des questions doctrinales complexes",
      "Discernement théologique et pastoral",
      "Protection contre les sectes et fausses doctrines",
      "Promotion de l'enseignement authentique de l'Église"
    ],
    color: "from-primary to-amber-600"
  },
  {
    icon: BookOpen,
    title: "Enseignement et Formation Doctrinale",
    description: "Former le clergé, les religieux et les laïcs à une connaissance approfondie de la foi catholique à travers des sessions de formation, des séminaires théologiques et des publications doctrinales.",
    details: [
      "Formations théologiques pour le clergé",
      "Sessions doctrinales pour les catéchistes",
      "Publications et études théologiques",
      "Accompagnement des séminaristes"
    ],
    color: "from-blue-600 to-indigo-700"
  },
  {
    icon: Globe,
    title: "Dialogue Œcuménique et Interreligieux",
    description: "Promouvoir le dialogue avec les autres confessions chrétiennes et les religions présentes en Côte d'Ivoire, dans le respect de la vérité catholique et la recherche de l'unité.",
    details: [
      "Relations avec les autres Églises chrétiennes",
      "Dialogue avec l'Islam et les religions traditionnelles",
      "Promotion de la paix interreligieuse",
      "Collaboration pour le bien commun"
    ],
    color: "from-emerald-600 to-teal-700"
  },
  {
    icon: Radio,
    title: "Évangélisation par les Médias",
    description: "Utiliser les médias modernes pour diffuser la Parole de Dieu et l'enseignement de l'Église. La CENDF supervise les contenus doctrinaux diffusés par les radios catholiques et les plateformes numériques.",
    details: [
      "Supervision des radios catholiques",
      "Production de contenus doctrinaux",
      "Présence sur les réseaux sociaux",
      "Émissions télévisées et podcasts"
    ],
    color: "from-purple-600 to-violet-700"
  },
  {
    icon: FileText,
    title: "Publications et Archives Doctrinales",
    description: "Publier des documents officiels, des déclarations doctrinales et préserver les archives de l'Église pour la mémoire et la transmission de la foi aux générations futures.",
    details: [
      "Lettres pastorales et déclarations",
      "Documents de référence doctrinale",
      "Conservation des archives ecclésiales",
      "Édition de revues théologiques"
    ],
    color: "from-secondary to-red-700"
  },
  {
    icon: GraduationCap,
    title: "Accompagnement des Mouvements d'Église",
    description: "Guider et accompagner les mouvements d'action catholique et les communautés nouvelles pour s'assurer de leur fidélité à l'enseignement de l'Église.",
    details: [
      "Approbation des statuts des mouvements",
      "Formation des responsables",
      "Vérification de l'orthodoxie doctrinale",
      "Accompagnement spirituel"
    ],
    color: "from-orange-600 to-amber-700"
  }
];

const Missions = () => {
  return (
    <PageLayout title="Nos Missions" subtitle="Au service de l'Évangile et de la communauté chrétienne">

      {/* Introduction - Single Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Notre Vocation</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
                Gardienne de la Foi en Côte d'Ivoire
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                La <strong>Commission Épiscopale pour la Doctrine de la Foi (CENDF)</strong> est l'organe 
                de la Conférence Épiscopale de Côte d'Ivoire chargé de veiller à la pureté de 
                l'enseignement catholique et à la transmission fidèle de la foi.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                En communion avec le Magistère de l'Église universelle et sous la direction 
                des évêques de Côte d'Ivoire, la CENDF accompagne le peuple de Dieu dans 
                son cheminement de foi, l'éclairant sur les questions doctrinales et morales 
                de notre temps.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                  <Church className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-bold text-lg">15+</p>
                    <p className="text-sm text-muted-foreground">Diocèses accompagnés</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                  <Users className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="font-bold text-lg">1000+</p>
                    <p className="text-sm text-muted-foreground">Prêtres formés</p>
                  </div>
                </div>
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
                  alt="Réunion de la CENDF" 
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium italic">
                    "Gardez le dépôt de la foi qui vous a été confié"
                  </p>
                  <p className="text-primary text-sm mt-2">— 2 Timothée 1, 14</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/30 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Missions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Nos Axes d'Action</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4">
              Les Missions de la CENDF
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Six axes fondamentaux qui guident notre action pastorale au service de l'Église en Côte d'Ivoire
            </p>
          </motion.div>

          <div className="space-y-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`grid md:grid-cols-3 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Icon and Title Section */}
                  <div className={`bg-gradient-to-br ${mission.color} p-8 text-white flex flex-col justify-center`}>
                    <mission.icon className="w-16 h-16 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-white/80 text-sm">
                      Mission n°{index + 1} de la CENDF
                    </p>
                  </div>

                  {/* Description and Details */}
                  <div className="md:col-span-2 p-8">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {mission.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {mission.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/95 to-secondary/95 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Ensemble, portons la lumière du Christ et défendons la foi catholique 
              pour les générations présentes et futures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/contact">Nous Contacter</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/activites">Découvrir nos Activités</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Missions;