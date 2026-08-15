import { Binoculars, ChartLine, Rocket, Shuffle, Telescope, TrendingUp } from 'lucide-react';
import React from 'react';

const CategoriesCard = () => {
    const options = [
    { label: 'Start my career', icon: Rocket },
    { label: 'Change my career', icon: Shuffle },
    { label: 'Grow in my current role', icon: TrendingUp },
    { label: 'Explore topics outside of work', icon: Binoculars },
  ];
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-8'>
            <section className="bg-[FFFFFF] px-4">
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl section-title md:text-xl font-bold text-gray-900 mb-4 text-center">
          What brings you to DevLearn today?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-start lg:justify-evenly gap-3 rounded-xl border border-[#ababeb] bg-white px-4 py-3 shadow-xs transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <div className="bg-blue-600 p-2 rounded-lg text-white flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-gray-800 text-left">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
        </div>
    );
};

export default CategoriesCard;