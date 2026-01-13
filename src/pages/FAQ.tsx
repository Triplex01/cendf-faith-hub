import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import NewsletterSection from "@/components/NewsletterSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Church, 
  BookOpen, 
  Users, 
  Globe, 
  Radio, 
  MessageSquare,
  Send,
  CheckCircle,
  Shield
} from "lucide-react";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: "À propos de la CEDF",
    question: "Qu'est-ce que la CEDF ?",
    answer: "La Commission Épiscopale pour la Doctrine de la Foi (CEDF) est un organe de la Conférence des Évêques Catholiques de Côte d'Ivoire (CECCI). Elle veille à l'intégrité de la doctrine catholique et promeut une formation solide des fidèles."
  },
  {
    category: "À propos de la CEDF",
    question: "Quelle est la mission principale de la CEDF ?",
    answer: "La CEDF a pour missions principales : garder et promouvoir la pureté de la doctrine catholique, former les fidèles à une foi éclairée, accompagner spirituellement les communautés chrétiennes, et évangéliser dans le respect des cultures africaines."
  },
  {
    category: "À propos de la CEDF",
    question: "Comment la CEDF est-elle organisée ?",
    answer: "La CEDF est dirigée par un président (généralement un évêque), assisté d'un secrétaire et de membres issus des différents diocèses de Côte d'Ivoire. Elle travaille en communion avec le Saint-Siège et la CECCI."
  },
  {
    category: "Formation et enseignements",
    question: "Comment accéder aux enseignements de la CEDF ?",
    answer: "Vous pouvez accéder à nos enseignements via la section 'Enseignements' de notre site, écouter nos émissions radio, ou participer aux sessions de formation organisées dans les diocèses."
  },
  {
    category: "Formation et enseignements",
    question: "La CEDF propose-t-elle des formations pour les catéchistes ?",
    answer: "Oui, la CEDF accompagne les diocèses dans la formation des catéchistes. Des programmes spécifiques sont organisés régulièrement pour approfondir la connaissance de la foi et les méthodes pédagogiques."
  },
  {
    category: "Formation et enseignements",
    question: "Où trouver les documents officiels de l'Église ?",
    answer: "Tous les documents magistériels (encycliques, lettres pastorales, décrets) sont disponibles dans notre section 'Documents & Archives'. Vous pouvez les consulter et les télécharger gratuitement."
  },
  {
    category: "Radio et médias",
    question: "Comment écouter les radios catholiques partenaires ?",
    answer: "Nos radios partenaires (Radio Espoir, La Voix de l'Évangile, Radio Paix Sanwi) sont accessibles en direct depuis notre page 'Émissions & Radio'. Vous pouvez également écouter les podcasts et replays."
  },
  {
    category: "Radio et médias",
    question: "Puis-je proposer un témoignage ou une question à diffuser ?",
    answer: "Absolument ! Vous pouvez nous contacter via le formulaire de contact ou envoyer un email à contact@cedf-ci.org. Les témoignages et questions pertinentes peuvent être diffusés dans nos émissions."
  },
  {
    category: "Vie spirituelle",
    question: "Comment puis-je approfondir ma vie de prière ?",
    answer: "Notre section 'Vie Spirituelle' propose des prières quotidiennes, le saint du jour, et le calendrier liturgique. Nous vous encourageons aussi à participer aux célébrations eucharistiques et aux temps de prière communautaire."
  },
  {
    category: "Vie spirituelle",
    question: "La CEDF organise-t-elle des pèlerinages ?",
    answer: "En collaboration avec les diocèses, la CEDF participe à l'organisation de pèlerinages diocésains et nationaux, notamment vers la Basilique Notre-Dame de la Paix de Yamoussoukro."
  },
  {
    category: "Contact et participation",
    question: "Comment contacter la CEDF ?",
    answer: "Vous pouvez nous contacter par email (contact@cedf-ci.org), par téléphone, ou via le formulaire de contact sur notre site. Nos bureaux sont situés à Abidjan, Plateau."
  },
  {
    category: "Contact et participation",
    question: "Comment puis-je soutenir les activités de la CEDF ?",
    answer: "Vous pouvez soutenir la CEDF par vos prières, votre participation aux activités, et vos dons. Visitez notre boutique ou contactez-nous pour plus d'informations sur les modalités de soutien."
  },
];

const categories = [
  { name: "Tous", icon: HelpCircle },
  { name: "À propos de la CEDF", icon: Church },
  { name: "Formation et enseignements", icon: BookOpen },
  { name: "Radio et médias", icon: Radio },
  { name: "Vie spirituelle", icon: Users },
  { name: "Contact et participation", icon: Globe },
];

const FAQ = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<{ text: string; date: string }[]>([
    { text: "Merci pour ces explications claires sur la mission de l'Église !", date: "Il y a 2 jours" },
    { text: "J'apprécie beaucoup les enseignements de la CEDF. Que Dieu vous bénisse.", date: "Il y a 5 jours" },
    { text: "Comment puis-je devenir catéchiste dans ma paroisse ?", date: "Il y a 1 semaine" },
  ]);

  const filteredFAQ = selectedCategory === "Tous" 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setComments([
        { text: comment, date: "À l'instant" },
        ...comments
      ]);
      
      toast({
        title: "Commentaire envoyé !",
        description: "Merci pour votre contribution. Votre message a été publié.",
      });
      
      setComment("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Foire Aux Questions"
      subtitle="Trouvez des réponses à vos questions sur la CEDF et ses missions"
      backgroundImage={basiliqueYamoussoukro}
    >
      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50 text-foreground"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">
                          {item.category}
                        </span>
                        <span className="font-display font-bold text-foreground">
                          {item.question}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-8">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Anonymous Comments Section */}
      <section className="py-16 bg-gradient-divine">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
                <MessageSquare className="w-4 h-4" />
                Espace Communautaire
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Partagez vos Réflexions
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Laissez un commentaire anonyme, posez une question ou partagez votre témoignage 
                avec notre communauté de foi.
              </p>
            </div>

            {/* Comment Form */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Commentaire anonyme</h4>
                  <p className="text-xs text-muted-foreground">Votre identité reste confidentielle</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <Textarea
                  placeholder="Partagez vos réflexions, questions ou témoignages..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                  required
                />
                <Button
                  type="submit"
                  variant="burgundy"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publier mon commentaire
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Commentaires récents ({comments.length})
              </h3>
              
              {comments.map((c, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors"
                >
                  <p className="text-foreground mb-3">{c.text}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span>Visiteur anonyme</span>
                    <span>•</span>
                    <span>{c.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection 
        title="Restez connecté à la CEDF"
        subtitle="Recevez les dernières actualités, enseignements et événements directement dans votre boîte mail"
      />
    </PageLayout>
  );
};

export default FAQ;
