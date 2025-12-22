import { useState, useEffect } from "react";
import { Menu, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Accueil", href: "#accueil" },
  { name: "Enseignements", href: "#enseignements" },
  { name: "Documents", href: "#documents" },
  { name: "Archives", href: "#archives" },
  { name: "Radio & Podcasts", href: "#radio" },
  { name: "À propos", href: "#apropos" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-lg">✝</span>
            </div>
            <div>
              <h1 className={`font-display font-bold text-xl tracking-tight transition-colors ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}>
                CENDF
              </h1>
              <p className={`text-xs font-medium transition-colors ${
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}>
                Doctrine de la Foi
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Radio Live Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant={isScrolled ? "gold" : "hero"} 
              size="sm"
              className="gap-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Radio en direct
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border shadow-elegant animate-slide-up">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-foreground font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="gold" className="mt-4 gap-2">
                <Radio className="w-4 h-4 animate-pulse" />
                Radio en direct
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
