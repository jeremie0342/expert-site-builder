import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Linkedin, Facebook } from "lucide-react";

const services = [
  { href: "/services#topographie", label: "Relevé topographique" },
  { href: "/services#bornage", label: "Bornage foncier" },
  { href: "/services#cadastre", label: "Plan cadastral" },
  { href: "/services#permis", label: "Plans permis de construire" },
  { href: "/services#drone", label: "Photogrammétrie drone" },
];

const links = [
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Nos réalisations" },
  { href: "/blog", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold">GéoExpert</span>
                <p className="text-xs text-primary-foreground/70">Géomètres-Experts</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Cabinet de géomètres-experts spécialisé dans les relevés topographiques, 
              le bornage foncier et l'expertise immobilière depuis plus de 25 ans.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link 
                    to={service.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Liens utiles</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  Godomey<br />
                  Abomey-Calavi, Bénin
                </span>
              </li>
              <li>
                <a href="tel:+33123456789" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>01 52 52 52 52</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@geoexpert.fr" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>contact@geoexpert.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Clock className="h-5 w-5 text-accent" />
                <span>Lun-Ven : 8h30 - 18h00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} GéoExpert. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
