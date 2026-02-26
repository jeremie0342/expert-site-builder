import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — SCP GEOLUMIERE",
  description: "Mentions légales du site de SCP GEOLUMIERE, cabinet de géomètres-experts associés au Bénin.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Informations légales
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-6">
              Mentions légales
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Conformément aux dispositions légales en vigueur, voici les informations relatives
              à l&apos;éditeur et à l&apos;hébergeur du présent site web.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-3xl">
          <div className="space-y-12 text-foreground">

            {/* Éditeur */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                1. Éditeur du site
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Raison sociale :</strong>{" "}
                  SCP GEOLUMIERE — Société Civile Professionnelle
                </p>
                <p>
                  <strong className="text-foreground">Activité :</strong>{" "}
                  Cabinet de géomètres-experts associés
                </p>
                <p>
                  <strong className="text-foreground">Siège social :</strong>{" "}
                  Godomey, Abomey-Calavi, République du Bénin
                </p>
                <p>
                  <strong className="text-foreground">Téléphone :</strong>{" "}
                  +229 64 62 73 35 / +229 94 67 18 32
                </p>
                <p>
                  <strong className="text-foreground">Email :</strong>{" "}
                  <a href="mailto:scpgeolumiere@gmail.com" className="text-accent hover:underline">
                    scpgeolumiere@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Directeurs de publication */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                2. Directeurs de publication
              </h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>Jean ZITTI — Géomètre-Expert Associé</p>
                <p>Briac K. P. KOSSOUGBETO — Géomètre-Expert Associé</p>
                <p>Joslin M. YESSOUFOU — Géomètre-Expert Associé</p>
                <p>Zarnick J. K. ZITTI — Géomètre-Expert Associé</p>
              </div>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                3. Hébergement
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Hébergeur :</strong>{" "}
                  Vercel Inc.
                </p>
                <p>
                  <strong className="text-foreground">Adresse :</strong>{" "}
                  440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                </p>
                <p>
                  <strong className="text-foreground">Site :</strong>{" "}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    vercel.com
                  </a>
                </p>
                <p className="mt-4">
                  Les données de la base de données sont hébergées sur{" "}
                  <strong className="text-foreground">MongoDB Atlas</strong> (MongoDB Inc., 1633 Broadway, 38th Floor, New York, NY 10019, États-Unis).
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                4. Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.)
                est la propriété exclusive de SCP GEOLUMIERE ou de ses partenaires. Toute reproduction,
                distribution, modification ou utilisation de ces contenus, sans autorisation écrite préalable
                de SCP GEOLUMIERE, est strictement interdite.
              </p>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                5. Limitation de responsabilité
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                SCP GEOLUMIERE s&apos;efforce de maintenir les informations publiées sur ce site aussi
                précises et à jour que possible. Toutefois, SCP GEOLUMIERE ne saurait être tenu responsable
                des omissions, inexactitudes ou carences dans la mise à jour. Les informations fournies
                sur ce site le sont à titre purement informatif et ne constituent pas un conseil professionnel.
              </p>
            </div>

            {/* Liens hypertextes */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">
                6. Liens hypertextes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ce site peut contenir des liens vers des sites tiers. SCP GEOLUMIERE n&apos;exerce aucun
                contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur
                politique de confidentialité.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-muted/50 rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">
                Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter via
                la{" "}
                <Link href="/contact" className="text-accent hover:underline font-medium">
                  page contact
                </Link>{" "}
                ou à l&apos;adresse{" "}
                <a href="mailto:scpgeolumiere@gmail.com" className="text-accent hover:underline font-medium">
                  scpgeolumiere@gmail.com
                </a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
