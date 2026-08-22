import { CircleCheck } from 'lucide-react';
import React from 'react';

const CourseIndicator = ({active,setActive}) => {
    const options=[
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
    return (
     <div className="flex md:flex-col justify-center md:justify-start">
  {options.map((item, index) => {
    const isCompleted = index < active;
    const isCurrent = index === active;
    const isLast = index === options.length - 1;

    return (
      <div key={index} className="relative flex md:gap-3 pb-6 gap-1">
        {!isLast && (
          <div
            className={`absolute left-[14px] top-[28px] h-[calc(100%-28px)] w-[2px] transition-colors duration-300 ${
              index < active - 1 ? 'bg-indigo-600' : 'bg-slate-200'
            } hidden md:block`}
          />
        )}

        {/* Icon */}
        <div className="relative flex items-center justify-center bg-white">
          <CircleCheck
            size={28}
            className={`transition-colors duration-300 ${
              isCompleted || isCurrent
                ? 'text-indigo-600 fill-indigo-50'
                : 'text-slate-300'
            }`}
          />
        </div>

        {/* Step Content */}
        <div
          className={`text-sm self-center transition-colors duration-300 ${
            isCurrent
              ? 'text-indigo-600 font-semibold'
              : isCompleted
              ? 'text-slate-900 font-semibold'
              : 'text-slate-400 font-normal'
          }`}
        >
          {item}
        </div>
      </div>
    );
  })}
</div>
    );
};

export default CourseIndicator;