import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Radio, ShoppingCart, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import logoCendf from "@/assets/logo-cendf.png";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

// Cart Context for sharing cart state across components
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

import { createContext, useContext } from "react";

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      cartCount: 0,
      cartTotal: 0,
    };
  }
  return context;
};

interface NavLink {
  name: string;
  nameKey: string;
  href: string;
  subLinks?: { name: string; nameKey: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Accueil", nameKey: "nav.home", href: "/" },
  { 
    name: "CEDF", 
    nameKey: "nav.cedf",
    href: "/a-propos",
    subLinks: [
      { name: "À Propos", nameKey: "nav.about", href: "/a-propos" },
      { name: "Nos Missions", nameKey: "nav.missions", href: "/missions" },
      { name: "Activités", nameKey: "nav.activities", href: "/activites" },
      { name: "FAQ", nameKey: "nav.faq", href: "/faq" }
    ]
  },
  { name: "Actualités", nameKey: "nav.news", href: "/actualites" },
  { 
    name: "Enseignements", 
    nameKey: "nav.teachings",
    href: "/enseignements",
    subLinks: [
      { name: "Enseignements", nameKey: "nav.teachings", href: "/enseignements" },
      { name: "Documents & Archives", nameKey: "nav.documents", href: "/documents-archives" },
      { name: "Bible en Ligne", nameKey: "nav.bible", href: "/bible" }
    ]
  },
  { name: "Émissions & Radio", nameKey: "nav.radio", href: "/radio" },
  { 
    name: "Vie Spirituelle", 
    nameKey: "nav.spiritual",
    href: "/prieres",
    subLinks: [
      { name: "Prières", nameKey: "nav.prayers", href: "/prieres" },
      { name: "Saint du Jour", nameKey: "nav.saint", href: "/saint-du-jour" },
      { name: "Calendrier Liturgique", nameKey: "nav.calendar", href: "/calendrier-liturgique" }
    ]
  },
  { name: "Boutique", nameKey: "nav.shop", href: "/boutique" },
  { name: "Contact", nameKey: "nav.contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { cartCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (link: NavLink) => {
    if (link.subLinks) {
      return link.subLinks.some(sub => location.pathname === sub.href);
    }
    return isActive(link.href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-elegant border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoCendf} 
              alt="CEDF - Commission Épiscopale pour la Doctrine de la Foi" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        isParentActive(link)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:text-primary hover:bg-primary/10"
                      }`}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {t(link.nameKey)}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    <div 
                      className={`absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[180px] transition-all duration-200 ${
                        openDropdown === link.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                      }`}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.href}
                          className={`block px-4 py-2 text-sm font-medium transition-colors ${
                            isActive(subLink.href)
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-primary/5 hover:text-primary"
                          }`}
                        >
                          {t(subLink.nameKey)}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {t(link.nameKey)}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector />

            <Link to="/boutique" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/radio">
              <Button variant="burgundy" size="sm" className="gap-2">
                <Radio className="w-4 h-4 animate-pulse" />
                {t("nav.listen")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSelector />
            
            <Link to="/boutique" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-burgundy text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-elegant animate-slide-up max-h-[80vh] overflow-y-auto">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.subLinks ? (
                    <Collapsible
                      open={openMobileDropdown === link.name}
                      onOpenChange={(open) => setOpenMobileDropdown(open ? link.name : null)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div
                          className={`flex items-center justify-between px-4 py-3 font-semibold rounded-lg transition-colors ${
                            isParentActive(link) 
                              ? "bg-primary/10 text-primary" 
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{t(link.nameKey)}</span>
                          <ChevronRight 
                            className={`w-5 h-5 transition-transform duration-200 ${
                              openMobileDropdown === link.name ? "rotate-90" : ""
                            }`} 
                          />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1 border-l-2 border-primary/20 ml-4">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                              isActive(subLink.href)
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                            }`}
                          >
                            {t(subLink.nameKey)}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 font-semibold rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {t(link.nameKey)}
                    </Link>
                  )}
                </div>
              ))}
              
              <Link to="/radio" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
                <Button variant="burgundy" className="w-full gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  {t("nav.listen_radio")}
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
