import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Providers } from "@/components/Providers";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SCP GEOLUMIERE — Géomètres-Experts Associés",
  description:
    "Cabinet de géomètres-experts au Bénin. Topographie, bornage, SIG, cartographie, implantation, évaluations foncières. L'expertise au service du développement durable.",
  keywords: [
    "géomètre-expert",
    "Bénin",
    "topographie",
    "bornage",
    "SIG",
    "cartographie",
    "Abomey-Calavi",
    "Cotonou",
    "GEOLUMIERE",
  ],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
        <NextTopLoader color="#d4910a" height={3} showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
