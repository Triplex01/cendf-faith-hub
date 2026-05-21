import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import vaticanBenedictions from "@/assets/actu-vatican-benedictions.png";
import assisesCatechese from "@/assets/actu-assises-catechese.png";
import encycliqueLeonXIV from "@/assets/actu-encyclique-leon-xiv.png";
import evangeliserReseaux from "@/assets/actu-evangeliser-reseaux.png";

const staticArticles = [
  {
    id: 1,
    slug: "encyclique-leon-xiv-magnifica-humanitas",
    title: "1ère Encyclique du Pape Léon XIV : Magnifica Humanitas",
    excerpt: "Le Saint-Père publie sa première encyclique consacrée à l'attention portée à la personne humaine à l'ère de l'intelligence artificielle.",
    image: encycliqueLeonXIV,
    date: "25 mai 2026",
    category: "Magistère",
  },
  {
    id: 2,
    slug: "soiree-evangeliser-reseaux",
    title: "Soirée : Évangéliser par les Réseaux",
    excerpt: "Rencontre des missionnaires du numérique à Paris avec Mgr Rey, l'Abbé Raffray et les abbés de CREDO.",
    image: evangeliserReseaux,
    date: "28 mai 2026",
    category: "Événement",
  },
  {
    id: 3,
    slug: "lancement-assises-catechese-2026",
    title: "Lancement officiel des Assises Nationales de la Catéchèse",
    excerpt: "L'Église catholique en Côte d'Ivoire lance les Assises Nationales de la Catéchèse à la Paroisse Notre-Dame de l'Annonciation.",
    image: assisesCatechese,
    date: "17 mai 2026",
    category: "Événement",
  },
  {
    id: 4,
    slug: "vatican-benedictions-couples",
    title: "Le Vatican interdit les bénédictions officielles pour les couples homosexuels",
    excerpt: "Le Saint-Siège publie une lettre rappelant la doctrine de l'Église sur le mariage et les bénédictions officielles.",
    image: vaticanBenedictions,
    date: "10 mai 2026",
    category: "Actualité",
  },
];

const NewsSection = () => {
  return (
    <section id="actualites" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              <Calendar className="w-3 h-3 mr-1" />
              Actualités
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Dernières <span className="text-gradient-gold">Nouvelles</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Restez informés des événements et annonces de notre communauté
            </p>
          </div>
          <Link to="/actualites">
            <Button variant="outline" className="group">
              Toutes les actualités
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staticArticles.map((article) => (
            <Link
              key={article.id}
              to={`/actualites/${article.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
