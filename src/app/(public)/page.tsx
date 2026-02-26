import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Target,
  MapPin,
  Globe,
  Compass,
  Ruler,
  Scale,
  CheckCircle,
  Star,
  ArrowRight,
  CalendarDays,
  Phone,
  Clock,
  Building2,
} from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Agency from "@/models/Agency";

const services = [
  {
    icon: Target,
    title: "Topographie & Topométrie",
    description: "Relevés précis de terrain avec les technologies les plus avancées.",
    href: "/services#topographie",
  },
  {
    icon: MapPin,
    title: "Bornage & Délimitation",
    description: "Délimitation officielle et sécurisée de vos propriétés foncières.",
    href: "/services#bornage",
  },
  {
    icon: Globe,
    title: "SIG",
    description: "Systèmes d'Information Géographique pour la gestion de vos données spatiales.",
    href: "/services#sig",
  },
  {
    icon: Compass,
    title: "Cartographie & Photogrammétrie",
    description: "Cartes détaillées et modèles 3D par techniques photogrammétriques.",
    href: "/services#cartographie",
  },
  {
    icon: Ruler,
    title: "Implantation & Nivellement",
    description: "Implantation d'ouvrages et nivellement de précision.",
    href: "/services#implantation",
  },
  {
    icon: Scale,
    title: "Évaluations foncières",
    description: "Expertise en évaluation de biens fonciers et immobiliers.",
    href: "/services#evaluations",
  },
];

const features = [
  "Équipe de géomètres-experts diplômés",
  "Équipement de dernière génération",
  "Précision millimétrique garantie",
  "Intervention sur tout le Bénin",
  "Engagement qualité et délais",
  "Devis gratuit et personnalisé",
];

const testimonials = [
  {
    name: "Mathieu A.",
    role: "Promoteur immobilier",
    content:
      "Une collaboration exemplaire pour notre projet de lotissement à Calavi. Précision et professionnalisme au rendez-vous.",
    rating: 5,
  },
  {
    name: "Rachida K.",
    role: "Architecte",
    content:
      "SCP GEOLUMIERE nous accompagne sur tous nos projets. Leur expertise en topographie est indispensable.",
    rating: 5,
  },
  {
    name: "Sébastien D.",
    role: "Particulier",
    content:
      "Excellent service pour le bornage de notre terrain à Cotonou. Équipe réactive et documents livrés dans les délais.",
    rating: 5,
  },
];

export default async function HomePage() {
  let agencies: any[] = [];

  try {
    await dbConnect();
    agencies = await (Agency.find({ isActive: true }).sort({ order: 1 }).lean() as Promise<any[]>);
  } catch {}

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero-surveyor.jpg"
          alt="Géomètre-expert sur le terrain"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />

        <div className="relative container-wide py-20 md:py-32">
          <div className="max-w-2xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6 animate-fade-in">
              <span className="text-sm font-medium">SCP GEOLUMIERE — Géomètres-Experts Associés</span>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              L&apos;expertise au service du développement durable
            </h1>

            <p
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Topographie, bornage, SIG, cartographie — notre équipe de géomètres-experts vous accompagne
              dans tous vos projets fonciers et immobiliers au Bénin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link href="/rendez-vous">
                  <CalendarDays className="h-5 w-5" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Nos services</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Une expertise complète à votre service
            </h2>
            <p className="text-muted-foreground text-lg">
              Découvrez l&apos;ensemble de nos prestations en topographie, bornage, SIG et expertise foncière.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-card rounded-xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                  En savoir plus
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/aerial-survey.jpg"
                alt="Vue aérienne d'un relevé topographique"
                width={600}
                height={400}
                className="rounded-2xl shadow-elevated w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <div className="text-4xl font-serif font-bold">4</div>
                <div className="text-sm">Géomètres-Experts</div>
              </div>
            </div>

            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Pourquoi nous choisir</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                L&apos;excellence au cœur de notre métier
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                SCP GEOLUMIERE combine rigueur professionnelle et technologies de pointe pour vous
                offrir des services de géométrie de la plus haute qualité sur tout le territoire béninois.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button asChild variant="accent" size="lg">
                  <Link href="/a-propos">
                    Découvrir notre cabinet
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agences Section */}
      {agencies.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-wide">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-accent font-medium text-sm uppercase tracking-wider">
                  Nos bureaux
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                  {agencies.length === 1
                    ? "Notre agence"
                    : `${agencies.length} agences pour vous servir`}
                </h2>
              </div>
              <Link
                href="/a-propos#agences"
                className="flex items-center gap-1.5 text-sm text-accent font-medium hover:underline shrink-0"
              >
                Voir le détail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className={`grid gap-4 ${
              agencies.length === 1 ? "max-w-sm" :
              agencies.length === 2 ? "sm:grid-cols-2 max-w-2xl" :
              "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {agencies.map((agency) => (
                <div
                  key={String(agency._id)}
                  className="bg-card rounded-xl border border-border p-5 shadow-soft flex gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {agency.name}
                      </h3>
                      {agency.isMainOffice && (
                        <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-medium shrink-0">
                          Siège
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5">
                      {(agency.district || agency.city) && (
                        <li className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span className="truncate">
                            {[agency.district, agency.city].filter(Boolean).join(", ")}
                          </span>
                        </li>
                      )}
                      {agency.phones?.[0] && (
                        <li className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                          <a href={`tel:${agency.phones[0].replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                            {agency.phones[0]}
                          </a>
                        </li>
                      )}
                      {agency.displayHours && (
                        <li className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                          <span>{agency.displayHours}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Témoignages</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              La confiance de nos clients
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Découvrez ce que nos clients disent de notre collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-primary-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Obtenez un devis gratuit et personnalisé, ou planifiez directement une rencontre avec nos experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/rendez-vous">
                <CalendarDays className="h-5 w-5" />
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
