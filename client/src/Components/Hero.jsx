import React from "react";
import { assets } from "../assets/assets";

export default function Hero() {
  return (
    <>
    <section className="bg-[#33333D] max-w-7xl mx-auto rounded-3xl my-5 p-6 md:p-12 lg:p-16 text-white font-['Plus_Jakarta_Sans']">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 lg:gap-12 max-w-6xl mx-auto">
        
        {/* Left Content Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          
          {/* Main Title */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight flex flex-col gap-1 sm:gap-2">
            <span>Learn New Skills</span>
            <span>With Online</span>
            <span>Best Mentors</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-gray-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-md">
            Choose from over 100,000 online video courses with new additions published every month.
          </p>

          {/* Search Input Box */}
          <div className="relative flex items-center w-full max-w-md mt-2">
            <input
              type="text"
              placeholder="Search your favourite course"
              className="w-full py-3.5 pl-4 pr-14 text-sm sm:text-base text-gray-900 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            />
            <button
              type="button"
              className="absolute right-1.5 p-2.5 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-lg transition-colors flex items-center justify-center"
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
                  path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

        </div>

        {/* Right Image Column */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={assets?.newHeroimg}
            alt="Student using laptop"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>

      </div>
    </section>
    </>
  );
}
