import mongoose, { Schema, Model } from "mongoose";

const AppointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    adminNotes: { type: String },
    agencyId: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
    agencyName: { type: String },
  },
  { timestamps: true }
);

const Appointment: Model<any> =
  mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
