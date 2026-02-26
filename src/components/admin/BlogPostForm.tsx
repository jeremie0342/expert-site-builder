"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogPostFormProps {
  initialData?: {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    readTime: string;
    status: string;
  };
}

const categories = ["Conseil", "Guide pratique", "Réglementation", "Technologie", "Juridique"];
const authors = [
  "Jean ZITTI",
  "Briac K. P. KOSSOUGBETO",
  "Joslin M. YESSOUFOU",
  "Zarnick J. K. ZITTI",
  "Gérard M. I. ANIWANOU",
];

export function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!initialData?._id;

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || categories[0],
    author: initialData?.author || authors[0],
    readTime: initialData?.readTime || "5 min",
    status: initialData?.status || "draft",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEditing ? `/api/blog/${initialData!._id}` : "/api/blog";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({ title: isEditing ? "Article mis à jour" : "Article créé" });
        router.push("/admin/blog");
      } else {
        const data = await res.json();
        toast({ title: "Erreur", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Erreur de connexion", variant: "destructive" });
    }

    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {isEditing ? "Modifier l'article" : "Nouvel article"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Titre *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Titre de l'article"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Généré automatiquement si vide"
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-2">Extrait *</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Résumé de l'article"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">Contenu *</label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={15}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-y font-mono text-sm"
                  placeholder="Contenu de l'article..."
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2">Statut</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">Catégorie</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">Auteur</label>
                <select
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {authors.map((author) => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="readTime" className="block text-sm font-medium mb-2">Temps de lecture</label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="5 min"
                />
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={saving}>
                <Save className="h-4 w-4" />
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
