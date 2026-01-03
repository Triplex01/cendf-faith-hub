import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Cross, 
  Heart, 
  Church, 
  Users, 
  ArrowLeft,
  Play,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ChevronRight,
  Video
} from "lucide-react";
import teachingImage from "@/assets/teaching-priest.jpg";
import basiliquImage from "@/assets/basilique-notredame.jpg";
import reunionImage from "@/assets/reunion-eglise.jpg";

// Données des enseignements par catégorie
const enseignementsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  image: string;
  videos: Array<{
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    youtubeId: string;
    transcript: string;
  }>;
  articles: Array<{
    title: string;
    excerpt: string;
    content: string;
  }>;
}> = {
  "fondements-foi": {
    title: "Fondements de la Foi Chrétienne",
    subtitle: "Les bases essentielles de notre foi catholique",
    description: "Découvrez les piliers fondamentaux de la foi chrétienne catholique : le Credo, les sacrements, la Tradition apostolique et les enseignements du Magistère.",
    icon: Cross,
    image: teachingImage,
    videos: [
      {
        id: "1",
        title: "Introduction au Credo Catholique",
        duration: "25:30",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `Le Credo, ou Symbole des Apôtres, est la profession de foi fondamentale de l'Église catholique. Il résume les vérités essentielles que tout chrétien doit croire.

**Je crois en Dieu, le Père tout-puissant**
Cette première affirmation reconnaît Dieu comme Créateur de toutes choses, visible et invisible. Le Père est la première personne de la Sainte Trinité.

**Et en Jésus-Christ, son Fils unique, notre Seigneur**
Jésus est le Fils éternel de Dieu, engendré et non créé, de même nature que le Père. Il s'est incarné pour notre salut.

**L'Église catholique, la communion des saints**
L'Église est le Corps mystique du Christ sur terre. La communion des saints unit tous les fidèles, vivants et défunts, dans la charité du Christ.`
      },
      {
        id: "2",
        title: "Les Sept Sacrements de l'Église",
        duration: "32:15",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `Les sept sacrements sont les signes efficaces de la grâce, institués par le Christ et confiés à l'Église.

**1. Le Baptême**
Premier sacrement de l'initiation chrétienne, il efface le péché originel et fait de nous des enfants de Dieu.

**2. La Confirmation**
Elle parfait la grâce du baptême et nous donne la force de l'Esprit Saint pour témoigner de notre foi.

**3. L'Eucharistie**
Source et sommet de la vie chrétienne, elle rend présent le sacrifice du Christ.

**4. La Réconciliation**
Le sacrement du pardon restaure notre communion avec Dieu après le péché.

**5. L'Onction des malades**
Elle apporte réconfort et guérison spirituelle aux malades.

**6. L'Ordre**
Il consacre des hommes au ministère de l'Église.

**7. Le Mariage**
L'union sacrée entre un homme et une femme devant Dieu.`
      }
    ],
    articles: [
      {
        title: "La Sainte Trinité expliquée",
        excerpt: "Comprendre le mystère des trois personnes en un seul Dieu",
        content: "La doctrine de la Trinité est au cœur de la foi chrétienne..."
      },
      {
        title: "Le mystère de l'Incarnation",
        excerpt: "Comment Dieu s'est fait homme en Jésus-Christ",
        content: "L'Incarnation est l'événement central de l'histoire du salut..."
      }
    ]
  },
  "etudes-bibliques": {
    title: "Études Bibliques",
    subtitle: "Approfondir les Saintes Écritures",
    description: "Plongez dans l'étude de la Bible avec des commentaires, des analyses et des réflexions sur les textes sacrés de l'Ancien et du Nouveau Testament.",
    icon: BookOpen,
    image: basiliquImage,
    videos: [
      {
        id: "1",
        title: "Introduction à l'Évangile selon Saint Jean",
        duration: "28:45",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `L'Évangile selon Saint Jean est le quatrième évangile canonique. Il se distingue des synoptiques par sa théologie plus profonde.

**Le Prologue (Jean 1, 1-18)**
"Au commencement était le Verbe, et le Verbe était auprès de Dieu, et le Verbe était Dieu."

Ce prologue majestueux présente Jésus comme le Logos éternel, la Parole créatrice de Dieu faite chair.

**Les sept signes**
Jean structure son évangile autour de sept miracles (signes) qui révèlent la gloire divine de Jésus :
1. Les noces de Cana
2. Guérison du fils du fonctionnaire royal
3. Guérison du paralytique à Bethesda
4. Multiplication des pains
5. Marche sur les eaux
6. Guérison de l'aveugle-né
7. Résurrection de Lazare`
      },
      {
        id: "2",
        title: "Les Psaumes : prière d'Israël, prière de l'Église",
        duration: "35:20",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `Le livre des Psaumes contient 150 prières qui expriment toute la gamme des émotions humaines devant Dieu.

**Les différents types de psaumes :**

**Psaumes de louange** (ex: Ps 150)
Ils célèbrent la grandeur et la bonté de Dieu.

**Psaumes de lamentation** (ex: Ps 22)
Ils expriment la détresse et l'espérance en Dieu.

**Psaumes royaux** (ex: Ps 110)
Ils annoncent le Messie et son règne éternel.

**Psaumes de sagesse** (ex: Ps 1)
Ils enseignent le chemin de la vie juste.`
      }
    ],
    articles: [
      {
        title: "Comment lire la Bible en catholique",
        excerpt: "Les quatre sens de l'Écriture selon la Tradition",
        content: "La lecture catholique de la Bible suit une méthode héritée des Pères de l'Église..."
      }
    ]
  },
  "vie-spirituelle": {
    title: "Vie Spirituelle",
    subtitle: "Croître dans la prière et la sainteté",
    description: "Apprenez à développer une vie de prière profonde, à pratiquer les vertus chrétiennes et à progresser sur le chemin de la sainteté.",
    icon: Heart,
    image: reunionImage,
    videos: [
      {
        id: "1",
        title: "La prière contemplative",
        duration: "22:10",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `La prière contemplative est le sommet de la vie spirituelle chrétienne. Elle nous conduit à l'union avec Dieu.

**Les étapes de la vie spirituelle :**

**1. La voie purgative**
C'est le temps de la purification des péchés et des attachements désordonnés.

**2. La voie illuminative**
L'âme progresse dans les vertus et reçoit des lumières divines.

**3. La voie unitive**
C'est l'union mystique avec Dieu, où l'âme vit en Dieu et Dieu en elle.

**Comment pratiquer :**
- Choisir un lieu calme
- Se mettre en présence de Dieu
- Répéter une parole simple (prière du cœur)
- Rester dans le silence aimant`
      }
    ],
    articles: [
      {
        title: "Les trois degrés de l'humilité",
        excerpt: "Saint Ignace de Loyola nous guide vers la liberté intérieure",
        content: "L'humilité est la fondation de toute vie spirituelle authentique..."
      }
    ]
  },
  "liturgie": {
    title: "Liturgie et Sacrements",
    subtitle: "Vivre pleinement les célébrations",
    description: "Comprenez la richesse de la liturgie catholique, ses symboles, ses rites et comment participer activement aux célébrations.",
    icon: Church,
    image: teachingImage,
    videos: [
      {
        id: "1",
        title: "Comprendre la Messe",
        duration: "40:00",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `La Messe est le sommet de la vie chrétienne. Elle rend présent le sacrifice du Christ sur la Croix.

**Structure de la Messe :**

**I. Rites d'entrée**
- Procession d'entrée
- Signe de croix et salutation
- Acte pénitentiel
- Gloire à Dieu (sauf en Carême et Avent)
- Oraison d'ouverture

**II. Liturgie de la Parole**
- Première lecture (Ancien Testament)
- Psaume responsorial
- Deuxième lecture (épîtres)
- Évangile
- Homélie
- Profession de foi
- Prière universelle

**III. Liturgie eucharistique**
- Offertoire
- Prière eucharistique
- Consécration
- Notre Père
- Fraction du pain
- Communion

**IV. Rites de conclusion**
- Annonces
- Bénédiction
- Envoi`
      }
    ],
    articles: []
  },
  "vie-familiale": {
    title: "Vie Familiale Chrétienne",
    subtitle: "La famille, église domestique",
    description: "Découvrez comment vivre la foi en famille, éduquer les enfants dans la foi et construire un foyer chrétien.",
    icon: Users,
    image: reunionImage,
    videos: [
      {
        id: "1",
        title: "Éduquer les enfants dans la foi",
        duration: "30:15",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        youtubeId: "dQw4w9WgXcQ",
        transcript: `La famille est le premier lieu de transmission de la foi. Les parents sont les premiers catéchistes de leurs enfants.

**Conseils pratiques :**

**1. La prière en famille**
Priez ensemble matin et soir. Le chapelet familial est une tradition précieuse.

**2. La lecture de la Bible**
Lisez des histoires bibliques adaptées à l'âge des enfants.

**3. L'exemple des parents**
Les enfants apprennent plus par l'exemple que par les paroles.

**4. Les fêtes liturgiques**
Célébrez les grandes fêtes : Noël, Pâques, les fêtes patronales...

**5. Les sacrements**
Préparez les enfants aux sacrements avec amour et attention.`
      }
    ],
    articles: [
      {
        title: "Le sacrement du mariage",
        excerpt: "Comprendre l'alliance conjugale devant Dieu",
        content: "Le mariage chrétien est un sacrement qui unit l'homme et la femme..."
      }
    ]
  }
};

const EnseignementDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const enseignement = enseignementsData[slug || ""] || enseignementsData["fondements-foi"];
  const IconComponent = enseignement.icon;

  return (
    <PageLayout 
      title={enseignement.title}
      subtitle={enseignement.subtitle}
      backgroundImage={enseignement.image}
    >
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/enseignements" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux enseignements
            </Link>
          </div>

          {/* Description */}
          <div className="bg-card rounded-2xl p-8 mb-12 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                  {enseignement.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {enseignement.description}
                </p>
              </div>
            </div>
          </div>

          {/* Vidéos d'enseignement */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Video className="w-6 h-6 text-primary" />
              Vidéos d'enseignement
            </h2>
            
            <div className="space-y-12">
              {enseignement.videos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Video Player */}
                    <div className="relative aspect-video lg:aspect-auto bg-muted">
                      <iframe
                        className="w-full h-full min-h-[300px]"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    {/* Transcript */}
                    <div className="p-6 lg:p-8 overflow-y-auto max-h-[500px]">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          Épisode {index + 1}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {video.duration}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-foreground mb-4">
                        {video.title}
                      </h3>
                      
                      <div className="prose prose-sm max-w-none">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Résumé de l'enseignement
                        </h4>
                        <div className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">
                          {video.transcript}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Share2 className="w-4 h-4" />
                          Partager
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Bookmark className="w-4 h-4" />
                          Sauvegarder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Articles complémentaires */}
          {enseignement.articles.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Articles complémentaires
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {enseignement.articles.map((article, index) => (
                  <div 
                    key={index}
                    className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors cursor-pointer group"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                      Lire l'article
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Autres catégories */}
          <div className="bg-gradient-burgundy rounded-2xl p-8 md:p-12 text-primary-foreground">
            <h2 className="font-display text-2xl font-bold mb-6">
              Explorer d'autres enseignements
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(enseignementsData)
                .filter(([key]) => key !== slug)
                .slice(0, 4)
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
