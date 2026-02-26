"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Check,
  X,
  Trash2,
  AlertCircle,
  CalendarOff,
  Loader2,
  RefreshCw,
  Eye,
} from "lucide-react";
import { format, isBefore, startOfToday, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1].map(String);
const MONTHS_FR = [
  { v: "01", label: "Janvier" }, { v: "02", label: "Février" },
  { v: "03", label: "Mars" },    { v: "04", label: "Avril" },
  { v: "05", label: "Mai" },     { v: "06", label: "Juin" },
  { v: "07", label: "Juillet" }, { v: "08", label: "Août" },
  { v: "09", label: "Septembre" }, { v: "10", label: "Octobre" },
  { v: "11", label: "Novembre" }, { v: "12", label: "Décembre" },
];

type AppointmentStatus = "pending" | "confirmed" | "cancelled";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  timeSlot: string;
  message?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: string;
  agencyName?: string;
  agencyId?: { _id: string; name: string } | string;
}

interface BlockedDate {
  _id: string;
  date: string;
  reason?: string;
}

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  pending:   { label: "En attente", className: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Confirmé",   className: "bg-green-100 text-green-700" },
  cancelled: { label: "Annulé",     className: "bg-red-100 text-red-700" },
};

function getAgencyName(appt: Appointment): string {
  if (appt.agencyName?.trim()) return appt.agencyName.trim();
  if (appt.agencyId && typeof appt.agencyId === "object" && appt.agencyId.name) return appt.agencyId.name;
  if (typeof appt.agencyId === "string" && appt.agencyId) return appt.agencyId;
  return "—";
}

const CALENDAR_CLASSNAMES = {
  month: "space-y-4 w-full",
  head_row: "flex w-full",
  head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] text-center",
  row: "flex w-full mt-2",
  cell: "flex-1 h-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day: "inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-full p-0 font-normal aria-selected:opacity-100",
};

