import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageLayout = ({ children, title, subtitle, backgroundImage }: PageLayoutProps) => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* News Ticker - Fixed for all pages */}
      <div className="pt-20">
        <NewsTicker />
      </div>
      
      {/* Page Hero */}
      <section className="relative py-16 overflow-hidden">
        {backgroundImage && (
          <>
            <div className="absolute inset-0">
              <img
                src={backgroundImage}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-hero" />
            </div>
          </>
        )}
        {!backgroundImage && (
          <div className="absolute inset-0 bg-gradient-burgundy opacity-90" />
        )}
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="font-secondary text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="bg-background">
        {children}
      </div>

      <Footer />
    </main>
  );
};

export default PageLayout;
