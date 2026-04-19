import { useParams, Link } from "react-router-dom";
import { getArticleBySlug, enseignementsArticles } from "@/config/enseignementsArticles";
import { ArrowLeft, BookOpen, Share2, Printer, ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoCendf from "@/assets/logo-cendf.png";

const EnseignementArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Article introuvable</h2>
          <Link to="/enseignements">
            <Button variant="burgundy">Retour aux enseignements</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = enseignementsArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePrint = () => window.print();

  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Vatican-style document container */}
      <main className="bg-[hsl(45,30%,94%)] py-8 md:py-12 print:bg-white print:py-0">
        <article className="container mx-auto max-w-5xl bg-white shadow-elegant print:shadow-none">
          {/* Document Header — style Saint-Siège */}
          <div className="border-b border-border/50 px-4 sm:px-6 md:px-16 py-6 sm:py-8 md:py-14">
            <div className="flex items-center justify-between gap-3 sm:gap-6 mb-5 sm:mb-8">
              {/* Left: actions (print) */}
              <button
                onClick={handlePrint}
                className="text-secondary hover:text-primary transition-colors p-1.5 sm:p-2"
                aria-label="Imprimer"
                title="Imprimer"
              >
                <Printer className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>

              {/* Center: logo */}
              <Link to="/" className="flex-shrink-0">
                <img src={logoCendf} alt="CEDF" className="h-12 sm:h-16 md:h-20 w-auto" />
              </Link>

              {/* Right: actions (share + lang) */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <button
                  onClick={handleShare}
                  className="text-secondary hover:text-primary transition-colors p-1.5 sm:p-2"
                  aria-label="Partager"
                  title="Partager"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
                <div className="hidden md:flex items-center gap-1 text-secondary text-sm uppercase tracking-wider ml-2">
                  <Globe className="w-4 h-4" />
                  <span>FR</span>
                </div>
              </div>
            </div>

            {/* Breadcrumb chapeau */}
            <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-secondary font-display text-center sm:text-left leading-relaxed">
              <Link to="/enseignements" className="hover:text-primary transition-colors">
                ENSEIGNEMENTS
              </Link>
              <span className="mx-1.5 sm:mx-2 text-muted-foreground">|</span>
              <Link to={`/enseignement/${article.category}`} className="hover:text-primary transition-colors">
                {article.categoryLabel.toUpperCase()}
              </Link>
              <span className="mx-1.5 sm:mx-2 text-muted-foreground">|</span>
              <span>{new Date(article.date).getFullYear()}</span>
            </div>
          </div>

          {/* Document body */}
          <div className="px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-16">
            {/* Language strip */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 text-secondary font-display text-xs sm:text-sm md:text-base">
              <span className="text-secondary font-semibold">FR</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-muted-foreground hover:text-secondary cursor-pointer transition-colors">EN</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-muted-foreground hover:text-secondary cursor-pointer transition-colors">IT</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-muted-foreground hover:text-secondary cursor-pointer transition-colors">PT</span>
            </div>

            {/* Title block */}
            <header className="text-center mb-10 sm:mb-12 md:mb-16">
              <h1 className="font-display italic font-bold text-foreground text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-tight uppercase tracking-wide max-w-3xl mx-auto px-2">
                {article.title}
              </h1>

              <div className="mt-6 sm:mt-8 text-foreground/80 italic font-display text-sm sm:text-base md:text-lg space-y-1 px-2">
                <p>Commission Épiscopale pour la Doctrine de la Foi</p>
                <p className="capitalize">{formattedDate}</p>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
                <div className="h-px w-12 sm:w-16 md:w-24 bg-secondary/40" />
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="h-px w-12 sm:w-16 md:w-24 bg-secondary/40" />
              </div>
            </header>

            {/* Article body */}
            <div
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none mx-auto
                prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold prose-headings:italic
                prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-10 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-5 prose-h2:text-center prose-h2:uppercase prose-h2:tracking-wide
                prose-h3:text-base sm:prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:text-secondary
                prose-p:text-foreground/90 prose-p:leading-[1.75] sm:prose-p:leading-[1.9] prose-p:mb-4 sm:prose-p:mb-5 prose-p:text-[0.9375rem] sm:prose-p:text-base md:prose-p:text-[1.0625rem] prose-p:text-justify
                prose-p:font-serif
                prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:bg-secondary/5
                prose-blockquote:rounded-r-lg prose-blockquote:py-2 sm:prose-blockquote:py-3 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:my-5 sm:prose-blockquote:my-6
                prose-blockquote:text-foreground prose-blockquote:italic prose-blockquote:font-display
                prose-blockquote:text-sm sm:prose-blockquote:text-base md:prose-blockquote:text-lg prose-blockquote:not-italic
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-foreground/95
                [&_.lead]:text-sm sm:[&_.lead]:text-base md:[&_.lead]:text-lg [&_.lead]:font-medium [&_.lead]:text-foreground
                [&_.lead]:leading-relaxed [&_.lead]:mb-6 sm:[&_.lead]:mb-8 [&_.lead]:text-justify [&_.lead]:font-serif
                [&_cite]:block [&_cite]:text-xs sm:[&_cite]:text-sm [&_cite]:text-secondary [&_cite]:mt-2 [&_cite]:not-italic [&_cite]:text-right
              "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Signature/Author block */}
            <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 text-center">
              <p className="font-display italic text-foreground text-base sm:text-lg md:text-xl">
                {article.author}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto px-2">
                {article.authorBio}
              </p>
            </div>

            {/* Decorative bottom seal */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <div className="h-px w-16 sm:w-20 bg-secondary/40" />
              <div className="text-secondary font-display text-xl sm:text-2xl">✠</div>
              <div className="h-px w-16 sm:w-20 bg-secondary/40" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-8 sm:mt-10 print:hidden">
              <Link to={`/enseignement/${article.category}`}>
                <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Retour à la catégorie
                </Button>
              </Link>
              <Link to="/enseignements">
                <Button variant="burgundy" size="sm" className="gap-2 text-xs sm:text-sm">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Tous les enseignements
                </Button>
              </Link>
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-border/50 px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-14 bg-[hsl(45,30%,97%)] print:hidden">
              <h2 className="font-display italic font-bold text-foreground text-lg sm:text-xl md:text-2xl text-center uppercase tracking-wide mb-2">
                Dans la même catégorie
              </h2>
              <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
                <div className="h-px w-10 sm:w-12 bg-secondary/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <div className="h-px w-10 sm:w-12 bg-secondary/40" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/enseignements/article/${a.slug}`}
                    className="group bg-white border border-border rounded-lg p-4 sm:p-5 hover:border-secondary/50 hover:shadow-md transition-all"
                  >
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-secondary font-display font-semibold">
                      {a.categoryLabel}
                    </span>
                    <h3 className="font-display italic font-bold text-foreground text-sm sm:text-base mt-2 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 font-serif">
                      {a.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                      Lire <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default EnseignementArticle;
