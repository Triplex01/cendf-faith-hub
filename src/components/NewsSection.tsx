import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePosts } from "@/hooks/useWordPress";
import { demoPosts, isDemoMode } from "@/config/demoData";
import { getFeaturedImage, formatWPDate, stripHtml } from "@/hooks/useWordPress";

const NewsSection = () => {
  const { data: wpPosts, isLoading } = usePosts({ per_page: 4 });
  
  // Utiliser les données de démo si WordPress n'est pas configuré
  const posts = isDemoMode() ? demoPosts : (wpPosts || []);

  return (
    <section id="actualites" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Loading State */}
        {isLoading && !isDemoMode() && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* News Grid */}
        {posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((post) => {
              const imageUrl = getFeaturedImage(post);
              const excerpt = stripHtml(post.excerpt?.rendered || "");
              
              return (
                <Link 
                  key={post.id} 
                  to={`/actualites/${post.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={stripHtml(post.title.rendered)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-primary/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{formatWPDate(post.date, "fr-FR")}</span>
                      </div>
                      <h3 
                        className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune actualité pour le moment</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
