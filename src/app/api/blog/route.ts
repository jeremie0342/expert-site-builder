import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { auth } from "@/lib/auth";

// GET /api/blog - Public: get published posts
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const filter: any = {};

    // Admin can see all, public only published
    const session = await auth();
    if (!session) {
      filter.status = "published";
    } else if (status) {
      filter.status = status;
    }

    if (category && category !== "Tous") {
      filter.category = category;
    }

    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .exec();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}

// POST /api/blog - Admin: create post
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // Generate slug from title
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const post = await BlogPost.create(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Un article avec ce slug existe déjà" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erreur lors de la création de l'article" },
      { status: 500 }
    );
  }
}
