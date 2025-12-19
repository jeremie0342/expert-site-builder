import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  Target,
  MapPin,
  FileText,
  Ruler,
  Plane,
  Scale,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";

const services = [
  {
    id: "topographie",
    icon: Target,
    title: "Relevé topographique & Cartographie",
    description:
      "Le relevé topographique est la base de tout projet d'aménagement. Nous réalisons des relevés précis de votre terrain pour identifier les altitudes, les limites naturelles et les caractéristiques physiques de votre propriété.",
    benefits: [
      "Relevés précis au millimètre près",
      "Plans détaillés en 2D et 3D",
      "Fichiers compatibles CAO/DAO",
      "Intervention rapide sur site",
    ],
    deliverables: ["Plan topographique PDF/DWG", "Modèle numérique de terrain", "Rapport d'étude"],
  },
  {
    id: "bornage",
    icon: MapPin,
    title: "Délimitation foncière & Bornage",
    description:
      "Le bornage est une opération légale qui permet de définir de manière définitive les limites de votre propriété. Nos géomètres-experts établissent des procès-verbaux de bornage conformes à la réglementation.",
    benefits: [
      "Procès-verbal de bornage officiel",
      "Pose de bornes homologuées",
      "Médiation avec les voisins",
      "Valeur juridique reconnue",
    ],
    deliverables: ["Procès-verbal de bornage", "Plan de bornage", "Document cadastral mis à jour"],
  },
  {
    id: "cadastre",
    icon: FileText,
    title: "Plan cadastral & Documents d'arpentage",
    description:
      "Nous établissons tous les documents nécessaires pour vos démarches administratives : documents d'arpentage pour division de parcelle, numérotation cadastrale, régularisation de construction.",
    benefits: [
      "Documents conformes aux normes",
      "Suivi des démarches cadastrales",
      "Mise à jour du fichier foncier",
      "Accompagnement administratif",
    ],
    deliverables: ["Document d'arpentage", "Croquis de conservation", "Attestation cadastrale"],
  },
  {
    id: "permis",
    icon: Ruler,
    title: "Plans pour permis de construire",
    description:
      "Nous réalisons l'ensemble des plans techniques nécessaires à l'obtention de votre permis de construire : plan de situation, plan de masse, plans de coupe et de façade conformes aux exigences des services d'urbanisme.",
    benefits: [
      "Plans conformes PLU/POS",
      "Prise en compte des servitudes",
      "Calcul de surface SHOB/SHON",
      "Assistance instruction",
    ],
    deliverables: ["Plan de situation", "Plan de masse coté", "Plan de coupe terrain"],
  },
  {
    id: "drone",
    icon: Plane,
    title: "Photogrammétrie par drone",
    description:
      "Notre flotte de drones professionnels permet de réaliser des relevés aériens haute précision pour de grandes surfaces. Idéal pour les carrières, chantiers de grande envergure et suivi de projet.",
    benefits: [
      "Couverture de grandes surfaces",
      "Précision centimétrique",
      "Rapidité d'exécution",
      "Orthophotos géoréférencées",
    ],
    deliverables: ["Orthophotoplan", "Modèle 3D texturé", "Nuage de points"],
  },
  {
    id: "expertise",
    icon: Scale,
    title: "Expertise foncière & Conseils",
    description:
      "Notre expertise vous accompagne dans vos projets immobiliers : estimation foncière, conseils en division parcellaire, assistance dans les litiges de voisinage, études de faisabilité.",
    benefits: [
      "Conseil personnalisé",
      "Expertise en litige foncier",
      "Assistance juridique",
      "Optimisation parcellaire",
    ],
    deliverables: ["Rapport d'expertise", "Avis de valeur", "Recommandations écrites"],
  },
];

export default function Services() {
  return (
    <Layout>
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
              Découvrez l'ensemble de nos prestations en topographie, bornage, cadastre et expertise
              foncière. Notre équipe vous accompagne à chaque étape de votre projet.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-wide space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center scroll-mt-32 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent/10 mb-6">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button asChild variant="accent" size="lg">
                  <Link to="/contact">
                    Demander un devis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-secondary rounded-2xl p-8 lg:p-10">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                    Livrables inclus
                  </h3>
                  <ul className="space-y-4">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft"
                      >
                        <FileText className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Besoin d'une prestation sur mesure ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Contactez-nous pour discuter de votre projet. Nous vous proposerons une solution adaptée
            à vos besoins spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="tel:+33123456789">
                <Phone className="h-5 w-5" />
                01 23 45 67 89
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
