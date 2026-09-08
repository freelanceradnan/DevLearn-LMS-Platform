import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useGetHeroInfoQuery } from "../Features/ApiSlice";

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
    <section className="bg-[#33333D] max-w-7xl mx-auto rounded-3xl my-5 p-6 md:p-12 lg:p-16 text-white font-['Plus_Jakarta_Sans']">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 lg:gap-12 max-w-6xl mx-auto">

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="hero-title text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight flex flex-col gap-1 sm:gap-2">
            {heroData.title}
          </h1>

          <p className="hero-subtitle text-gray-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-md">
            {heroData.subTitle}
          </p>

          <div className="relative flex items-center w-full max-w-md mt-2">
            <input
              type="text"
              placeholder="Search your favourite course"
              className="w-full py-3.5 pl-4 pr-14 text-sm sm:text-base text-gray-900 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            />
            <button
              type="button"
              className="absolute right-1.5 p-2.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        
          <img
            src={heroData.image || assets?.newHeroimg || undefined}
            alt="Student using laptop"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}