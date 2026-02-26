import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { auth } from "@/lib/auth";

// GET /api/testimonials - Public: get active testimonials
export async function GET() {
  try {
    await dbConnect();

    const session = await auth();
    const filter = session ? {} : { isActive: true };

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .exec();

    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des témoignages" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Admin
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const testimonial = await Testimonial.create(data);
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du témoignage" },
      { status: 500 }
    );
  }
}
