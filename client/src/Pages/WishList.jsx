import { Star, ArrowRight } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, RemoveToCart } from '../Features/CartSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useGetUsersCoursesQuery } from '../Features/ApiSlice';
import toast from 'react-hot-toast';
import { AddToWishList, RemoveFromWishList } from '../Features/WishSlice';

const WishList = () => {
    const dispatch = useDispatch();
    const {data:Allcourse}=useGetUsersCoursesQuery()
    const navigate=useNavigate()
    const wishlist = useSelector((state) => state.AddToWish || []);
    const userid=useSelector((state)=>state?.auth?.user?._id)
    const {data}=useGetUserInfoQuery(userid,{
        skip:!userid
    })
    
    const removeItem = (id) => {
        dispatch(RemoveToCart(id));
    };

    const totalEstimatedPrice = wishlist.reduce((sum, item) => sum + Number(item.estimatedPrice || 0), 0);
    const totalPrice = wishlist.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const totalDiscount = totalEstimatedPrice - totalPrice;
   
    if (wishlist.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your wishlist is Empty</h2>
                <p className="text-gray-500">Looks like you haven't added any courses to your wishlist yet.</p>
            </div>
        );
    }


  
// }




    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">WishList</h1>
            <p className="text-gray-500 mb-8">{wishlist.length} {wishlist.length === 1 ? 'Course' : 'Courses'} in wishlist</p>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Cart Items List */}
                <div className="w-full flex flex-col gap-4">
                    {wishlist.map((item) => (
                        <div 
                            key={item._id} 
                            className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow justify-between items-start sm:items-center"
                        >
                            {/* Thumbnail */}
                            <img 
                                src={item.thumbnail?.url} 
                                alt={item.name} 
                                className="w-full sm:w-40 h-28 object-cover rounded-lg border border-gray-100" 
                            />
                            
                            {/* Course Details */}
                            <div className="flex-1 flex flex-col gap-1">
                                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.name}</h3>
                                <p className="text-sm text-gray-500">By {item.owner}</p>
                                
                                <div className="flex items-center gap-3 text-xs text-gray-600 mt-1 flex-wrap">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">{item.level}</span>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <span className="font-bold text-gray-700">5.0</span>
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    </div>
                                    <span className="text-gray-400">(1,256 ratings)</span>
                                </div>

                                <div className="flex gap-4 text-xs text-gray-500 mt-2">
                                    <span>{item.courseData?.length || 0} Lessons</span>
                                    <span>•</span>
                                    <span>4 hours</span>
                                </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-4">
                                <div className="text-right">
                                    <span className="text-lg font-bold text-gray-900 block">${item.price}</span>
                                    {item.estimatedPrice && (
                                        <span className="text-sm text-gray-400 line-through">${item.estimatedPrice}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() =>dispatch(RemoveFromWishList(item))}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                    >
                                        Remove
                                    </button>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors" onClick={()=>dispatch(AddToCart(item))}>
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> 

              

            </div>
        </div>
    );
};

export default WishList;