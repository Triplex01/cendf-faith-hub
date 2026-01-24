import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Play, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import { Link } from "react-router-dom";
import basiliqueYamoussoukro from "@/assets/basilique-yamoussoukro.jpg";
import basiliqueRome from "@/assets/basilique-rome.jpg";
import basiliqueNotredame from "@/assets/basilique-notredame.jpg";
import interieurBasilique from "@/assets/interieur-basilique.jpg";
const heroSlides = [{
  image: basiliqueYamoussoukro,
  alt: "Basilique Notre-Dame de la Paix de Yamoussoukro"
}, {
  image: basiliqueRome,
  alt: "Basilique Saint-Pierre de Rome"
}, {
  image: basiliqueNotredame,
  alt: "Vue de la Basilique Notre-Dame"
}, {
  image: interieurBasilique,
  alt: "Intérieur de la Basilique avec vitraux"
}];
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    isPlaying,
    toggle
  } = useRadioPlayer();
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);
  return <section id="accueil" className="relative h-[32vh] md:h-[60vh] min-h-[220px] md:min-h-[450px] max-h-[280px] md:max-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Cross Decorative Element - Hidden on mobile */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 opacity-30 hidden md:block">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="0" width="8" height="60" fill="currentColor" className="text-gold" />
          <rect x="0" y="16" width="40" height="8" fill="currentColor" className="text-gold" />
        </svg>
      </div>

      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => <img key={index} src={slide.image} alt={slide.alt} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`} loading="lazy" />)}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Carousel Navigation - Hidden on mobile */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm border border-gold/30 items-center justify-center text-gold hover:bg-gold/20 transition-all hidden md:flex" aria-label="Image précédente">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm border border-gold/30 items-center justify-center text-gold hover:bg-gold/20 transition-all hidden md:flex" aria-label="Image suivante">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots - Smaller on mobile */}
      <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 md:gap-2">
        {heroSlides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-4 md:w-8 bg-gold" : "w-1.5 md:w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"}`} aria-label={`Diapositive ${index + 1}`} />)}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge - Compact on mobile */}
          <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-0.5 md:py-1.5 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40 mb-2 md:mb-6 animate-fade-in">
            <span className="w-1 md:w-2 h-1 md:h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-[8px] md:text-xs font-semibold text-gold uppercase tracking-wide leading-tight">
              Commission Épiscopale Doctrine de la Foi - CI
            </span>
          </div>

          {/* Title - Smaller on mobile */}
          <h1 className="font-display text-lg md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-1.5 md:mb-4 leading-tight animate-slide-up">
            Nourrir la Foi,{" "}
            <span className="text-gold">Éclairer les Âmes</span>
          </h1>

          {/* Scripture Quote - Compact on mobile */}
          <p className="font-secondary text-xs md:text-lg text-primary-foreground/90 max-w-xl mx-auto mb-2 md:mb-6 leading-relaxed animate-slide-up italic" style={{
          animationDelay: "0.1s"
        }}>
            « Je suis le Chemin, la Vérité et la Vie. »
            <span className="block text-[10px] md:text-sm text-primary-foreground/80 mt-0.5 not-italic">— Jean 14:6</span>
          </p>

          {/* CTA Buttons - Smaller on mobile */}
          <div className="flex flex-row items-center justify-center gap-2 md:gap-3 animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
            <Link to="/enseignements">
              <Button variant="gold" size="sm" className="group h-7 md:h-10 text-[10px] md:text-sm px-2 md:px-4">
                <Play className="w-2.5 h-2.5 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Découvrir les enseignements</span>
                <span className="sm:hidden">Enseignements</span>
              </Button>
            </Link>
            <Button variant="gold" size="sm" onClick={toggle} className="group relative overflow-hidden shadow-md shadow-secondary/40 hover:shadow-lg transition-all duration-300 h-7 md:h-10 text-[10px] md:text-sm px-2 md:px-4">
              <Radio className={`w-2.5 h-2.5 md:w-4 md:h-4 relative z-10 ${isPlaying ? "animate-pulse" : ""}`} />
              <span className="relative z-10 font-semibold">{isPlaying ? "En cours..." : "🎧 Radio"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce z-20 hidden md:block">
        <a href="#actualites" className="flex flex-col items-center gap-1 text-gold/60 hover:text-gold transition-colors">
          <span className="text-xs font-medium">Défiler</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>;
};
export default Hero;