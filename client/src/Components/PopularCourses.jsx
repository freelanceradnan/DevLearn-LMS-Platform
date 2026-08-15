import React from 'react';
import { assets } from '../assets/assets';
import CourseCard from './CourseCart';
import { ArrowRight } from 'lucide-react';

const PopularCourses = () => {
    const cartData=[
        {_id:1,
        title:"Full Stack Web Devlopment",
        para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
        rating:"4.6",
        price: "$9.99",
        originalPrice:"$19.99",
        purchased:"99"
        },
        {_id:2,
        title:"Full Stack Web Devlopment",
        para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
        rating:"4.6",
        price: "$9.99",
        originalPrice:"$19.99",
        purchased:"99"
        },
         {_id:3,
        title:"Full Stack Web Devlopment",
        para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
        rating:"4.6",
        price: "$9.99",
        originalPrice:"$19.99",
        purchased:"99"
        },
         {_id:4,
        title:"Full Stack Web Devlopment",
        para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
        rating:"4.6",
        price: "$9.99",
        originalPrice:"$19.99",
        purchased:"99"
        }
    ]
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-6 bg-[#EFEFF7]'>
           <div className='flex justify-between pb-12'>
             <div className='w-1/2'>
                <h2 className='text-2xl text-[#000000] section-title'>Get choice of your course</h2>
               
             </div>
             <button className='flex gap-1 justify-center items-center text-[#6D28D5] text-sm font-semibold'>See More <ArrowRight size={20}/></button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cartData.map((cart) => (
          <CourseCard key={cart._id} cart={cart} assets={assets} />
        ))}
      </div>
    
        </div>
    );
};

export default PopularCourses;