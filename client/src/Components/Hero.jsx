import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useGetHeroInfoQuery } from "../Features/ApiSlice";
import { ArrowRight, BookOpen, Play, Star, UsersRound } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const { data, isLoading } = useGetHeroInfoQuery();
  const [heroData, setHeroData] = useState({
    title: "",
    subTitle: "",
    image: "",
  });

  useEffect(() => {
    if (data && data[0]) {
      setHeroData({
        title: data[0]?.title || "Learn New Skills With Online Best Mentors",
        subTitle:
          data[0]?.subTitle ||
          "Choose from over 100,000 online video courses with new additions published every month.",
        image: data[0]?.image?.url || assets?.newHeroimg || "",
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
   <section className="bg-gradient-to-br from-emerald-50 via-white to-green-50/50 py-12 ">
<div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

  {/* Left Text Column - order-2 on mobile, order-1 on desktop */}
  <motion.div className="w-full md:w-2/3 flex flex-col gap-6 order-1 md:order-2"
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="w-full py-3 px-4 bg-[#E5F9E8] text-[#09C93E] text-sm font-semibold rounded-full shadow-sm text-center max-w-60 flex gap-2 items-center justify-center border-[#08AA25] border">
      <div className="h-2 w-2 rounded-full bg-[#09C93E]"></div>
      New Courses Available
    </div>
    
    <h1 className="hero-title text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight flex flex-col gap-1 sm:gap-2 text-[#162018]">
      {heroData.title}
    </h1>

    <p className="hero-subtitle text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-md text-gray-600">
      {heroData.subTitle}
    </p>

    <div className="flex gap-2">
      <button className="w-full py-3 px-4 bg-[#09C82C] hover:bg-[#08AA25] text-white text-sm font-semibold rounded-full shadow-sm transition-colors text-center max-w-50 flex gap-2 items-center justify-center">
        Start Learning <ArrowRight size={18}/>
      </button>
      <button className="w-full py-3 px-4 bg-[#E9F3EB] text-[#3f3a36] hover:bg-gray-200 text-sm font-semibold rounded-full shadow-sm transition-colors text-center max-w-50 flex gap-2 items-center justify-center">
        <Play size={16} color="red"/> Youtube Channel
      </button>
    </div>

    <div className="flex gap-4 text-sm pt-2 justify-between md:justify-start">
      <p className="md:flex gap-2 items-center"><UsersRound color="#08AA25" size={20}/><span className="font-bold">50K+</span> Students</p>
      <p className="md:flex gap-2 items-center"><BookOpen color="#08AA25" size={20}/><span className="font-bold">200+</span> Courses</p>
      {/* Fixed typo: md;flex changed to md:flex */}
      <p className="md:flex gap-2 items-center"><Star color="#08AA25" size={20}/><span className="font-bold">4.9</span> Ratings</p>
    </div>
  </motion.div>

  {/* Right Column (Video/Image) - order-1 on mobile, order-2 on desktop */}
  <motion.div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mt-8 md:mt-0"
  initial={{ opacity: 0, scale: 0.8, y: 30 }}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  >
    <div className="relative w-full max-w-md bg-gray-100 p-3 rounded-3xl shadow-xl border border-gray-100">
      
      {/* Main Image / Video Thumbnail */}
      <motion.img
        src={heroData.image || assets?.newHeroimg || undefined}
        alt="Student using laptop"
        className="w-full h-[360px] object-cover rounded-2xl"
        
      />
      
      {/* Centered Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button className="pointer-events-auto bg-[#09C82C] hover:bg-[#08AA25] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105">
          <Play size={24} className="translate-x-0.5 fill-white text-white" />
        </button>
      </div>

      {/* Floating Top-Right Student Badge */}
      <div className="absolute -top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-3 border border-gray-100">
        <div className="flex -space-x-2">
          <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
          <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
          <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
        </div>
        <span className="text-xs font-semibold text-gray-800">Join 50k+ Students</span>
      </div>

      {/* Floating Bottom-Left Course Badge */}
      <div className="absolute -bottom-5 left-4 bg-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 border border-gray-100">
        <div className="bg-emerald-50 text-[#09C93E] p-2.5 rounded-xl">
          <BookOpen size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-900">200+ Courses</h4>
          <p className="text-[11px] text-gray-500">Available Now</p>
        </div>
      </div>

    </div>
  </motion.div>

</div>
</section>
  );
}