export default function AdminRendezVousPage() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"appointments" | "blocked">("appointments");

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");

  // Action dialog
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    appointment: Appointment | null;
    action: "confirm" | "cancel" | "delete";
  }>({ open: false, appointment: null, action: "confirm" });
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Detail dialog
  const [detailDialog, setDetailDialog] = useState<{
    open: boolean;
    appointment: Appointment | null;
  }>({ open: false, appointment: null });

  // Blocked dates state
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loadingBlocked, setLoadingBlocked] = useState(true);
  const [selectedBlockDate, setSelectedBlockDate] = useState<Date | undefined>(undefined);
  const [blockReason, setBlockReason] = useState("");
  const [blockingDate, setBlockingDate] = useState(false);
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoadingAppts(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (monthFilter) params.set("month", monthFilter);
    try {
      const res = await fetch(`/api/appointments?${params}`);
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch {
      toast({ title: "Erreur", description: "Impossible de charger les rendez-vous.", variant: "destructive" });
    } finally {
      setLoadingAppts(false);
    }
  }, [statusFilter, monthFilter]);

  const fetchBlockedDates = useCallback(async () => {
    setLoadingBlocked(true);
    try {
      const res = await fetch("/api/blocked-dates");
      const data = await res.json();
      setBlockedDates(data.blockedDates || []);
    } catch {
      toast({ title: "Erreur", description: "Impossible de charger les jours bloqués.", variant: "destructive" });
    } finally {
      setLoadingBlocked(false);
    }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);
  useEffect(() => { fetchBlockedDates(); }, [fetchBlockedDates]);

  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  const handleAction = async () => {
    if (!actionDialog.appointment) return;
    setActionLoading(true);

    if (actionDialog.action === "delete") {
      try {
        const res = await fetch(`/api/appointments/${actionDialog.appointment._id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast({ title: "Rendez-vous supprimé" });
        setAppointments((prev) => prev.filter((a) => a._id !== actionDialog.appointment!._id));
        setActionDialog({ open: false, appointment: null, action: "confirm" });
      } catch {
        toast({ title: "Erreur", description: "Impossible de supprimer.", variant: "destructive" });
      } finally {
        setActionLoading(false);
      }
      return;
    }

    const newStatus = actionDialog.action === "confirm" ? "confirmed" : "cancelled";
    try {
      const res = await fetch(`/api/appointments/${actionDialog.appointment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a._id === data.appointment._id ? data.appointment : a))
      );
      toast({
        title: newStatus === "confirmed" ? "Rendez-vous confirmé" : "Rendez-vous annulé",
        description: newStatus === "confirmed"
          ? "Un email de confirmation a été envoyé au client."
          : "Le rendez-vous a été marqué comme annulé.",
      });
      setActionDialog({ open: false, appointment: null, action: "confirm" });
      setAdminNotes("");
    } catch {
      toast({ title: "Erreur", description: "Impossible de mettre à jour.", variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlockDate = async () => {
    if (!selectedBlockDate) return;
    setBlockingDate(true);
    try {
      const res = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedBlockDate, "yyyy-MM-dd"),
          reason: blockReason || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: "Erreur", description: data.error || "Impossible de bloquer.", variant: "destructive" });
        return;
      }
      setBlockedDates((prev) =>
        [...prev, data.blocked].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
      setSelectedBlockDate(undefined);
      setBlockReason("");
      toast({ title: "Date bloquée", description: format(selectedBlockDate, "d MMMM yyyy", { locale: fr }) });
    } catch {
      toast({ title: "Erreur réseau", variant: "destructive" });
    } finally {
      setBlockingDate(false);
    }
  };

  const handleUnblockDate = async (id: string) => {
    setDeletingBlockId(id);
    try {
      const res = await fetch(`/api/blocked-dates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBlockedDates((prev) => prev.filter((b) => b._id !== id));
      toast({ title: "Date débloquée" });
    } catch {
      toast({ title: "Erreur", description: "Impossible de débloquer.", variant: "destructive" });
    } finally {
      setDeletingBlockId(null);
    }
  };

  const blockedDateObjects = blockedDates.map((b) => new Date(b.date));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="h-7 w-7 text-accent" />
            Rendez-vous
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez les demandes de rendez-vous et les jours bloqués
          </p>
        </div>
        {pendingCount > 0 && (
          <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            {pendingCount} en attente
          </span>
        )}
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 mb-6 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("appointments")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "appointments"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Rendez-vous
          {pendingCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("blocked")}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "blocked"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Jours bloqués
        </button>
      </div>

      {/* TAB: Appointments */}
      {activeTab === "appointments" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Statut :</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">Tous</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmés</option>
                <option value="cancelled">Annulés</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Mois :</label>
              <select
                value={monthFilter ? monthFilter.split("-")[1] : "all"}
                onChange={(e) => {
                  const m = e.target.value;
                  if (m === "all") { setMonthFilter(""); return; }
                  const y = monthFilter ? monthFilter.split("-")[0] : String(CURRENT_YEAR);
                  setMonthFilter(`${y}-${m}`);
                }}
                className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">Tous les mois</option>
                {MONTHS_FR.map((m) => (
                  <option key={m.v} value={m.v}>{m.label}</option>
                ))}
              </select>
              {monthFilter && (
                <select
                  value={monthFilter.split("-")[0]}
                  onChange={(e) => setMonthFilter(`${e.target.value}-${monthFilter.split("-")[1]}`)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              )}
            </div>
            <button
              onClick={fetchAppointments}
              className="sm:ml-auto flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-sm transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </button>
          </div>

          {/* Table */}
          {loadingAppts ? (
            <p className="text-center text-muted-foreground py-12">Chargement...</p>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Aucun rendez-vous trouvé.</p>
            </div>
          ) : (
            <div className="bg-card rounded-xl shadow-soft overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="hidden md:table-cell text-left px-6 py-4 text-sm font-medium text-muted-foreground">Agence</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Client</th>
                    <th className="hidden sm:table-cell text-left px-6 py-4 text-sm font-medium text-muted-foreground">Service</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date / Heure</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Statut</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="border-b border-border hover:bg-muted/30">
                      <td className="hidden md:table-cell px-6 py-4 text-sm font-medium">{getAgencyName(appt)}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{appt.name}</p>
                        <p className="text-xs text-muted-foreground">{appt.email}</p>
                        {appt.phone && <p className="text-xs text-muted-foreground">{appt.phone}</p>}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 text-sm">{appt.service}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">
                          {format(new Date(appt.date), "d MMM yyyy", { locale: fr })}
                        </p>
                        <p className="text-xs text-muted-foreground">{appt.timeSlot}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("px-2 py-1 text-xs rounded-full", statusConfig[appt.status].className)}>
                          {statusConfig[appt.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setDetailDialog({ open: true, appointment: appt })}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </button>
                          {appt.status === "pending" && (
                            <>
                              <button
                                onClick={() => { setActionDialog({ open: true, appointment: appt, action: "confirm" }); setAdminNotes(""); }}
                                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                                title="Confirmer"
                              >
                                <Check className="h-4 w-4 text-green-600" />
                              </button>
                              <button
                                onClick={() => { setActionDialog({ open: true, appointment: appt, action: "cancel" }); setAdminNotes(""); }}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Refuser"
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </button>
                            </>
                          )}
                          {appt.status === "confirmed" && (
                            <button
                              onClick={() => { setActionDialog({ open: true, appointment: appt, action: "cancel" }); setAdminNotes(""); }}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Annuler"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          )}
                          <button
                            onClick={() => setActionDialog({ open: true, appointment: appt, action: "delete" })}
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* TAB: Blocked dates */}
      {activeTab === "blocked" && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add blocked date */}
          <div className="bg-card rounded-xl border border-border shadow-soft p-6">
            <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
              <CalendarOff className="h-5 w-5 text-accent" />
              Bloquer une date
            </h2>
            <Calendar
              mode="single"
              selected={selectedBlockDate}
              onSelect={setSelectedBlockDate}
              disabled={(date) => isBefore(date, startOfToday()) || date.getDay() === 0 || date.getDay() === 6}
              locale={fr}
              className="rounded-xl border border-border mb-4 w-full"
              modifiers={{ blocked: blockedDateObjects }}
              modifiersClassNames={{ blocked: "bg-red-100 text-red-600 line-through" }}
              classNames={CALENDAR_CLASSNAMES}
            />
            {selectedBlockDate && (
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  Date sélectionnée :{" "}
                  <span className="text-accent">{format(selectedBlockDate, "d MMMM yyyy", { locale: fr })}</span>
                </p>
                <div>
                  <label htmlFor="block-reason" className="block text-sm font-medium mb-1">
                    Raison (optionnel)
                  </label>
                  <input
                    id="block-reason"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="Congé, fermeture exceptionnelle…"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
                <Button
                  onClick={handleBlockDate}
                  disabled={blockingDate || blockedDateObjects.some((bd) => isSameDay(bd, selectedBlockDate))}
                  className="w-full"
                >
                  {blockingDate ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Blocage en cours…</>
                  ) : (
                    <><CalendarOff className="h-4 w-4 mr-2" />Bloquer cette date</>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* List of blocked dates */}
          <div className="bg-card rounded-xl border border-border shadow-soft p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Dates bloquées</h2>
            {loadingBlocked ? (
              <p className="text-center text-muted-foreground py-8">Chargement...</p>
            ) : blockedDates.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">Aucune date bloquée.</p>
            ) : (
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {blockedDates.map((bd) => (
                  <li
                    key={bd._id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {format(new Date(bd.date), "EEEE d MMMM yyyy", { locale: fr })}
                      </p>
                      {bd.reason && <p className="text-xs text-muted-foreground">{bd.reason}</p>}
                    </div>
                    <button
                      onClick={() => handleUnblockDate(bd._id)}
                      disabled={deletingBlockId === bd._id}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      {deletingBlockId === bd._id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog
        open={detailDialog.open}
        onOpenChange={(open) => setDetailDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
            {detailDialog.appointment && (
              <DialogDescription>
                Demande reçue le{" "}
                {format(new Date(detailDialog.appointment.createdAt), "d MMMM yyyy à HH:mm", { locale: fr })}
              </DialogDescription>
            )}
          </DialogHeader>

          {detailDialog.appointment && (() => {
            const appt = detailDialog.appointment!;
            return (
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Agence</p>
                    <p className="font-medium">{getAgencyName(appt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Statut</p>
                    <span className={cn("px-2 py-1 text-xs rounded-full", statusConfig[appt.status].className)}>
                      {statusConfig[appt.status].label}
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Nom</p>
                    <p className="font-medium">{appt.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Email</p>
                    <a href={`mailto:${appt.email}`} className="text-accent hover:underline">{appt.email}</a>
                  </div>
                  {appt.phone && (
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Téléphone</p>
                      <a href={`tel:${appt.phone}`} className="text-accent hover:underline">{appt.phone}</a>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Service</p>
                    <p className="font-medium">{appt.service}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Date</p>
                    <p className="font-medium">{format(new Date(appt.date), "EEEE d MMMM yyyy", { locale: fr })}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-0.5">Heure</p>
                    <p className="font-medium">{appt.timeSlot}</p>
                  </div>
                </div>

                {appt.message && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-muted-foreground text-xs mb-1.5">Message du client</p>
                      <p className="text-sm whitespace-pre-wrap bg-muted/50 rounded-lg p-3">{appt.message}</p>
                    </div>
                  </>
                )}

                {appt.adminNotes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-muted-foreground text-xs mb-1.5">Note admin</p>
                      <p className="text-sm whitespace-pre-wrap bg-muted/50 rounded-lg p-3">{appt.adminNotes}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          <DialogFooter>
            {detailDialog.appointment?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-300 hover:bg-green-50"
                  onClick={() => {
                    setActionDialog({ open: true, appointment: detailDialog.appointment, action: "confirm" });
                    setDetailDialog({ open: false, appointment: null });
                    setAdminNotes("");
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirmer
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => {
                    setActionDialog({ open: true, appointment: detailDialog.appointment, action: "cancel" });
                    setDetailDialog({ open: false, appointment: null });
                    setAdminNotes("");
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Refuser
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setDetailDialog({ open: false, appointment: null })}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onOpenChange={(open) => setActionDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action === "confirm" && "Confirmer le rendez-vous"}
              {actionDialog.action === "cancel" && "Refuser le rendez-vous"}
              {actionDialog.action === "delete" && "Supprimer le rendez-vous"}
            </DialogTitle>
            {actionDialog.appointment && (
              <DialogDescription>
                {actionDialog.appointment.name} —{" "}
                {format(new Date(actionDialog.appointment.date), "d MMMM yyyy", { locale: fr })} à{" "}
                {actionDialog.appointment.timeSlot}
              </DialogDescription>
            )}
          </DialogHeader>

          {actionDialog.action === "confirm" && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                Voulez-vous confirmer ce rendez-vous ? Un email de confirmation sera envoyé au client.
              </p>
              <div className="space-y-2">
                <Label htmlFor="admin-notes">Note pour le client (optionnel)</Label>
                <Textarea
                  id="admin-notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Merci d'apporter vos documents…"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Ce message sera inclus dans l&apos;email de confirmation.
                </p>
              </div>
            </div>
          )}

          {actionDialog.action === "cancel" && (
            <div className="space-y-2 py-2">
              <p className="text-sm text-muted-foreground">
                Voulez-vous refuser ce rendez-vous ?
              </p>
              <p className="text-sm text-muted-foreground">
                Le client ne recevra pas d&apos;email de refus. Sa demande sera simplement marquée comme annulée.
              </p>
            </div>
          )}

          {actionDialog.action === "delete" && (
            <p className="text-sm text-muted-foreground py-2">
              Cette action est irréversible. Le rendez-vous sera définitivement supprimé.
            </p>
          )}

          <Separator />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionDialog((prev) => ({ ...prev, open: false }))}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button
              variant={actionDialog.action === "delete" || actionDialog.action === "cancel" ? "destructive" : "default"}
              onClick={handleAction}
              disabled={actionLoading}
              className={actionDialog.action === "confirm" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {actionLoading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />En cours…</>
              ) : (
                <>
                  {actionDialog.action === "confirm" && <><Check className="h-4 w-4 mr-2" />Confirmer</>}
                  {actionDialog.action === "cancel" && <><X className="h-4 w-4 mr-2" />Refuser le RDV</>}
                  {actionDialog.action === "delete" && <><Trash2 className="h-4 w-4 mr-2" />Supprimer</>}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
