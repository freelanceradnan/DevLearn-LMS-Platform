import mongoose, { Schema, Types } from "mongoose";

const HeroSection = new mongoose.Schema({
  title: { type: String },
  subTitle: { type: String },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
});
const faqItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}); 


const faqSectionSchema = new mongoose.Schema({
  faqSections: [faqItemSchema],
},{
  versionKey:false
});
const Hero = mongoose.model("Hero", HeroSection);
const Faq = mongoose.model("Faq", faqSectionSchema);
export default {Hero,Faq}

