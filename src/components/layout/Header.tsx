"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const aProposDropdownItems = [
  { href: "/a-propos", label: "Notre cabinet", desc: "Histoire, valeurs et équipe" },
  { href: "/a-propos#agences", label: "Nos agences", desc: "Retrouvez tous nos bureaux" },
];

const serviceDropdownItems = [
  { href: "/services/topographie", label: "Topographie & Topométrie", desc: "Relevés précis de terrain" },
  { href: "/services/bornage", label: "Bornage & Délimitation", desc: "Délimitation juridique des propriétés" },
  { href: "/services/sig", label: "SIG", desc: "Systèmes d'Information Géographique" },
  { href: "/services/cartographie", label: "Cartographie & Photogrammétrie", desc: "Cartes et modèles numériques" },
  { href: "/services/implantation", label: "Implantation & Nivellement", desc: "Implantation d'ouvrages" },
  { href: "/services/evaluations", label: "Évaluations foncières", desc: "Expertise immobilière et foncière" },
  { href: "/services/recherche", label: "Recherche", desc: "R&D et innovation géomatique" },
];

// Links before the dropdowns
const navLinksBefore = [
  { href: "/", label: "Accueil" },
];

// Links after the Services dropdown
const navLinksAfter = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/formations", label: "Formations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const allNavLinks = [
  ...navLinksBefore,
  { href: "/a-propos", label: "À propos" },
  ...navLinksAfter,
];

interface HeaderProps {
  phone?: string;
  address?: string;
  hours?: string;
}

export function Header({
  phone = "64 62 73 35",
  address = "Godomey, Abomey-Calavi, Bénin",
  hours = "Lun-Ven : 8h00 - 18h00",
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [aProposOpen, setAProposOpen] = useState(false);
  const [mobileAProposOpen, setMobileAProposOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const isAProposActive = pathname.startsWith("/a-propos");
  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="hidden bg-primary text-primary-foreground py-2 md:block">
        <div className="container-wide flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{address}</span>
            </span>
          </div>
          <span className="text-primary-foreground/70">{hours}</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container-wide">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2v5M12 13v9M8 13l-3 9M16 13l3 9" />
                  <path d="M5 10h14" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-primary">GEOLUMIERE</span>
                <span className="text-[10px] text-muted-foreground hidden sm:block">Géomètres-Experts Associés</span>
              </div>
            </Link>

            {/* Desktop Navigation — Accueil · À propos · Services ▾ · Réalisations · Formations · Blog · Contact */}
            <div className="hidden xl:flex items-center gap-0.5">
              {/* Links before Services */}
              {navLinksBefore.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                    pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* À propos dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAProposOpen(true)}
                onMouseLeave={() => setAProposOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                    isAProposActive
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  À propos
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      aProposOpen && "rotate-180"
                    )}
                  />
                </button>

                {aProposOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-64">
                    <div className="bg-card rounded-2xl shadow-lg border border-border p-2">
                      {aProposDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setAProposOpen(false)}
                          className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                            {item.label}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                    isServicesActive
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown panel */}
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[520px]">
                    <div className="bg-card rounded-2xl shadow-lg border border-border p-3">
                      <div className="grid grid-cols-2 gap-1">
                        {serviceDropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                          >
                            <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                              {item.label}
                            </span>
                            <span className="text-xs text-muted-foreground">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-border">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center justify-center gap-2 py-2 text-sm text-accent font-medium hover:underline"
                        >
                          Voir tous les services
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Links after Services */}
              {navLinksAfter.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap",
                    pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden xl:flex items-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link href="/rendez-vous">Prendre rendez-vous</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 text-foreground hover:bg-muted rounded-md"
              aria-label="Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation — same order: Accueil · À propos · Services ▾ · Réalisations · Formations · Blog · Contact */}
        {isOpen && (
          <div className="xl:hidden border-t border-border bg-background animate-fade-in">
            <div className="container-wide py-4 space-y-1">
              {/* Links before Services */}
              {navLinksBefore.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* À propos collapsible */}
              <div>
                <button
                  onClick={() => setMobileAProposOpen(!mobileAProposOpen)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    isAProposActive
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  À propos
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      mobileAProposOpen && "rotate-180"
                    )}
                  />
                </button>

                {mobileAProposOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-accent/20 pl-3">
                    {aProposDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setIsOpen(false); setMobileAProposOpen(false); }}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === item.href
                            ? "text-accent bg-accent/10"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services collapsible */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    isServicesActive
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      mobileServicesOpen && "rotate-180"
                    )}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-accent/20 pl-3">
                    {serviceDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === item.href
                            ? "text-accent bg-accent/10"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm text-accent font-medium hover:bg-muted rounded-lg transition-colors"
                    >
                      Tous les services
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Links after Services */}
              {navLinksAfter.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-accent bg-accent/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4">
                <Button asChild variant="hero" className="w-full" size="lg">
                  <Link href="/rendez-vous" onClick={() => setIsOpen(false)}>
                    Prendre rendez-vous
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
