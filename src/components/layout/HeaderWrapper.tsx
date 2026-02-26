import dbConnect from "@/lib/mongodb";
import Agency from "@/models/Agency";
import { Header } from "./Header";

export async function HeaderWrapper() {
  let phone = "64 62 73 35";
  let address = "Godomey, Abomey-Calavi";
  let hours = "Lun-Ven : 8h00 - 18h00";

  try {
    await dbConnect();
    const agency = await Agency.findOne({ isMainOffice: true, isActive: true }).lean() as any;
    if (agency) {
      phone = agency.phones?.[0] || phone;
      // Compact: quartier + ville (pas de pays, pas d'indication — trop long pour la barre)
      address = [agency.district, agency.city].filter(Boolean).join(", ") || address;
      hours = agency.displayHours || hours;
    }
  } catch {}

  return <Header phone={phone} address={address} hours={hours} />;
}
