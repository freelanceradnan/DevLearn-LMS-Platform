import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const FaqDummy = [
  {
    id: 1,
    question: "Is Devlearn accredited, and are Devlearn certificates recognized by employers?",
    answer: "Devlearn partners with accredited universities and leading companies such as Google and IBM to offer courses, Specializations, and Professional Certificates that are widely recognized."
  },
  {
    id: 2,
    question: "Is a Devlearn certificate worth it?",
    answer: "Yes, Devlearn certificates demonstrate job-ready skills, practical project experience, and commitment to continuous learning to prospective employers."
  },
  {
    id: 3,
    question: "What is Devlearn Plus, and is it worth it?",
    answer: "Devlearn Plus is a subscription plan that gives you unlimited access to over 90% of learning programs, courses, and certificates on the platform."
  },
  {
    id: 4,
    question: "What are the most popular courses on Devlearn?",
    answer: "Our most popular fields include Data Science, Full-Stack Web Development, Machine Learning, UI/UX Design, and Cloud Engineering."
  },
  {
    id: 5,
    question: "How can Devlearn help me get a job or advance my career?",
    answer: "Devlearn offers hands-on projects, career services, interview preparation, and direct job placement support through partner networks."
  }
];

const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl text-[#000000] section-title mb-6">
        Frequently asked questions
      </h2>

      <div className="flex flex-col gap-4">
        {FaqDummy.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
            >
              
              <button
                onClick={() => toggleAccordion(item.id)}
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