import PageLayout from "@/components/PageLayout";
import { Calendar, BookOpen, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import basiliqueRome from "@/assets/basilique-rome.jpg";

// Données de démonstration pour les saints
const todaySaint = {
  name: "Saint Jean l'Évangéliste",
  date: "27 décembre",
  title: "Apôtre et Évangéliste",
  image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop",
  biography: `Saint Jean l'Évangéliste, aussi appelé le "disciple bien-aimé", fut l'un des douze apôtres de Jésus-Christ. 
  Fils de Zébédée et frère de Jacques, il fut témoin des moments les plus importants de la vie du Christ : 
  la Transfiguration, l'agonie au jardin de Gethsémani et la Crucifixion.
  
  C'est à lui que Jésus confia sa mère Marie au pied de la croix. Jean est l'auteur du quatrième Évangile, 
  de trois épîtres et de l'Apocalypse. Son Évangile commence par le célèbre Prologue : 
  "Au commencement était le Verbe, et le Verbe était auprès de Dieu, et le Verbe était Dieu."
  
  Il vécut jusqu'à un âge avancé à Éphèse, où il aurait été le pasteur de nombreuses communautés chrétiennes. 
  La tradition rapporte qu'il mourut paisiblement, seul apôtre à ne pas avoir subi le martyre.`,
  prayer: `Dieu tout-puissant, par l'intercession de saint Jean l'Évangéliste, 
  accorde-nous de comprendre les mystères de ta Parole et de vivre dans ton amour. 
  Par Jésus-Christ, notre Seigneur. Amen.`,
  scripture: {
    reference: "Jean 21:24",
    text: "C'est ce disciple qui rend témoignage de ces choses et qui les a écrites. Et nous savons que son témoignage est vrai.",
  },
};

const upcomingSaints = [
  { date: "28 décembre", name: "Saints Innocents", title: "Martyrs" },
  { date: "29 décembre", name: "Saint Thomas Becket", title: "Évêque et Martyr" },
  { date: "30 décembre", name: "Sainte Famille", title: "Jésus, Marie et Joseph" },
  { date: "31 décembre", name: "Saint Sylvestre", title: "Pape" },
  { date: "1er janvier", name: "Sainte Marie, Mère de Dieu", title: "Solennité" },
];

const SaintDuJour = () => {
  return (
    <PageLayout
      title="Saint du jour"
      subtitle="Découvrez les saints et bienheureux célébrés aujourd'hui"
      backgroundImage={basiliqueRome}
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Saint Card */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl overflow-hidden shadow-elegant border border-border">
                {/* Saint Image */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={todaySaint.image}
                    alt={todaySaint.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-semibold mb-2">
                      <Calendar className="w-4 h-4" />
                      {todaySaint.date}
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                      {todaySaint.name}
                    </h1>
                    <p className="text-primary-foreground/80 mt-1">{todaySaint.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Biography */}
                  <div className="mb-8">
                    <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Biographie
                    </h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      {todaySaint.biography.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Scripture */}
                  <div className="mb-8 p-6 bg-primary/5 rounded-xl border-l-4 border-primary">
                    <p className="text-foreground italic text-lg leading-relaxed mb-2">
                      "{todaySaint.scripture.text}"
                    </p>
                    <span className="text-primary font-semibold">
                      — {todaySaint.scripture.reference}
                    </span>
                  </div>

                  {/* Prayer */}
                  <div className="mb-8">
                    <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-burgundy" />
                      Prière
                    </h2>
                    <p className="text-muted-foreground leading-relaxed italic bg-muted/30 p-4 rounded-lg">
                      {todaySaint.prayer}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="burgundy" className="gap-2">
                      <Heart className="w-4 h-4" />
                      Ajouter aux favoris
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Partager
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Calendar Widget */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border mb-6">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Calendrier des saints
                </h2>
                <div className="space-y-3">
                  {upcomingSaints.map((saint, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <span className="text-xs text-gold font-semibold uppercase tracking-wide">
                        {saint.date}
                      </span>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {saint.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{saint.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Autres ressources
                </h2>
                <div className="space-y-2">
                  {[
                    "Évangile du jour",
                    "Prière du matin",
                    "Prière du soir",
                    "Liturgie des heures",
                    "Calendrier liturgique",
                  ].map((link) => (
                    <button
                      key={link}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </button>
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

export default SaintDuJour;
