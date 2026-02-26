"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CalendarDays, Clock, CheckCircle2, ChevronLeft, Loader2, Mail, ArrowRight, Building2, MapPin, Phone } from "lucide-react";
import { format, isBefore, startOfToday, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

const SERVICES = [
  "Topographie & Topométrie",
  "Bornage & Délimitation foncière",
  "SIG (Systèmes d'Information Géographique)",
  "Cartographie & Photogrammétrie",
  "Implantation & Nivellement",
  "Évaluations foncières et immobilières",
  "Formations",
  "Recherche géomatique",
];

type Step = "agency" | "datetime" | "info" | "success";

interface Agency {
  _id: string;
  name: string;
  district: string;
  city: string;
  country: string;
  directions: string;
  phones: string[];
  displayHours: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function RendezVousPage() {
  const { toast } = useToast();

  // Step management
  const [step, setStep] = useState<Step>("agency");

  // Agency step
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loadingAgencies, setLoadingAgencies] = useState(true);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  // DateTime step
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [allSlots, setAllSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  // Info step
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Success
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  // Fetch agencies on mount
  useEffect(() => {
    fetch("/api/agencies")
      .then((r) => r.json())
      .then((data) => {
        if (data.agencies) setAgencies(data.agencies);
      })
      .catch(() => {})
      .finally(() => setLoadingAgencies(false));
  }, []);

  // Fetch blocked dates on mount
  useEffect(() => {
    fetch("/api/blocked-dates")
      .then((r) => r.json())
      .then((data) => {
        if (data.blockedDates) {
          setBlockedDates(data.blockedDates.map((b: any) => new Date(b.date)));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch available slots when date or agency changes
  useEffect(() => {
    if (!selectedDate || !selectedAgency) return;
    setLoadingSlots(true);
    setSelectedSlot("");
    setAvailableSlots([]);
    setAllSlots([]);
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    fetch(`/api/appointments/available-slots?date=${dateStr}&agencyId=${selectedAgency._id}`)
      .then((r) => r.json())
      .then((data) => {
        setAvailableSlots(data.availableSlots || []);
        // For display: show all slots from the agency's schedule as well
        // We need to fetch them all — the API returns only available ones.
        // We'll store available as "all" and let the slot-booking logic handle it.
        setAllSlots(data.availableSlots || []);
      })
      .catch(() => {
        toast({ title: "Erreur", description: "Impossible de charger les créneaux.", variant: "destructive" });
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedAgency]);

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, startOfToday())) return true;
    if (blockedDates.some((bd) => isSameDay(bd, date))) return true;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot || !selectedAgency) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: format(selectedDate, "yyyy-MM-dd"),
          timeSlot: selectedSlot,
          agencyId: selectedAgency._id,
          agencyName: selectedAgency.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast({
            title: "Créneau indisponible",
            description: "Ce créneau vient d'être pris. Veuillez en choisir un autre.",
            variant: "destructive",
          });
          setStep("datetime");
        } else {
          toast({
            title: "Erreur",
            description: data.error || "Impossible d'envoyer la demande.",
            variant: "destructive",
          });
        }
        return;
      }

      setConfirmedAppointment(data.appointment);
      setStep("success");
    } catch {
      toast({ title: "Erreur réseau", description: "Veuillez réessayer.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setStep("agency");
    setSelectedAgency(null);
    setSelectedDate(undefined);
    setSelectedSlot("");
    setAvailableSlots([]);
    setAllSlots([]);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const stepIndex = { agency: 0, datetime: 1, info: 2, success: 3 };

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-wide text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <CalendarDays className="h-4 w-4" />
            Prise de rendez-vous en ligne
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Prendre rendez-vous
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Choisissez votre agence, votre date et créneau, puis renseignez vos informations.
            Notre équipe confirmera votre rendez-vous par email.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      {step !== "success" && (
        <div className="container-wide py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              {[
                { key: "agency", label: "Agence" },
                { key: "datetime", label: "Date & Créneau" },
                { key: "info", label: "Informations" },
              ].map((s, idx) => (
                <div key={s.key} className="flex items-center gap-2 flex-1">
                  <div className={cn("flex items-center gap-2 text-sm font-medium whitespace-nowrap", stepIndex[step as Step] === idx ? "text-accent" : stepIndex[step as Step] > idx ? "text-muted-foreground" : "text-muted-foreground/50")}>
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0", stepIndex[step as Step] === idx ? "bg-accent text-accent-foreground" : stepIndex[step as Step] > idx ? "bg-muted text-foreground" : "bg-muted text-muted-foreground/50")}>
                      {stepIndex[step as Step] > idx ? "✓" : idx + 1}
                    </div>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {idx < 2 && <div className="flex-1 h-0.5 bg-muted ml-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cross-link to contact */}
      <div className="container-wide pt-4 pb-2">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-accent shrink-0" />
              <p className="text-sm text-muted-foreground">
                Vous préférez nous écrire ou demander un devis ?
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link href="/contact">
                Page contact
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-wide pb-16 pt-4">
        <div className="max-w-3xl mx-auto">

          {/* STEP 0 — Agency selection */}
          {step === "agency" && (
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
              <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-accent" />
                Choisissez une agence
              </h2>

              {loadingAgencies ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
                </div>
              ) : agencies.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Aucune agence disponible. Veuillez nous contacter directement.
                </p>
              ) : (
                <div className="space-y-3">
                  {agencies.map((agency) => (
                    <button
                      key={agency._id}
                      onClick={() => setSelectedAgency(agency)}
                      className={cn(
                        "w-full text-left rounded-xl border-2 p-5 transition-all",
                        selectedAgency?._id === agency._id
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50 hover:bg-muted/50"
                      )}
                    >
                      <div className="font-semibold text-foreground mb-1">{agency.name}</div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {(agency.district || agency.city) && (
                          <span className="flex items-start gap-1">
                            <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <span>
                              {[agency.district, agency.city, agency.country].filter(Boolean).join(", ")}
                              {agency.directions && (
                                <span className="block text-xs text-muted-foreground/70">{agency.directions}</span>
                              )}
                            </span>
                          </span>
                        )}
                        {agency.phones?.[0] && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            {agency.phones[0]}
                          </span>
                        )}
                        {agency.displayHours && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {agency.displayHours}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <Button
                  variant="hero"
                  size="lg"
                  disabled={!selectedAgency}
                  onClick={() => setStep("datetime")}
                >
                  Continuer
                  <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 1 — Date & Slot */}
          {step === "datetime" && (
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
              {/* Agency recap */}
              {selectedAgency && (
                <div className="mb-6 p-3 bg-accent/10 rounded-lg flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-medium">{selectedAgency.name}</span>
                  <button onClick={() => setStep("agency")} className="text-xs text-accent hover:underline ml-auto">
                    Modifier
                  </button>
                </div>
              )}

              <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-accent" />
                Choisissez une date
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                    locale={fr}
                    className="rounded-xl border border-border"
                    classNames={{
                      day_selected: "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
                      day_today: "bg-muted font-bold",
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Les jours disponibles dépendent de l&apos;agence sélectionnée
                  </p>
                </div>

                {/* Time slots */}
                <div>
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    {selectedDate
                      ? `Créneaux du ${format(selectedDate, "d MMMM yyyy", { locale: fr })}`
                      : "Sélectionnez d'abord une date"}
                  </h3>

                  {!selectedDate ? (
                    <p className="text-muted-foreground text-sm">
                      Cliquez sur une date pour voir les créneaux disponibles.
                    </p>
                  ) : loadingSlots ? (
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded-lg" />
                      ))}
                    </div>
                  ) : allSlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                      Aucun créneau disponible pour cette date. Veuillez choisir un autre jour.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {allSlots.map((slot) => {
                        const isAvailable = availableSlots.includes(slot);
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={!isAvailable}
                            onClick={() => setSelectedSlot(slot)}
                            className={cn(
                              "h-10 rounded-lg text-sm font-medium border transition-all",
                              isSelected
                                ? "bg-accent text-accent-foreground border-accent"
                                : isAvailable
                                ? "border-border hover:border-accent hover:bg-accent/10 text-foreground"
                                : "border-border bg-muted text-muted-foreground cursor-not-allowed line-through"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep("agency")}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  disabled={!selectedDate || !selectedSlot}
                  onClick={() => setStep("info")}
                >
                  Continuer
                  <ChevronLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 — Personal Info */}
          {step === "info" && (
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
              {/* Recap */}
              <div className="mb-6 p-4 bg-accent/10 rounded-xl flex flex-wrap gap-4 items-center">
                {selectedAgency && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-accent" />
                    <span className="font-medium">{selectedAgency.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="font-medium">{selectedSlot}</span>
                </div>
                <button
                  onClick={() => setStep("datetime")}
                  className="text-xs text-accent hover:underline ml-auto"
                >
                  Modifier
                </button>
              </div>

              <h2 className="font-serif text-2xl font-semibold mb-6">
                Vos informations
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+229 01 XX XX XX XX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service souhaité *</Label>
                    <Select
                      required
                      value={formData.service}
                      onValueChange={(v) => setFormData({ ...formData, service: v })}
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez brièvement votre projet ou vos besoins..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("datetime")}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={submitting || !formData.name || !formData.email || !formData.service}
                    className="flex-1"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      "Confirmer la demande"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* SUCCESS */}
          {step === "success" && confirmedAppointment && (
            <div className="bg-card rounded-2xl border border-border shadow-soft p-8 text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-3">
                Demande envoyée !
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Votre demande de rendez-vous a bien été reçue. Vous allez recevoir
                un email de confirmation. Notre équipe vous contactera rapidement.
              </p>

              <div className="bg-muted/50 rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
                <h3 className="font-semibold mb-4 text-center">Récapitulatif</h3>
                <dl className="space-y-3 text-sm">
                  {confirmedAppointment.agencyName && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Agence</dt>
                      <dd className="font-medium text-right max-w-[180px]">{confirmedAppointment.agencyName}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="font-medium text-right max-w-[180px]">{confirmedAppointment.service}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="font-medium">
                      {format(new Date(confirmedAppointment.date), "d MMMM yyyy", { locale: fr })}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Heure</dt>
                    <dd className="font-medium">{confirmedAppointment.timeSlot}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Statut</dt>
                    <dd>
                      <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                        En attente de confirmation
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={resetAll}>
                  Prendre un autre rendez-vous
                </Button>
                <Button variant="hero" asChild>
                  <a href="/">Retour à l&apos;accueil</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
