import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Target,
  MapPin,
  Globe,
  Compass,
  Ruler,
  Scale,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Phone,
} from "lucide-react";

const services = [
  {
    slug: "topographie",
    icon: Target,
    title: "Topographie & Topométrie",
    description:
      "Relevés précis de terrain pour vos projets de construction, d'aménagement ou de gestion foncière. Plans 2D/3D, modèles numériques de terrain.",
  },
  {
    slug: "bornage",
    icon: MapPin,
    title: "Bornage & Délimitation foncière",
    description:
      "Fixation définitive et juridique des limites de votre propriété. Procès-verbal officiel, pose de bornes, médiation entre riverains.",
  },
  {
    slug: "sig",
    icon: Globe,
    title: "SIG — Systèmes d'Information Géographique",
    description:
      "Conception et déploiement de systèmes d'information géographique pour collectivités, administrations et entreprises. Analyse spatiale avancée.",
  },
  {
    slug: "cartographie",
    icon: Compass,
    title: "Cartographie & Photogrammétrie",
    description:
      "Réalisation de cartes et modèles numériques par techniques photogrammétriques (drone et terrestre). Orthophotoplans et modèles 3D de précision.",
  },
  {
    slug: "implantation",
    icon: Ruler,
    title: "Implantation & Nivellement",
    description:
      "Report sur terrain des ouvrages à partir de vos plans validés. Nivellement de précision, suivi de chantier et contrôle des déformations.",
  },
  {
    slug: "evaluations",
    icon: Scale,
    title: "Évaluations foncières et immobilières",
    description:
      "Expertise de la valeur vénale ou locative de vos biens. Missions d'acquisition, cession, succession, expropriation ou contentieux.",
  },
  {
    slug: "recherche",
    icon: BookOpen,
    title: "Recherche & Innovation",
    description:
      "Activités de recherche appliquée en sciences foncières, géodésiques et géomatique. Partenariats académiques et publications scientifiques.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Nos prestations
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Services de géomètre-expert
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Découvrez l&apos;ensemble de nos prestations en topographie, bornage, SIG, cartographie
              et expertise foncière. Notre équipe vous accompagne à chaque étape de votre projet.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-card rounded-2xl p-8 shadow-soft border border-border hover:border-accent/40 hover:shadow-md transition-all"
                >
                  <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent text-sm font-medium">
                    En savoir plus
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}

            {/* Formations card — links to its own page */}
            <Link
              href="/formations"
              className="group bg-accent/5 rounded-2xl p-8 shadow-soft border-2 border-accent/20 hover:border-accent/50 hover:shadow-md transition-all"
            >
              <div className="h-14 w-14 rounded-2xl bg-accent/15 flex items-center justify-center mb-6 group-hover:bg-accent/25 transition-colors">
                <GraduationCap className="h-7 w-7 text-accent" />
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                Formations
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Programmes de formation en topographie, SIG, photogrammétrie et gestion foncière.
                Animés par nos experts, certifiés et adaptables à vos équipes.
              </p>
              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                Voir les formations
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Besoin d&apos;une prestation sur mesure ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Contactez-nous pour discuter de votre projet. Nous vous proposerons une solution adaptée
            à vos besoins spécifiques et interviendrons sur tout le territoire béninois.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="tel:64627335">
                <Phone className="h-5 w-5" />
                64 62 73 35
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
