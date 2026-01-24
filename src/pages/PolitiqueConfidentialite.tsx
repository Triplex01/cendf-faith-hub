import { Shield, Lock, Eye, Database, UserCheck, Mail, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NewsletterSection from "@/components/NewsletterSection";

// Images
import cielImage from "@/assets/ciel-nuages.webp";

const PolitiqueConfidentialite = () => {
  const sections = [
    {
      icon: Database,
      title: "Données collectées",
      content: `Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services :
      
• **Informations d'identification** : nom, prénom, adresse email lors de l'inscription à notre newsletter ou formulaire de contact
• **Données de navigation** : adresse IP, type de navigateur, pages visitées (à des fins statistiques anonymisées)
• **Commentaires anonymes** : les messages laissés dans notre section FAQ sont anonymes par défaut

Nous ne collectons jamais de données sensibles sans votre consentement explicite.`
    },
    {
      icon: Eye,
      title: "Utilisation des données",
      content: `Vos données personnelles sont utilisées exclusivement pour :

• Vous envoyer notre newsletter si vous y êtes abonné
• Répondre à vos demandes de contact
• Améliorer nos services et notre site web
• Assurer la sécurité de notre plateforme

Nous ne vendons, ne louons et ne partageons jamais vos données personnelles avec des tiers à des fins commerciales.`
    },
    {
      icon: Lock,
      title: "Protection des données",
      content: `La CEDF met en œuvre des mesures de sécurité appropriées pour protéger vos données :

• Chiffrement SSL/TLS pour toutes les communications
• Accès restreint aux données personnelles
• Serveurs sécurisés et régulièrement mis à jour
• Formation du personnel au respect de la confidentialité

En cas de violation de données, nous vous en informerons dans les meilleurs délais conformément à la réglementation.`
    },
    {
      icon: UserCheck,
      title: "Vos droits",
      content: `Conformément à la législation en vigueur, vous disposez des droits suivants :

• **Droit d'accès** : obtenir une copie de vos données personnelles
• **Droit de rectification** : corriger des données inexactes
• **Droit à l'effacement** : demander la suppression de vos données
• **Droit d'opposition** : vous opposer au traitement de vos données
• **Droit à la portabilité** : recevoir vos données dans un format structuré

Pour exercer ces droits, contactez-nous à : privacy@cedf-ci.org`
    },
    {
      icon: Calendar,
      title: "Conservation des données",
      content: `Nous conservons vos données personnelles uniquement le temps nécessaire :

• **Abonnés newsletter** : jusqu'à votre désabonnement
• **Formulaires de contact** : 2 ans après le dernier échange
• **Données de navigation** : 13 mois maximum
• **Commentaires anonymes** : conservation indéfinie (données non identifiantes)

Au-delà de ces délais, les données sont supprimées ou anonymisées.`
    }
  ];

  return (
    <PageLayout 
      title="Politique de Confidentialité" 
      subtitle="Comment nous protégeons vos données personnelles"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={cielImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-primary border-primary">
              <Shield className="w-4 h-4 mr-2" />
              Protection des données
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Politique de <span className="text-gradient-gold">Confidentialité</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              La Commission Épiscopale pour la Doctrine de la Foi en Côte d'Ivoire s'engage 
              à protéger votre vie privée et vos données personnelles.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Dernière mise à jour : 13 janvier 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                        {section.title}
                      </h2>
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-card">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-2xl">🍪</span> Politique des Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                    Voici les types de cookies que nous utilisons :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground mb-2">✅ Cookies essentiels</h4>
                      <p className="text-sm">Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground mb-2">📊 Cookies analytiques</h4>
                      <p className="text-sm">Nous aident à comprendre comment vous utilisez le site (anonymisés).</p>
                    </div>
                  </div>
                  <p className="mt-4">
                    Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Une question sur vos données ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Notre délégué à la protection des données est à votre disposition pour répondre 
              à toutes vos questions concernant la confidentialité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@cedf-ci.org" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                privacy@cedf-ci.org
              </a>
            </div>
          </div>
        </div>
      </section>

      <Separator />
      
      <NewsletterSection variant="compact" />
    </PageLayout>
  );
};

export default PolitiqueConfidentialite;
