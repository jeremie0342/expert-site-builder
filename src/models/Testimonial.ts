import mongoose, { Schema, Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial: Model<any> =
  mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

export default Testimonial;
