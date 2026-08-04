import React from 'react';

export default function CourseCard({ cart, assets }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-3.5 flex flex-col justify-between h-[380px] w-full md:max-w-[280px] shadow-sm hover:shadow-md transition-shadow">
      
      {/* Top Section: Image & Content */}
      <div>
    
        <div className="w-full h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
          <img
            src={cart?.image || assets?.slider_1}
            alt={cart?.title || 'Course Thumbnail'}
            className="w-full md:h-full object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 min-h-[2.5rem]">
            {cart?.title || 'ChatGPT & AI Tools - From Beginner to Expert'}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1">
            {cart?.instructor || cart?.para || 'Todd McLeod'}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {/* Badges & Rating */}
        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          {cart?.isBestseller ? (
            <span className="bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded text-[11px]">
              Bestseller
            </span>
          ) : (
            <span className="bg-purple-700 text-white font-semibold px-2 py-0.5 rounded text-[11px]">
              Premium
            </span>
          )}

          {/* Rating */}
          <div className="flex items-center gap-0.5 font-bold text-amber-900">
            <span className="text-amber-500">★</span>
            <span>{cart?.rating || '4.6'}</span>
          </div>

          {/* Ratings Count */}
          <span className="text-gray-500 text-[11px]">
            ({cart?.purchased || '2,907 ratings'})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-bold text-gray-900 text-lg">
            {cart?.originalPrice || '9.99'}
          </span>
          {(cart?.price || cart?.oldPrice) && (
            <del className="text-gray-400 text-sm">
              {cart?.price || cart?.oldPrice || '19.99'}
            </del>
          )}
        </div>
      </div>

    </div>
  );
}