import React from 'react';
import { assets } from '../assets/assets';

const dummyData = [
  {
    id: "1",
    name: "Adnan D.",
    role: "Data Analyst",
    rating: 5,
    comment: "DevLearn's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life."
  },
  {
    id: "2",
    name: "Shaharia D.",
    role: "Software Engineer",
    rating: 5,
    comment: "DevLearn's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life."
  },
  {
    id: "3",
    name: "Mahim D.",
    role: "UX Designer",
    rating: 5,
    comment: "DevLearn's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life."
  },
  {
    id: "4",
    name: "Developer D.",
    role: "Full Stack Developer",
    rating: 5,
    comment: "DevLearn's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life."
  }
];

const Testimonial = () => {
  return (
    <section className="max-w-7xl bg-[#EFEFF7] px-4 sm:px-6 lg:px-8 py-10 mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mx-auto pb-10">
          <h2 className="text-2xl text-[#000000] section-title">
            Why people choose DevLearn Academy
          </h2>
          
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={assets.slider_1}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
                />
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;