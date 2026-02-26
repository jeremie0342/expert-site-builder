import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité — SCP GEOLUMIERE",
  description: "Politique de confidentialité et traitement des données personnelles de SCP GEOLUMIERE.",
};

export default function ConfidentialitePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Protection des données
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-6">
              Politique de confidentialité
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              SCP GEOLUMIERE s&apos;engage à protéger la vie privée des utilisateurs de son site web
              et à traiter leurs données personnelles avec transparence et responsabilité.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-3xl">
          <div className="space-y-12 text-foreground">

            {/* Responsable */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                1. Responsable du traitement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Le responsable du traitement des données personnelles collectées sur ce site est{" "}
                <strong className="text-foreground">SCP GEOLUMIERE</strong>, société civile professionnelle
                de géomètres-experts associés, dont le siège est situé à Godomey, Abomey-Calavi, République du Bénin.
                Contact :{" "}
                <a href="mailto:scpgeolumiere@gmail.com" className="text-accent hover:underline">
                  scpgeolumiere@gmail.com
                </a>.
              </p>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                2. Données personnelles collectées
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous collectons uniquement les données que vous nous transmettez volontairement via les formulaires du site :
              </p>

              <div className="space-y-4">
                <div className="bg-muted/40 rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">Formulaire de contact</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone (optionnel)</li>
                    <li>Service souhaité</li>
                    <li>Message</li>
                  </ul>
                </div>

                <div className="bg-muted/40 rounded-xl p-5">
                  <h3 className="font-semibold text-foreground mb-2">Formulaire de prise de rendez-vous</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone (optionnel)</li>
                    <li>Service souhaité</li>
                    <li>Agence choisie, date et créneau horaire</li>
                    <li>Message complémentaire (optionnel)</li>
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-4">
                Aucune donnée n&apos;est collectée via des cookies de traçage ou des outils d&apos;analyse
                de tiers (Google Analytics, Meta Pixel, etc.).
              </p>
            </div>

            {/* Finalités */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                3. Finalités du traitement
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Vos données personnelles sont traitées aux fins suivantes :
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  Répondre à vos demandes de contact ou de devis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  Gérer vos demandes de rendez-vous et vous envoyer les confirmations par email
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  Transmettre votre demande à l&apos;agence concernée pour assurer le suivi
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Vos données ne sont jamais cédées, vendues ou louées à des tiers à des fins commerciales.
              </p>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                4. Base légale du traitement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Le traitement de vos données repose sur votre <strong className="text-foreground">consentement explicite</strong>,
                exprimé lors de la soumission d&apos;un formulaire, ainsi que sur notre intérêt légitime
                à gérer nos relations clients et à répondre aux sollicitations reçues.
              </p>
            </div>

            {/* Conservation */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                5. Durée de conservation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les données liées aux demandes de contact sont conservées le temps nécessaire au traitement
                de votre demande. Les données liées aux rendez-vous sont conservées pendant une durée
                maximale de <strong className="text-foreground">2 ans</strong> à compter de la date du rendez-vous,
                conformément à nos obligations professionnelles. Au-delà, elles sont supprimées ou anonymisées.
              </p>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                6. Hébergement et transfert des données
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les données collectées sont hébergées sur des serveurs sécurisés :
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  <span>
                    <strong className="text-foreground">Vercel Inc.</strong> (États-Unis) — hébergement du site web
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  <span>
                    <strong className="text-foreground">MongoDB Atlas</strong> (MongoDB Inc., États-Unis) — stockage des données
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">—</span>
                  <span>
                    <strong className="text-foreground">Resend Inc.</strong> (États-Unis) — envoi des emails de confirmation
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Ces prestataires sont liés par des obligations contractuelles de confidentialité et de
                sécurité conformes aux standards internationaux.
              </p>
            </div>

            {/* Droits */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                7. Vos droits
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément aux réglementations applicables en matière de protection des données,
                vous disposez des droits suivants sur vos données personnelles :
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Droit d'accès", desc: "Obtenir une copie des données vous concernant." },
                  { title: "Droit de rectification", desc: "Corriger des données inexactes ou incomplètes." },
                  { title: "Droit à l'effacement", desc: "Demander la suppression de vos données." },
                  { title: "Droit d'opposition", desc: "Vous opposer au traitement de vos données." },
                ].map((right) => (
                  <div key={right.title} className="bg-muted/40 rounded-xl p-4">
                    <p className="font-semibold text-foreground text-sm mb-1">{right.title}</p>
                    <p className="text-xs text-muted-foreground">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous par email à{" "}
                <a href="mailto:scpgeolumiere@gmail.com" className="text-accent hover:underline font-medium">
                  scpgeolumiere@gmail.com
                </a>{" "}
                en précisant votre demande. Nous vous répondrons dans un délai de 30 jours.
              </p>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                8. Sécurité des données
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                SCP GEOLUMIERE met en œuvre les mesures techniques et organisationnelles appropriées
                pour protéger vos données contre tout accès non autorisé, perte ou altération :
                connexions HTTPS, accès administrateur sécurisé par authentification, mots de passe
                chiffrés. Aucun système n&apos;est infaillible, mais nous faisons le nécessaire pour
                minimiser les risques.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                9. Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ce site utilise uniquement un cookie de session technique lié à l&apos;authentification
                de l&apos;espace d&apos;administration (NextAuth). Aucun cookie de traçage publicitaire
                ou analytique tiers n&apos;est utilisé. Vous pouvez configurer votre navigateur pour
                refuser les cookies, mais certaines fonctionnalités de gestion pourraient ne plus fonctionner.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                10. Modifications de cette politique
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                SCP GEOLUMIERE se réserve le droit de modifier cette politique de confidentialité à
                tout moment, notamment pour se conformer à toute évolution légale ou réglementaire.
                La date de dernière mise à jour est indiquée en bas de cette page.
                Nous vous encourageons à la consulter régulièrement.
              </p>
            </div>

            {/* Footer note */}
            <div className="bg-muted/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : janvier 2025 —{" "}
                <Link href="/mentions-legales" className="text-accent hover:underline font-medium">
                  Mentions légales
                </Link>
              </p>
              <Link
                href="/contact"
                className="text-sm font-medium text-accent hover:underline whitespace-nowrap"
              >
                Nous contacter →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
