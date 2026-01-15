import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Facebook, 
  Youtube 
} from "lucide-react";
import reunionImage from "@/assets/reunion-eglise.jpg";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: ["Commission Épiscopale pour la Doctrine de la Foi", "Archidiocèse d'Abidjan - Plateau", "8XMH+5X9, Abidjan, Côte d'Ivoire"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: ["+225 27 22 44 81 38", "+225 07 07 07 07 07"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@cedf-ci.org", "info@radioespoir.ci"],
  },
  {
    icon: Clock,
    title: "Horaires",
    details: ["Lundi - Vendredi: 8h - 17h", "Samedi: 9h - 12h"],
  },
];

// Coordonnées Google Maps - CENDF Abidjan
const mapCoordinates = {
  lat: 5.333056,
  lng: -4.02,
  zoom: 17
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  // Protection anti-spam
  const [honeypot, setHoneypot] = useState(""); // Champ invisible pour les bots
  const [formStartTime, setFormStartTime] = useState<number>(0); // Temps minimum pour remplir
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Enregistrer le moment où le formulaire est affiché
    setFormStartTime(Date.now());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Validation basique anti-spam
  const validateSubmission = (): { valid: boolean; message?: string } => {
    // Vérifier le honeypot (les bots remplissent ce champ invisible)
    if (honeypot) {
      logger.warn("Honeypot triggered - spam detected");
      return { valid: false, message: "Erreur de validation" };
    }

    // Vérifier le temps minimum (moins de 3 secondes = probablement un bot)
    const timeTaken = Date.now() - formStartTime;
    if (timeTaken < 3000) {
      logger.warn("Form submitted too fast - spam detected");
      return { valid: false, message: "Veuillez patienter quelques secondes avant d'envoyer" };
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { valid: false, message: "Veuillez entrer une adresse email valide" };
    }

    // Vérifier les liens suspects dans le message
    const suspiciousPatterns = /\[url=|<a\s+href=|http[s]?:\/\/[^\s]{50,}/gi;
    if (suspiciousPatterns.test(formData.message)) {
      logger.warn("Suspicious patterns in message - potential spam");
      return { valid: false, message: "Le message contient des éléments non autorisés" };
    }

    // Vérifier la longueur minimale
    if (formData.name.trim().length < 2) {
      return { valid: false, message: "Le nom doit contenir au moins 2 caractères" };
    }

    if (formData.subject.trim().length < 3) {
      return { valid: false, message: "Le sujet doit contenir au moins 3 caractères" };
    }

    if (formData.message.trim().length < 10) {
      return { valid: false, message: "Le message doit contenir au moins 10 caractères" };
    }

    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation anti-spam
    const validation = validateSubmission();
    if (!validation.valid) {
      toast({
        title: "Erreur de validation",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone?.trim() || undefined,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Réinitialiser le timer anti-spam
      setFormStartTime(Date.now());
    } catch (error: unknown) {
      logger.error("Error sending message", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Contact"
      subtitle="Restons en communion"
      backgroundImage={reunionImage}
    >
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Envoyez-nous un message
              </h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - invisible pour les humains, visible pour les bots */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">
                    Ne pas remplir ce champ
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                      maxLength={100}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+225 XX XX XX XX"
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Objet de votre message"
                      required
                      minLength={3}
                      maxLength={150}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Écrivez votre message ici..."
                    rows={6}
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </div>

                <Button
                  type="submit"
                  variant="burgundy"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Informations de contact
                </h2>
                
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-burgundy flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-display font-bold text-foreground mb-4">
                  Suivez-nous
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-xl overflow-hidden border border-border h-64 md:h-80">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.8!2d${mapCoordinates.lng}!3d${mapCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb03ebfdb63d%3A0x8c8c8c8c8c8c8c8c!2s8XMH%2B5X9%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1704067200000!5m2!1sfr!2sci`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation CEDF Abidjan"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
