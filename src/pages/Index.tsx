import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import NewsSection from "@/components/NewsSection";
import AboutSection from "@/components/AboutSection";
import DocumentsArchivesSection from "@/components/DocumentsArchivesSection";
import RadiosSection from "@/components/RadiosSection";
import EventsCitationsSection from "@/components/EventsCitationsSection";
import ProgramSection from "@/components/ProgramSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <NewsTicker />
      <div className="pt-32">
        <Hero />
      </div>
      <NewsSection />
      <AboutSection />
      <EventsCitationsSection />
      <DocumentsArchivesSection />
      <RadiosSection />
      <ProgramSection />
      <Footer />
    </main>
  );
};

export default Index;