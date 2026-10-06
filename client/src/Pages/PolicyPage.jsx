import React from 'react';
import { useGetAllPolicyQuery } from '../Features/ApiSlice';
import { useState, useEffect } from 'react';

const PolicyPage = () => {
    const { data: policyData, isLoading, isError } = useGetAllPolicyQuery();
    const [AllPolicy, setAllPolicy] = useState([]);

    useEffect(() => {
        if (policyData?.[0]?.policySection) {
            setAllPolicy(policyData[0]?.policySection);
        }
    }, [policyData]);

    // Loading 
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Error 
    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 text-red-500 font-medium">
                Failed to load policy data. Please try again later.
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl  mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
                
                {/* Header  */}
                <div className="border-b border-gray-100 mb-8">
                    <h1 className="text-3xl sm:text-[31px] font-extrabold text-gray-900 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 flex items-center gap-1.5">
                        <span>Last updated:</span>
                        <span className="font-medium text-gray-700">
                            {policyData?.[0]?.updatedAt 
                                ? new Date(policyData[0].updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit'
                                  }) 
                                : 'Loading...'}
                        </span>
                    </p>
                </div>

                {/* Policy  */}
                <div className="space-y-8">
                    {AllPolicy?.map((item, index) => (
                        <div key={index} className="group">
                            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                                    0{index + 1}
                                  </span>
                                {item.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base pl-0 sm:pl-9">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PolicyPage;