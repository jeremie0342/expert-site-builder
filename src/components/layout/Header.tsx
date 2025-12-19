import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="hidden bg-primary text-primary-foreground py-2 md:block">
        <div className="container-wide flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span>01 23 45 67 89</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Paris & Île-de-France</span>
            </span>
          </div>
          <span className="text-primary-foreground/70">Lun-Ven : 8h30 - 18h00</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container-wide">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-primary">GéoExpert</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Géomètres-Experts</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    location.pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Demander un devis</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md"
              aria-label="Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="container-wide py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    location.pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild variant="hero" className="w-full" size="lg">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
