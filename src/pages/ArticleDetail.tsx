import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, ArrowLeft, Share2, Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import reunionEglise from "@/assets/reunion-eglise.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";
import voeux2026 from "@/assets/voeux-2026.jpg";

// Articles statiques
const staticArticles = [
  {
    id: 1,
    slug: "celebration-noel-2024",
    title: "Célébration de Noël 2024",
    excerpt: "La Commission Épiscopale pour la Doctrine de la Foi a célébré avec ferveur la naissance du Christ lors de la messe de Noël 2024.",
    content: `
      <p>La Commission Épiscopale pour la Doctrine de la Foi a célébré avec ferveur la naissance du Christ lors de la messe de Noël 2024. Cette célébration a rassemblé des milliers de fidèles venus de toute la Côte d'Ivoire.</p>
      
      <h2>Une célébration dans la joie</h2>
      <p>Dans une ambiance de recueillement et de joie, les fidèles ont participé à la messe solennelle présidée par Son Éminence. L'homélie a rappelé le sens profond de Noël : la venue du Sauveur parmi nous.</p>
      
      <h2>Message d'espérance</h2>
      <p>Le message de Noël 2024 a été un appel à l'espérance et à la paix. En ces temps difficiles, l'Église invite tous les chrétiens à renouveler leur foi en la bonté de Dieu et à être des artisans de paix dans leur communauté.</p>
      
      <p>Les fidèles ont également été invités à prier pour les plus vulnérables et à poser des gestes concrets de solidarité en cette période de fête.</p>
    `,
    image: interieurBasilique,
    date: "25 Décembre 2024",
    category: "Célébration",
  },
  {
    id: 2,
    slug: "voeux-nouvel-an-2026",
    title: "Vœux du Nouvel An 2026",
    excerpt: "Que cette nouvelle année soit remplie de la grâce divine et de la paix du Christ pour tous les fidèles de Côte d'Ivoire.",
    content: `
      <p>En ce début d'année 2026, la Commission Épiscopale pour la Doctrine de la Foi adresse ses vœux les plus chaleureux à tous les fidèles de Côte d'Ivoire et d'Afrique.</p>
      
      <h2>Une année sous le signe de l'espérance</h2>
      <p>Que cette nouvelle année soit placée sous le signe de l'espérance chrétienne. Dans un monde en mutation, notre foi en Jésus-Christ reste notre ancre solide.</p>
      
      <h2>Appel à la prière et à l'engagement</h2>
      <p>Nous invitons tous les chrétiens à intensifier leur vie de prière et à s'engager davantage dans la mission de l'Église. Ensemble, soyons témoins de l'amour du Christ dans notre société.</p>
      
      <p>Que le Seigneur bénisse chacun de vous et vos familles tout au long de cette année 2026.</p>
    `,
    image: voeux2026,
    date: "1 Janvier 2026",
    category: "Message",
  },
  {
    id: 3,
    slug: "reunion-commission-janvier",
    title: "Réunion de la Commission Épiscopale",
    excerpt: "Les membres de la Commission se sont réunis pour planifier les activités pastorales de l'année 2026.",
    content: `
      <p>Les membres de la Commission Épiscopale pour la Doctrine de la Foi se sont réunis le 10 janvier 2026 pour établir le programme pastoral de l'année.</p>
      
      <h2>Bilan de l'année écoulée</h2>
      <p>Un bilan positif de l'année 2025 a été dressé, avec notamment le succès des différentes formations doctrinales et des événements organisés.</p>
      
      <h2>Perspectives 2026</h2>
      <p>Plusieurs projets ont été retenus pour cette année :</p>
      <ul>
        <li>Renforcement de la formation des catéchistes</li>
        <li>Organisation de journées d'études théologiques</li>
        <li>Participation au Congrès Panafricain d'Abidjan</li>
        <li>Publication de documents doctrinaux</li>
      </ul>
      
      <p>La prochaine réunion est prévue pour le mois de mars 2026.</p>
    `,
    image: reunionEglise,
    date: "10 Janvier 2026",
    category: "Actualité",
  },
  {
    id: 4,
    slug: "pelerinage-yamoussoukro",
    title: "Pèlerinage à la Basilique de Yamoussoukro",
    excerpt: "Des milliers de fidèles ont participé au pèlerinage annuel à la Basilique Notre-Dame de la Paix.",
    content: `
      <p>Le pèlerinage annuel à la Basilique Notre-Dame de la Paix de Yamoussoukro a rassemblé des milliers de fidèles venus de toute la Côte d'Ivoire.</p>
      
      <h2>Un lieu de grâce</h2>
      <p>La Basilique Notre-Dame de la Paix, joyau architectural et spirituel de notre pays, reste un lieu privilégié de rencontre avec Dieu. Les pèlerins y viennent pour prier, se recueillir et demander des grâces particulières.</p>
      
      <h2>Témoignages de foi</h2>
      <p>De nombreux témoignages de conversion et de guérison ont été partagés lors de ce pèlerinage. La foi des fidèles continue de s'affermir dans ce haut lieu de spiritualité.</p>
      
      <p>Le prochain pèlerinage diocésain est prévu pour le 15 août 2026, fête de l'Assomption de la Vierge Marie.</p>
    `,
    image: basiliqueYamoussoukro,
    date: "15 Janvier 2026",
    category: "Pèlerinage",
  },
  {
    id: 5,
    slug: "formation-catechistes",
    title: "Formation des Catéchistes",
    excerpt: "Une session de formation pour les catéchistes a eu lieu à l'archidiocèse d'Abidjan.",
    content: `
      <p>Une session de formation intensive pour les catéchistes s'est tenue à l'archidiocèse d'Abidjan, rassemblant plus de 200 participants.</p>
      
      <h2>Objectifs de la formation</h2>
      <p>Cette formation visait à :</p>
      <ul>
        <li>Approfondir la connaissance du Catéchisme de l'Église Catholique</li>
        <li>Améliorer les méthodes pédagogiques</li>
        <li>Renforcer la vie spirituelle des catéchistes</li>
      </ul>
      
      <h2>Intervenants de qualité</h2>
      <p>Des théologiens et formateurs de renom ont animé les différentes sessions. Les participants ont particulièrement apprécié les ateliers pratiques.</p>
      
      <p>D'autres sessions de formation sont prévues dans les différents diocèses du pays.</p>
    `,
    image: basiliqueNotredame,
    date: "20 Janvier 2026",
    category: "Formation",
  },
  {
    id: 6,
    slug: "messe-unite-chretiens",
    title: "Messe pour l'Unité des Chrétiens",
    excerpt: "Une messe solennelle a été célébrée à l'occasion de la Semaine de prière pour l'unité des chrétiens.",
    content: `
      <p>À l'occasion de la Semaine de prière pour l'unité des chrétiens, une messe solennelle a été célébrée dans la cathédrale Saint-Paul du Plateau.</p>
      
      <h2>Ensemble malgré nos différences</h2>
      <p>Des représentants de différentes confessions chrétiennes étaient présents pour cette célébration œcuménique. L'unité des chrétiens reste un objectif important pour l'Église.</p>
      
      <h2>Message d'unité</h2>
      <p>Le message principal de cette célébration était un appel à dépasser nos divisions pour témoigner ensemble de l'amour du Christ dans notre société.</p>
      
      <p>Des rencontres œcuméniques sont prévues tout au long de l'année pour poursuivre ce dialogue fraternel.</p>
    `,
    image: interieurBasilique,
    date: "25 Janvier 2026",
    category: "Œcuménisme",
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
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                />
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {article.date}
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {article.category}
                </span>
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
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
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