import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, Shield, MapPin, ArrowRight, Phone, Clock, Building2, Mail } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Agency from "@/models/Agency";

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
    name: "Jean ZITTI",
    role: "Géomètre-Expert Associé",
    description: "Spécialiste en expertise foncière et topographie",
  },
  {
    name: "Briac K. P. KOSSOUGBETO",
    role: "Géomètre-Expert Associé",
    description: "Expert en bornage et délimitation foncière",
  },
  {
    name: "Joslin M. YESSOUFOU",
    role: "Géomètre-Expert Associé",
    description: "Spécialiste en SIG et cartographie",
  },
  {
    name: "Zarnick J. K. ZITTI",
    role: "Géomètre-Expert Associé",
    description: "Expert en évaluations foncières et immobilières",
  },
  {
    name: "Gérard M. I. ANIWANOU",
    role: "Ingénieur Géomètre",
    description: "Spécialiste en implantation et nivellement",
  },
];

const zones = [
  "Abomey-Calavi",
  "Cotonou",
  "Porto-Novo",
  "Parakou",
  "Bohicon",
  "Ouidah",
  "Lokossa",
  "Natitingou",
];

export default async function AboutPage() {
  let agencies: any[] = [];

  try {
    await dbConnect();
    agencies = await (Agency.find({ isActive: true }).sort({ order: 1 }).lean() as Promise<any[]>);
  } catch {}

  const mainOffice = agencies.find((a) => a.isMainOffice);
  const mainLocation = mainOffice
    ? [mainOffice.district, mainOffice.city].filter(Boolean).join(", ")
    : "Godomey, Abomey-Calavi";

  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Notre cabinet
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              À propos de SCP GEOLUMIERE
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Cabinet de géomètres-experts associés au Bénin, nous accompagnons particuliers,
              professionnels et collectivités dans leurs projets fonciers et immobiliers.
            </p>
            {agencies.length > 1 && (
              <div className="mt-6 inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                <Building2 className="h-4 w-4" />
                {agencies.length} agences au Bénin
              </div>
            )}
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
                L&apos;expertise au service du développement durable
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  SCP GEOLUMIERE est un cabinet de géomètres-experts associés basé à{" "}
                  {mainLocation}, au Bénin. Fondé par une équipe de professionnels passionnés,
                  le cabinet s&apos;est rapidement imposé comme une référence dans le domaine de la
                  géométrie et de la topographie au Bénin.
                </p>
                <p>
                  Notre équipe de quatre géomètres-experts diplômés et d&apos;un ingénieur géomètre
                  combine savoir-faire traditionnel et technologies de pointe pour vous offrir
                  des prestations de la plus haute qualité.
                </p>
                <p>
                  Inscrit à l&apos;Ordre des Géomètres-Experts du Bénin, notre cabinet respecte les
                  règles déontologiques de la profession et garantit des travaux conformes à la
                  réglementation en vigueur.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/images/team-office.jpg"
                alt="Équipe SCP GEOLUMIERE"
                width={600}
                height={400}
                className="rounded-2xl shadow-elevated w-full"
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Nos agences */}
      {agencies.length > 0 && (
        <section id="agences" className="section-padding bg-secondary scroll-mt-24">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Nos bureaux
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
                {agencies.length === 1 ? "Notre agence" : `Nos ${agencies.length} agences`}
              </h2>
              <p className="text-muted-foreground text-lg">
                {agencies.length === 1
                  ? "Venez nous rencontrer dans notre cabinet."
                  : "Retrouvez-nous dans l'une de nos agences au Bénin."}
              </p>
            </div>

            <div className={`grid gap-6 ${
              agencies.length === 1
                ? "max-w-md mx-auto"
                : agencies.length === 2
                ? "sm:grid-cols-2 max-w-3xl mx-auto"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {agencies.map((agency) => (
                <div
                  key={String(agency._id)}
                  className="bg-card rounded-2xl border border-border p-6 shadow-soft"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    {agency.isMainOffice && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                        Siège
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                    {agency.name}
                  </h3>

                  <ul className="space-y-3">
                    {(agency.district || agency.city || agency.country) && (
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>
                          {[agency.district, agency.city, agency.country].filter(Boolean).join(", ")}
                          {agency.directions && (
                            <span className="block text-xs mt-0.5 text-muted-foreground/70">
                              {agency.directions}
                            </span>
                          )}
                        </span>
                      </li>
                    )}
                    {agency.phones?.length > 0 && (
                      <li className="flex items-start gap-3 text-sm">
                        <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          {agency.phones.map((phone: string) => (
                            <a
                              key={phone}
                              href={`tel:${phone.replace(/\s/g, "")}`}
                              className="block text-muted-foreground hover:text-accent transition-colors"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </li>
                    )}
                    {agency.emails?.length > 0 && (
                      <li className="flex items-start gap-3 text-sm">
                        <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          {agency.emails.map((email: string) => (
                            <a
                              key={email}
                              href={`mailto:${email}`}
                              className="block text-muted-foreground hover:text-accent transition-colors"
                            >
                              {email}
                            </a>
                          ))}
                        </div>
                      </li>
                    )}
                    {agency.displayHours && (
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-accent shrink-0" />
                        <span>{agency.displayHours}</span>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="hero" size="lg">
                <Link href="/rendez-vous">
                  Prendre rendez-vous dans une agence
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Zone d'intervention */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Zone d&apos;intervention
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 mb-6">
                Nous intervenons sur tout le Bénin
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                Basés à {mainLocation}, notre équipe se déplace sur l&apos;ensemble du territoire
                béninois pour répondre à vos besoins en topographie, bornage et expertise foncière.
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
                Nous nous engageons à intervenir rapidement et à vous fournir un devis dans les
                meilleurs délais.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link href="/contact">
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
