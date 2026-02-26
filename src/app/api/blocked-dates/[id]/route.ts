import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongodb";
import BlockedDate from "@/models/BlockedDate";

// DELETE — admin: remove a blocked date
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  await dbConnect();

  const blocked = await BlockedDate.findByIdAndDelete(params.id);
  if (!blocked) {
    return NextResponse.json({ error: "Date introuvable" }, { status: 404 });
  }

  return NextResponse.json({ message: "Date débloquée" });
}
