import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { 
  MapPin, 
  Target, 
  FileText, 
  Ruler, 
  Plane, 
  Scale,
  CheckCircle,
  Star,
  ArrowRight,
  Phone
} from "lucide-react";
import heroImage from "@/assets/hero-surveyor.jpg";
import aerialImage from "@/assets/aerial-survey.jpg";

const services = [
  {
    icon: Target,
    title: "Relevé topographique",
    description: "Cartographie précise de votre terrain avec les technologies les plus avancées.",
    href: "/services#topographie"
  },
  {
    icon: MapPin,
    title: "Bornage foncier",
    description: "Délimitation officielle et sécurisée de vos propriétés.",
    href: "/services#bornage"
  },
  {
    icon: FileText,
    title: "Plan cadastral",
    description: "Documents conformes pour vos démarches administratives.",
    href: "/services#cadastre"
  },
  {
    icon: Ruler,
    title: "Plans permis de construire",
    description: "Plans techniques pour vos projets de construction.",
    href: "/services#permis"
  },
  {
    icon: Plane,
    title: "Photogrammétrie drone",
    description: "Relevés aériens haute précision par drone professionnel.",
    href: "/services#drone"
  },
  {
    icon: Scale,
    title: "Expertise foncière",
    description: "Conseils et accompagnement pour vos projets immobiliers.",
    href: "/services#expertise"
  }
];

const features = [
  "Plus de 25 ans d'expérience",
  "Équipement de dernière génération",
  "Précision millimétrique garantie",
  "Équipe certifiée et qualifiée",
  "Intervention rapide sur site",
  "Devis gratuit sous 24h"
];

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Architecte",
    content: "Une collaboration exemplaire pour notre projet de lotissement. Précision et professionnalisme au rendez-vous.",
    rating: 5
  },
  {
    name: "Pierre Martin",
    role: "Promoteur immobilier",
    content: "GéoExpert nous accompagne depuis 10 ans sur tous nos projets. Leur expertise est indispensable.",
    rating: 5
  },
  {
    name: "Sophie Leblanc",
    role: "Particulier",
    content: "Excellent service pour le bornage de notre terrain. Équipe réactive et documents livrés dans les délais.",
    rating: 5
  }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        
        <div className="relative container-wide py-20 md:py-32">
          <div className="max-w-2xl text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6 animate-fade-in">
              <span className="text-sm font-medium">Cabinet de Géomètres-Experts</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Précision et expertise au service de vos projets
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Relevés topographiques, bornage foncier, plans cadastraux — notre équipe d'experts vous accompagne dans tous vos projets immobiliers et fonciers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <a href="tel:+33123456789">
                  <Phone className="h-5 w-5" />
                  01 23 45 67 89
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary-foreground/50 animate-pulse-soft" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Nos services</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Une expertise complète à votre service
            </h2>
            <p className="text-muted-foreground text-lg">
              Découvrez l'ensemble de nos prestations adaptées à vos besoins en matière de géométrie et de topographie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.href}
                className="group bg-card rounded-xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                  En savoir plus
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={aerialImage} 
                alt="Vue aérienne d'un relevé topographique" 
                className="rounded-2xl shadow-elevated"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <div className="text-4xl font-serif font-bold">25+</div>
                <div className="text-sm">années d'expérience</div>
              </div>
            </div>

            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Pourquoi nous choisir</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                L'excellence au cœur de notre métier
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Notre cabinet combine tradition d'excellence et technologies de pointe pour vous offrir des services de géométrie de la plus haute qualité.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button asChild variant="accent" size="lg">
                  <Link to="/a-propos">
                    Découvrir notre cabinet
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Témoignages</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              La confiance de nos clients
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Découvrez ce que nos clients disent de notre collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/10"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-primary-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et personnalisé. Notre équipe vous répondra sous 24 heures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="tel:+33123456789">
                <Phone className="h-5 w-5" />
                Nous appeler
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
