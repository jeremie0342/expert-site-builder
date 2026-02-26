"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminContactInfoPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    globalEmails: [""],
    socialLinks: {
      linkedin: "",
      facebook: "",
      instagram: "",
      whatsapp: "",
      youtube: "",
      twitter: "",
    },
  });

  useEffect(() => {
    async function fetchInfo() {
      try {
        const res = await fetch("/api/contact-info");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            globalEmails: data.globalEmails?.length ? data.globalEmails : [""],
            socialLinks: {
              linkedin:  data.socialLinks?.linkedin  || "",
              facebook:  data.socialLinks?.facebook  || "",
              instagram: data.socialLinks?.instagram || "",
              whatsapp:  data.socialLinks?.whatsapp  || "",
              youtube:   data.socialLinks?.youtube   || "",
              twitter:   data.socialLinks?.twitter   || "",
            },
          });
        }
      } catch {}
      setLoading(false);
    }
    fetchInfo();
  }, []);

  const addEmail = () => setFormData({ ...formData, globalEmails: [...formData.globalEmails, ""] });
  const removeEmail = (i: number) =>
    setFormData({ ...formData, globalEmails: formData.globalEmails.filter((_, idx) => idx !== i) });
  const updateEmail = (i: number, value: string) => {
    const globalEmails = [...formData.globalEmails];
    globalEmails[i] = value;
    setFormData({ ...formData, globalEmails });
  };

  const setSocialLink = (key: string, value: string) =>
    setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [key]: value } });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          globalEmails: formData.globalEmails.filter((e) => e.trim()),
          socialLinks: formData.socialLinks,
        }),
      });

      if (res.ok) {
        toast({ title: "Informations mises à jour" });
      } else {
        toast({ title: "Erreur", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur de connexion", variant: "destructive" });
    }

    setSaving(false);
  };

  if (loading) {
    return <p className="text-center text-muted-foreground py-20">Chargement...</p>;
  }

  const socialFields = [
    { key: "linkedin",  label: "LinkedIn",    placeholder: "https://linkedin.com/..." },
    { key: "facebook",  label: "Facebook",    placeholder: "https://facebook.com/..." },
    { key: "instagram", label: "Instagram",   placeholder: "https://instagram.com/..." },
    { key: "whatsapp",  label: "WhatsApp",    placeholder: "https://wa.me/229..." },
    { key: "youtube",   label: "YouTube",     placeholder: "https://youtube.com/..." },
    { key: "twitter",   label: "Twitter / X", placeholder: "https://twitter.com/..." },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Informations de contact</h1>
        <p className="text-muted-foreground mt-1">
          Emails globaux et réseaux sociaux — les coordonnées des agences sont gérées dans{" "}
          <a href="/admin/agences" className="text-accent hover:underline">Agences</a>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Global Emails */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium">Emails globaux (fallback notifications)</label>
            <button type="button" onClick={addEmail} className="text-accent hover:text-accent/80 text-sm flex items-center gap-1">
              <Plus className="h-4 w-4" /> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {formData.globalEmails.map((email, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(i, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="email@example.com"
                />
                {formData.globalEmails.length > 1 && (
                  <button type="button" onClick={() => removeEmail(i)} className="p-3 hover:bg-destructive/10 rounded-lg">
                    <X className="h-4 w-4 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
          <h3 className="text-sm font-medium">Réseaux sociaux</h3>
          {socialFields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-muted-foreground mb-1">{label}</label>
              <input
                type="url"
                value={(formData.socialLinks as any)[key]}
                onChange={(e) => setSocialLink(key, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <Button type="submit" variant="hero" size="lg" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </div>
  );
}
