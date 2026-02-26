import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { auth } from "@/lib/auth";

// GET /api/blog/[id] - Public: get single post
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Try by slug first, then by ID
    let post = await BlogPost.findOne({ slug: params.id });
    if (!post && params.id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await BlogPost.findOne({ _id: params.id });
    }

    if (!post) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'article" },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Admin: update post
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

    const post = await BlogPost.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'article" },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Admin: delete post
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
    const post = await BlogPost.findByIdAndDelete(params.id);

    if (!post) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article supprimé" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'article" },
      { status: 500 }
    );
  }
}
