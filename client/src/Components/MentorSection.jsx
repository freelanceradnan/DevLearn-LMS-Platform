// import { Star,Github } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import { motion } from 'motion/react';

const MentorSection = () => {
    const CardData=[
        {id:1,
        image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
        name:"Adnan Dev",
        sub:"Web Devlopment",
        description:"8+ years experience in data analysis and machine learning. Former Data Scientist at Facebook.",
        course:10,
        students:500,
        links:{
        facebook:"www.facebook.com/adnan722",
        github:"www.github.com/freelanceradnan.com",
        x:"www.x.com/adnandev"
        }
        },
        {id:1,
        image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
        name:"Masud Dev",
        sub:"Software Devlopment",
        description:"3+ years experience in data software and machine learning. Former Data Scientist at Facebook.",
        course:18,
        students:600,
        links:{
        facebook:"www.facebook.com/adnan722",
        github:"www.github.com/freelanceradnan.com",
        x:"www.x.com/adnandev"
        }
        },
        {id:1,
        image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
        name:"Jipun Dev",
        sub:"Flutter Devlopment",
        description:"8+ years experience in data analysis and machine learning. Former Data Scientist at Facebook.",
        course:100,
        students:5000,
        links:{
        facebook:"www.facebook.com/adnan722",
        github:"www.github.com/freelanceradnan.com",
        x:"www.x.com/adnandev"
        }
        },
        {id:1,
        image:"https://res.cloudinary.com/doguuyqrp/image/upload/v1785345363/ChatGPT_Image_Jul_23_2026_04_42_21_PM_nt7fix.png",
        name:"Ridoy Dev",
        sub:"Web Devlopment",
        description:"8+ years experience in data analysis and machine learning. Former Data Scientist at Facebook.",
        course:10,
        students:500,
        links:{
        facebook:"www.facebook.com/adnan722",
        github:"www.github.com/freelanceradnan.com",
        x:"www.x.com/adnandev"
        }
        }
    ]
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-10 bg-[#FCFCFC]'>
       <div className='flex flex-col gap-2 items-center'>
                <h1 className=' text-[#09C82C] text-center text-[14px] uppercase font-bold'>Mentors</h1>
                <h2 className='text-[31px] font-semibold text-[#171717]'>Learn From Industry <span className='text-[#09C82C]'>Experts</span></h2>
                <p className='text-[#7d7e83] max-w-[600px] text-center text-[16px]'>Our mentors are industry leaders with years of experience in their respective fields.</p>
             </div>
        <div className='py-15 grid  gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {CardData.map((item,index)=>(
            <motion.Link
            initial={{ y: 40, opacity: 0 }} 
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ 
    duration: 0.4, 
    delay: index * 0.1, // Stagger effect per card
    ease: "easeOut" 
  }} 
      key={index} 
      to={item.href || '#'} 
      className='border p-6 rounded-2xl border-[#cac2c2] bg-[#FFFFFF] hover:shadow-lg transition-all duration-300 py-10 flex flex-col gap-4 items-center group'
    >
      {/* Avatar & Rating Badge */}
      <div className='flex items-center justify-center relative'>
        <img 
          src={item.image} 
          alt={item.name} 
          className='w-20 h-20 rounded-full object-cover border-2 border-[#F4B735] shadow-sm group-hover:scale-105 transition-transform' 
        />
        <div className="absolute bg-[#ffae00] h-5 px-2 -bottom-2 flex items-center justify-center text-[10px] font-bold text-white gap-1 rounded-md shadow-sm">
          <span>{item.rating || '4.8'}</span> 
          <Star size={10} fill='white' className="text-white" />
        </div>
      </div>

      {/* Name & Subheading */}
      <div className='text-center mt-2'>
        <h1 className='text-base font-semibold text-gray-900'>{item.name}</h1>
        <p className='text-xs text-gray-500 font-medium'>{item.sub}</p>
      </div>

      {/* Description */}
      <div className='text-center text-xs text-gray-600 px-2 line-clamp-2'>
        {item.description}
      </div>

      {/* Statistics */}
      <div className='flex gap-4 text-xs text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100'>
        <p><span className='font-semibold text-gray-900'>{item.students}+</span> Students</p>
        <span className="text-gray-300">|</span>
        <p><span className='font-semibold text-gray-900'>{item.course}</span> Courses</p>
      </div>

      {/* Social Links */}
      <div className='flex justify-center items-center gap-4 text-gray-500 pt-1'>
        <a 
          href={item.social?.github || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className='hover:text-gray-900 transition-colors p-1'
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub size={16} />
        </a>
        <a 
          href={item.social?.twitter || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className='hover:text-blue-500 transition-colors p-1'
          onClick={(e) => e.stopPropagation()}
        >
          <FaTwitter size={16} />
        </a>
        <a 
          href={item.social?.facebook || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className='hover:text-blue-600 transition-colors p-1'
          onClick={(e) => e.stopPropagation()}
        >
          <FaFacebook size={16} />
        </a>
      </div>
    </motion.Link>
        ))}
        </div>
        </div>
    );
};

export default MentorSection;