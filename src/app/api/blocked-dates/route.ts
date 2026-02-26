import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import BlockedDate from "@/models/BlockedDate";

// GET — public: list blocked dates
export async function GET() {
  await dbConnect();
  const blockedDates = await BlockedDate.find({}).sort({ date: 1 });
  return NextResponse.json({ blockedDates });
}

// POST — admin: add a blocked date
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const { date, reason } = body;

  if (!date) {
    return NextResponse.json({ error: "La date est requise" }, { status: 400 });
  }

  await dbConnect();

  try {
    const blocked = await BlockedDate.create({
      date: new Date(date),
      reason,
    });
    return NextResponse.json({ blocked }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Cette date est déjà bloquée" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
