import React from 'react';
import { Check, Star, Eye, PlayCircle, LucideMove, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../Features/CartSlice';
import { AddToWishList } from '../Features/WishSlice';

export default function CourseCard({ cart}) {
  const cartItems=useSelector((state)=>state.AddToCart)
  const wistItems=useSelector((state)=>state.AddToWish)
  const dispatch=useDispatch()
  const IsAddedToCart=cartItems.some((item)=>item._id===cart._id)  
  const IsAddedToWishList=wistItems.some((item)=>item._id===cart._id)  

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
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 font-['Plus_Jakarta_Sans']  md:w-full border border-gray-100 group">
    <Link to={`/course/${cart._id}`}>
      
      {/* Image  */}
      <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3] relative bg-gray-100">
        <img
          src={thumbnail?.url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/*  Level Badge */}
        {level && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex gap-1.5 items-center text-xs font-semibold text-gray-800 shadow-sm">
            <Check size={14} className="text-emerald-500" />
            {level}
          </div>
        )}
      </div>

      {/*Rating, Views, Lessons */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
        
        {/* Rating */}
        <div className="flex items-center gap-1 text-[#FF9F43]">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-gray-700 font-semibold">
            {rating} <span className="text-gray-400 font-normal">({reviewsCount})</span>
          </span>
        </div>

        {/* Views */}
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span>{views}</span>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-1">
          <PlayCircle className="w-4 h-4 text-gray-400" />
          <span>{lessonsCount} Lessons</span>
        </div>

      </div>

      {/* Course Title */}
      <h3 className="text-lg font-bold text-[#2B2B36] line-clamp-2 leading-snug mb-4 group-hover:text-indigo-600 transition-colors">
        {name}
      </h3>

      {/* Instructor & Price */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        
        {/* Instructor */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            Mentor: <strong className="text-gray-700">{owner}</strong>
          </span>
        </div>

        {/* Pricing */}
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
         </Link>
      <div className="flex items-center gap-3">
     
  {/* Add to Cart Button */}

  <button className={`flex-1 px-4 py-2  active:scale-[0.98] text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 ${IsAddedToCart?"bg-blue-200 ":"bg-blue-600 hover:bg-blue-700 "}`} onClick={()=>dispatch(AddToCart(cart))} disabled={IsAddedToCart}>
    Add To Cart
  </button>

  {/* Wishlist Button */}
  <button 
    className="p-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-700 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
    aria-label="Add to wishlist"
    disabled={IsAddedToWishList}
    onClick={()=>dispatch(AddToWishList(cart))}
  >
    <Heart className={`w-5 h-5 text-gray-600  transition-colors ${IsAddedToWishList ?"text-red-500 ":"hover:text-red-500 text-blue-200 "}`} />
  </button>
</div>
    </div>
  );
}