import mongoose, { Schema } from "mongoose";

// FAQ 
const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

// Category 
const categorySchema = new Schema({
  title: { type: String, required: true },
});

// Banner Image Schema 
const bannerImageSchema = new Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

// Main Layout Schema
const layoutSchema = new Schema(
  {
    type: {
      type: String
    },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
      image: bannerImageSchema,
      title: { type: String },
      subTitle: { type: String },
    },
  },
  { timestamps: true } 
);

const Layout = mongoose.model("Layout", layoutSchema);

export default Layout;