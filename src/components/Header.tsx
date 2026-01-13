import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Radio, ShoppingCart, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import logoCendf from "@/assets/logo-cendf.png";

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
    // Return a default context for components not wrapped in CartProvider
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
  href: string;
  subLinks?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Accueil", href: "/" },
  { 
    name: "La CEDF", 
    href: "/a-propos",
    subLinks: [
      { name: "À Propos", href: "/a-propos" },
      { name: "Nos Missions", href: "/missions" },
      { name: "Activités", href: "/activites" },
      { name: "FAQ", href: "/faq" }
    ]
  },
  { name: "Actualités", href: "/actualites" },
  { 
    name: "Enseignements", 
    href: "/enseignements",
    subLinks: [
      { name: "Enseignements", href: "/enseignements" },
      { name: "Documents & Archives", href: "/documents-archives" },
      { name: "Bible en Ligne", href: "/bible" }
    ]
  },
  { name: "Émissions & Radio", href: "/radio" },
  { 
    name: "Vie Spirituelle", 
    href: "/prieres",
    subLinks: [
      { name: "Prières", href: "/prieres" },
      { name: "Saint du Jour", href: "/saint-du-jour" },
      { name: "Calendrier Liturgique", href: "/calendrier-liturgique" }
    ]
  },
  { name: "Boutique", href: "/boutique" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
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
          {/* Logo with Site Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoCendf} 
              alt="CEDF - Commission Épiscopale pour la Doctrine de la Foi" 
              className="h-14 md:h-16 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg text-primary leading-tight block">
                CEDF
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Côte d'Ivoire
              </span>
            </div>
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
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Dropdown Menu */}
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
                          {subLink.name}
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
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart Button */}
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
                Écouter
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Cart */}
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
            {/* Site Identity */}
            <div className="bg-primary/5 border-b border-border px-4 py-4">
              <div className="flex items-center gap-3">
                <img src={logoCendf} alt="CEDF" className="h-10 w-auto" />
                <div>
                  <h3 className="font-display font-bold text-primary">CEDF Côte d'Ivoire</h3>
                  <p className="text-xs text-muted-foreground">Commission Épiscopale pour la Doctrine de la Foi</p>
                </div>
              </div>
            </div>

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
                          <span>{link.name}</span>
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
                            {subLink.name}
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
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Radio Button */}
              <Link to="/radio" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
                <Button variant="burgundy" className="w-full gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  Écouter la Radio en direct
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
