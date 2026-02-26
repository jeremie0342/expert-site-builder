"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";
import { format, isBefore, startOfToday, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

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
}

interface BlockedDate {
  _id: string;
  date: string;
  reason?: string;
}

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-amber-100 text-amber-700 border-amber-300" },
  confirmed: { label: "Confirmé", className: "bg-green-100 text-green-700 border-green-300" },
  cancelled: { label: "Annulé", className: "bg-red-100 text-red-700 border-red-300" },
};

export default function AdminRendezVousPage() {
  const { toast } = useToast();

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

  // Blocked dates state
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loadingBlocked, setLoadingBlocked] = useState(true);
  const [selectedBlockDate, setSelectedBlockDate] = useState<Date | undefined>(undefined);
  const [blockReason, setBlockReason] = useState("");
  const [blockingDate, setBlockingDate] = useState(false);
  const [deletingBlockId, setDeletingBlockId] = useState<string | null>(null);

  // Fetch appointments
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

  // Fetch blocked dates
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

  // Handle confirm/cancel action
  const handleAction = async () => {
    if (!actionDialog.appointment) return;
    setActionLoading(true);

    if (actionDialog.action === "delete") {
      try {
        const res = await fetch(`/api/appointments/${actionDialog.appointment._id}`, {
          method: "DELETE",
        });
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
        description: "Un email a été envoyé au client.",
      });
      setActionDialog({ open: false, appointment: null, action: "confirm" });
      setAdminNotes("");
    } catch {
      toast({ title: "Erreur", description: "Impossible de mettre à jour.", variant: "destructive" });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle block date
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
      setBlockedDates((prev) => [...prev, data.blocked].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setSelectedBlockDate(undefined);
      setBlockReason("");
      toast({ title: "Date bloquée", description: format(selectedBlockDate, "d MMMM yyyy", { locale: fr }) });
    } catch {
      toast({ title: "Erreur réseau", variant: "destructive" });
    } finally {
      setBlockingDate(false);
    }
  };

  // Handle unblock date
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
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-accent" />
            Rendez-vous
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez les demandes de rendez-vous et les jours bloqués
          </p>
        </div>
        {pendingCount > 0 && (
          <Badge className="bg-red-500 text-white text-base px-4 py-1">
            {pendingCount} en attente
          </Badge>
        )}
      </div>

      <Tabs defaultValue="appointments">
        <TabsList className="mb-6">
          <TabsTrigger value="appointments" className="relative">
            Rendez-vous
            {pendingCount > 0 && (
              <span className="ml-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="blocked">Jours bloqués</TabsTrigger>
        </TabsList>

        {/* TAB 1 — Appointments */}
        <TabsContent value="appointments">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap">Statut :</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmés</SelectItem>
                  <SelectItem value="cancelled">Annulés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap">Mois :</Label>
              <Input
                type="month"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-44"
              />
            </div>
            {monthFilter && (
              <Button variant="ghost" size="sm" onClick={() => setMonthFilter("")}>
                Effacer
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={fetchAppointments} className="ml-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>

          {/* Table */}
          {loadingAppts ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Aucun rendez-vous trouvé.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Client</TableHead>
                    <TableHead>Agence</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date / Heure</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appt) => (
                    <TableRow key={appt._id} className="hover:bg-muted/20">
                      <TableCell>
                        <div>
                          <p className="font-medium">{appt.name}</p>
                          <p className="text-xs text-muted-foreground">{appt.email}</p>
                          {appt.phone && (
                            <p className="text-xs text-muted-foreground">{appt.phone}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{appt.agencyName || "—"}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{appt.service}</p>
                        {appt.message && (
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]" title={appt.message}>
                            {appt.message}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">
                          {format(new Date(appt.date), "d MMM yyyy", { locale: fr })}
                        </p>
                        <p className="text-xs text-muted-foreground">{appt.timeSlot}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("text-xs", statusConfig[appt.status].className)}
                        >
                          {statusConfig[appt.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {appt.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-300 hover:bg-green-50"
                                onClick={() => {
                                  setActionDialog({ open: true, appointment: appt, action: "confirm" });
                                  setAdminNotes("");
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                                onClick={() => {
                                  setActionDialog({ open: true, appointment: appt, action: "cancel" });
                                  setAdminNotes("");
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {appt.status === "confirmed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                              onClick={() => {
                                setActionDialog({ open: true, appointment: appt, action: "cancel" });
                                setAdminNotes("");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                            onClick={() => setActionDialog({ open: true, appointment: appt, action: "delete" })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* TAB 2 — Blocked dates */}
        <TabsContent value="blocked">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add blocked date */}
            <div className="bg-card rounded-2xl border border-border p-6">
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
                className="rounded-xl border border-border mb-4"
                modifiers={{ blocked: blockedDateObjects }}
                modifiersClassNames={{ blocked: "bg-red-100 text-red-600 line-through" }}
              />
              {selectedBlockDate && (
                <div className="space-y-3">
                  <p className="text-sm font-medium">
                    Date sélectionnée : <span className="text-accent">{format(selectedBlockDate, "d MMMM yyyy", { locale: fr })}</span>
                  </p>
                  <div>
                    <Label htmlFor="block-reason" className="text-sm">Raison (optionnel)</Label>
                    <Input
                      id="block-reason"
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      placeholder="Congé, fermeture exceptionnelle…"
                      className="mt-1"
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
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-serif text-xl font-semibold mb-4">
                Dates bloquées
              </h2>
              {loadingBlocked ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : blockedDates.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">
                  Aucune date bloquée.
                </p>
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
                        {bd.reason && (
                          <p className="text-xs text-muted-foreground">{bd.reason}</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 shrink-0"
                        onClick={() => handleUnblockDate(bd._id)}
                        disabled={deletingBlockId === bd._id}
                      >
                        {deletingBlockId === bd._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onOpenChange={(open) => setActionDialog((prev) => ({ ...prev, open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action === "confirm" && "Confirmer le rendez-vous"}
              {actionDialog.action === "cancel" && "Annuler le rendez-vous"}
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

          {(actionDialog.action === "confirm" || actionDialog.action === "cancel") && (
            <div className="space-y-2 py-2">
              <Label htmlFor="admin-notes">
                {actionDialog.action === "confirm" ? "Note pour le client (optionnel)" : "Motif d'annulation (optionnel)"}
              </Label>
              <Textarea
                id="admin-notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={
                  actionDialog.action === "confirm"
                    ? "Merci d'apporter vos documents…"
                    : "Indisponibilité exceptionnelle…"
                }
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Ce message sera inclus dans l&apos;email envoyé au client.
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
              variant={actionDialog.action === "delete" ? "destructive" : actionDialog.action === "confirm" ? "default" : "destructive"}
              onClick={handleAction}
              disabled={actionLoading}
              className={actionDialog.action === "confirm" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {actionLoading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />En cours…</>
              ) : (
                <>
                  {actionDialog.action === "confirm" && <><Check className="h-4 w-4 mr-2" />Confirmer</>}
                  {actionDialog.action === "cancel" && <><X className="h-4 w-4 mr-2" />Annuler le RDV</>}
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
