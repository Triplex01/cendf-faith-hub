import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getArticlesByCategory } from "@/config/enseignementsArticles";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Cross,
  Heart,
  Church,
  Users,
  ArrowLeft,
  ChevronRight,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import teachingImage from "@/assets/teaching-priest.jpg";
import basiliquImage from "@/assets/basilique-notredame.jpg";
import reunionImage from "@/assets/reunion-eglise.jpg";

// Métadonnées des catégories (sans vidéos ni transcripts)
const categoriesMeta: Record<
  string,
  { title: string; subtitle: string; description: string; icon: any; image: string }
> = {
  "fondements-foi": {
    title: "Fondements de la Foi",
    subtitle: "Les bases essentielles de notre foi catholique",
    description:
      "Découvrez les piliers fondamentaux de la foi chrétienne catholique : le Credo, les sacrements, la Tradition apostolique et les enseignements du Magistère, à travers des articles d'auteurs et théologiens.",
    icon: Cross,
    image: teachingImage,
  },
  "etudes-bibliques": {
    title: "Études Bibliques",
    subtitle: "Approfondir les Saintes Écritures",
    description:
      "Plongez dans l'étude de la Bible avec des commentaires, des analyses et des réflexions sur les textes sacrés de l'Ancien et du Nouveau Testament.",
    icon: BookOpen,
    image: basiliquImage,
  },
  "vie-spirituelle": {
    title: "Vie Spirituelle",
    subtitle: "Croître dans la prière et la sainteté",
    description:
      "Apprenez à développer une vie de prière profonde, à pratiquer les vertus chrétiennes et à progresser sur le chemin de la sainteté.",
    icon: Heart,
    image: reunionImage,
  },
  liturgie: {
    title: "Liturgie et Sacrements",
    subtitle: "Vivre pleinement les célébrations",
    description:
      "Comprenez la richesse de la liturgie catholique, ses symboles, ses rites et la théologie qui soutient les célébrations de l'Église.",
    icon: Church,
    image: teachingImage,
  },
  "vie-familiale": {
    title: "Vie Familiale Chrétienne",
    subtitle: "La famille, église domestique",
    description:
      "Découvrez comment vivre la foi en famille, éduquer les enfants dans la foi et construire un foyer chrétien.",
    icon: Users,
    image: reunionImage,
  },
};

const EnseignementDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const meta = categoriesMeta[slug || ""] || categoriesMeta["fondements-foi"];
  const IconComponent = meta.icon;
  const articles = getArticlesByCategory(slug || "");

  return (
    <PageLayout
      title={meta.title}
      subtitle={meta.subtitle}
      backgroundImage={meta.image}
    >
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/enseignements"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux enseignements
            </Link>
          </div>

          {/* Description */}
          <div className="bg-card rounded-2xl p-6 md:p-8 mb-12 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                  {meta.title}
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {meta.description}
                </p>
              </div>
            </div>
          </div>

          {/* Articles list */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Enseignements disponibles
              </h2>
              {articles.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {articles.length} article{articles.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {articles.length > 0 ? (
              <div className="space-y-5">
                {articles.map((article, index) => (
                  <article
                    key={article.slug}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-elegant transition-all"
                  >
                    <div className="grid md:grid-cols-[120px_1fr_auto] gap-0 items-stretch">
                      {/* Number/Index column */}
                      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 border-r border-border">
                        <div className="text-center">
                          <div className="font-display text-3xl font-bold text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="text-xs uppercase tracking-wider text-secondary mt-1 font-display">
                            Article
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-7">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                            {article.categoryLabel}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(article.date).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {Math.max(3, Math.ceil(article.content.split(" ").length / 200))} min
                          </span>
                        </div>

                        <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-secondary">
                          <User className="w-3.5 h-3.5" />
                          <span className="font-medium">{article.author}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-center p-6 md:p-7 md:border-l md:border-border bg-card">
                        <Link to={`/enseignements/article/${article.slug}`} className="w-full md:w-auto">
                          <Button variant="burgundy" className="gap-2 w-full md:w-auto">
                            <BookOpen className="w-4 h-4" />
                            Lire
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  Aucun enseignement publié pour le moment
                </h3>
                <p className="text-muted-foreground text-sm">
                  De nouveaux articles seront prochainement disponibles dans cette catégorie.
                </p>
              </div>
            )}
          </div>

          {/* Autres catégories */}
          <div className="bg-gradient-burgundy rounded-2xl p-8 md:p-12 text-primary-foreground">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-6">
              Explorer d'autres enseignements
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(categoriesMeta)
                .filter(([key]) => key !== slug)
                .map(([key, data]) => {
                  const Icon = data.icon;
                  return (
                    <Link
                      key={key}
                      to={`/enseignement/${key}`}
                      className="bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-xl p-4 transition-colors"
                    >
                      <Icon className="w-6 h-6 mb-2" />
                      <h3 className="font-medium text-sm">{data.title}</h3>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EnseignementDetail;
