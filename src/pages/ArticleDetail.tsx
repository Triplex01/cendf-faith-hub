import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Calendar, User, ArrowLeft, Share2, Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import basiliqueRome from "@/assets/basilique-rome.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";

// Images de fallback pour les articles
const fallbackImages = [basiliqueYamoussoukro, reunionEglise, interieurBasilique, basiliqueNotredame, basiliqueRome];

// Fetch article by slug from Supabase
const fetchArticle = async (slug: string) => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  
  if (error) throw error;
  return data;
};

// Fetch all published articles for navigation
const fetchAllArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, featured_image, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug!),
    enabled: !!slug,
  });

  const { data: allArticles = [] } = useQuery({
    queryKey: ['articles-all'],
    queryFn: fetchAllArticles,
  });

  // Find current index for navigation
  const currentIndex = allArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1 
    ? allArticles[currentIndex + 1] 
    : null;

  // Related articles (excluding current)
  const relatedArticles = allArticles
    .filter(a => a.slug !== slug)
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "d MMMM yyyy", { locale: fr });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Chargement..." subtitle="Veuillez patienter">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-96 bg-muted rounded-2xl"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  if (error || !article) {
    return (
      <PageLayout title="Article non trouvé" subtitle="Cet article n'existe pas ou a été supprimé.">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Link to="/actualites">
              <Button variant="default" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const featuredImage = article.featured_image || fallbackImages[currentIndex % fallbackImages.length];

  return (
    <PageLayout title={article.title} subtitle={article.excerpt || ""}>
      <article className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/actualites" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                <img
                  src={featuredImage}
                  alt={article.title}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImages[0];
                  }}
                />
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {article.published_at ? formatDate(article.published_at) : formatDate(article.created_at)}
                </span>
                {article.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                )}
              </div>

              {/* Article Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {article.title}
              </h1>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none text-foreground 
                prose-headings:font-display prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-muted-foreground prose-li:mb-2
                prose-strong:text-foreground
                prose-em:text-primary
                prose-img:rounded-xl prose-img:shadow-lg">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <p className="text-muted-foreground">{article.excerpt}</p>
                )}
              </div>

              {/* Navigation entre articles */}
              {(prevArticle || nextArticle) && (
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    {prevArticle ? (
                      <Link
                        to={`/actualites/${prevArticle.slug}`}
                        className="flex-1 group p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <ChevronLeft className="w-4 h-4" />
                          <span className="text-sm">Article précédent</span>
                        </div>
                        <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {prevArticle.title}
                        </h4>
                      </Link>
                    ) : (
                      <div className="flex-1"></div>
                    )}
                    
                    {nextArticle ? (
                      <Link
                        to={`/actualites/${nextArticle.slug}`}
                        className="flex-1 group p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all text-right"
                      >
                        <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                          <span className="text-sm">Article suivant</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {nextArticle.title}
                        </h4>
                      </Link>
                    ) : (
                      <div className="flex-1"></div>
                    )}
                  </div>
                </div>
              )}

              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Partager cet article
                </h4>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Articles similaires
                </h3>
                {relatedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticles.map((related, index) => (
                      <Link
                        key={related.id}
                        to={`/actualites/${related.slug}`}
                        className="block p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                      >
                        <div className="flex gap-3">
                          <img
                            src={related.featured_image || fallbackImages[index % fallbackImages.length]}
                            alt={related.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = fallbackImages[index % fallbackImages.length];
                            }}
                          />
                          <div>
                            <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2 text-sm">
                              {related.title}
                            </h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {related.published_at ? formatDate(related.published_at) : "Récent"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Aucun article similaire</p>
                )}

                {/* Newsletter CTA */}
                <div className="mt-8 p-6 bg-primary rounded-xl text-primary-foreground">
                  <h4 className="font-display font-bold text-lg mb-2">
                    Restez informé
                  </h4>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    Recevez nos actualités directement dans votre boîte mail.
                  </p>
                  <Link to="/contact">
                    <Button variant="secondary" size="sm" className="w-full">
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default ArticleDetail;
