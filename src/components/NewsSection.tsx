import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { demoPosts, isDemoMode } from "@/config/demoData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Images de fallback locales - Images CEDF Côte d'Ivoire
import newsReunionCedf from "@/assets/news-reunion-cedf.jpg";
import newsGroupeCedf from "@/assets/news-groupe-cedf.jpg";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro-new.jpg";
import coupoleVatican from "@/assets/coupole-vatican.png";

const fallbackImages = [newsReunionCedf, newsGroupeCedf, basiliqueYamoussoukro, coupoleVatican];

// Récupérer les articles depuis Supabase
const fetchArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(4);
  
  if (error) throw error;
  return data || [];
};

const NewsSection = () => {
  // Récupérer les articles depuis Supabase
  const { data: dbArticles, isLoading: dbLoading } = useQuery({
    queryKey: ["articles-home"],
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000,
  });
  
  // Utiliser les données de démo si pas d'articles dans la DB
  const hasDbArticles = dbArticles && dbArticles.length > 0;
  const posts = hasDbArticles ? dbArticles : (isDemoMode() ? demoPosts : []);
  const isLoading = dbLoading;

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "d MMMM yyyy", { locale: fr });
    } catch {
      return dateStr;
    }
  };

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
        {isLoading && (
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
        {!isLoading && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((post: any, index: number) => {
              // Support both DB articles and demo posts
              const isDbArticle = 'slug' in post && !('title' in post && typeof post.title === 'object');
              const imageUrl = isDbArticle 
                ? (post.featured_image || fallbackImages[index % fallbackImages.length])
                : (post._embedded?.['wp:featuredmedia']?.[0]?.source_url || fallbackImages[index % fallbackImages.length]);
              const title = isDbArticle ? post.title : post.title?.rendered || "";
              const excerpt = isDbArticle ? (post.excerpt || "") : (post.excerpt?.rendered || "");
              const slug = post.slug;
              const date = isDbArticle ? post.published_at : post.date;
              
              return (
                <Link 
                  key={post.id} 
                  to={`/actualites/${slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={typeof title === 'string' ? title : ''}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImages[index % fallbackImages.length];
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{date ? formatDate(date) : "Récent"}</span>
                      </div>
                      {typeof title === 'string' ? (
                        <h3 className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                          {title}
                        </h3>
                      ) : (
                        <h3 
                          className="font-display font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2"
                          dangerouslySetInnerHTML={{ __html: title }}
                        />
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {typeof excerpt === 'string' ? excerpt : excerpt.replace(/<[^>]*>/g, '')}
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
