import PageLayout from "@/components/PageLayout";
import { useState, useRef, useEffect } from "react";
import { Search, BookOpen, Heart, Volume2, VolumeX, Star, Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import interieurBasilique from "@/assets/interieur-basilique.jpg";

const prayerCategories = [
  "Toutes",
  "Prières quotidiennes",
  "Prières mariales",
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
];

// Configuration des voix pour la synthèse vocale
const getPreferredVoice = (voices: SpeechSynthesisVoice[]) => {
  // Chercher une voix française avec un timbre agréable
  const preferredVoices = [
    "Microsoft Paul - French (France)",
    "Google français",
    "French Female",
    "French Male",
    "Thomas",
    "Amélie",
  ];
  
  for (const preferred of preferredVoices) {
    const voice = voices.find(v => v.name.includes(preferred) || v.name === preferred);
    if (voice) return voice;
  }
  
  // Retourner la première voix française disponible
  return voices.find(v => v.lang.startsWith("fr")) || voices[0];
};

const Prieres = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [favorites, setFavorites] = useState<number[]>(
    prayers.filter((p) => p.isFavorite).map((p) => p.id)
  );
  const [speakingPrayerId, setSpeakingPrayerId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Charger les voix disponibles
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

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

  const speakPrayer = (prayer: typeof prayers[0]) => {
    if (!window.speechSynthesis) {
      toast({
        title: "Non supporté",
        description: "La synthèse vocale n'est pas supportée par votre navigateur.",
        variant: "destructive",
      });
      return;
    }

    // Si c'est la même prière, toggle pause/resume
    if (speakingPrayerId === prayer.id && speechRef.current) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    // Arrêter toute lecture en cours
    window.speechSynthesis.cancel();
    setIsPaused(false);

    // Créer une nouvelle utterance
    const utterance = new SpeechSynthesisUtterance(prayer.text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.85; // Légèrement plus lent pour une lecture méditative
    utterance.pitch = 0.95; // Légèrement plus grave pour un ton solennel
    utterance.volume = 1;

    // Sélectionner la meilleure voix disponible
    const preferredVoice = getPreferredVoice(voices);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setSpeakingPrayerId(prayer.id);
      toast({
        title: "🙏 Lecture de la prière",
        description: prayer.title,
      });
    };

    utterance.onend = () => {
      setSpeakingPrayerId(null);
      setIsPaused(false);
      speechRef.current = null;
    };

    utterance.onerror = () => {
      setSpeakingPrayerId(null);
      setIsPaused(false);
      speechRef.current = null;
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeakingPrayerId(null);
    setIsPaused(false);
    speechRef.current = null;
  };

  return (
    <PageLayout
      title="Prières"
      subtitle="Collection de prières pour votre vie spirituelle"
      backgroundImage={interieurBasilique}
    >
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mb-8 md:mb-12">
            <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-elegant border border-border">
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
                    className="text-xs sm:text-sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Prayers Grid */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {filteredPrayers.map((prayer) => (
              <div
                key={prayer.id}
                className={`bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-card border transition-all duration-300 ${
                  speakingPrayerId === prayer.id 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                      {prayer.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground truncate">
                      {prayer.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleFavorite(prayer.id)}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      favorites.includes(prayer.id)
                        ? "bg-secondary/20 text-secondary"
                        : "bg-muted text-muted-foreground hover:text-secondary"
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        favorites.includes(prayer.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className={`bg-muted/30 rounded-lg p-3 md:p-4 mb-4 transition-colors ${
                  speakingPrayerId === prayer.id ? "bg-primary/5" : ""
                }`}>
                  <p className="text-foreground whitespace-pre-line leading-relaxed italic text-sm md:text-base">
                    {prayer.text}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {speakingPrayerId === prayer.id ? (
                    <>
                      <Button
                        variant="burgundy"
                        size="sm"
                        className="gap-2"
                        onClick={() => speakPrayer(prayer)}
                      >
                        {isPaused ? (
                          <>
                            <Play className="w-4 h-4" />
                            <span className="hidden sm:inline">Reprendre</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-4 h-4" />
                            <span className="hidden sm:inline">Pause</span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={stopSpeaking}
                      >
                        <Square className="w-4 h-4" />
                        <span className="hidden sm:inline">Arrêter</span>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => speakPrayer(prayer)}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Écouter</span>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">En savoir plus</span>
                  </Button>
                </div>

                {/* Indicateur de lecture active */}
                {speakingPrayerId === prayer.id && !isPaused && (
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm">
                    <div className="flex gap-1">
                      <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="font-medium">Lecture en cours...</span>
                  </div>
                )}
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
