import React from 'react';
import { assets } from './../assets/assets';

export default function CourseCard({ course,cart,assets}) {
  const {
    thumbnail,
    rating = 4.5,
    reviewsCount = 120,
    views = '28,500',
    lessons = 36,
    title = 'Everything You Need to Know About Business',
    instructorImg,
    instructorName = 'Nicole Brown',
    originalPrice = '$99.99',
    discountPrice = '$49.65',
  } = course || {};
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow font-['Plus_Jakarta_Sans'] max-w-sm">
      {/* Course Image */}
      <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3]">
        <img
          src={assets.slider_1}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Meta Stats Row */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
        {/* Rating */}
        <div className="flex items-center gap-1 text-[#FF9F43]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-gray-600">
            {rating} ({reviewsCount})
          </span>
        </div>

        {/* Views */}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{views}</span>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{lessons} Lesion</span>
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-xl font-semibold text-[#2B2B36] line-clamp-2 leading-snug mb-4 h-12">
        {cart.title}
      </h3>

      {/* Footer: Instructor & Price */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Instructor */}
        <div className="flex items-center gap-2">
          <img
            src={assets.hero_png}
            alt={instructorName}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-xs font-medium text-gray-600">{instructorName}</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 line-through">{cart.price}</span>
          <span className="text-sm font-bold text-[#FF6B6B]">{cart.originalPrice}</span>
        </div>
      </div>
    </div>
  );
}