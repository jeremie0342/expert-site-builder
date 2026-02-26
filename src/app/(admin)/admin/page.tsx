"use client";

import { useEffect, useState } from "react";
import { FileText, MessageSquare, Eye, TrendingUp } from "lucide-react";

interface Stats {
  articles: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ articles: 0, testimonials: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [blogRes, testimonialsRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/testimonials"),
        ]);
        const blogData = await blogRes.json();
        const testimonialsData = await testimonialsRes.json();
        setStats({
          articles: Array.isArray(blogData) ? blogData.length : 0,
          testimonials: Array.isArray(testimonialsData) ? testimonialsData.length : 0,
        });
      } catch {
        // API not available yet
      }
    }
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Articles",
      value: stats.articles,
      icon: FileText,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Témoignages",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Pages",
      value: 6,
      icon: Eye,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Services",
      value: 8,
      icon: TrendingUp,
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans l&apos;administration de SCP GEOLUMIERE
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
