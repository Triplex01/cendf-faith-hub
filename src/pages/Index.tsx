import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import NewsSection from "@/components/NewsSection";

import DocumentsArchivesSection from "@/components/DocumentsArchivesSection";
import RadiosSection from "@/components/RadiosSection";
import EventsCitationsSection from "@/components/EventsCitationsSection";
import PodcastSection from "@/components/PodcastSection";
import ProgramSection from "@/components/ProgramSection";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";


import SEO from "@/components/SEO";
import { OrganizationSchema, WebsiteSchema, RadioStationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="CEDF — Église Catholique en Côte d'Ivoire | Doctrine, Théologie & Liturgie"
        description="CEDF Côte d'Ivoire : Commission Épiscopale pour la Doctrine de la Foi. Enseignements catholiques, théologie, liturgie romaine, magistère de l'Église, encycliques, magazine Credo, Radio Espoir 102.8 FM, prières, catéchèse et actualités du Vatican."
        keywords="CEDF, CEDF Côte d'Ivoire, cedfci, Église catholique Côte d'Ivoire, doctrine catholique, théologie catholique, philosophie chrétienne, liturgie romaine, magistère, Saint-Siège, Vatican, Pape Léon XIV, encyclique, Magnifica Humanitas, catéchèse, évangélisation, foi catholique, Conférence Épiscopale Côte d'Ivoire, CECCI, archidiocèse Abidjan, Yamoussoukro, paroisses, sacrements, eucharistie, mariologie, christologie, ecclésiologie, patristique, Pères de l'Église, Radio Espoir 102.8 FM, magazine Credo, prières catholiques, Notre Père, Je vous salue Marie, Symbole de Nicée, spiritualité catholique, vie consacrée"
        url="/"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <RadioStationSchema />
      
      
      <PromoPopup />
      <Header />
      <NewsTicker />
      <div className="pt-32">
        <Hero />
      </div>
      <NewsSection />
      <EventsCitationsSection />
      <DocumentsArchivesSection />
      <RadiosSection />
      <PodcastSection />
      <ProgramSection />
      <Footer />
    </main>
  );
};

export default Index;