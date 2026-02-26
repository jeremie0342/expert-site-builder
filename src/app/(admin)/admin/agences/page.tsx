"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus, X, Pencil, Trash2, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const DEFAULT_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

interface ScheduleDay {
  day: string;
  isOpen: boolean;
  slots: string[];
}

interface Agency {
  _id?: string;
  name: string;
  district: string;
  city: string;
  country: string;
  directions: string;
  phones: string[];
  emails: string[];
  schedule: ScheduleDay[];
  displayHours: string;
  isMainOffice: boolean;
  isActive: boolean;
  order: number;
}

const emptyAgency = (): Agency => ({
  name: "",
  district: "",
  city: "",
  country: "Bénin",
  directions: "",
  phones: [""],
  emails: [""],
  schedule: DAYS.map((day) => ({
    day,
    isOpen: day !== "samedi" && day !== "dimanche",
    slots: day !== "samedi" && day !== "dimanche" ? [...DEFAULT_SLOTS] : [],
  })),
  displayHours: "Lun-Ven : 8h00 - 18h00",
  isMainOffice: false,
  isActive: true,
  order: 0,
});

export default function AdminAgencesPage() {
  const { toast } = useToast();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Agency>(emptyAgency());
  const [expandedSchedule, setExpandedSchedule] = useState(false);

  const fetchAgencies = async () => {
    try {
      const res = await fetch("/api/agencies");
      const data = await res.json();
      if (data.agencies) setAgencies(data.agencies);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchAgencies(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyAgency());
    setExpandedSchedule(false);
    setShowForm(true);
  };

  const openEdit = (agency: Agency) => {
    setEditingId(agency._id || null);
    setFormData({
      ...agency,
      district:   agency.district   ?? "",
      city:       agency.city       ?? "",
      country:    agency.country    ?? "Bénin",
      directions: agency.directions ?? "",
      phones: agency.phones?.length ? agency.phones : [""],
      emails: agency.emails?.length ? agency.emails : [""],
      schedule: DAYS.map((day) => {
        const existing = agency.schedule?.find((s) => s.day === day);
        return existing || { day, isOpen: false, slots: [] };
      }),
    });
    setExpandedSchedule(false);
    setShowForm(true);
  };

  const handleDelete = async (agency: Agency) => {
    if (agency.isMainOffice) {
      toast({ title: "Impossible de supprimer le siège principal", variant: "destructive" });
      return;
    }
    if (!confirm(`Supprimer "${agency.name}" ?`)) return;
    try {
      const res = await fetch(`/api/agencies/${agency._id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Agence supprimée" });
        fetchAgencies();
      } else {
        const d = await res.json();
        toast({ title: d.error || "Erreur", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur réseau", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      phones: formData.phones.filter((p) => p.trim()),
      emails: formData.emails.filter((e) => e.trim()),
    };

    try {
      const url = editingId ? `/api/agencies/${editingId}` : "/api/agencies";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: editingId ? "Agence mise à jour" : "Agence créée" });
        setShowForm(false);
        fetchAgencies();
      } else {
        const d = await res.json();
        toast({ title: d.error || "Erreur", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur réseau", variant: "destructive" });
    }
    setSaving(false);
  };

  // Helpers for arrays
  const updateArr = (field: "phones" | "emails", i: number, val: string) => {
    const arr = [...formData[field]];
    arr[i] = val;
    setFormData({ ...formData, [field]: arr });
  };
  const addArr = (field: "phones" | "emails") =>
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  const removeArr = (field: "phones" | "emails", i: number) =>
    setFormData({ ...formData, [field]: formData[field].filter((_, idx) => idx !== i) });

  // Schedule helpers
  const toggleDay = (dayIdx: number) => {
    const schedule = formData.schedule.map((s, i) => {
      if (i !== dayIdx) return s;
      const isOpen = !s.isOpen;
      return { ...s, isOpen, slots: isOpen && !s.slots.length ? [...DEFAULT_SLOTS] : s.slots };
    });
    setFormData({ ...formData, schedule });
  };

  const toggleSlot = (dayIdx: number, slot: string) => {
    const schedule = formData.schedule.map((s, i) => {
      if (i !== dayIdx) return s;
      const slots = s.slots.includes(slot)
        ? s.slots.filter((sl) => sl !== slot)
        : [...s.slots, slot].sort();
      return { ...s, slots };
    });
    setFormData({ ...formData, schedule });
  };

  if (loading) return <p className="text-center text-muted-foreground py-20">Chargement...</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-7 w-7 text-accent" />
            Agences
          </h1>
          <p className="text-muted-foreground mt-1">Gérez les agences et leurs horaires</p>
        </div>
        {!showForm && (
          <Button variant="hero" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nouvelle agence
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-soft p-6 mb-8 space-y-6 max-w-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-xl font-semibold">
              {editingId ? "Modifier l'agence" : "Nouvelle agence"}
            </h2>
            <button type="button" onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Siège Social - Godomey"
            />
          </div>

          {/* Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quartier / Zone</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Godomey"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ville</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Abomey-Calavi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pays</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">— Sélectionner —</option>
                <optgroup label="Afrique de l'Ouest">
                  <option>Bénin</option>
                  <option>Burkina Faso</option>
                  <option>Cap-Vert</option>
                  <option>Côte d&apos;Ivoire</option>
                  <option>Gambie</option>
                  <option>Ghana</option>
                  <option>Guinée</option>
                  <option>Guinée-Bissau</option>
                  <option>Liberia</option>
                  <option>Mali</option>
                  <option>Mauritanie</option>
                  <option>Niger</option>
                  <option>Nigeria</option>
                  <option>Sénégal</option>
                  <option>Sierra Leone</option>
                  <option>Togo</option>
                </optgroup>
                <optgroup label="Afrique Centrale">
                  <option>Angola</option>
                  <option>Burundi</option>
                  <option>Cameroun</option>
                  <option>Congo-Brazzaville</option>
                  <option>Congo-Kinshasa (RDC)</option>
                  <option>Gabon</option>
                  <option>Guinée équatoriale</option>
                  <option>République centrafricaine</option>
                  <option>Rwanda</option>
                  <option>São Tomé-et-Príncipe</option>
                  <option>Tchad</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Indication d&apos;accès</label>
              <input
                type="text"
                value={formData.directions}
                onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Face au carrefour X, à côté de Y"
              />
            </div>
          </div>

          {/* Phones */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Téléphones</label>
              <button type="button" onClick={() => addArr("phones")} className="text-accent text-sm flex items-center gap-1">
                <Plus className="h-4 w-4" /> Ajouter
              </button>
            </div>
            {formData.phones.map((p, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={p}
                  onChange={(e) => updateArr("phones", i, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="XX XX XX XX"
                />
                {formData.phones.length > 1 && (
                  <button type="button" onClick={() => removeArr("phones", i)} className="p-2 hover:bg-destructive/10 rounded-lg">
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Emails */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Emails</label>
              <button type="button" onClick={() => addArr("emails")} className="text-accent text-sm flex items-center gap-1">
                <Plus className="h-4 w-4" /> Ajouter
              </button>
            </div>
            {formData.emails.map((em, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="email"
                  value={em}
                  onChange={(e) => updateArr("emails", i, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="agence@example.com"
                />
                {formData.emails.length > 1 && (
                  <button type="button" onClick={() => removeArr("emails", i)} className="p-2 hover:bg-destructive/10 rounded-lg">
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Display Hours */}
          <div>
            <label className="block text-sm font-medium mb-1">Horaires affichés (texte)</label>
            <input
              type="text"
              value={formData.displayHours}
              onChange={(e) => setFormData({ ...formData, displayHours: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Lun-Ven : 8h00 - 18h00"
            />
          </div>

          {/* Schedule */}
          <div className="bg-muted/30 rounded-xl p-4">
            <button
              type="button"
              onClick={() => setExpandedSchedule((v) => !v)}
              className="w-full flex items-center justify-between text-sm font-medium"
            >
              <span>Planning par jour</span>
              {expandedSchedule ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {expandedSchedule && (
              <div className="mt-4 space-y-4">
                {formData.schedule.map((s, dayIdx) => (
                  <div key={s.day} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDay(dayIdx)}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                          s.isOpen ? "bg-accent" : "bg-muted"
                        )}
                      >
                        <span className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          s.isOpen ? "translate-x-6" : "translate-x-1"
                        )} />
                      </button>
                      <span className="text-sm font-medium capitalize">{s.day}</span>
                    </div>
                    {s.isOpen && (
                      <div className="flex flex-wrap gap-2 pl-14">
                        {DEFAULT_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => toggleSlot(dayIdx, slot)}
                            className={cn(
                              "px-3 py-1 rounded-lg text-xs font-medium border transition-all",
                              s.slots.includes(slot)
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border text-muted-foreground hover:border-accent"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ordre</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer pt-6">
              <input
                type="checkbox"
                checked={formData.isMainOffice}
                onChange={(e) => setFormData({ ...formData, isMainOffice: e.target.checked })}
                className="h-4 w-4 rounded border-border"
              />
              Siège principal
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer pt-6">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-border"
              />
              Active
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="hero" disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </form>
      )}

      {/* Agencies list */}
      {agencies.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>Aucune agence. Créez votre première agence ci-dessus.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {agencies.map((agency) => (
            <div key={agency._id} className="bg-card rounded-xl border border-border shadow-soft p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{agency.name}</h3>
                  {agency.isMainOffice && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Siège</span>
                  )}
                  {!agency.isActive && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Inactive</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {[agency.district, agency.city, agency.country].filter(Boolean).join(", ")}
                  {agency.directions && (
                    <span className="block text-xs text-muted-foreground/70">{agency.directions}</span>
                  )}
                </p>
                {agency.phones?.length > 0 && (
                  <p className="text-sm text-muted-foreground">{agency.phones.join(" / ")}</p>
                )}
                {agency.displayHours && (
                  <p className="text-xs text-muted-foreground/70 mt-1">{agency.displayHours}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(agency)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={agency.isMainOffice}
                  onClick={() => handleDelete(agency)}
                  className="text-destructive hover:bg-destructive/10 disabled:opacity-40"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
