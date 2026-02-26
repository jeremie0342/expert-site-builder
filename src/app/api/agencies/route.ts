import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import Agency from "@/models/Agency";

// GET /api/agencies — public: active agencies sorted by order
export async function GET() {
  try {
    await dbConnect();
    const agencies = await Agency.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ agencies });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/agencies — admin: create agency
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const agency = await Agency.create(data);
    return NextResponse.json({ agency }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
