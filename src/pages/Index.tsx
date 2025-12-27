import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import NewsSection from "@/components/NewsSection";
import TeachingsSection from "@/components/TeachingsSection";
import DocumentsSection from "@/components/DocumentsSection";
import ArchivesSection from "@/components/ArchivesSection";
import RadioSection from "@/components/RadioSection";
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
      <TeachingsSection />
      <DocumentsSection />
      <ArchivesSection />
      <RadioSection />
      <ProgramSection />
      <Footer />
    </main>
  );
};

export default Index;
