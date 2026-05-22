import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import pelerinageImg from "@/assets/basilique-yamoussoukro.jpg";
import reunionImg from "@/assets/news-reunion-cedf.jpg";
import voeuxImg from "@/assets/voeux-2026.jpg";

const staticArticles = [
  {
    id: 1,
    slug: "pelerinage-yamoussoukro",
    title: "Pèlerinage à la Basilique de Yamoussoukro",
    excerpt: "Des milliers de fidèles ont participé au pèlerinage annuel à la Basilique Notre-Dame de la Paix de Yamoussoukro.",
    image: pelerinageImg,
    date: "15 janvier 2026",
    category: "Événement",
  },
  {
    id: 2,
    slug: "reunion-commission-janvier",
    title: "Réunion de la Commission Épiscopale",
    excerpt: "Les membres de la Commission se sont réunis pour planifier les activités de l'année 2026.",
    image: reunionImg,
    date: "10 janvier 2026",
    category: "Vie de la CEDF",
  },
  {
    id: 3,
    slug: "voeux-nouvel-an-2026",
    title: "Vœux du Nouvel An 2026",
    excerpt: "Que cette nouvelle année soit remplie de la grâce divine et de la paix du Christ.",
    image: voeuxImg,
    date: "1er janvier 2026",
    category: "Message",
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
