import { Building, Scale, Globe, FileText, Users, AlertCircle, ExternalLink } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import NewsletterSection from "@/components/NewsletterSection";

// Images
import statueImage from "@/assets/statue-saint-pierre.jpg";

const MentionsLegales = () => {
  return (
    <PageLayout 
      title="Mentions Légales" 
      subtitle="Informations légales et conditions d'utilisation"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={statueImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary">
              <Scale className="w-4 h-4 mr-2" />
              Informations légales
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mentions <span className="text-gradient-gold">Légales</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Toutes les informations légales relatives au site web de la Commission 
              Épiscopale pour la Doctrine de la Foi de Côte d'Ivoire.
            </p>
          </div>
        </div>
      </section>

      {/* Éditeur */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Éditeur du site
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Dénomination :</span>
                          <p className="font-semibold text-foreground">Commission Épiscopale pour la Doctrine de la Foi de Côte d'Ivoire (CEDF-CI)</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Statut juridique :</span>
                          <p className="font-semibold text-foreground">Association religieuse à but non lucratif</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Siège social :</span>
                          <p className="font-semibold text-foreground">Plateau, Abidjan, Côte d'Ivoire</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Téléphone :</span>
                          <p className="font-semibold text-foreground">+225 27 22 44 81 38</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Email :</span>
                          <p className="font-semibold text-foreground">contact@cedf-ci.org</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Directeur de publication :</span>
                          <p className="font-semibold text-foreground">Le Président de la Commission</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hébergement */}
            <Card className="border-border/50 mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <Globe className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Hébergement
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Ce site est hébergé par des services cloud modernes garantissant 
                      sécurité et disponibilité optimales.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Localisation des serveurs :</span>
                        <p className="font-semibold text-foreground">Union Européenne</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Certificat SSL :</span>
                        <p className="font-semibold text-foreground">Let's Encrypt (256-bit)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Propriété intellectuelle */}
            <Card className="border-border/50 mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/20 rounded-xl">
                    <FileText className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Propriété intellectuelle
                    </h2>
                    <div className="text-muted-foreground space-y-4">
                      <p>
                        L'ensemble du contenu de ce site (textes, images, vidéos, logos, éléments graphiques) 
                        est protégé par le droit de la propriété intellectuelle et appartient à la CEDF-CI 
                        ou à ses partenaires.
                      </p>
                      <p>
                        <strong className="text-foreground">Utilisation autorisée :</strong> Les contenus peuvent 
                        être utilisés à des fins personnelles, éducatives ou pastorales, sous réserve de citer 
                        la source (© CEDF Côte d'Ivoire).
                      </p>
                      <p>
                        <strong className="text-foreground">Utilisation interdite :</strong> Toute reproduction, 
                        modification ou utilisation commerciale sans autorisation préalable écrite est strictement interdite.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditions d'utilisation */}
            <Card className="border-border/50 mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Conditions d'utilisation
                    </h2>
                    <div className="text-muted-foreground space-y-4">
                      <p>
                        En accédant à ce site, vous acceptez les présentes conditions d'utilisation. 
                        La CEDF-CI se réserve le droit de les modifier à tout moment.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Ce que vous pouvez faire</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Consulter librement le contenu</li>
                            <li>• Partager les liens vers nos articles</li>
                            <li>• Télécharger les documents publics</li>
                            <li>• Laisser des commentaires constructifs</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Ce qui est interdit</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Contenu haineux ou diffamatoire</li>
                            <li>• Utilisation commerciale non autorisée</li>
                            <li>• Tentatives de piratage</li>
                            <li>• Usurpation d'identité</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Responsabilité */}
            <Card className="border-border/50 mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Limitation de responsabilité
                    </h2>
                    <div className="text-muted-foreground space-y-4">
                      <p>
                        La CEDF-CI s'efforce de fournir des informations exactes et à jour. Toutefois, 
                        elle ne peut garantir l'exactitude, la complétude ou l'actualité des informations 
                        diffusées sur ce site.
                      </p>
                      <p>
                        <strong className="text-foreground">Liens externes :</strong> Ce site peut contenir 
                        des liens vers des sites tiers. La CEDF-CI n'exerce aucun contrôle sur ces sites 
                        et décline toute responsabilité quant à leur contenu.
                      </p>
                      <p>
                        <strong className="text-foreground">Disponibilité :</strong> Nous nous efforçons de 
                        maintenir le site accessible 24h/24, mais ne pouvons garantir une disponibilité 
                        ininterrompue en cas de maintenance ou de force majeure.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Droit applicable */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Droit applicable et juridiction
                    </h2>
                    <p className="text-muted-foreground">
                      Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige, 
                      et après échec de toute tentative de recherche d'une solution amiable, les tribunaux 
                      d'Abidjan seront seuls compétents.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Documents connexes
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/confidentialite" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                Politique de confidentialité
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Link>
              <Link 
                to="/faq" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <Users className="w-4 h-4 text-primary" />
                FAQ
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <Globe className="w-4 h-4 text-primary" />
                Nous contacter
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator />
      
      <NewsletterSection variant="compact" />
    </PageLayout>
  );
};

export default MentionsLegales;
