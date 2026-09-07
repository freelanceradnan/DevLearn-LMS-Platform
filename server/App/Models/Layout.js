import mongoose, { Schema } from "mongoose";

const HeroSection = new mongoose.Schema({
  title: { type: String },
  subTitle: { type: String },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
});
const Hero = mongoose.model("Hero", HeroSection);
export default Hero;
