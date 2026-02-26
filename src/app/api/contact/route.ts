import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmails } from "@/lib/resend";
import dbConnect from "@/lib/mongodb";
import ContactInfo from "@/models/ContactInfo";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Récupère les emails admin depuis ContactInfo
    await dbConnect();
    const ci = await ContactInfo.findOne().lean() as any;
    const adminEmails: string[] = ci?.globalEmails?.filter(Boolean).length
      ? ci.globalEmails
      : ["scpgeolumiere@gmail.com"];

    await sendEmails([
      // Notification aux admins
      {
        to: adminEmails,
        subject: `Nouvelle demande de devis — ${data.service}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${data.name}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
          <p><strong>Service :</strong> ${data.service}</p>
          <p><strong>Message :</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      },
      // Confirmation au visiteur
      {
        to: data.email,
        subject: "Confirmation de votre demande — SCP GEOLUMIERE",
        html: `
          <h2>Merci pour votre demande, ${data.name} !</h2>
          <p>Nous avons bien reçu votre message concernant : <strong>${data.service}</strong></p>
          <p>Notre équipe vous recontactera dans les plus brefs délais.</p>
          <br>
          <p>Cordialement,</p>
          <p><strong>SCP GEOLUMIERE</strong><br>Géomètres-Experts Associés<br>Godomey, Abomey-Calavi, Bénin</p>
        `,
      },
    ]);

    return NextResponse.json({ message: "Message envoyé avec succès" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
