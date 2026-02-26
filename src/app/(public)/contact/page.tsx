"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, CalendarDays, ArrowRight, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  "Topographie & Topométrie",
  "Bornage & Délimitation foncière",
  "SIG",
  "Cartographie & Photogrammétrie",
  "Implantation & Nivellement",
  "Évaluations foncières et immobilières",
  "Formations",
  "Autre",
];

interface Agency {
  _id: string;
  name: string;
  district: string;
  city: string;
  country: string;
  directions: string;
  phones: string[];
  emails: string[];
  displayHours: string;
  isMainOffice: boolean;
}

export default function ContactPage() {
  const { toast } = useToast();
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    fetch("/api/agencies")
      .then((r) => r.json())
      .then((data) => { if (data.agencies) setAgencies(data.agencies); })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Message envoyé !",
          description: "Nous vous répondrons dans les plus brefs délais.",
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hero text-primary-foreground section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Contact</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Parlons de votre projet
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Contactez-nous pour obtenir un devis gratuit ou pour toute question concernant nos
              services de géomètre-expert.
            </p>
          </div>
        </div>
      </section>

      {/* Agencies */}
      {agencies.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-wide">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-accent" />
                Nos agences
              </h2>
              <p className="text-muted-foreground text-sm">
                Retrouvez-nous dans l&apos;une de nos agences
              </p>
            </div>
            <div className={`grid gap-6 ${agencies.length === 1 ? "max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {agencies.map((agency) => (
                <div key={agency._id} className="bg-card rounded-2xl border border-border p-6 shadow-soft">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif font-semibold text-foreground">{agency.name}</h3>
                    {agency.isMainOffice && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium shrink-0 ml-2">
                        Siège
                      </span>
                    )}
                  </div>
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
                          {agency.phones.map((phone) => (
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
                          {agency.emails.map((email) => (
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
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Quick info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  Devis gratuit et rapide
                </h3>
                <ul className="space-y-3">
                  {[
                    "Réponse rapide garantie",
                    "Devis détaillé et transparent",
                    "Intervention sur tout le Bénin",
                    "Accompagnement personnalisé",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-soft">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Demande de devis
                </h2>
                <p className="text-muted-foreground mb-8">
                  Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Type de prestation *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez...</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Décrivez votre projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                      placeholder="Décrivez votre projet, la localisation du terrain, vos besoins spécifiques..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      J&apos;accepte que mes données soient traitées conformément à la{" "}
                      <a href="#" className="text-accent hover:underline">
                        politique de confidentialité
                      </a>
                      .
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to rendez-vous */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-card rounded-2xl border border-border p-8 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <CalendarDays className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Vous préférez un rendez-vous en cabinet ?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Choisissez directement une date et un créneau qui vous conviennent.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/rendez-vous">
                Prendre rendez-vous
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-96 bg-secondary relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">Carte interactive</p>
            <p className="text-sm text-muted-foreground/70">Godomey, Abomey-Calavi, Bénin</p>
          </div>
        </div>
      </section>
    </>
  );
}
