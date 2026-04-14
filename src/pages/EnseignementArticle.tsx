import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getArticleBySlug, enseignementsArticles } from "@/config/enseignementsArticles";
import { ArrowLeft, Calendar, User, BookOpen, Share2, Bookmark, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import teachingImage from "@/assets/teaching-priest.jpg";
import basiliquImage from "@/assets/basilique-notredame.jpg";
import reunionImage from "@/assets/reunion-eglise.jpg";

const categoryImages: Record<string, string> = {
  liturgie: teachingImage,
  "fondements-foi": basiliquImage,
  "vie-spirituelle": reunionImage,
  "etudes-bibliques": basiliquImage,
  "vie-familiale": reunionImage,
};

const EnseignementArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <PageLayout title="Article introuvable" subtitle="Cet enseignement n'existe pas" backgroundImage={teachingImage}>
        <div className="py-20 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Article introuvable</h2>
          <Link to="/enseignements">
            <Button variant="burgundy">Retour aux enseignements</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const bgImage = categoryImages[article.category] || teachingImage;
  const relatedArticles = enseignementsArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageLayout title={article.title} subtitle={article.categoryLabel} backgroundImage={bgImage}>
      <article className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/enseignements" className="hover:text-primary transition-colors">Enseignements</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/enseignement/${article.category}`} className="hover:text-primary transition-colors">
              {article.categoryLabel}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main content */}
            <div>
              {/* Article header */}
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                    {article.categoryLabel}
                  </span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-tight mb-6">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {Math.ceil(article.content.split(" ").length / 200)} min de lecture
                  </span>
                </div>
              </header>

              {/* Decorative initial line */}
              <div className="w-16 h-1 bg-primary mb-8 rounded-full" />

              {/* Article body */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:mb-5 prose-p:text-[1.05rem]
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5
                  prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6
                  prose-blockquote:text-foreground prose-blockquote:italic prose-blockquote:font-display
                  prose-blockquote:not-italic prose-blockquote:text-lg
                  prose-strong:text-foreground
                  prose-em:text-primary/80
                  [&_.lead]:text-lg [&_.lead]:font-medium [&_.lead]:text-foreground [&_.lead]:leading-relaxed [&_.lead]:mb-8
                  [&_cite]:block [&_cite]:text-sm [&_cite]:text-muted-foreground [&_cite]:mt-2 [&_cite]:not-italic
                "
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Author box */}
              <div className="mt-12 p-6 bg-card border border-border rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground text-lg">{article.author}</h4>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{article.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <Button variant="outline" className="gap-2" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bookmark className="w-4 h-4" />
                  Sauvegarder
                </Button>
                <Link to="/enseignements" className="ml-auto">
                  <Button variant="burgundy" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Tous les enseignements
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Category nav */}
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Dans cette catégorie
                </h3>
                <div className="space-y-3">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((a) => (
                      <Link
                        key={a.slug}
                        to={`/enseignements/article/${a.slug}`}
                        className="block p-3 rounded-xl hover:bg-primary/5 transition-colors group"
                      >
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {a.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">D'autres articles seront bientôt disponibles.</p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    to={`/enseignement/${article.category}`}
                    className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                  >
                    Voir tous les enseignements
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default EnseignementArticle;
