import React from 'react';
import CoursePlayer from './CoursePlayer';
import { ArrowLeft, ArrowRight, Check, Sparkles, BookOpen } from 'lucide-react';

const CoursePreview = ({ createCourseHandler, courseData, setActive, active,state}) => {
  const discountPercentagePrice = courseData?.estimatedPrice 
    ? Math.round(((courseData.estimatedPrice - courseData.price) / courseData.estimatedPrice) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="w-full bg-slate-900 aspect-video">
          <CoursePlayer videoUrl={courseData?.demoUrl} />
        </div>
        
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/50">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900">
                {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
              </span>
              {courseData?.estimatedPrice > 0 && (
                <span className="text-lg text-slate-400 line-through font-medium">
                  ${courseData?.estimatedPrice}
                </span>
              )}
              {discountPercentagePrice > 0 && (
                <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                  {discountPercentagePrice}% OFF
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">Full lifetime access included </p>
          </div>

          <button 
            type="button"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Buy Now ({courseData?.price === 0 ? "Free" : `$${courseData?.price}`})
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Benefits Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">Benefits You Get</h3>
          </div>
          <ul className="space-y-3">
            {courseData?.benefits?.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                <div className="mt-0.5 p-1 rounded-full bg-indigo-50 text-indigo-600 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

 
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900">What You'll Learn</h3>
          </div>
          <ul className="space-y-3">
            {courseData?.prerequisites?.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

  
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Course Description</h3>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {courseData?.description}
        </p>
      </div>

   
      <div className="flex justify-between items-center pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setActive && setActive(active - 1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

       {state?
       <button
          type="button"
          onClick={createCourseHandler}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
        >
          Update Course <ArrowRight className="w-4 h-4" />
        </button>:
         <button
          type="button"
          onClick={createCourseHandler}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
        >
          Create Course <ArrowRight className="w-4 h-4" />
        </button> 
      }
      </div>
    </div>
  );
};

export default CoursePreview;