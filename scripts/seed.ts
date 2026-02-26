/**
 * scripts/seed.ts — Seed SCP GEOLUMIERE
 *
 * Usage :
 *   npm run seed               → seed (skip si déjà présent)
 *   npm run seed -- --reset    → supprime tout puis re-seed
 *
 * Prérequis : MONGODB_URI et SEED_SECRET dans .env (ou variables d'env du système)
 */

import fs from "fs";
import path from "path";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// ─── 0. Chargement .env ──────────────────────────────────────────────────────

function loadEnv() {
  if (process.env.MONGODB_URI) return; // déjà injecté (Vercel, CI, etc.)
  const envFile = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envFile)) return;
  const lines = fs.readFileSync(envFile, "utf-8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([^#\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI manquant. Créez un fichier .env ou exportez la variable.");
  process.exit(1);
}

const RESET = process.argv.includes("--reset");

// ─── 1. Couleurs console (ANSI, sans dépendance) ─────────────────────────────

const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  cyan:   "\x1b[36m",
  gray:   "\x1b[90m",
};
const ok   = (msg: string) => console.log(`  ${c.green}✔${c.reset}  ${msg}`);
const skip = (msg: string) => console.log(`  ${c.yellow}–${c.reset}  ${c.gray}${msg} (déjà présent)${c.reset}`);
const info = (msg: string) => console.log(`  ${c.cyan}ℹ${c.reset}  ${msg}`);

// ─── 2. Schémas Mongoose (autonomes, sans alias Next.js) ─────────────────────

const UserSchema = new Schema(
  { email: String, password: String, name: String, role: String },
  { timestamps: true }
);

