import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, ArrowLeft, Share2, Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanitizeHtml } from "@/lib/sanitize";
import pelerinageImg from "@/assets/basilique-yamoussoukro.jpg";
import reunionImg from "@/assets/news-reunion-cedf.jpg";
import voeuxImg from "@/assets/voeux-2026.jpg";

const staticArticles = [
  {
    id: 1,
    slug: "pelerinage-yamoussoukro",
    title: "Pèlerinage à la Basilique de Yamoussoukro",
    excerpt: "Des milliers de fidèles ont participé au pèlerinage annuel à la Basilique Notre-Dame de la Paix de Yamoussoukro.",
    content: `
      <p>Le 15 janvier 2026, des milliers de fidèles venus de toute la Côte d'Ivoire et de la sous-région se sont rassemblés à la <strong>Basilique Notre-Dame de la Paix de Yamoussoukro</strong> pour le pèlerinage annuel organisé par la Conférence Épiscopale.</p>

      <h2>Une démarche de foi et de prière</h2>
      <p>Sous la conduite de leurs évêques, prêtres et catéchistes, les pèlerins ont vécu une journée de prière, d'adoration eucharistique et de méditation mariale, dans la plus grande basilique d'Afrique consacrée à la Vierge Marie.</p>

      <h2>Un appel à la paix</h2>
      <p>Dans son homélie, le président de la Conférence Épiscopale a invité les fidèles à être <em>« des artisans de paix »</em> dans leurs familles, leurs paroisses et la société ivoirienne, à la veille d'échéances importantes pour le pays.</p>

      <p>La journée s'est achevée par la procession mariale et la bénédiction solennelle, dans une ambiance de ferveur et de communion fraternelle.</p>
    `,
    image: pelerinageImg,
    date: "15 Janvier 2026",
    category: "Événement",
  },
  {
    id: 2,
    slug: "reunion-commission-janvier",
    title: "Réunion de la Commission Épiscopale",
    excerpt: "Les membres de la Commission se sont réunis pour planifier les activités de l'année 2026.",
    content: `
      <p>Le 10 janvier 2026, les membres de la <strong>Commission Épiscopale pour la Doctrine de la Foi (CEDF)</strong> se sont réunis au siège de la Conférence Épiscopale pour leur première session de travail de l'année.</p>

      <h2>Bilan et perspectives</h2>
      <p>Cette rencontre a permis de dresser le bilan des activités menées en 2025 et d'arrêter le programme pastoral, théologique et de formation de l'année 2026, notamment autour des Assises Nationales de la Catéchèse.</p>

      <h2>Priorités pour 2026</h2>
      <ul>
        <li>Renforcer la formation doctrinale des catéchistes et animateurs pastoraux</li>
        <li>Poursuivre la publication des magazines <em>Credo</em> et des enseignements en ligne</li>
        <li>Développer la présence numérique de la CEDF (radio, podcasts, plateforme web)</li>
        <li>Accompagner les diocèses dans la mise en œuvre des orientations synodales</li>
      </ul>

      <p>La séance s'est conclue par un temps de prière et l'envoi en mission de chaque membre dans son champ d'apostolat.</p>
    `,
    image: reunionImg,
    date: "10 Janvier 2026",
    category: "Vie de la CEDF",
  },
  {
    id: 3,
    slug: "voeux-nouvel-an-2026",
    title: "Vœux du Nouvel An 2026",
    excerpt: "Que cette nouvelle année soit remplie de la grâce divine et de la paix du Christ.",
    content: `
      <p>À l'occasion de l'entrée dans la nouvelle année, la <strong>Commission Épiscopale pour la Doctrine de la Foi</strong> adresse ses vœux les plus fervents à tous les fidèles de Côte d'Ivoire et à tous les hommes de bonne volonté.</p>

      <h2>Une année placée sous le signe de l'espérance</h2>
      <p>« Que cette nouvelle année soit remplie de la grâce divine et de la paix du Christ. » Tel est le souhait que nous formulons pour chaque famille, chaque communauté chrétienne et chaque nation.</p>

      <h2>Un appel à la conversion et à la mission</h2>
      <p>Que 2026 soit pour chacun une année de croissance dans la foi, l'espérance et la charité ; une année d'engagement renouvelé au service de l'Évangile et de nos frères, particulièrement les plus pauvres et les plus fragiles.</p>

      <p>Que Marie, Mère de l'Église et Reine de la Paix, intercède pour nous tout au long de cette année. Bonne et sainte année 2026 !</p>
    `,
    image: voeuxImg,
    date: "1er Janvier 2026",
    category: "Message",
  },
];

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = staticArticles.find(a => a.slug === slug);
  const currentIndex = staticArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? staticArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < staticArticles.length - 1
    ? staticArticles[currentIndex + 1]
    : null;

  const relatedArticles = staticArticles
    .filter(a => a.slug !== slug)
    .slice(0, 3);

  if (!article) {
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

  return (
    <PageLayout title={article.title} subtitle={article.excerpt}>
      <article className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/actualites" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {article.date}
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {article.title}
              </h1>

              <div className="prose prose-lg max-w-none text-foreground
                prose-headings:font-display prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-muted-foreground prose-li:mb-2
                prose-strong:text-foreground
                prose-em:text-primary
                prose-img:rounded-xl prose-img:shadow-lg">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />
              </div>

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

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Articles similaires
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      to={`/actualites/${related.slug}`}
                      className="block p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2 text-sm">
                            {related.title}
                          </h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {related.date}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

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
