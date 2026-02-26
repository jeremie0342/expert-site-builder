"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Phone,
  LogOut,
  ChevronLeft,
  Calendar,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Articles", icon: FileText },
  { href: "/admin/rendez-vous", label: "Rendez-vous", icon: Calendar },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquare },
  { href: "/admin/agences", label: "Agences", icon: Building2 },
  { href: "/admin/contact-info", label: "Infos contact", icon: Phone },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-primary-foreground min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-foreground/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="10" r="3" />
              <path d="M12 2v5M12 13v9M8 13l-3 9M16 13l3 9" />
              <path d="M5 10h14" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-lg font-bold">GEOLUMIERE</span>
            <p className="text-xs text-primary-foreground/60">Administration</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-foreground/10 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Retour au site
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
