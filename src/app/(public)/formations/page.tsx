import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  BookOpen,
  Globe,
  Compass,
  Scale,
  Award,
  Calendar,
} from "lucide-react";

const programs = [
  {
    id: "topographie-base",
    icon: GraduationCap,
    title: "Topographie de base",
    level: "Débutant",
    duration: "5 jours",
    participants: "6 à 12 personnes",
    description:
      "Maîtrisez les fondamentaux de la topographie : maniement des instruments, lecture et interprétation de plans, coordonnées géographiques et système de projection.",
    modules: [
      "Introduction à la topographie et la géodésie",
      "Maniement des instruments (station totale, niveau)",
      "Lecture et dessin de plans topographiques",
      "Système de coordonnées et projections cartographiques",
      "Calculs topographiques de base",
      "Atelier pratique sur le terrain",
    ],
    target: "Techniciens, agents des collectivités, étudiants, professionnels du BTP",
  },
  {
    id: "sig-qgis",
    icon: Globe,
    title: "SIG avec QGIS",
    level: "Intermédiaire",
    duration: "3 jours",
    participants: "6 à 10 personnes",
    description:
      "Découvrez les Systèmes d'Information Géographique à travers le logiciel open source QGIS. Saisie, analyse spatiale, cartographie thématique et publication.",
    modules: [
      "Introduction aux SIG et aux données spatiales",
      "Prise en main de QGIS (interface, données, projections)",
      "Saisie et numérisation de données",
      "Analyse spatiale et requêtes",
      "Cartographie thématique et mise en page",
      "Export et publication des cartes",
    ],
    target: "Agents d'urbanisme, planificateurs, développeurs ruraux, chercheurs",
  },
  {
    id: "photogrammetrie-drone",
    icon: Compass,
    title: "Photogrammétrie & Drone",
    level: "Intermédiaire",
    duration: "3 jours",
    participants: "4 à 8 personnes",
    description:
      "Maîtrisez les techniques de prise de vue par drone et le traitement photogrammétrique pour produire des orthophotoplans et des modèles 3D de précision.",
    modules: [
      "Réglementation et sécurité des vols drone au Bénin",
      "Planification et préparation des missions de vol",
      "Techniques de prise de vue pour la photogrammétrie",
      "Traitement des images (logiciels Agisoft Metashape)",
      "Production d'orthophotoplans et modèles 3D",
      "Intégration dans un SIG",
    ],
    target: "Topographes, ingénieurs, agents du cadastre, chercheurs",
  },
  {
    id: "gestion-fonciere",
    icon: BookOpen,
    title: "Gestion foncière au Bénin",
    level: "Débutant",
    duration: "2 jours",
    participants: "8 à 20 personnes",
    description:
      "Comprendre le système foncier béninois, les procédures cadastrales, la sécurisation des terres et les outils de gestion du patrimoine immobilier.",
    modules: [
      "Le droit foncier et domanial au Bénin",
      "Le cadastre : organisation et procédures",
      "Le titre foncier : obtention et mise à jour",
      "Bornage et délimitation : aspects juridiques",
      "Sécurisation foncière et prévention des litiges",
      "Outils numériques de gestion foncière",
    ],
    target: "Élus locaux, agents administratifs, promoteurs immobiliers, notaires",
  },
  {
    id: "evaluation-immobiliere",
    icon: Scale,
    title: "Évaluation immobilière",
    level: "Avancé",
    duration: "3 jours",
    participants: "4 à 10 personnes",
    description:
      "Maîtrisez les méthodes d'expertise foncière et immobilière pour estimer la valeur vénale ou locative d'un bien en contexte béninois et ouest-africain.",
    modules: [
      "Fondements de l'évaluation immobilière",
      "Méthodes d'évaluation : comparaison, capitalisation, coût",
      "Analyse du marché immobilier béninois",
      "Collecte de données et sources de référence",
      "Rédaction d'un rapport d'expertise",
      "Études de cas pratiques",
    ],
    target: "Géomètres, agents immobiliers, juristes, banquiers, investisseurs",
  },
];

const advantages = [
  {
    icon: Award,
    title: "Formateurs experts",
    desc: "Toutes nos formations sont animées par nos géomètres-experts et ingénieurs en activité.",
  },
  {
    icon: BookOpen,
    title: "Supports fournis",
    desc: "Chaque participant reçoit un support de cours complet et des ressources complémentaires.",
  },
  {
    icon: GraduationCap,
    title: "Certificat de formation",
    desc: "Une attestation de participation signée par SCP GEOLUMIERE est remise à l'issue de chaque formation.",
  },
  {
    icon: Users,
    title: "Petits groupes",
    desc: "Groupes limités pour un suivi personnalisé et un maximum de pratique sur le terrain.",
  },
  {
    icon: Calendar,
    title: "Planning flexible",
    desc: "Formations planifiables à la demande, en intra-entreprise ou inter-entreprises.",
  },
  {
    icon: Globe,
    title: "Sur mesure",
    desc: "Programmes adaptables à vos besoins spécifiques et au niveau de vos équipes.",
  },
];

const levelColors: Record<string, string> = {
  Débutant: "bg-green-100 text-green-700",
  Intermédiaire: "bg-amber-100 text-amber-700",
  Avancé: "bg-red-100 text-red-700",
};

export default function FormationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Formations professionnelles
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Montez en compétences avec nos experts
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              SCP GEOLUMIERE propose des programmes de formation en topographie, SIG, cartographie et
              gestion foncière — animés par des praticiens en activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">
                  Nous contacter pour une formation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Nos programmes
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              5 formations spécialisées
            </h2>
            <p className="text-muted-foreground text-lg">
              Du niveau débutant à expert, nos formations couvrent les métiers clés de la géomatique
              et de la gestion foncière.
            </p>
          </div>

          <div className="space-y-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.id}
                  className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden"
                >
                  <div
                    className={`grid lg:grid-cols-3 gap-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  >
                    {/* Info principale */}
                    <div className="lg:col-span-2 p-8 lg:p-10">
                      <div className="flex flex-wrap items-start gap-4 mb-5">
                        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-serif text-xl font-bold text-foreground">
                              {program.title}
                            </h3>
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[program.level]}`}
                            >
                              {program.level}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-accent" />
                              {program.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-accent" />
                              {program.participants}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      <p className="text-sm font-medium text-foreground mb-1">
                        Public cible :{" "}
                        <span className="text-muted-foreground font-normal">{program.target}</span>
                      </p>
                    </div>

                    {/* Modules */}
                    <div className="bg-secondary p-8 lg:p-10">
                      <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                        Modules du programme
                      </h4>
                      <ul className="space-y-2.5">
                        {program.modules.map((module, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{module}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi se former avec GEOLUMIERE ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Une pédagogie ancrée dans la pratique, dispensée par des professionnels du terrain.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv) => {
              const Icon = adv.icon;
              return (
                <div key={adv.title} className="bg-card rounded-xl p-6 shadow-soft">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Inscrivez votre équipe
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Contactez-nous pour connaître les prochaines dates de formation, organiser une session
            en intra-entreprise ou adapter un programme à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Demander une formation
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
