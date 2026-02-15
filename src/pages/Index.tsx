import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import NewsSection from "@/components/NewsSection";
import AboutSection from "@/components/AboutSection";
import DocumentsArchivesSection from "@/components/DocumentsArchivesSection";
import RadiosSection from "@/components/RadiosSection";
import EventsCitationsSection from "@/components/EventsCitationsSection";
import PodcastSection from "@/components/PodcastSection";
import ProgramSection from "@/components/ProgramSection";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { OrganizationSchema, WebsiteSchema, RadioStationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Accueil"
        description="CENDF - Commission Épiscopale pour la Doctrine de la Foi. Enseignements catholiques, documents magistériels, Radio Espoir 94.8 FM, podcasts et actualités de l'Église en Côte d'Ivoire."
        keywords="CENDF, église catholique, doctrine foi, enseignement catholique, Radio Espoir, Abidjan, Côte d'Ivoire, homélie, catéchèse, prière, évangélisation"
        url="/"
      />
      <OrganizationSchema />
      <WebsiteSchema />
      <RadioStationSchema />
      
      
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
      <AboutSection />
      <Footer />
    </main>
  );
};

export default Index;