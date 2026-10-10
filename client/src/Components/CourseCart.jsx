import React from 'react';
import { Check, Star, Eye, PlayCircle, LucideMove, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../Features/CartSlice';
import { AddToWishList } from '../Features/WishSlice';
import { motion } from 'motion/react';
import { useGetAllCategoryQuery, useGetMentorQuery } from '../Features/ApiSlice';

export default function CourseCard({ cart,index}) {
  const cartItems=useSelector((state)=>state.AddToCart)
  const {data:AllMentors}=useGetMentorQuery()

  const wistItems=useSelector((state)=>state.AddToWish)
  const dispatch=useDispatch()
  const IsAddedToCart=cartItems.some((item)=>item._id===cart._id)  
  const IsAddedToWishList=wistItems.some((item)=>item._id===cart._id)  
 const mentorName = AllMentors?.data?.find((item)=>item._id===cart.owner)?.name||"NotFound"
 
  const {
    thumbnail,
    name = 'Everything You Need to Know About Business',
    level = 'Beginner',
    rating = 4.5,
    reviewsCount = 120,
    views = '28,500',
    courseData = [], 
    owner = 'Nicole Brown',
    estimatedPrice = '$99.99',
    price = '$49.65',
  } = cart || {};

  const lessonsCount = courseData?.length || 36;

  return (
    <motion.div 
  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 md:w-full border border-gray-100 group overflow-hidden flex flex-col justify-between"
  initial={{ y: 50, opacity: 0 }} 
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{once:true}}
  transition={{ 
    duration: 3, 
    delay: index * 0.15, 
    ease: "easeOut" 
  }}
>
  <Link to={`/course/${cart._id}`} className="flex flex-col h-full">
    
    {/* Image Container */}
    <div className="overflow-hidden relative aspect-video w-full">
      <img
        src={thumbnail?.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      {/* Level Badge */}
      {level && (
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex gap-1.5 items-center text-xs font-semibold text-gray-800 shadow-sm">
          <Check size={14} className="text-emerald-500" />
          {level}
        </div>
      )}
    </div>

    {/* Content Container with proper padding */}
    <div className="flex flex-col gap-3 p-4 flex-grow">
      
      {/* Rating, Views, Lessons */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-1 text-[#FF9F43]">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-gray-700 font-semibold">
            {rating} <span className="text-gray-400 font-normal">({reviewsCount})</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span>{views}</span>
        </div>

        <div className="flex items-center gap-1">
          <PlayCircle className="w-4 h-4 text-gray-400" />
          <span>{lessonsCount} Lessons</span>
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-[16px] font-bold text-[#2B2B36] line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
        {name}
      </h3>

      {/* Instructor & Price */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            Mentor: <strong className="text-gray-700">{mentorName}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {estimatedPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${estimatedPrice}
            </span>
          )}
          <span className="text-base font-extrabold text-rose-500">
            ${price}
          </span>
        </div>
      </div>
    </div>
  </Link>

  {/* Action Buttons */}
  <div className="flex items-center gap-3 p-4 pt-0 bg-white">
    <button 
      className={`flex-1 px-4 py-2.5 active:scale-[0.98] text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 ${
        IsAddedToCart ? "bg-[#d4d4d4] cursor-not-allowed" : "bg-[#09C82C] hover:bg-[#08AA25]"
      }`} 
      onClick={() => dispatch(AddToCart(cart))} 
      disabled={IsAddedToCart}
    >
      {IsAddedToCart ? "Added to Cart" : "Add To Cart"}
    </button>

    <button 
      className="p-2.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-700 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
      aria-label="Add to wishlist"
      disabled={IsAddedToWishList}
      onClick={() => dispatch(AddToWishList(cart))}
    >
      <Heart className={`w-5 h-5 transition-colors ${IsAddedToWishList ? "text-[#09C82C] fill-current" : "hover:text-red-500 text-gray-600"}`} />
    </button>
  </div>
</motion.div>
  );
}