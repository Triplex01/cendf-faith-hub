import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Youtube, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logoCendf from "@/assets/logo-cendf.png";

const quickLinks = [{
  name: "Enseignements",
  href: "/enseignements"
}, {
  name: "Documents",
  href: "/documents-archives"
}, {
  name: "Radio Live",
  href: "/radio"
}, {
  name: "Actualités",
  href: "/actualites"
}, {
  name: "FAQ",
  href: "/faq"
}];

const resourceLinks = [{
  name: "Bible en ligne",
  href: "/bible"
}, {
  name: "Prières",
  href: "/prieres"
}, {
  name: "Calendrier liturgique",
  href: "/calendrier-liturgique"
}, {
  name: "Saint du jour",
  href: "/saint-du-jour"
}, {
  name: "Boutique",
  href: "/boutique"
}, {
  name: "Contact",
  href: "/contact"
}];
const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

  return (
    <footer id="apropos" className="bg-foreground text-primary-foreground">
      {/* Newsletter Bar */}
      <div className="bg-primary/90 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display font-bold text-xl text-primary-foreground mb-1">
                Restez informé
              </h4>
              <p className="text-primary-foreground/80 text-sm">
                Recevez les dernières actualités et enseignements de la CEDF
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-primary-foreground text-foreground border-0"
              />
              <Button type="submit" variant="gold" disabled={isSubmitting} className="gap-2">
                <Send className="w-4 h-4" />
                {isSubmitting ? "..." : "S'abonner"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src={logoCendf} alt="CEDF" className="h-16 w-auto object-contain bg-primary-foreground/90 rounded-lg p-2" />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">
              Commission Épiscopale pour la Doctrine de la Foi de Côte d'Ivoire - Au service de la communauté 
              catholique pour la promotion et la sauvegarde de la foi.
            </p>
            <div className="flex items-center gap-3">
              {[{
              Icon: Facebook,
              href: "#"
            }, {
              Icon: Twitter,
              href: "#"
            }, {
              Icon: Youtube,
              href: "#"
            }, {
              Icon: Instagram,
              href: "#"
            }].map(({
              Icon,
              href
            }, index) => <a key={index} href={href} className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Ressources</h4>
            <ul className="space-y-3">
              {resourceLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/70">Plateau, Abidjan<br />Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">+225 27 22 44 81 38</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">contact@cedf-ci.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">Lun - Ven: 8h - 17h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50 text-center md:text-left">
            © 2024 CEDF - Commission Épiscopale pour la Doctrine de la Foi de Côte d'Ivoire. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
              FAQ
            </Link>
            <Link to="/mentions-legales" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;