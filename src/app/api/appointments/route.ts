import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Agency from "@/models/Agency";
import ContactInfo from "@/models/ContactInfo";
import { sendEmails } from "@/lib/resend";

const appointmentSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  date: z.string().min(1, "La date est requise"),
  timeSlot: z.string().min(1, "Le créneau est requis"),
  message: z.string().optional(),
  agencyId: z.string().min(1, "L'agence est requise"),
  agencyName: z.string().optional(),
});

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// GET — admin: list appointments with optional filters
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const month = searchParams.get("month"); // format: YYYY-MM

  const filter: Record<string, any> = {};
  if (status && status !== "all") {
    filter.status = status;
  }
  if (month) {
    const [year, m] = month.split("-").map(Number);
    const start = new Date(year, m - 1, 1);
    const end = new Date(year, m, 0, 23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  const appointments = await Appointment.find(filter)
    .populate("agencyId", "name")
    .sort({ date: 1, timeSlot: 1 });
  return NextResponse.json({ appointments });
}

// POST — public: create appointment + send emails
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = appointmentSchema.parse(body);

    await dbConnect();

    // Resolve agency name
    let resolvedAgencyName = data.agencyName || "";
    if (!resolvedAgencyName) {
      const agency = await Agency.findById(data.agencyId).lean() as any;
      if (!agency) {
        return NextResponse.json({ error: "Agence introuvable" }, { status: 404 });
      }
      resolvedAgencyName = agency.name;
    }

    const appointmentDate = new Date(data.date);

    // Check if slot is still available for this agency
    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Appointment.findOne({
      agencyId: data.agencyId,
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: data.timeSlot,
      status: { $ne: "cancelled" },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ce créneau n'est plus disponible" },
        { status: 409 }
      );
    }

    const appointment = await Appointment.create({
      ...data,
      date: appointmentDate,
      agencyName: resolvedAgencyName,
    });

    const formattedDate = formatDate(appointmentDate);

    // Determine notification recipient: agency emails or global fallback
    const agency = await Agency.findById(data.agencyId).lean() as any;
    let notifEmails: string[] = agency?.emails?.filter(Boolean) || [];
    if (!notifEmails.length) {
      const ci = await ContactInfo.findOne().lean() as any;
      notifEmails = ci?.globalEmails?.filter(Boolean) || ["scpgeolumiere@gmail.com"];
    }

    await sendEmails([
      // Notification à l'agence
      {
        to: notifEmails,
        subject: `Nouveau RDV — ${resolvedAgencyName} — ${data.service} — ${formattedDate} ${data.timeSlot}`,
        html: `
          <h2>Nouveau rendez-vous reçu</h2>
          <p><strong>Agence :</strong> ${resolvedAgencyName}</p>
          <p><strong>Client :</strong> ${data.name}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
          <p><strong>Service :</strong> ${data.service}</p>
          <p><strong>Date :</strong> ${formattedDate} à ${data.timeSlot}</p>
          ${data.message ? `<p><strong>Message :</strong><br>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
          <p><a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/rendez-vous">Gérer les rendez-vous →</a></p>
        `,
      },
      // Confirmation au client
      {
        to: data.email,
        subject: `Demande de rendez-vous reçue — SCP GEOLUMIERE`,
        html: `
          <h2>Bonjour ${data.name},</h2>
          <p>Nous avons bien reçu votre demande de rendez-vous.</p>
          <table style="border-collapse:collapse;margin:16px 0;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Agence</td><td>${resolvedAgencyName}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Service</td><td>${data.service}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Date</td><td>${formattedDate}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Heure</td><td>${data.timeSlot}</td></tr>
          </table>
          <p>Notre équipe va examiner votre demande et vous enverra une confirmation prochainement.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>SCP GEOLUMIERE</strong><br>Géomètres-Experts Associés<br>${resolvedAgencyName}</p>
        `,
      },
    ]);

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du rendez-vous" },
      { status: 500 }
    );
  }
}
