import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";
import {
  BookOpen,
  Users,
  Heart,
  Cross,
  Church,
  Clock,
  User,
  Calendar,
  Search,
  ChevronRight,
} from "lucide-react";
import { enseignementsArticles } from "@/config/enseignementsArticles";
import teachingImage from "@/assets/teaching-priest.jpg";
import basiliquImage from "@/assets/basilique-notredame.jpg";
import reunionImage from "@/assets/reunion-eglise.jpg";
import imgLiturgieCulture from "@/assets/ens-liturgie-culture.jpg";
import imgTheologieLiturgie from "@/assets/ens-theologie-liturgie.jpg";
import imgUniteLiturgie from "@/assets/ens-unite-liturgie.webp";
import imgPetiteHistoire from "@/assets/ens-petite-histoire-liturgie.webp";
import imgDieuTrinite from "@/assets/ens-dieu-trinite.jpg";
import imgAProposReligion from "@/assets/ens-a-propos-religion.jpg";
import imgAnthropologie from "@/assets/ens-anthropologie.jpeg";
import imgDieuJuif from "@/assets/ens-dieu-juif.jpg";
import imgHommePhilosophes from "@/assets/ens-homme-philosophes.webp";

const categories = [
  { id: "all", slug: "", icon: BookOpen, title: "Tous", description: "Tous les enseignements" },
  { id: "fondements-foi", slug: "fondements-foi", icon: Cross, title: "Fondements de la Foi", description: "Les bases de la foi chrétienne" },
  { id: "etudes-bibliques", slug: "etudes-bibliques", icon: BookOpen, title: "Études Bibliques", description: "Approfondir les Écritures" },
  { id: "vie-spirituelle", slug: "vie-spirituelle", icon: Heart, title: "Vie Spirituelle", description: "Croître dans la prière" },
  { id: "liturgie", slug: "liturgie", icon: Church, title: "Liturgie", description: "Vivre les célébrations" },
  { id: "vie-familiale", slug: "vie-familiale", icon: Users, title: "Vie Familiale", description: "La famille chrétienne" },
];

const articleImages: Record<string, string> = {
  "liturgie-et-culture": imgLiturgieCulture,
  "theologie-de-la-liturgie": imgTheologieLiturgie,
  "unite-liturgie-et-mission": imgUniteLiturgie,
  "petite-histoire-de-la-liturgie": imgPetiteHistoire,
  "dieu-trinite-mystere-de-communion": imgDieuTrinite,
  "de-religionis-a-propos-de-religion": imgAProposReligion,
  "anthropologie-biblique-che-cosa-e-l-uomo": imgAnthropologie,
  "le-dieu-juif": imgDieuJuif,
  "homme-vu-par-les-philosophes": imgHommePhilosophes,
};

const categoryImages: Record<string, string> = {
  liturgie: teachingImage,
  "fondements-foi": basiliquImage,
  "vie-spirituelle": reunionImage,
  "etudes-bibliques": basiliquImage,
  "vie-familiale": reunionImage,
};

const Enseignements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = enseignementsArticles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Comptage par catégorie
  const countByCategory = (cat: string) =>
    cat === "all"
      ? enseignementsArticles.length
      : enseignementsArticles.filter((a) => a.category === cat).length;

  return (
    <>
      <SEO
        title="Enseignements Catholiques — Théologie, Liturgie & Catéchèse"
        description="Approfondissez votre foi catholique : études bibliques, catéchèse, doctrine, théologie, liturgie romaine, patristique, vie spirituelle et familiale. Enseignements de la CEDF Côte d'Ivoire fidèles au Magistère de l'Église."
        keywords="enseignement catholique, catéchèse Côte d'Ivoire, études bibliques, doctrine de la foi, théologie catholique, philosophie chrétienne, liturgie romaine, patristique, Pères de l'Église, saint Augustin, saint Thomas d'Aquin, mariologie, christologie, ecclésiologie, sacrements, eucharistie, vie spirituelle, vie familiale chrétienne, formation catéchétique, CEDF, cedfci, Église catholique Abidjan, Vatican, Magistère, encyclique, foi et raison"
        url="/enseignements"
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Enseignements", url: "/enseignements" },
        ]}
      />
      <PageLayout
        title="Enseignements"
        subtitle="Pour nourrir votre foi au quotidien"
        backgroundImage={teachingImage}
      >
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Search */}
            <div className="mb-10">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un enseignement, un auteur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
            </div>

            {/* Category Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
              {categories
                .filter((cat) => cat.id !== "all")
                .map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/enseignement/${cat.slug}`}
                    className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-elegant transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3">
                      <cat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                    <div className="mt-3 text-xs text-secondary font-semibold">
                      {countByCategory(cat.id)} article{countByCategory(cat.id) > 1 ? "s" : ""}
                    </div>
                  </Link>
                ))}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "bg-card border border-border text-foreground hover:border-primary/30"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === cat.id
                        ? "bg-primary-foreground/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {countByCategory(cat.id)}
                  </span>
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => {
                  const img = articleImages[article.slug] || categoryImages[article.category] || teachingImage;
                  return (
                    <article
                      key={article.slug}
                      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/30 flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={img}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold uppercase tracking-wider">
                            {article.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                          {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-secondary" />
                            <span className="line-clamp-1">{article.author}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-secondary" />
                            {Math.max(3, Math.ceil(article.content.split(" ").length / 200))} min
                          </span>
                        </div>

                        {/* Action — Lire button linking to article page */}
                        <Link to={`/enseignements/article/${article.slug}`} className="block">
                          <Button variant="burgundy" className="w-full gap-2">
                            <BookOpen className="w-4 h-4" />
                            Lire
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Aucun enseignement trouvé
                </h3>
                <p className="text-muted-foreground">
                  Essayez de modifier vos critères de recherche.
                </p>
              </div>
            )}

            {/* Community Section */}
            <div className="mt-20 p-8 md:p-12 bg-gradient-burgundy rounded-2xl text-primary-foreground">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    Rejoignez notre communauté d'apprentissage
                  </h2>
                  <p className="text-primary-foreground/80 mb-6">
                    Approfondissez votre foi avec des articles d'auteurs et théologiens, et grandissez avec d'autres frères et sœurs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact">
                      <Button variant="hero" size="lg">Nous rejoindre</Button>
                    </Link>
                    <Link to="/radio">
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        Écouter la radio
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">{enseignementsArticles.length}+</div>
                    <div className="text-sm text-primary-foreground/70">Articles publiés</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">5</div>
                    <div className="text-sm text-primary-foreground/70">Catégories</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">10+</div>
                    <div className="text-sm text-primary-foreground/70">Auteurs</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold mb-1">24/7</div>
                    <div className="text-sm text-primary-foreground/70">Disponible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Enseignements;
