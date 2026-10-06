// import { Star,Github } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { FaGithub, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useGetMentorQuery } from '../Features/ApiSlice';
import MentorsCart from './MentorsCart';

const MentorSection = () => {
  const {data:allMentors}=useGetMentorQuery()
  const navigate=useNavigate()
    // const CardData=[
    //     {id:1,
    //     image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
    //     name:"Adnan Dev",
    //     sub:"Web Devlopment",
    //     description:"8+ years experience in data analysis and machine learning. Former Data Scientist at Facebook.",
    //     course:10,
    //     students:500,
    //     links:{
    //     facebook:"www.facebook.com/adnan722",
    //     github:"www.github.com/freelanceradnan.com",
    //     x:"www.x.com/adnandev"
    //     }
    //     },
    //     {id:1,
    //     image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
    //     name:"Masud Dev",
    //     sub:"Software Devlopment",
    //     description:"3+ years experience in data software and machine learning. Former Data Scientist at Facebook.",
    //     course:18,
    //     students:600,
    //     links:{
    //     facebook:"www.facebook.com/adnan722",
    //     github:"www.github.com/freelanceradnan.com",
    //     x:"www.x.com/adnandev"
    //     }
    //     },
    //     {id:1,
    //     image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
    //     name:"Jipun Dev",
    //     sub:"Flutter Devlopment",
    //     description:"8+ years experience in data analysis and machine learning. Former Data Scientist at Facebook.",
    //     course:100,
    //     students:5000,
    //     links:{
    //     facebook:"www.facebook.com/adnan722",
    //     github:"www.github.com/freelanceradnan.com",
    //     x:"www.x.com/adnandev"
    //     }
    //     },
    //     {id:1,
    //     image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
    //     name:"Ridoy Dev",
    //     sub:"Web Devlopment",
    //     description:"8+ years experience in data analysis and machine learning. Former Data Scientist at Facebook.",
    //     course:10,
    //     students:500,
    //     links:{
    //     facebook:"www.facebook.com/adnan722",
    //     github:"www.github.com/freelanceradnan.com",
    //     x:"www.x.com/adnandev"
    //     }
    //     }
    // ]
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-10 bg-[#FCFCFC]'>
       <div className='flex flex-col gap-2 items-center'>
                <h1 className=' text-[#09C82C] text-center text-[14px] uppercase font-bold'>Mentors</h1>
                <h2 className='text-[31px] font-semibold text-[#171717]'>Learn From Industry <span className='text-[#09C82C]'>Experts</span></h2>
                <p className='text-[#7d7e83] max-w-[600px] text-center text-[16px]'>Our mentors are industry leaders with years of experience in their respective fields.</p>
             </div>
        <div className='py-15 grid  gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {allMentors?.data?.slice(0,4)?.map((item,index)=>(
          <MentorsCart item={item} index={index}/>
        ))}
        </div>
         <div className='flex items-center justify-center'>
             <button className='border rounded-full flex py-1 px-3 text-[15px] items-center justify-center gap-1 hover:bg-[#171717] hover:text-white font-semibold' onClick={()=>navigate('/mentors')}>View All Mentors <ArrowRight size={16}/></button>
           </div>
        </div>
    );
};

export default MentorSection;