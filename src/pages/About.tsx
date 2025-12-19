import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Award, Users, Target, Shield, MapPin, ArrowRight } from "lucide-react";
import teamImage from "@/assets/team-office.jpg";

const values = [
  {
    icon: Target,
    title: "Précision",
    description: "La rigueur et l'exactitude sont au cœur de notre métier. Chaque mesure compte.",
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Nous garantissons des résultats fiables et conformes à la réglementation.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Une équipe à votre écoute pour vous accompagner tout au long de votre projet.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Formation continue et équipements de pointe pour des prestations optimales.",
  },
];

const team = [
  {
    name: "Jean-Pierre Durand",
    role: "Géomètre-Expert associé",
    description: "25 ans d'expérience, spécialiste en expertise foncière",
  },
  {
    name: "Marie Lefebvre",
    role: "Géomètre-Expert",
    description: "Spécialiste en topographie et SIG",
  },
  {
    name: "Thomas Bernard",
    role: "Technicien géomètre",
    description: "Expert en photogrammétrie drone",
  },
  {
    name: "Sophie Martin",
    role: "Responsable administrative",
    description: "Coordination des projets et relation client",
  },
];

const zones = [
  "Paris et petite couronne",
  "Hauts-de-Seine (92)",
  "Seine-Saint-Denis (93)",
  "Val-de-Marne (94)",
  "Essonne (91)",
  "Yvelines (78)",
  "Val-d'Oise (95)",
  "Seine-et-Marne (77)",
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Notre cabinet
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              À propos de GéoExpert
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Depuis plus de 25 ans, notre cabinet accompagne particuliers, professionnels et
              collectivités dans leurs projets fonciers et immobiliers.
            </p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Notre histoire
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Une expertise reconnue depuis 1998
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondé en 1998 par Jean-Pierre Durand, le cabinet GéoExpert s'est rapidement imposé
                  comme une référence en Île-de-France pour les travaux de géométrie et de
                  topographie.
                </p>
                <p>
                  Notre équipe de géomètres-experts diplômés combine savoir-faire traditionnel et
                  technologies de pointe pour vous offrir des prestations de la plus haute qualité.
                </p>
                <p>
                  Inscrit à l'Ordre des Géomètres-Experts, notre cabinet respecte les règles
                  déontologiques de la profession et garantit des travaux conformes à la
                  réglementation en vigueur.
                </p>
              </div>
            </div>
            <div>
              <img
                src={teamImage}
                alt="Équipe GéoExpert en réunion"
                className="rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Nos valeurs
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Ce qui nous définit
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent/10 mb-6">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Notre équipe
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Des experts à votre service
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow"
              >
                <div className="h-20 w-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Zone d'intervention
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-6">
                Nous intervenons en Île-de-France
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                Notre équipe se déplace sur l'ensemble de la région parisienne pour répondre à vos
                besoins en topographie, bornage et expertise foncière.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {zones.map((zone) => (
                  <div key={zone} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-primary-foreground/80 text-sm">{zone}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-foreground/5 rounded-2xl p-8 border border-primary-foreground/10">
              <h3 className="font-serif text-2xl font-semibold mb-4">
                Intervention rapide sur site
              </h3>
              <p className="text-primary-foreground/70 mb-6">
                Nous nous engageons à intervenir dans les 48h pour les urgences et à vous fournir un
                devis sous 24h.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
