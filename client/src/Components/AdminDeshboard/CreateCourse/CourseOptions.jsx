import { CircleCheck } from 'lucide-react';
import React from 'react';

const CourseOptions = ({active,setActive}) => {
    const options=[
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
    return (
     <div className="flex flex-col">
  {options.map((item, index) => {
    const isCompleted = index < active;
    const isCurrent = index === active;
    const isLast = index === options.length - 1;

    return (
      <div key={index} className="relative flex gap-3 pb-6 last:pb-0">
        {!isLast && (
          <div
            className={`absolute left-[14px] top-[28px] h-[calc(100%-28px)] w-[2px] transition-colors duration-300 ${
              index < active - 1 ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          />
        )}

        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center bg-white">
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

export default CourseOptions;