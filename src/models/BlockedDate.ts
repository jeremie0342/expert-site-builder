import mongoose, { Schema, Model } from "mongoose";

const BlockedDateSchema = new Schema(
  {
    date: { type: Date, required: true, unique: true },
    reason: { type: String },
  },
  { timestamps: true }
);

const BlockedDate: Model<any> =
  mongoose.models.BlockedDate || mongoose.model("BlockedDate", BlockedDateSchema);

export default BlockedDate;
