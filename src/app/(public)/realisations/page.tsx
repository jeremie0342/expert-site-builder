"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Building2, Home, Trees, Factory } from "lucide-react";

const categories = [
  { id: "all", label: "Tous" },
  { id: "residential", label: "Résidentiel" },
  { id: "commercial", label: "Commercial" },
  { id: "public", label: "Collectivités" },
  { id: "agricultural", label: "Agricole" },
];

const projects = [
  {
    id: 1,
    title: "Lotissement Résidentiel Calavi",
    category: "residential",
    location: "Abomey-Calavi",
    date: "2025",
    description:
      "Relevé topographique et bornage pour un lotissement de 60 parcelles sur 12 hectares.",
    services: ["Relevé topographique", "Bornage", "Plans de division"],
    icon: Home,
  },
  {
    id: 2,
    title: "Zone commerciale Akpakpa",
    category: "commercial",
    location: "Cotonou",
    date: "2025",
    description:
      "Plan de masse et implantation pour l'extension d'une zone commerciale de 8 000 m².",
    services: ["Plan de masse", "Implantation", "Suivi de chantier"],
    icon: Building2,
  },
  {
    id: 3,
    title: "Cartographie du parc de la Pendjari",
    category: "public",
    location: "Natitingou",
    date: "2024",
    description:
      "Cartographie et SIG de 200 hectares pour le suivi environnemental du parc national.",
    services: ["Cartographie", "SIG", "Modèle 3D"],
    icon: Trees,
  },
  {
    id: 4,
    title: "Exploitation agricole Borgou",
    category: "agricultural",
    location: "Parakou",
    date: "2024",
    description:
      "Bornage et relevé de 180 hectares de terres agricoles pour un aménagement foncier.",
    services: ["Bornage", "Relevé topographique", "Évaluation foncière"],
    icon: Factory,
  },
  {
    id: 5,
    title: "Résidence Les Cocotiers",
    category: "residential",
    location: "Cotonou",
    date: "2024",
    description:
      "Plans d'implantation et nivellement pour une résidence de 40 logements.",
    services: ["Implantation", "Nivellement", "Bornage"],
    icon: Home,
  },
  {
    id: 6,
    title: "Zone franche industrielle",
    category: "commercial",
    location: "Sèmè-Kpodji",
    date: "2023",
    description:
      "Aménagement d'une zone industrielle de 15 hectares avec suivi topographique complet.",
    services: ["Relevé topographique", "Plans d'aménagement", "Implantation"],
    icon: Building2,
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Portfolio
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Nos réalisations
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Découvrez une sélection de nos projets récents en topographie, bornage et expertise
              foncière au Bénin.
            </p>
          </div>
        </div>
      </section>

      {/* Featured project */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Image
              src="/images/aerial-survey.jpg"
              alt="Vue aérienne d'un projet"
              width={600}
              height={400}
              className="rounded-2xl shadow-elevated w-full"
            />
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Projet phare
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Cartographie SIG du littoral béninois
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Mission de cartographie et création d&apos;un SIG sur 300 hectares le long du littoral
                béninois. Création d&apos;orthophotos haute résolution et modèle numérique de terrain
                pour le suivi environnemental et la gestion côtière.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Cartographie", "SIG", "MNT", "Photogrammétrie"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button asChild variant="accent" size="lg">
                <Link href="/contact">
                  Discuter de votre projet
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="h-48 bg-secondary flex items-center justify-center">
                  <project.icon className="h-16 w-16 text-muted-foreground/50 group-hover:text-accent transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-secondary text-xs text-foreground rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Vous avez un projet similaire ?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link href="/contact">
              Demander un devis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
