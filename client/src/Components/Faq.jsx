import React, { useState } from 'react';
import { Plus, RefreshCw, SearchX, X } from 'lucide-react';
import { useGetFaqQuery } from '../Features/ApiSlice';
import { motion } from 'motion/react';

function SkeletonFaq() {
  return (
    <div className="border border-slate-200 rounded-lg p-5 animate-pulse">
      <div className="h-5 w-2/3 rounded bg-gray-200" />
    </div>
  );
}

const Faq = () => {
  const [openId, setOpenId] = useState(null);
  const { data, isLoading, isError, isFetching, refetch } = useGetFaqQuery();

  //Fetch Data Backend
  const faqData = Array.isArray(data?.[0]?.faqSections) ? data[0].faqSections : [];

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-[#09C82C] text-center text-[14px] uppercase font-bold">FAQ</h1>
        <h2 className="text-[31px] font-semibold text-[#171717]">Explore Popular Questions</h2>
        <p className="text-[#7d7e83] max-w-[600px] text-center text-[16px]">
          Find from hundreds of questions answered by industry experts to help you achieve your goals.
        </p>
      </div>

      <div className="flex flex-col gap-4 py-10">
        {/* 1. Loading */}
        {isLoading && [1, 2, 3, 4].map((i) => <SkeletonFaq key={i} />)}

        {/* 2. Error */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-red-500 text-sm">
              Failed to load FAQ! Try Again.
            </p>
            <button
              onClick={refetch}
              disabled={isFetching}
              className="flex items-center gap-2 rounded-full bg-[#09C82C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#08AA25] disabled:opacity-60 transition-colors"
            >
              <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
              Retry
            </button>
          </div>
        )}

        {/* 3. Empty */}
        {!isLoading && !isError && faqData.length === 0 && (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
            <SearchX size={18} />
            <p className="text-sm">NO FAQ Avaliable!</p>
          </div>
        )}

        {/* 4. Success */}
        {!isLoading &&
          !isError &&
          faqData.map((item, index) => {
            const id = item._id || index;
            const isOpen = openId === id;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(id)}
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