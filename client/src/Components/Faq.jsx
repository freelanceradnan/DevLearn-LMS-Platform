import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useGetFaqQuery } from '../Features/ApiSlice';
import { motion } from 'motion/react';


const Faq = () => {
  const [openId, setOpenId] = useState(null);
 const{data}=useGetFaqQuery()
 const [faqData,setFaqData]=useState([])
useEffect(()=>{
if(data){
  setFaqData(data[0].faqSections)
}
},[data])

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className='flex flex-col gap-2 items-center'>
                <h1 className=' text-[#09C82C] text-center text-[14px] uppercase font-bold'>FAQ</h1>
                <h2 className='text-[31px] font-semibold text-[#171717]'>Explore Popular Questions<span className='text-[#09C82C]'></span></h2>
                <p className='text-[#7d7e83] max-w-[600px] text-center text-[16px]'>Find from hundreds of questions answered by industry experts to help you achieve your goals.</p>
             </div>

      <div className="flex flex-col gap-4 py-15">
        {faqData?.map((item,index) => {
          const isOpen = openId === item._id;

          return (
            <motion.div
              key={item._id}
               initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        transition={{ duration: 0.6 }}
              className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
            >
              
              <button
                onClick={() => toggleAccordion( item._id)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                aria-expanded={isOpen}
               
              >
                <span className="font-semibold text-slate-800 text-[18px] pr-4">
                  {item.question}
                </span>
                <span className="text-slate-500 shrink-0">
                  {!isOpen ? <Plus className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </span>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 border-t border-slate-100 bg-white leading-relaxed text-[14px]">
                  {item.answer}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;