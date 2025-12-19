import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";

const articles = [
  {
    id: 1,
    slug: "pourquoi-faire-appel-geometre-expert",
    title: "Pourquoi faire appel à un géomètre-expert ?",
    excerpt:
      "Découvrez les situations qui nécessitent l'intervention d'un géomètre-expert et les avantages de faire appel à un professionnel qualifié pour vos projets fonciers.",
    category: "Conseil",
    author: "Jean-Pierre Durand",
    date: "15 décembre 2024",
    readTime: "5 min",
  },
  {
    id: 2,
    slug: "comment-preparer-bornage",
    title: "Comment préparer un bornage : le guide complet",
    excerpt:
      "Tout ce que vous devez savoir avant de procéder à un bornage : documents à rassembler, démarches préalables et déroulement de l'opération.",
    category: "Guide pratique",
    author: "Marie Lefebvre",
    date: "8 décembre 2024",
    readTime: "8 min",
  },
  {
    id: 3,
    slug: "importance-releves-topo-permis-construire",
    title: "L'importance des relevés topographiques pour vos permis de construire",
    excerpt:
      "Un relevé topographique précis est essentiel pour obtenir votre permis de construire. Découvrez pourquoi et comment bien le préparer.",
    category: "Réglementation",
    author: "Thomas Bernard",
    date: "1 décembre 2024",
    readTime: "6 min",
  },
  {
    id: 4,
    slug: "drone-revolution-topographie",
    title: "Le drone : une révolution dans la topographie moderne",
    excerpt:
      "La photogrammétrie par drone transforme notre métier. Découvrez les avantages de cette technologie pour vos projets de relevé de grande envergure.",
    category: "Technologie",
    author: "Thomas Bernard",
    date: "20 novembre 2024",
    readTime: "7 min",
  },
  {
    id: 5,
    slug: "division-parcellaire-etapes",
    title: "Division parcellaire : les étapes clés à connaître",
    excerpt:
      "Vous souhaitez diviser votre terrain ? Voici les étapes administratives et techniques à suivre pour mener à bien votre projet de division.",
    category: "Guide pratique",
    author: "Jean-Pierre Durand",
    date: "10 novembre 2024",
    readTime: "6 min",
  },
  {
    id: 6,
    slug: "servitudes-passage-droits-obligations",
    title: "Servitudes de passage : vos droits et obligations",
    excerpt:
      "Comprendre les servitudes de passage est essentiel pour tout propriétaire. Notre guide complet vous éclaire sur ce sujet parfois complexe.",
    category: "Juridique",
    author: "Marie Lefebvre",
    date: "1 novembre 2024",
    readTime: "9 min",
  },
];

const categories = ["Tous", "Conseil", "Guide pratique", "Réglementation", "Technologie", "Juridique"];

export default function Blog() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Blog & Actualités
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Nos articles et conseils
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Retrouvez nos conseils d'experts, guides pratiques et actualités du monde de la
              géométrie et de la topographie.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-background sticky top-[64px] md:top-[80px] z-40">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "Tous"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Tag className="h-12 w-12 text-accent/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus d'articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Restez informé
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et conseils
            d'experts.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button type="submit" variant="hero">
              S'inscrire
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
