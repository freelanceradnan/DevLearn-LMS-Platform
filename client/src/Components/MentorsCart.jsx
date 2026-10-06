import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const MentorsCart = ({item,index}) => {
    return (
         <motion.Link
            initial={{ y: 40, opacity: 0 }} 
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ 
    duration: 0.4, 
    delay: index * 0.1,
    ease: "easeOut" 
  }} 
      key={index} 
      to={item.href || '#'} 
      className='border p-6 rounded-2xl border-[#cac2c2] bg-[#FFFFFF] hover:shadow-lg transition-all duration-300 py-10 flex flex-col gap-4 items-center group'
    >
      {/* Avatar & Rating Badge */}
  
      <div className='flex items-center justify-center relative'>
        <img 
          src={item.avatar.url} 
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
        <p><span className='font-semibold text-gray-900'>{item.courses}</span> Courses</p>
      </div>

      {/* Social Links */}
      <div className='flex justify-center items-center gap-4 text-gray-500 pt-1'>
        <a 
          href={item.socialLinks?.github || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className='hover:text-gray-900 transition-colors p-1'
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub size={16} />
        </a>
        <a 
          href={item.socialLinks?.fb || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className='hover:text-blue-500 transition-colors p-1'
          onClick={(e) => e.stopPropagation()}
        >
          <FaFacebook size={16} />
        </a>
        <a 
          href={item.socialLinks?.linkedin || '#'} 
          target="_blank" 
          rel="noreferrer" 
          className='hover:text-blue-600 transition-colors p-1'
          onClick={(e) => e.stopPropagation()}
        >
          <FaLinkedin size={16} />
        </a>
      </div>
    </motion.Link>
    );
};

export default MentorsCart;