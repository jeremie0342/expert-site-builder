import mongoose, { Schema, Model } from "mongoose";

const ContactInfoSchema = new Schema(
  {
    globalEmails: {
      type: [String],
      default: ["scpgeolumiere@gmail.com"],
    },
    socialLinks: {
      linkedin:  { type: String, default: "" },
      facebook:  { type: String, default: "" },
      instagram: { type: String, default: "" },
      whatsapp:  { type: String, default: "" },
      youtube:   { type: String, default: "" },
      twitter:   { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const ContactInfo: Model<any> =
  mongoose.models.ContactInfo || mongoose.model("ContactInfo", ContactInfoSchema);

export default ContactInfo;
