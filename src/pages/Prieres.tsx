import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { Search, BookOpen, Heart, Volume2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

const prayerCategories = [
  "Toutes",
  "Prières quotidiennes",
  "Prières mariales",
  "Prières aux saints",
  "Psaumes",
  "Prières pour les défunts",
];

const prayers = [
  {
    id: 1,
    title: "Notre Père",
    category: "Prières quotidiennes",
    text: `Notre Père, qui es aux cieux,
que ton nom soit sanctifié,
que ton règne vienne,
que ta volonté soit faite sur la terre comme au ciel.
Donne-nous aujourd'hui notre pain de ce jour.
Pardonne-nous nos offenses,
comme nous pardonnons aussi à ceux qui nous ont offensés.
Et ne nous laisse pas entrer en tentation
mais délivre-nous du Mal.
Amen.`,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Je vous salue Marie",
    category: "Prières mariales",
    text: `Je vous salue Marie, pleine de grâce,
Le Seigneur est avec vous.
Vous êtes bénie entre toutes les femmes
Et Jésus, le fruit de vos entrailles, est béni.
Sainte Marie, Mère de Dieu,
Priez pour nous, pauvres pécheurs,
Maintenant et à l'heure de notre mort.
Amen.`,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Gloire au Père",
    category: "Prières quotidiennes",
    text: `Gloire au Père, au Fils et au Saint-Esprit,
comme il était au commencement, maintenant et toujours,
pour les siècles des siècles.
Amen.`,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Acte de contrition",
    category: "Prières quotidiennes",
    text: `Mon Dieu, j'ai un très grand regret de vous avoir offensé,
parce que vous êtes infiniment bon, infiniment aimable,
et que le péché vous déplaît.
Je prends la ferme résolution,
avec le secours de votre sainte grâce,
de ne plus vous offenser
et de faire pénitence.
Amen.`,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Prière à l'Ange Gardien",
    category: "Prières aux saints",
    text: `Ange de Dieu, qui êtes mon gardien
et à qui j'ai été confié par la bonté divine,
éclairez-moi, gardez-moi, dirigez-moi et gouvernez-moi.
Amen.`,
    isFavorite: false,
  },
  {
    id: 6,
    title: "Salve Regina",
    category: "Prières mariales",
    text: `Salut, ô Reine, Mère de miséricorde,
notre vie, notre douceur, notre espérance, salut !
Vers vous nous élevons nos cris,
pauvres enfants d'Ève exilés.
Vers vous nous soupirons, gémissant et pleurant
dans cette vallée de larmes.
Ô vous, notre Avocate,
tournez vers nous vos regards miséricordieux.
Et après cet exil, montrez-nous Jésus,
le fruit béni de vos entrailles.
Ô clémente, ô miséricordieuse, ô douce Vierge Marie.
Amen.`,
    isFavorite: true,
  },
];

const Prieres = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [favorites, setFavorites] = useState<number[]>(
    prayers.filter((p) => p.isFavorite).map((p) => p.id)
  );

  const filteredPrayers = prayers.filter((prayer) => {
    const matchesCategory =
      selectedCategory === "Toutes" || prayer.category === selectedCategory;
    const matchesSearch = prayer.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <PageLayout
      title="Prières"
      subtitle="Collection de prières pour votre vie spirituelle"
      backgroundImage={interieurBasilique}
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une prière..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {prayerCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "burgundy" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Prayers Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPrayers.map((prayer) => (
              <div
                key={prayer.id}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                      {prayer.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {prayer.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleFavorite(prayer.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      favorites.includes(prayer.id)
                        ? "bg-gold/20 text-gold"
                        : "bg-muted text-muted-foreground hover:text-gold"
                    }`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        favorites.includes(prayer.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <p className="text-foreground whitespace-pre-line leading-relaxed italic">
                    {prayer.text}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Volume2 className="w-4 h-4" />
                    Écouter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    En savoir plus
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredPrayers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Aucune prière trouvée</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Prieres;
