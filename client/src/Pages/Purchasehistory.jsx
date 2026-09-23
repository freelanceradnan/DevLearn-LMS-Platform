import React from "react";
import {
  useGetPubCoursesQuery,
  useGetUserOrderQuery,
} from "../Features/ApiSlice";
import { Download, PackageOpen, Loader2 } from "lucide-react";

const Purchasehistory = () => {
  const { data, isLoading: isOrdersLoading } = useGetUserOrderQuery();
  const { data: course, isLoading: isCoursesLoading } = useGetPubCoursesQuery();

  const courseDetails = data?.map((item) =>
    course?.find((c) => c._id === item.courseId),
  );

  const isLoading = isOrdersLoading || isCoursesLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Purchase History</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all your purchased courses and invoices.
          </p>
        </div>
        <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold self-start md:self-auto">
          Total Orders: {data?.length || 0}
        </div>
      </div>

      {/* Table  container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <PackageOpen className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-800 font-medium text-lg">No purchase history found</p>
            <p className="text-gray-500 text-sm mt-1">You haven't purchased any courses yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Course Name</th>
                  <th className="py-4 px-6 font-semibold">Course Price</th>
                  <th className="py-4 px-6 font-semibold">Order Time</th>
                  <th className="py-4 px-6 font-semibold text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {data?.map((item, index) => {
                  const matchedCourse = courseDetails?.[index];
                  return (
                    <tr 
                      key={item._id || index} 
                      className="hover:bg-gray-50/75 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {matchedCourse?.name || (
                          <span className="text-gray-400 italic">Loading course...</span>
                        )}
                      </td>
                      
                      <td className="py-4 px-6 font-medium text-gray-900">
                       
                        {matchedCourse?.price} $
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-xs">
                       
                        12:00 PM
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => alert(`Downloading invoice for order: ${item._id}`)}
                          className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchasehistory;