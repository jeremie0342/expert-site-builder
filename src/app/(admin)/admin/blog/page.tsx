"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: string;
  createdAt: string;
}

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      // API not ready
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    toast({ title: newStatus === "published" ? "Article publié" : "Article mis en brouillon" });
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    toast({ title: "Article supprimé" });
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Articles</h1>
          <p className="text-muted-foreground mt-1">Gérez vos articles de blog</p>
        </div>
        <Button asChild variant="hero">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Titre</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Catégorie</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Auteur</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Statut</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  Chargement...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  Aucun article. Créez votre premier article !
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">{post.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{post.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status === "published" ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(post._id, post.status)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title={post.status === "published" ? "Dépublier" : "Publier"}
                      >
                        {post.status === "published" ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      <Link
                        href={`/admin/blog/${post._id}/edit`}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Link>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
