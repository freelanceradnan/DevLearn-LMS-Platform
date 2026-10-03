import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CourseCard from './CourseCart';
import { ArrowRight } from 'lucide-react';
import { useAllCoursesQuery, useGetPubCoursesQuery } from '../Features/ApiSlice';

const PopularCourses = () => {
  const {data}=useGetPubCoursesQuery()

  const [courses,setCourses]=useState([])
  useEffect(()=>{
  const rawData=Array.isArray(data)?data:[]
  if(rawData.length>0){
  setCourses(rawData)
  }
  },[data])

    // const cartData=[
    //     {_id:1,
    //     title:"Full Stack Web Devlopment",
    //     para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
    //     rating:"4.6",
    //     price: "$9.99",
    //     originalPrice:"$19.99",
    //     purchased:"99"
    //     },
    //     {_id:2,
    //     title:"Full Stack Web Devlopment",
    //     para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
    //     rating:"4.6",
    //     price: "$9.99",
    //     originalPrice:"$19.99",
    //     purchased:"99"
    //     },
    //      {_id:3,
    //     title:"Full Stack Web Devlopment",
    //     para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
    //     rating:"4.6",
    //     price: "$9.99",
    //     originalPrice:"$19.99",
    //     purchased:"99"
    //     },
    //      {_id:4,
    //     title:"Full Stack Web Devlopment",
    //     para:"AI Made Easy - Best-Selling Author - AI LLM Chatbots, Images, Music",
    //     rating:"4.6",
    //     price: "$9.99",
    //     originalPrice:"$19.99",
    //     purchased:"99"
    //     }
    // ]
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-10 bg-[#FFFFFF]'>
           <div className=''>
             <div className='flex flex-col gap-2 items-center'>
                <h1 className=' text-[#09C82C] text-center text-[14px] uppercase font-bold'>Course</h1>
                <h2 className='text-[31px] font-semibold text-[#171717]'>Explore Our Popular <span className='text-[#09C82C]'>Courses</span></h2>
                <p className='text-[#7d7e83] max-w-[600px] text-center text-[16px]'>Choose from hundreds of courses designed by industry experts to help you achieve your goals.</p>
             </div>
            
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-15">
        {courses.map((cart,index) => (
          <CourseCard key={cart._id} cart={cart} assets={assets} index={index}/>
        ))}
      </div>
   <div className='flex items-center justify-center'>
     <button className='border rounded-full flex py-1 px-3 text-[15px] items-center justify-center gap-1 hover:bg-[#171717] hover:text-white font-semibold'>View All Courses <ArrowRight size={16}/></button>
   </div>
        </div>
    );
};

export default PopularCourses;