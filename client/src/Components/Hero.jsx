import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { assets } from '../assets/assets';

const slidesData = [
  {
    id: 1,
    bgClass: 'bg-[#031b4e]',
    title: 'Build the future only you can create with IBM',
    description: 'Break through into your next role with job-ready skills in AI, data, and more from IBM.',
    buttonText: 'Enroll today →',
    imgSrc: assets.slider_1,
  },
  {
    id: 2,
    bgClass: 'bg-[#0056d2]',
    title: 'Start, switch, or advance your career',
    description: 'Grow with courses from top organizations',
    buttonText: 'Join for Free →',
    imgSrc: assets.slider_2,
  },
  {
    id: 3,
    bgClass: 'bg-[#0e2a47]',
    title: 'Master New Skills in Generative AI',
    description: 'Learn from industry leaders and transform your tech stack.',
    buttonText: 'Get Started →',
    imgSrc: assets.slider_3,
  },
];

export default function Hero() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-6 group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 14 },
        }}
        navigation={{
          nextEl: '.custom-swiper-next',
          prevEl: '.custom-swiper-prev',
        }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
        }}
        className="rounded-3xl"
      >
      {slidesData.map((slide) => (
  <SwiperSlide key={slide.id}>
    {/* Replaced min-h-[260px] with fixed h-[340px] to keep all cards uniform */}
    <div className={`${slide.bgClass} text-white rounded-3xl p-6 md:p-8 h-[260px] relative overflow-hidden`}>
      
      {/* Left Side: Text Content */}
      <div className="z-10 w-[55%] flex flex-col items-start gap-3 justify-center h-full">
        {slide.logo && (
          <span className="font-bold text-sm md:text-base tracking-wider uppercase opacity-90">
            {slide.logo}
          </span>
        )}
        
        {/* line-clamp prevents longer titles from expanding the card height */}
        <h2 className="text-xl md:text-2xl font-bold leading-tight line-clamp-3">
          {slide.title}
        </h2>
        
        <p className="text-xs md:text-sm text-gray-200 line-clamp-2">
          {slide.description}
        </p>
        
        <button className="mt-1 px-5 py-2.5 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm shrink-0">
          {slide.buttonText}
        </button>
      </div>

      {/* Right Side: Image aligned to the right side */}
     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-full max-h-full flex items-center justify-center overflow-hidden">
  <img
    src={slide.imgSrc}
    alt={slide.title}
    className="max-h-full max-w-full object-contain"
  />
</div>

    </div>
  </SwiperSlide>
))}
      </Swiper>

      {/* Pagination Container */}
      <div className="custom-swiper-pagination flex items-center gap-2 mt-4 justify-start px-2" />

      {/* Navigation Button */}
      <button className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 shadow-md rounded-full p-3 hover:bg-gray-50 transition-all">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Styling */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #94a3b8;
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background-color: #1e3a8a;
        }
      `}</style>
    </div>
  );
}