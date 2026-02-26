import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <section className="section-padding">
        <div className="container-narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Janvier 2025
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              5 min de lecture
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              SCP GEOLUMIERE
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
            Article : {params.slug.replace(/-/g, " ")}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cet article sera bientôt disponible. Revenez nous consulter prochainement pour
              découvrir nos conseils d&apos;experts en géométrie et topographie.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">
                Besoin d&apos;un expert ? Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
