import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Linkedin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Agency from "@/models/Agency";
import ContactInfo from "@/models/ContactInfo";

const services = [
  { href: "/services/topographie", label: "Topographie & Topométrie" },
  { href: "/services/bornage", label: "Bornage & Délimitation" },
  { href: "/services/sig", label: "SIG" },
  { href: "/services/cartographie", label: "Cartographie" },
  { href: "/services/implantation", label: "Implantation & Nivellement" },
  { href: "/services/evaluations", label: "Évaluations foncières" },
];

const links = [
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Nos réalisations" },
  { href: "/formations", label: "Formations" },
  { href: "/blog", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

// WhatsApp icon (lucide doesn't have one — simple SVG)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export async function Footer() {
  let agencyInfo = {
    phones: ["64 62 73 35", "94 67 18 32"],
    emails: ["scpgeolumiere@gmail.com"],
    district: "Godomey",
    city: "Abomey-Calavi",
    country: "Bénin",
    displayHours: "Lun-Ven : 8h00 - 18h00",
  };
  let socialLinks = {
    linkedin: "", facebook: "", instagram: "",
    whatsapp: "", youtube: "", twitter: "",
  };

  try {
    await dbConnect();
    const agency = await Agency.findOne({ isMainOffice: true }).lean() as any;
    if (agency) {
      agencyInfo = {
        phones:      agency.phones      || agencyInfo.phones,
        emails:      agency.emails      || agencyInfo.emails,
        district:    agency.district    ?? agencyInfo.district,
        city:        agency.city        ?? agencyInfo.city,
        country:     agency.country     ?? agencyInfo.country,
        displayHours: agency.displayHours || agencyInfo.displayHours,
      };
    }
    const ci = await ContactInfo.findOne().lean() as any;
    if (ci?.socialLinks) socialLinks = { ...socialLinks, ...ci.socialLinks };
  } catch {}

  const firstPhone = agencyInfo.phones?.[0] || "";
  const secondPhone = agencyInfo.phones?.[1] || "";
  const email = agencyInfo.emails?.[0] || "";

  const socialIcons = [
    { key: "linkedin",  href: socialLinks.linkedin,  Icon: Linkedin,     label: "LinkedIn" },
    { key: "facebook",  href: socialLinks.facebook,  Icon: Facebook,     label: "Facebook" },
    { key: "instagram", href: socialLinks.instagram, Icon: Instagram,    label: "Instagram" },
    { key: "youtube",   href: socialLinks.youtube,   Icon: Youtube,      label: "YouTube" },
    { key: "twitter",   href: socialLinks.twitter,   Icon: Twitter,      label: "Twitter / X" },
    { key: "whatsapp",  href: socialLinks.whatsapp,  Icon: null,         label: "WhatsApp" },
  ].filter((s) => s.href);

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
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2v5M12 13v9M8 13l-3 9M16 13l3 9" />
                  <path d="M5 10h14" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-bold">GEOLUMIERE</span>
                <p className="text-xs text-primary-foreground/70">Géomètres-Experts Associés</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              SCP GEOLUMIERE — Cabinet de géomètres-experts associés spécialisé en topographie,
              bornage, SIG et cartographie. L&apos;expertise au service du développement durable.
            </p>
            {socialIcons.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {socialIcons.map(({ key, href, Icon, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label={label}
                  >
                    {Icon ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <WhatsAppIcon className="h-5 w-5" />
                    )}
                  </a>
                ))}
              </div>
            )}
            {socialIcons.length === 0 && (
              <div className="flex gap-3">
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
            )}
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
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
                    href={link.href}
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
                  {[agencyInfo.district, agencyInfo.city, agencyInfo.country].filter(Boolean).join(", ")}
                </span>
              </li>
              <li>
                <a href={`tel:${firstPhone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>{firstPhone}{secondPhone ? ` / ${secondPhone}` : ""}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Clock className="h-5 w-5 text-accent" />
                <span>{agencyInfo.displayHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} SCP GEOLUMIERE. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-primary-foreground transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
