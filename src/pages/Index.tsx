import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TeachingsSection from "@/components/TeachingsSection";
import DocumentsSection from "@/components/DocumentsSection";
import ArchivesSection from "@/components/ArchivesSection";
import RadioSection from "@/components/RadioSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TeachingsSection />
      <DocumentsSection />
      <ArchivesSection />
      <RadioSection />
      <Footer />
    </main>
  );
};

export default Index;
