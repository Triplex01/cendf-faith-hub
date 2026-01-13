import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSectionProps {
  variant?: "default" | "compact" | "footer";
  title?: string;
  subtitle?: string;
}

const NewsletterSection = ({ 
  variant = "default", 
  title = "Restez informé", 
  subtitle = "Recevez les dernières actualités et enseignements de la CEDF" 
}: NewsletterSectionProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulation d'abonnement
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt nos actualités par email.",
      });
      setEmail("");
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

  if (variant === "compact") {
    return (
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-display font-bold text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        
        {isSubscribed ? (
          <div className="flex items-center gap-2 text-secondary">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Merci pour votre inscription !</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" variant="burgundy" size="icon" disabled={isSubmitting}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="space-y-4">
        <h4 className="font-display font-bold text-lg text-primary-foreground">Newsletter</h4>
        <p className="text-sm text-primary-foreground/70">{subtitle}</p>
        
        {isSubscribed ? (
          <div className="flex items-center gap-2 text-gold">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Inscrit !</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="gold" size="icon" disabled={isSubmitting}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    );
  }

  // Default variant - full section
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {title}
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            {subtitle}
          </p>
          
          {isSubscribed ? (
            <div className="flex items-center justify-center gap-3 text-gold">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Merci pour votre inscription !</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-primary-foreground text-foreground border-0 h-12"
              />
              <Button 
                type="submit" 
                variant="gold" 
                size="lg" 
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  "Inscription..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    S'abonner
                  </>
                )}
              </Button>
            </form>
          )}
          
          <p className="text-primary-foreground/60 text-xs mt-4">
            En vous inscrivant, vous acceptez de recevoir nos communications. 
            Vous pouvez vous désinscrire à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