const AgencySchema = new Schema(
  {
    name:        String,
    district:    { type: String, default: "" },
    city:        { type: String, default: "" },
    country:     { type: String, default: "Bénin" },
    directions:  { type: String, default: "" },
    phones:      [String],
    emails:      [String],
    schedule:    [{ day: String, isOpen: Boolean, slots: [String], _id: false }],
    displayHours: { type: String, default: "" },
    isMainOffice: { type: Boolean, default: false },
    isActive:    { type: Boolean, default: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ContactInfoSchema = new Schema(
  {
    globalEmails: [String],
    socialLinks: {
      linkedin: String, facebook: String, instagram: String,
      whatsapp: String, youtube: String, twitter: String,
    },
  },
  { timestamps: true }
);

const TestimonialSchema = new Schema(
  { name: String, role: String, content: String, rating: Number, isActive: Boolean },
  { timestamps: true }
);

const BlogPostSchema = new Schema(
  {
    title: String, slug: String, excerpt: String, content: String,
    category: String, author: String, readTime: String,
    status: String, publishedAt: Date,
  },
  { timestamps: true }
);

// ─── 3. Données de seed ───────────────────────────────────────────────────────

const AGENCIES = [
  {
    name: "Siège Social — Godomey",
    district: "Godomey",
    city: "Abomey-Calavi",
    country: "Bénin",
    directions: "Quartier Agla, derrière la station Total de Godomey — panneau GEOLUMIERE visible depuis la route",
    phones: ["01 64 62 73 35", "01 94 67 18 32", "01 95 56 01 56", "01 64 62 41 21", "01 95 42 92 58"],
    emails: ["scpgeolumiere@gmail.com", "siege.godomey@geolumiere.bj"],
    schedule: [
      { day: "lundi",    isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "mardi",    isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "mercredi", isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "jeudi",    isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "vendredi", isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "samedi",   isOpen: false, slots: [] },
      { day: "dimanche", isOpen: false, slots: [] },
    ],
    displayHours: "Lun–Ven : 8h00–18h00",
    isMainOffice: true,
    isActive: true,
    order: 0,
  },
  {
    name: "Agence de Cotonou",
    district: "Cadjehoun",
    city: "Cotonou",
    country: "Bénin",
    directions: "Rue de l'Aéroport, face à l'hôtel Bénin Marina — immeuble au carrefour Cadjehoun",
    phones: ["01 21 35 48 60", "01 96 74 22 11"],
    emails: ["agence.cotonou@geolumiere.bj"],
    schedule: [
      { day: "lundi",    isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "mardi",    isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "mercredi", isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "jeudi",    isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "vendredi", isOpen: true,  slots: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"] },
      { day: "samedi",   isOpen: true,  slots: ["09:00","10:00","11:00"] },
      { day: "dimanche", isOpen: false, slots: [] },
    ],
    displayHours: "Lun–Ven : 8h–18h  |  Sam : 9h–12h",
    isMainOffice: false,
    isActive: true,
    order: 1,
  },
];

const CONTACT_INFO = {
  globalEmails: ["scpgeolumiere@gmail.com"],
  socialLinks: {
    linkedin:  "https://linkedin.com/company/scp-geolumiere",
    facebook:  "https://facebook.com/scpgeolumiere",
    instagram: "",
    whatsapp:  "https://wa.me/22901646273",
    youtube:   "",
    twitter:   "",
  },
};

const TESTIMONIALS = [
  {
    name: "Mathieu A.", role: "Promoteur immobilier",
    content: "Une collaboration exemplaire pour notre projet de lotissement à Calavi. Précision et professionnalisme au rendez-vous.",
    rating: 5, isActive: true,
  },
  {
    name: "Rachida K.", role: "Architecte",
    content: "SCP GEOLUMIERE nous accompagne sur tous nos projets. Leur expertise en topographie est indispensable.",
    rating: 5, isActive: true,
  },
  {
    name: "Sébastien D.", role: "Particulier",
    content: "Excellent service pour le bornage de notre terrain à Cotonou. Équipe réactive et documents livrés dans les délais.",
    rating: 5, isActive: true,
  },
  {
    name: "Agnès T.", role: "Responsable foncier — ONG",
    content: "Rigueur et réactivité exemplaires. Le rendu SIG de notre zone d'intervention était d'une précision remarquable.",
    rating: 5, isActive: true,
  },
];

const BLOG_POSTS = [
  {
    title: "Pourquoi faire appel à un géomètre-expert ?",
    slug: "pourquoi-faire-appel-geometre-expert",
    excerpt: "Découvrez les situations qui nécessitent l'intervention d'un géomètre-expert et les avantages de faire appel à un professionnel qualifié.",
    content: "Le géomètre-expert est un professionnel indispensable pour tout projet foncier ou immobilier...",
    category: "Conseil", author: "Jean ZITTI", readTime: "5 min",
    status: "published", publishedAt: new Date("2024-09-15"),
  },
  {
    title: "Comment préparer un bornage : le guide complet",
    slug: "comment-preparer-bornage",
    excerpt: "Tout ce que vous devez savoir avant de procéder à un bornage : documents à rassembler, démarches préalables et déroulement.",
    content: "Le bornage est une opération essentielle pour définir les limites de votre propriété...",
    category: "Guide pratique", author: "Briac K. P. KOSSOUGBETO", readTime: "8 min",
    status: "published", publishedAt: new Date("2024-10-03"),
  },
  {
    title: "Le SIG au service du développement territorial au Bénin",
    slug: "sig-developpement-territorial-benin",
    excerpt: "Comment les SIG révolutionnent la planification urbaine et la gestion foncière en Afrique de l'Ouest.",
    content: "Les Systèmes d'Information Géographique sont devenus des outils incontournables...",
    category: "Technologie", author: "Joslin M. YESSOUFOU", readTime: "6 min",
    status: "published", publishedAt: new Date("2024-11-20"),
  },
];

// ─── 4. Runner ────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n${c.bold}SCP GEOLUMIERE — Seed${c.reset}  ${RESET ? `${c.red}(--reset)${c.reset}` : ""}\n`);

  await mongoose.connect(MONGODB_URI as string);
  info("Connecté à MongoDB");

  const User        = mongoose.models.User        || mongoose.model("User",        UserSchema);
  const Agency      = mongoose.models.Agency      || mongoose.model("Agency",      AgencySchema);
  const ContactInfo = mongoose.models.ContactInfo || mongoose.model("ContactInfo", ContactInfoSchema);
  const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
  const BlogPost    = mongoose.models.BlogPost    || mongoose.model("BlogPost",    BlogPostSchema);

  // Reset
  if (RESET) {
    await Promise.all([
      Agency.deleteMany({}),
      ContactInfo.deleteMany({}),
      Testimonial.deleteMany({}),
      BlogPost.deleteMany({}),
    ]);
    ok("Collections vidées (Agency, ContactInfo, Testimonial, BlogPost)");
  }

  console.log();

  // ── Admin user
  const existingAdmin = await User.findOne({ email: "admin@geolumiere.com" });
  if (!existingAdmin) {
    const hash = await bcrypt.hash("Admin123!", 12);
    await User.create({ email: "admin@geolumiere.com", password: hash, name: "Administrateur GEOLUMIERE", role: "admin" });
    ok("Utilisateur admin créé  (admin@geolumiere.com / Admin123!)");
  } else {
    skip("Utilisateur admin");
  }

  // ── Agences
  for (const agencyData of AGENCIES) {
    const existing = await Agency.findOne({ name: agencyData.name });
    if (!existing) {
      await Agency.create(agencyData);
      ok(`Agence : ${agencyData.name}`);
    } else {
      skip(`Agence : ${agencyData.name}`);
    }
  }

  // ── ContactInfo
  const existingContact = await ContactInfo.findOne();
  if (!existingContact) {
    await ContactInfo.create(CONTACT_INFO);
    ok("ContactInfo créé");
  } else {
    skip("ContactInfo");
  }

  // ── Témoignages
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(TESTIMONIALS);
    ok(`${TESTIMONIALS.length} témoignages créés`);
  } else {
    skip(`Témoignages (${testimonialCount} existants)`);
  }

  // ── Articles
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    await BlogPost.insertMany(BLOG_POSTS);
    ok(`${BLOG_POSTS.length} articles créés`);
  } else {
    skip(`Articles (${blogCount} existants)`);
  }

  console.log(`\n${c.green}${c.bold}✔ Seed terminé avec succès.${c.reset}\n`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(`\n${c.red}❌ Erreur :${c.reset}`, err.message);
  process.exit(1);
});
