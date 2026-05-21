import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Calendar, ArrowLeft, Share2, Facebook, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanitizeHtml } from "@/lib/sanitize";
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
    content: `
      <p>Officiellement annoncée pour le 25 mai 2026, la première encyclique du Pape Léon XIV, intitulée <em>Magnifica Humanitas</em> (« Magnifique humanité »), porte sur l'attention à la personne humaine à l'ère de l'intelligence artificielle.</p>

      <h2>Une réflexion sur l'humain à l'ère numérique</h2>
      <p>Dans ce texte programmatique, le Saint-Père invite l'Église et le monde à redécouvrir la dignité inaliénable de chaque personne humaine, face aux bouleversements provoqués par les nouvelles technologies, l'automatisation et l'intelligence artificielle.</p>

      <h2>Une boussole pour le 21e siècle</h2>
      <p>L'encyclique rappelle que le progrès technique ne peut être une fin en soi : il doit toujours être au service de la personne humaine, créée à l'image de Dieu. Le Pape invite les chrétiens à un discernement éclairé et à un engagement responsable dans la culture numérique.</p>

      <p>Le texte intégral sera publié simultanément en plusieurs langues sur le site du Saint-Siège.</p>
    `,
    image: encycliqueLeonXIV,
    date: "25 Mai 2026",
    category: "Magistère",
  },
  {
    id: 2,
    slug: "soiree-evangeliser-reseaux",
    title: "Soirée : Évangéliser par les Réseaux",
    excerpt: "Rencontre des missionnaires du numérique à Paris avec Mgr Rey, l'Abbé Raffray et les abbés de CREDO.",
    content: `
      <p>Le jeudi 28 mai 2026, de 20h00 à 23h30, l'Espace Charenton (Paris 12) accueille une soirée exceptionnelle intitulée <strong>« Évangéliser par les Réseaux »</strong>.</p>

      <h2>Les missionnaires du numérique</h2>
      <p>Cette rencontre rassemblera Mgr Rey, l'Abbé Raffray, les abbés de CREDO, l'Abbé Laguérie, le Catho de Service, Paul d'Amen Media et bien d'autres acteurs catholiques du numérique.</p>

      <h2>Informations pratiques</h2>
      <ul>
        <li><strong>Date :</strong> Jeudi 28 mai 2026</li>
        <li><strong>Horaires :</strong> 20h00 - 23h30 (Accès VIP dès 18h30)</li>
        <li><strong>Lieu :</strong> Espace Charenton, Paris 12</li>
      </ul>

      <p>Une soirée de témoignages, d'échanges et de prière pour tous ceux qui veulent annoncer le Christ sur les réseaux sociaux.</p>
    `,
    image: evangeliserReseaux,
    date: "28 Mai 2026",
    category: "Événement",
  },
  {
    id: 3,
    slug: "lancement-assises-catechese-2026",
    title: "Lancement officiel des Assises Nationales de la Catéchèse",
    excerpt: "L'Église catholique en Côte d'Ivoire lance les Assises Nationales de la Catéchèse à la Paroisse Notre-Dame de l'Annonciation, Auribat.",
    content: `
      <p>La Commission Épiscopale Nationale de la Catéchèse organise le lancement officiel des <strong>Assises Nationales de la Catéchèse</strong> le dimanche 17 mai 2026 à 09h.</p>

      <h2>Un moment historique pour la catéchèse en Côte d'Ivoire</h2>
      <p>Cet événement marquera le coup d'envoi d'une démarche nationale visant à repenser et à dynamiser la transmission de la foi dans l'Église catholique en Côte d'Ivoire.</p>

      <h2>Public cible</h2>
      <p>Évêques, prêtres, responsables diocésains, religieux et religieuses, catéchistes, animateurs de catéchuménat, fidèles laïcs.</p>

      <h2>Informations pratiques</h2>
      <ul>
        <li><strong>Date :</strong> Dimanche 17 mai 2026 - 09h</li>
        <li><strong>Lieu :</strong> Paroisse Notre Dame de l'Annonciation / AURIBAT – route Bingerville</li>
        <li><strong>Contacts :</strong> +225 07 07 38 75 81 / +225 07 77 30 92 30 / +225 07 07 18 75 69</li>
        <li><strong>Email :</strong> catechesenationale@gmail.com</li>
      </ul>
    `,
    image: assisesCatechese,
    date: "17 Mai 2026",
    category: "Événement",
  },
  {
    id: 4,
    slug: "vatican-benedictions-couples",
    title: "Le Vatican interdit les bénédictions officielles pour les couples homosexuels",
    excerpt: "Le Saint-Siège publie une lettre rappelant la doctrine de l'Église sur le mariage et les bénédictions officielles.",
    content: `
      <p>Le Vatican a publié une lettre officielle clarifiant la position de l'Église catholique concernant les bénédictions officielles pour les couples de personnes de même sexe.</p>

      <h2>Une clarification doctrinale</h2>
      <p>Le document rappelle que le mariage, selon la doctrine catholique, est l'union exclusive entre un homme et une femme, ouverte à la transmission de la vie. Toute bénédiction officielle qui pourrait laisser entendre une reconnaissance d'unions contraires à cet enseignement est exclue.</p>

      <h2>L'accueil pastoral des personnes</h2>
      <p>Tout en réaffirmant la doctrine, le texte souligne que chaque personne, quelle que soit son orientation, doit être accueillie avec respect, compassion et délicatesse dans la communauté chrétienne. La distinction entre la personne et les actes demeure un principe fondamental de la pastorale de l'Église.</p>

      <p>La Commission Épiscopale pour la Doctrine de la Foi salue cette clarification et invite les fidèles à approfondir la richesse de l'enseignement de l'Église sur la sexualité humaine et le mariage.</p>
    `,
    image: vaticanBenedictions,
    date: "10 Mai 2026",
    category: "Actualité",
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
