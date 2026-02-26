import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { auth } from "@/lib/auth";

// PUT /api/testimonials/[id] - Admin
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const testimonial = await Testimonial.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return NextResponse.json({ error: "Témoignage introuvable" }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du témoignage" },
      { status: 500 }
    );
  }
}

// DELETE /api/testimonials/[id] - Admin
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const testimonial = await Testimonial.findByIdAndDelete(params.id);

    if (!testimonial) {
      return NextResponse.json({ error: "Témoignage introuvable" }, { status: 404 });
    }

    return NextResponse.json({ message: "Témoignage supprimé" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du témoignage" },
      { status: 500 }
    );
  }
}
