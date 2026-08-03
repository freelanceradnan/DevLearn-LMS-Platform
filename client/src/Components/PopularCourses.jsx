import React from 'react';
import { assets } from '../assets/assets';
import CourseCard from './CourseCart';

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
         {_id:2,
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
        }
    ]
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-6'>
            <h2>Trending courses</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cartData.map((cart) => (
          <CourseCard key={cart._id} cart={cart} assets={assets} />
        ))}
      </div>
        </div>
    );
};

export default PopularCourses;