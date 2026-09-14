import { Check, ChevronRight, FileDown, SquarePlay, Star, Trophy, Clock, ShieldCheck, Infinity } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPubCourseDetailsQuery } from '../Features/ApiSlice';
import CoursePlayer from '../Components/AdminDeshboard/CreateCourse/CoursePlayer';

const CourseDetails = () => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState({});
    
    const { data, isLoading } = useGetPubCourseDetailsQuery(id, {
        skip: !id,
    });

    React.useEffect(() => {
        if (data) {
            setCourseDetails(data);
        }
    }, [data]);

    const discountPercentagePrice = courseDetails?.estimatedPrice 
        ? Math.round(((courseDetails.estimatedPrice - courseDetails.price) / courseDetails.estimatedPrice) * 100)
        : 0;

    if (isLoading) {
        return <div className="text-center py-20 text-lg font-medium text-slate-600">Loading course details...</div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-16">
            {/*  Header */}
            <div className="bg-slate-900 text-slate-300 py-6 px-6 md:px-16 mb-8">
                <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
                    <span>Course</span>
                    <ChevronRight size={16} />
                    <span>Web Development</span>
                    <ChevronRight size={16} />
                    <span className="text-white font-medium truncate">{courseDetails?.name}</span>
                </div>
                <div className="max-w-7xl mx-auto mt-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{courseDetails?.name}</h1>
                    <p className="text-slate-400 text-sm md:text-base max-w-3xl line-clamp-2">{courseDetails?.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-slate-300">
                        <span className="bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded font-semibold flex items-center gap-1">
                            <Star size={14} fill="currentColor" /> 4.8
                        </span>
                        <span>Created by <strong className="text-white">{courseDetails?.owner}</strong></span>
                    </div>
                </div>
            </div>

            {/*Content Layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Course Details */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/*  learn */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">What you'll learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {courseDetails?.benefits?.map((item) => (
                                <div key={item._id} className="flex items-start gap-2.5">
                                    <Check className="text-emerald-600 mt-1 shrink-0" size={18} />
                                    <p className="text-sm text-slate-700">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*  Contents */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Course Contents</h3>
                        <div className="space-y-2.5">
                            {courseDetails?.courseData?.map((item, index) => (
                                <div key={item._id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-700">
                                    <div className="flex items-center gap-2.5">
                                        <SquarePlay size={18} className="text-indigo-600" />
                                        <span className="font-medium">{index + 1}. {item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Requirements</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                            {courseDetails?.prerequisites?.map((item, index) => (
                                <li key={index}>{item.title}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Description */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{courseDetails?.description}</p>
                    </div>
                </div>

                {/*Preview Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden sticky top-6">
                        <div className="relative aspect-video bg-black">
                            <CoursePlayer videoUrl={courseDetails?.demoUrl} />
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-extrabold text-slate-900">
                                    {courseDetails?.price === 0 ? "Free" : `$${courseDetails?.price}`}
                                </span>
                                {courseDetails?.estimatedPrice > 0 && (
                                    <span className="text-base text-slate-400 line-through font-medium">
                                        ${courseDetails?.estimatedPrice}
                                    </span>
                                )}
                                {discountPercentagePrice > 0 && (
                                    <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                                        {discountPercentagePrice}% OFF
                                    </span>
                                )}
                            </div> 

                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md">
                                Enroll Now
                            </button>

                            <div className="border-t border-slate-100 pt-4 space-y-3 text-sm text-slate-600">
                                <p className="flex items-center gap-2.5">
                                    <Infinity size={18} className="text-slate-400" /> Full lifetime access
                                </p>
                                <p className="flex items-center gap-2.5">
                                    <Trophy size={18} className="text-slate-400" /> Certificate of completion
                                </p>
                                <p className="flex items-center gap-2.5">
                                    <ShieldCheck size={18} className="text-slate-400" /> Premium Support
                                </p>
                                <p className="flex items-center gap-2.5">
                                    <FileDown size={18} className="text-slate-400" /> Accessible Resources
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseDetails