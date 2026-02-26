import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import BlockedDate from "@/models/BlockedDate";
import Agency from "@/models/Agency";

const DAY_NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");
  const agencyId = searchParams.get("agencyId");

  if (!dateStr) {
    return NextResponse.json({ error: "Paramètre date requis" }, { status: 400 });
  }
  if (!agencyId) {
    return NextResponse.json({ error: "Paramètre agencyId requis" }, { status: 400 });
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  }

  await dbConnect();

  // Load agency schedule
  const agency = await Agency.findById(agencyId).lean() as any;
  if (!agency) {
    return NextResponse.json({ error: "Agence introuvable" }, { status: 404 });
  }

  const dayName = DAY_NAMES[date.getDay()];
  const scheduleDay = agency.schedule?.find((s: any) => s.day === dayName);

  if (!scheduleDay || !scheduleDay.isOpen || !scheduleDay.slots?.length) {
    return NextResponse.json({ availableSlots: [] });
  }

  const allSlots: string[] = scheduleDay.slots;

  // Start/end of that day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Check if date is blocked
  const blocked = await BlockedDate.findOne({
    date: { $gte: startOfDay, $lte: endOfDay },
  });
  if (blocked) {
    return NextResponse.json({ availableSlots: [] });
  }

  // Find taken slots for this agency on that day
  const taken = await Appointment.find({
    agencyId,
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: "cancelled" },
  }).select("timeSlot");

  const takenSlots = new Set(taken.map((a: any) => a.timeSlot));
  const availableSlots = allSlots.filter((slot) => !takenSlots.has(slot));

  return NextResponse.json({ availableSlots });
}
