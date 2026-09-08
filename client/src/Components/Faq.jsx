import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useGetFaqQuery } from '../Features/ApiSlice';


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
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl text-[#000000] section-title mb-6">
        Frequently asked questions
      </h2>

      <div className="flex flex-col gap-4">
        {faqData?.map((item,index) => {
          const isOpen = openId === item._id;

          return (
            <div
              key={item._id}
              className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
            >
              
              <button
                onClick={() => toggleAccordion( item._id)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-slate-800 text-lg pr-4">
                  {item.question}
                </span>
                <span className="text-slate-500 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;