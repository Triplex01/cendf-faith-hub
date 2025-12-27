import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, BookOpen, ChevronRight, Volume2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

// Livres de la Bible
const bibleBooks = {
  ancien: [
    "Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome",
    "Josué", "Juges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques",
    "Esdras", "Néhémie", "Tobie", "Judith", "Esther",
    "1 Maccabées", "2 Maccabées", "Job", "Psaumes", "Proverbes",
    "Ecclésiaste", "Cantique des Cantiques", "Sagesse", "Siracide",
    "Isaïe", "Jérémie", "Lamentations", "Baruch", "Ézéchiel",
    "Daniel", "Osée", "Joël", "Amos", "Abdias", "Jonas",
    "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée",
    "Zacharie", "Malachie"
  ],
  nouveau: [
    "Matthieu", "Marc", "Luc", "Jean", "Actes des Apôtres",
    "Romains", "1 Corinthiens", "2 Corinthiens", "Galates",
    "Éphésiens", "Philippiens", "Colossiens", "1 Thessaloniciens",
    "2 Thessaloniciens", "1 Timothée", "2 Timothée", "Tite",
    "Philémon", "Hébreux", "Jacques", "1 Pierre", "2 Pierre",
    "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse"
  ]
};

// Versets populaires
const popularVerses = [
  {
    reference: "Jean 3:16",
    text: "Car Dieu a tellement aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
  },
  {
    reference: "Psaume 23:1",
    text: "Le Seigneur est mon berger, je ne manque de rien.",
  },
  {
    reference: "Philippiens 4:13",
    text: "Je puis tout par celui qui me fortifie.",
  },
  {
    reference: "Romains 8:28",
    text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu.",
  },
  {
    reference: "Matthieu 11:28",
    text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
  },
  {
    reference: "Proverbes 3:5-6",
    text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.",
  },
];

const BibleEnLigne = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  return (
    <PageLayout
      title="Bible en ligne"
      subtitle="Parole de Dieu pour nourrir votre âme"
      backgroundImage={interieurBasilique}
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Rechercher dans la Bible
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Rechercher un verset, un mot, une phrase..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="burgundy">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bible Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Navigation
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Livre
                    </label>
                    <Select value={selectedBook} onValueChange={setSelectedBook}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un livre" />
                      </SelectTrigger>
                      <SelectContent className="max-h-64">
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          Ancien Testament
                        </div>
                        {bibleBooks.ancien.map((book) => (
                          <SelectItem key={book} value={book}>
                            {book}
                          </SelectItem>
                        ))}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                          Nouveau Testament
                        </div>
                        {bibleBooks.nouveau.map((book) => (
                          <SelectItem key={book} value={book}>
                            {book}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Chapitre
                    </label>
                    <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un chapitre" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            Chapitre {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="burgundy" className="w-full gap-2">
                    Lire
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="font-medium text-foreground mb-3">Accès rapide</h3>
                  <div className="space-y-2">
                    {["Évangile du jour", "Psaume du jour", "Lectures du dimanche"].map((link) => (
                      <button
                        key={link}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Verses */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Versets populaires
              </h2>

              <div className="grid gap-4">
                {popularVerses.map((verse, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                          {verse.reference}
                        </span>
                        <p className="text-foreground leading-relaxed italic">
                          "{verse.text}"
                        </p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-0 group-hover:opacity-100">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reading Plans */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Plans de lecture
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Lire la Bible en 1 an", days: "365 jours" },
                    { title: "Les Évangiles", days: "90 jours" },
                    { title: "Les Psaumes", days: "30 jours" },
                    { title: "Lettres de Saint Paul", days: "60 jours" },
                  ].map((plan, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors cursor-pointer group"
                    >
                      <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {plan.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{plan.days}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BibleEnLigne;
