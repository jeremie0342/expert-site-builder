import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import Agency from "@/models/Agency";

// PUT /api/agencies/[id] — admin: update agency
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const agency = await Agency.findByIdAndUpdate(params.id, data, { new: true });
    if (!agency) {
      return NextResponse.json({ error: "Agence introuvable" }, { status: 404 });
    }
    return NextResponse.json({ agency });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

// DELETE /api/agencies/[id] — admin: delete agency (forbidden for main office)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const agency = await Agency.findById(params.id);
    if (!agency) {
      return NextResponse.json({ error: "Agence introuvable" }, { status: 404 });
    }
    if (agency.isMainOffice) {
      return NextResponse.json(
        { error: "Impossible de supprimer le siège principal" },
        { status: 403 }
      );
    }
    await Agency.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
