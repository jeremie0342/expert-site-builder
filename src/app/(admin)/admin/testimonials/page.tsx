"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  isActive: boolean;
}

export default function AdminTestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    isActive: true,
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      // API not ready
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", role: "", content: "", rating: 5, isActive: true });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (t: Testimonial) => {
    setFormData({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      isActive: t.isActive,
    });
    setEditingId(t._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({ title: editingId ? "Témoignage mis à jour" : "Témoignage ajouté" });
      resetForm();
      fetchTestimonials();
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    toast({ title: "Témoignage supprimé" });
    fetchTestimonials();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.name === "rating" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Témoignages</h1>
          <p className="text-muted-foreground mt-1">Gérez les témoignages clients</p>
        </div>
        <Button variant="hero" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card rounded-xl p-6 shadow-soft mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">
            {editingId ? "Modifier le témoignage" : "Nouveau témoignage"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rôle *</label>
                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contenu *</label>
              <textarea
                name="content"
                required
                rows={3}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Note</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n} étoile{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="hero">Enregistrer</Button>
              <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-muted-foreground py-12">Chargement...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Aucun témoignage</p>
        ) : (
          testimonials.map((t) => (
            <div key={t._id} className="bg-card rounded-xl p-6 shadow-soft flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <span className="text-sm text-muted-foreground">— {t.role}</span>
                  {!t.isActive && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      Masqué
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm italic">&ldquo;{t.content}&rdquo;</p>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleActive(t._id, t.isActive)} className="p-2 hover:bg-muted rounded-lg">
                  {t.isActive ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </button>
                <button onClick={() => startEdit(t)} className="p-2 hover:bg-muted rounded-lg">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </button>
                <button onClick={() => deleteTestimonial(t._id)} className="p-2 hover:bg-destructive/10 rounded-lg">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
