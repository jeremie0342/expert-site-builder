import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactInfo from "@/models/ContactInfo";
import { auth } from "@/lib/auth";

// GET /api/contact-info - Public
export async function GET() {
  try {
    await dbConnect();

    let info = await ContactInfo.findOne();

    // Create default if none exists
    if (!info) {
      info = await ContactInfo.create({});
    }

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des informations" },
      { status: 500 }
    );
  }
}

// PUT /api/contact-info - Admin
export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // Only allow updating globalEmails and socialLinks
    const allowed = {
      ...(data.globalEmails !== undefined && { globalEmails: data.globalEmails }),
      ...(data.socialLinks !== undefined && { socialLinks: data.socialLinks }),
    };

    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(allowed);
    } else {
      Object.assign(info, allowed);
      await info.save();
    }

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des informations" },
      { status: 500 }
    );
  }
}
