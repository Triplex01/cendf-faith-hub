import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoCendf from "@/assets/logo-cendf.png";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Actualités", href: "/actualites" },
  { name: "Enseignements", href: "/enseignements" },
  { name: "Documents", href: "/documents" },
  { name: "Archives", href: "/archives" },
  { name: "Radio & Podcasts", href: "/radio" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background shadow-elegant border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoCendf} 
              alt="CENDF - Commission Episcopale pour la Doctrine de la Foi" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Radio Live Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/radio">
              <Button 
                variant="burgundy"
                size="sm"
                className="gap-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                Radio en direct
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-elegant animate-slide-up">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/radio" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="burgundy" className="mt-4 w-full gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  Radio en direct
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
