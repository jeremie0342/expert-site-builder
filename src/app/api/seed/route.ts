import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import ContactInfo from "@/models/ContactInfo";
import Agency from "@/models/Agency";
import Testimonial from "@/models/Testimonial";
import BlogPost from "@/models/BlogPost";

// ---------------------------------------------------------------------------
// Agences hypothétiques
// ---------------------------------------------------------------------------

const AGENCIES = [
  {
    name: "Siège Social — Godomey",
    district: "Godomey",
    city: "Abomey-Calavi",
    country: "Bénin",
    directions: "Quartier Agla, derrière la station Total de Godomey, panneau GEOLUMIERE visible depuis la route",
    phones: [
      "01 64 62 73 35",
      "01 94 67 18 32",
      "01 95 56 01 56",
      "01 64 62 41 21",
      "01 95 42 92 58",
    ],
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
    directions: "Rue de l'Aéroport, face à l'hôtel Bénin Marina, immeuble en face du carrefour Cadjehoun",
    phones: [
      "01 21 35 48 60",
      "01 96 74 22 11",
    ],
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
    displayHours: "Lun–Ven : 8h–18h | Sam : 9h–12h",
    isMainOffice: false,
    isActive: true,
    order: 1,
  },
];

// ---------------------------------------------------------------------------
// ContactInfo
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Témoignages
// ---------------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: "Mathieu A.",
    role: "Promoteur immobilier",
    content:
      "Une collaboration exemplaire pour notre projet de lotissement à Calavi. Précision et professionnalisme au rendez-vous.",
    rating: 5,
    isActive: true,
  },
  {
    name: "Rachida K.",
    role: "Architecte",
    content:
      "SCP GEOLUMIERE nous accompagne sur tous nos projets. Leur expertise en topographie est indispensable.",
    rating: 5,
    isActive: true,
  },
  {
    name: "Sébastien D.",
    role: "Particulier",
    content:
      "Excellent service pour le bornage de notre terrain à Cotonou. Équipe réactive et documents livrés dans les délais.",
    rating: 5,
    isActive: true,
  },
  {
    name: "Agnès T.",
    role: "Responsable foncier — ONG",
    content:
      "Rigueur et réactivité exemplaires. Le rendu SIG de notre zone d'intervention était d'une précision remarquable.",
    rating: 5,
    isActive: true,
  },
];

// ---------------------------------------------------------------------------
// Articles de blog
// ---------------------------------------------------------------------------

const BLOG_POSTS = [
  {
    title: "Pourquoi faire appel à un géomètre-expert ?",
    slug: "pourquoi-faire-appel-geometre-expert",
    excerpt:
      "Découvrez les situations qui nécessitent l'intervention d'un géomètre-expert et les avantages de faire appel à un professionnel qualifié.",
    content:
      "Le géomètre-expert est un professionnel indispensable pour tout projet foncier ou immobilier. Son expertise garantit la conformité de vos démarches avec la réglementation en vigueur. Que vous souhaitiez borner votre terrain, réaliser un relevé topographique ou obtenir une évaluation foncière, le géomètre-expert est votre interlocuteur privilégié.\n\nSon intervention est obligatoire dans de nombreuses situations : division de terrain, construction en limite de propriété, achat immobilier en cas de doute sur les limites, contentieux entre voisins, etc.\n\nFaire appel à un professionnel agréé, inscrit à l'Ordre des Géomètres-Experts, vous garantit des travaux reconnus officiellement et opposables aux tiers.",
    category: "Conseil",
    author: "Jean ZITTI",
    readTime: "5 min",
    status: "published",
    publishedAt: new Date("2024-09-15"),
  },
  {
    title: "Comment préparer un bornage : le guide complet",
    slug: "comment-preparer-bornage",
    excerpt:
      "Tout ce que vous devez savoir avant de procéder à un bornage : documents à rassembler, démarches préalables et déroulement.",
    content:
      "Le bornage est une opération essentielle pour définir les limites de votre propriété. Avant de contacter votre géomètre-expert, voici les documents à rassembler : titre foncier ou acte de propriété, plan cadastral si disponible, actes de voisinage, historique des transactions.\n\nLe déroulement d'un bornage comprend plusieurs étapes : étude documentaire, convocation des propriétaires riverains, opérations de terrain, pose des bornes physiques et rédaction du procès-verbal de bornage signé par toutes les parties.\n\nUne fois signé, le procès-verbal de bornage a une valeur juridique opposable à tous. Il est fortement recommandé de le déposer chez un notaire.",
    category: "Guide pratique",
    author: "Briac K. P. KOSSOUGBETO",
    readTime: "8 min",
    status: "published",
    publishedAt: new Date("2024-10-03"),
  },
  {
    title: "Le SIG au service du développement territorial au Bénin",
    slug: "sig-developpement-territorial-benin",
    excerpt:
      "Comment les Systèmes d'Information Géographique révolutionnent la planification urbaine et la gestion foncière en Afrique de l'Ouest.",
    content:
      "Les SIG (Systèmes d'Information Géographique) sont devenus des outils incontournables pour les collectivités, les ONG et les opérateurs privés qui interviennent dans la gestion du territoire. Au Bénin, leur adoption croissante transforme la façon dont on appréhende la planification urbaine et la sécurisation foncière.\n\nGrâce aux SIG, il est désormais possible de croiser des données géographiques avec des informations démographiques, économiques ou environnementales pour prendre des décisions éclairées. SCP GEOLUMIERE accompagne de nombreux acteurs institutionnels dans la mise en place et l'exploitation de ces systèmes.",
    category: "Technologie",
    author: "Joslin M. YESSOUFOU",
    readTime: "6 min",
    status: "published",
    publishedAt: new Date("2024-11-20"),
  },
];

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const { secret, reset } = await req.json();
    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: "Secret invalide" }, { status: 401 });
    }

    await dbConnect();

    // Reset: wipe all collections before re-seeding
    if (reset) {
      await Promise.all([
        Agency.deleteMany({}),
        ContactInfo.deleteMany({}),
        Testimonial.deleteMany({}),
        BlogPost.deleteMany({}),
      ]);
    }

    // 1. Admin user
    const existingAdmin = await User.findOne({ email: "admin@geolumiere.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin123!", 12);
      await User.create({
        email: "admin@geolumiere.com",
        password: hashedPassword,
        name: "Administrateur GEOLUMIERE",
        role: "admin",
      });
    }

    // 2. Agencies — upsert par nom pour idempotence
    const agencyResults: Record<string, boolean> = {};
    for (const agencyData of AGENCIES) {
      const existing = await Agency.findOne({ name: agencyData.name });
      if (!existing) {
        await Agency.create(agencyData);
        agencyResults[agencyData.name] = true;
      } else {
        agencyResults[agencyData.name] = false;
      }
    }

    // 3. ContactInfo
    const existingContact = await ContactInfo.findOne();
    if (!existingContact) {
      await ContactInfo.create(CONTACT_INFO);
    }

    // 4. Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(TESTIMONIALS);
    }

    // 5. Blog posts
    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0) {
      await BlogPost.insertMany(BLOG_POSTS);
    }

    return NextResponse.json({
      message: "Seed terminé avec succès",
      created: {
        admin: !existingAdmin,
        agencies: agencyResults,
        contactInfo: !existingContact,
        testimonials: testimonialCount === 0,
        blogPosts: blogCount === 0,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Erreur lors du seed" }, { status: 500 });
  }
}
