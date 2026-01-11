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
import NewYearPopup from "@/components/NewYearPopup";

const Index = () => {
  return (
    <main className="min-h-screen">
      <NewYearPopup />
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
      <PodcastSection />
      <ProgramSection />
      <Footer />
    </main>
  );
};

export default Index;