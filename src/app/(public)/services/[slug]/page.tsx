import { notFound } from "next/navigation";
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
  CheckCircle,
  ArrowRight,
  Phone,
  FileText,
} from "lucide-react";

const servicesData = {
  topographie: {
    icon: Target,
    title: "Topographie & Topométrie",
    subtitle: "La précision au cœur de vos projets",
    description:
      "Le relevé topographique constitue le fondement de tout projet d'aménagement, de construction ou de gestion foncière. Nos géomètres-experts utilisent des instruments de dernière génération pour vous fournir des données fiables et exploitables.",
    longDescription:
      "Notre service de topographie combine savoir-faire traditionnel et technologies modernes. Grâce à nos stations totales robotisées et nos équipements GNSS de haute précision, nous réalisons des relevés exhaustifs de votre terrain. Ces données sont ensuite traitées par nos logiciels spécialisés pour produire des plans en 2D et des modèles numériques de terrain en 3D.",
    applications: [
      "Projets de construction (bâtiments, routes, ouvrages d'art)",
      "Aménagement urbain et rural",
      "Gestion foncière et cadastre",
      "Agriculture de précision",
      "Suivi environnemental",
    ],
    process: [
      { step: "01", title: "Reconnaissance du terrain", desc: "Étude préliminaire et planification des travaux" },
      { step: "02", title: "Implantation du réseau", desc: "Pose de points de référence géodésiques" },
      { step: "03", title: "Levé de détails", desc: "Mesure exhaustive des éléments du terrain" },
      { step: "04", title: "Traitement informatique", desc: "Calcul et modélisation des données" },
      { step: "05", title: "Livraison des plans", desc: "Remise des fichiers et du rapport technique" },
    ],
    benefits: [
      "Précision millimétrique certifiée",
      "Plans compatibles CAO/DAO (DWG, DXF)",
      "Modèle numérique de terrain (MNT)",
      "Rapport technique détaillé",
      "Intervention rapide sur tout le Bénin",
    ],
    deliverables: [
      "Plan topographique (PDF et DWG)",
      "Modèle numérique de terrain",
      "Nuage de points 3D",
      "Rapport d'étude technique",
    ],
  },

  bornage: {
    icon: MapPin,
    title: "Bornage & Délimitation foncière",
    subtitle: "Sécurisez juridiquement votre propriété",
    description:
      "Le bornage est une opération juridique par excellence qui fixe définitivement les limites d'une propriété. Seul le géomètre-expert est habilité à réaliser cette opération qui a force de loi.",
    longDescription:
      "Notre cabinet réalise des opérations de bornage conformes à la réglementation foncière béninoise. Chaque bornage est précédé d'une recherche documentaire approfondie (titres de propriété, plans cadastraux, historique de la parcelle) et d'une phase contradictoire avec les propriétaires riverains.",
    applications: [
      "Vente ou achat d'un terrain",
      "Division ou réunion de parcelles",
      "Construction d'une clôture ou d'un mur",
      "Résolution de litige de limite",
      "Régularisation foncière",
    ],
    process: [
      { step: "01", title: "Étude documentaire", desc: "Recherche des titres et plans existants" },
      { step: "02", title: "Convocation des parties", desc: "Information des riverains concernés" },
      { step: "03", title: "Opération contradictoire", desc: "Délimitation en présence de toutes les parties" },
      { step: "04", title: "Pose des bornes", desc: "Matérialisation des limites homologuées" },
      { step: "05", title: "Rédaction du PV", desc: "Établissement du procès-verbal officiel" },
    ],
    benefits: [
      "Valeur juridique opposable aux tiers",
      "Procès-verbal de bornage signé par toutes les parties",
      "Bornes homologuées et conformes",
      "Médiation experte en cas de désaccord",
      "Archivage des documents fonciers",
    ],
    deliverables: [
      "Procès-verbal de bornage",
      "Plan de bornage géoréférencé",
      "Document de mise à jour foncière",
      "Certificat de bornage",
    ],
  },

  sig: {
    icon: Globe,
    title: "SIG — Systèmes d'Information Géographique",
    subtitle: "Vos données spatiales, valorisées et exploitées",
    description:
      "Nous concevons, développons et déployons des Systèmes d'Information Géographique adaptés aux besoins des collectivités, administrations et entreprises. Du simple inventaire cartographique à la plateforme de gestion territoriale avancée.",
    longDescription:
      "Un SIG bien conçu est un outil de décision puissant. Notre équipe maîtrise les logiciels leaders du marché (QGIS, ArcGIS, PostGIS) et les standards internationaux (OGC, INSPIRE). Nous accompagnons nos clients de la conception à la formation des utilisateurs, en passant par la collecte, la structuration et l'intégration des données.",
    applications: [
      "Gestion urbaine et cadastrale",
      "Planification territoriale",
      "Gestion des réseaux (eau, électricité, routes)",
      "Suivi environnemental",
      "Projets de développement",
    ],
    process: [
      { step: "01", title: "Audit des besoins", desc: "Analyse des données existantes et des usages cibles" },
      { step: "02", title: "Conception de la base", desc: "Modélisation du schéma de données spatial" },
      { step: "03", title: "Collecte et intégration", desc: "Saisie, numérisation et géoréférencement" },
      { step: "04", title: "Développement", desc: "Configuration des outils et interfaces" },
      { step: "05", title: "Formation & transfert", desc: "Formation des utilisateurs et documentation" },
    ],
    benefits: [
      "Analyse spatiale multicouche",
      "Cartographie thématique interactive",
      "Interconnexion avec vos systèmes existants",
      "Standards ouverts et formats interopérables",
      "Formation et support inclus",
    ],
    deliverables: [
      "Base de données SIG structurée",
      "Cartes thématiques (PDF/SHP/GeoTIFF)",
      "Rapport d'analyse spatiale",
      "Documentation technique",
      "Manuel utilisateur",
    ],
  },

  cartographie: {
    icon: Compass,
    title: "Cartographie & Photogrammétrie",
    subtitle: "Des cartes précises pour décider avec confiance",
    description:
      "Réalisation de cartes topographiques, thématiques et de modèles numériques par techniques photogrammétriques terrestres et aériennes. Des résultats de haute précision pour vos projets d'envergure.",
    longDescription:
      "Notre service de cartographie et photogrammétrie intègre les dernières technologies de drone et de traitement d'images. Nous réalisons des orthophotoplans, des modèles numériques de surface et des relevés 3D de bâtiments. Ces données sont directement exploitables dans vos logiciels SIG ou CAO.",
    applications: [
      "Cartographie de projets d'aménagement",
      "Relevé de façades et de bâtiments",
      "Suivi de chantier et des travaux",
      "Inventaire forestier et agricole",
      "Cartographie de zones inondables",
    ],
    process: [
      { step: "01", title: "Planification du vol", desc: "Définition du plan de vol et des points d'appui" },
      { step: "02", title: "Acquisition terrain", desc: "Prise de vue aérienne ou terrestre" },
      { step: "03", title: "Traitement photogrammétrique", desc: "Calcul de la restitution 3D" },
      { step: "04", title: "Correction et validation", desc: "Vérification et contrôle de la précision" },
      { step: "05", title: "Production cartographique", desc: "Génération des livrables finaux" },
    ],
    benefits: [
      "Couverture de grandes surfaces en peu de temps",
      "Précision centimétrique (XYZ)",
      "Orthophotos géoréférencées haute résolution",
      "Modèles 3D texturés exploitables",
      "Délais réduits vs méthodes conventionnelles",
    ],
    deliverables: [
      "Orthophotoplan géoréférencé",
      "Modèle numérique de surface (MNS)",
      "Modèle numérique de terrain (MNT)",
      "Nuage de points 3D (LAS/LAZ)",
      "Rapport de précision",
    ],
  },

  implantation: {
    icon: Ruler,
    title: "Implantation & Nivellement",
    subtitle: "Vos ouvrages au bon endroit, à la bonne altitude",
    description:
      "L'implantation consiste à reporter sur le terrain, à partir de plans validés, les positions exactes des ouvrages à construire. Le nivellement détermine les altitudes précises pour garantir les pentes et les côtes de projet.",
    longDescription:
      "Indispensable en phase de chantier, l'implantation garantit que votre ouvrage sera construit exactement là où les plans le prévoient. Nos géomètres assurent également le suivi régulier du chantier, le contrôle des déformations et les métrés pour le règlement des situations de travaux.",
    applications: [
      "Implantation de bâtiments résidentiels et industriels",
      "Tracé de routes et pistes",
      "Réseaux d'assainissement et d'eau potable",
      "Ouvrages d'art (ponts, dalots)",
      "Contrôle géométrique de structures",
    ],
    process: [
      { step: "01", title: "Lecture des plans", desc: "Analyse des plans d'architectes et des BET" },
      { step: "02", title: "Calcul des coordonnées", desc: "Détermination des points d'implantation" },
      { step: "03", title: "Implantation terrain", desc: "Report des points au sol avec précision" },
      { step: "04", title: "Contrôle et validation", desc: "Vérification des positions implantées" },
      { step: "05", title: "Suivi de chantier", desc: "Contrôle régulier de l'avancement" },
    ],
    benefits: [
      "Précision conforme aux normes de construction",
      "Réduction des erreurs et des reprises",
      "Suivi de chantier documenté",
      "Contrôle des déformations en temps réel",
      "Plans de récolement en fin de chantier",
    ],
    deliverables: [
      "Plan d'implantation coté",
      "Carnet de piquetage",
      "Rapport de nivellement",
      "Plans de récolement",
    ],
  },

  evaluations: {
    icon: Scale,
    title: "Évaluations foncières et immobilières",
    subtitle: "L'expertise au service de vos décisions patrimoniales",
    description:
      "Nos géomètres-experts réalisent des évaluations de biens fonciers et immobiliers pour des contextes variés : acquisition, cession, succession, indivision, expropriation ou contentieux.",
    longDescription:
      "L'évaluation d'un bien immobilier ou foncier requiert une connaissance approfondie du marché local, des techniques d'expertise et du cadre juridique. Notre cabinet combine expertise terrain et analyse de marché pour vous fournir des rapports d'évaluation documentés et défendables.",
    applications: [
      "Acquisition ou cession d'un bien",
      "Succession et partage d'héritage",
      "Expropriation pour cause d'utilité publique",
      "Contentieux et litiges fonciers",
      "Optimisation du patrimoine foncier",
    ],
    process: [
      { step: "01", title: "Mission définie", desc: "Cadrage de la mission et des contraintes" },
      { step: "02", title: "Analyse documentaire", desc: "Étude des titres, plans et historique du bien" },
      { step: "03", title: "Visite du bien", desc: "Inspection physique et relevé des caractéristiques" },
      { step: "04", title: "Analyse du marché", desc: "Étude des comparables et tendances locales" },
      { step: "05", title: "Rapport d'expertise", desc: "Rédaction et remise du rapport documenté" },
    ],
    benefits: [
      "Rapport d'expertise reconnu par les tribunaux",
      "Estimation fondée sur des données réelles",
      "Conseil en acquisition ou négociation",
      "Intervention neutre et indépendante",
      "Connaissance du marché foncier béninois",
    ],
    deliverables: [
      "Rapport d'expertise complet",
      "Avis de valeur motivé",
      "Analyse comparative de marché",
      "Recommandations écrites",
    ],
  },

  recherche: {
    icon: BookOpen,
    title: "Recherche & Innovation",
    subtitle: "L'avancement du savoir au service du terrain",
    description:
      "SCP GEOLUMIERE mène des activités de recherche appliquée en sciences foncières, géodésiques et géomatique, en partenariat avec des institutions académiques et des organismes internationaux.",
    longDescription:
      "Notre engagement envers la recherche nous permet de rester à la pointe des techniques et d'apporter des solutions innovantes à des problématiques complexes. Nous contribuons à l'amélioration des référentiels géodésiques au Bénin, à l'étude des dynamiques foncières et à l'intégration de nouvelles technologies dans les processus géomatiques.",
    applications: [
      "Amélioration des référentiels géodésiques nationaux",
      "Études des dynamiques foncières urbaines",
      "Intégration de nouvelles technologies en géomatique",
      "Modélisation 3D urbaine (BIM/CityGML)",
      "Cartographie participative et citoyenne",
    ],
    process: [
      { step: "01", title: "Identification du sujet", desc: "Définition de la problématique de recherche" },
      { step: "02", title: "Revue de littérature", desc: "État de l'art et bibliographie" },
      { step: "03", title: "Collecte de données", desc: "Terrain et sources documentaires" },
      { step: "04", title: "Analyse et modélisation", desc: "Traitement et interprétation des résultats" },
      { step: "05", title: "Publication", desc: "Valorisation et diffusion des résultats" },
    ],
    benefits: [
      "Partenariats académiques nationaux et internationaux",
      "Publications dans des revues spécialisées",
      "Transfert de technologie vers le terrain",
      "Veille technologique continue",
      "Accès aux dernières innovations du secteur",
    ],
    deliverables: [
      "Rapports de recherche",
      "Articles scientifiques",
      "Notes techniques",
      "Recommandations pour les politiques publiques",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData[params.slug as keyof typeof servicesData];

  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
            <Link href="/services" className="hover:text-accent transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-primary-foreground/80">{service.title}</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent/20 mb-6">
              <Icon className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
              {service.title}
            </h1>
            <p className="text-accent font-medium text-lg mb-4">{service.subtitle}</p>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Description + Avantages */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                En détail
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {service.longDescription}
              </p>

              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Applications
              </h3>
              <ul className="space-y-3">
                {service.applications.map((app) => (
                  <li key={app} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              {/* Benefits */}
              <div className="bg-secondary rounded-2xl p-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-5">
                  Nos engagements
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-5">
                  <FileText className="inline h-5 w-5 text-accent mr-2 -mt-0.5" />
                  Livrables inclus
                </h3>
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Notre processus
            </h2>
            <p className="text-muted-foreground text-lg">
              Une méthode rigoureuse et éprouvée pour chaque mission.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-card rounded-xl p-6 shadow-soft text-center h-full">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                </div>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10 text-accent">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Besoin de ce service ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Contactez-nous pour un devis gratuit. Nous étudions votre projet et revenons vers vous
            rapidement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Demander un devis gratuit
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
          <div className="mt-10 pt-10 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Découvrir nos autres services</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
            >
              Voir tous les services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
