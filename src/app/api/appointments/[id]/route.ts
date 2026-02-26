import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { sendEmail } from "@/lib/resend";

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// PUT — admin: update status (confirm or cancel) + send email to client
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  const body = await req.json();
  const { status, adminNotes } = body;

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const appointment = await Appointment.findByIdAndUpdate(
    params.id,
    { status, ...(adminNotes !== undefined && { adminNotes }) },
    { new: true }
  );

  if (!appointment) {
    return NextResponse.json({ error: "Rendez-vous introuvable" }, { status: 404 });
  }

  const formattedDate = formatDate(new Date(appointment.date));

  if (status === "confirmed") {
    await sendEmail({
      to: appointment.email,
      subject: `Votre rendez-vous est confirmé — ${formattedDate} ${appointment.timeSlot}`,
      html: `
        <h2>Bonjour ${appointment.name},</h2>
        <p>Votre rendez-vous est <strong>confirmé</strong>.</p>
        <table style="border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Service</td><td>${appointment.service}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Date</td><td>${formattedDate}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Heure</td><td>${appointment.timeSlot}</td></tr>
        </table>
        ${adminNotes ? `<p><strong>Note :</strong> ${adminNotes}</p>` : ""}
        <p>Nous vous attendons à notre cabinet de Godomey, Abomey-Calavi.</p>
        <p>Pour toute question : <strong>+229 01 64 62 73 35</strong></p>
        <br>
        <p>Cordialement,</p>
        <p><strong>SCP GEOLUMIERE</strong><br>Géomètres-Experts Associés</p>
      `,
    });
  } else if (status === "cancelled") {
    await sendEmail({
      to: appointment.email,
      subject: `Votre rendez-vous a été annulé — SCP GEOLUMIERE`,
      html: `
        <h2>Bonjour ${appointment.name},</h2>
        <p>Nous sommes au regret de vous informer que votre rendez-vous du <strong>${formattedDate} à ${appointment.timeSlot}</strong> a été annulé.</p>
        ${adminNotes ? `<p><strong>Motif :</strong> ${adminNotes}</p>` : ""}
        <p>Vous pouvez prendre un nouveau rendez-vous en ligne ou nous contacter directement au <strong>+229 01 64 62 73 35</strong>.</p>
        <br>
        <p>Cordialement,</p>
        <p><strong>SCP GEOLUMIERE</strong><br>Géomètres-Experts Associés</p>
      `,
    });
  }

  return NextResponse.json({ appointment });
}

// DELETE — admin: delete appointment
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  const appointment = await Appointment.findByIdAndDelete(params.id);
  if (!appointment) {
    return NextResponse.json({ error: "Rendez-vous introuvable" }, { status: 404 });
  }

  return NextResponse.json({ message: "Rendez-vous supprimé" });
}
