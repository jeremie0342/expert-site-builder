import mongoose, { Schema, Model } from "mongoose";

const ScheduleDaySchema = new Schema(
  {
    day: { type: String, required: true }, // "lundi"…"dimanche"
    isOpen: { type: Boolean, default: false },
    slots: { type: [String], default: [] }, // ["08:00","09:00",…]
  },
  { _id: false }
);

const AgencySchema = new Schema(
  {
    name: { type: String, required: true }, // "Siège Social - Godomey"
    district:   { type: String, default: "" }, // quartier / zone
    city:       { type: String, default: "" }, // ville
    country:    { type: String, default: "Bénin" }, // pays
    directions: { type: String, default: "" }, // indication d'accès
    phones: { type: [String], default: [] },
    emails: { type: [String], default: [] },
    schedule: { type: [ScheduleDaySchema], default: [] },
    displayHours: { type: String, default: "" }, // "Lun-Ven : 8h-18h"
    isMainOffice: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Agency: Model<any> =
  mongoose.models.Agency || mongoose.model("Agency", AgencySchema);

export default Agency;
