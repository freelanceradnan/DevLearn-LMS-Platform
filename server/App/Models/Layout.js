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
const categoryItem=new mongoose.Schema({
  name:{type:String,required:true}
})
const CategorySchema=new mongoose.Schema({
  categories:[categoryItem]
})
const Hero = mongoose.model("Hero", HeroSection);
const Faq = mongoose.model("Faq", faqSectionSchema);
const Category = mongoose.model("Category", CategorySchema);
export default {Hero,Faq,Category}

