import mongoose, { Schema, Model } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    coverImage: { type: String },
    readTime: { type: String, default: "5 min" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

BlogPostSchema.pre("save", function (next) {
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const BlogPost: Model<any> =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
