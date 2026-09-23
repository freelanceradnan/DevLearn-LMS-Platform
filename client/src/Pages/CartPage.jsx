import { Star, ArrowRight } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveToCart } from '../Features/CartSlice';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useGetUsersCoursesQuery } from '../Features/ApiSlice';
import toast from 'react-hot-toast';
import { AddToWishList } from '../Features/WishSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const {data:Allcourse}=useGetUsersCoursesQuery()
    const navigate=useNavigate()
    const cart = useSelector((state) => state.AddToCart || []);
    const userid=useSelector((state)=>state?.auth?.user?._id)
    const {data}=useGetUserInfoQuery(userid,{
        skip:!userid
    })
    
    const removeItem = (id) => {
        dispatch(RemoveToCart(id));
    };

    const totalEstimatedPrice = cart.reduce((sum, item) => sum + Number(item.estimatedPrice || 0), 0);
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const totalDiscount = totalEstimatedPrice - totalPrice;
   
    if (cart.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500">Looks like you haven't added any courses to your cart yet.</p>
            </div>
        );
    }
const PaymentCheckout=()=>{
    const matchedCourses = Allcourse?.data?.filter((course) => 
    cart.some((cartItem) => cartItem?._id === course?._id)
);

if(matchedCourses?.length>0){
    toast.error(`You are already puchase "${matchedCourses.map((item)=>item.name)}" please remove and checkout`)
}else{
    navigate('/paymentcheckout', { state: cart });
}
}

  
// }




    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Shopping Cart</h1>
            <p className="text-gray-500 mb-8">{cart.length} {cart.length === 1 ? 'Course' : 'Courses'} in Cart</p>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Cart Items List */}
                <div className="w-full lg:w-[70%] flex flex-col gap-4">
                    {cart.map((item) => (
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
                                        onClick={() => removeItem(item)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                    >
                                        Remove
                                    </button>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors" onClick={()=>dispatch(AddToWishList(item))}>
                                        Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> 

                {/* Order Summary Box */}
                <div className="w-full lg:w-[30%] bg-gray-50 border border-gray-200 rounded-2xl p-6 sticky top-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-4">Total</h2>
                    
                    <div className="flex flex-col gap-3 mb-6 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Original Price:</span>
                            <span className="line-through font-medium">${totalEstimatedPrice}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Discount:</span>
                            <span className="text-green-600 font-medium">-${totalDiscount > 0 ? totalDiscount : 0}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                            <span>Total Price:</span>
                            <span>${totalPrice}</span>
                        </div>
                    </div>

                    <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-2" onClick={PaymentCheckout}>
                        Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                </div> 

            </div>
        </div>
    );
};

export default CartPage;