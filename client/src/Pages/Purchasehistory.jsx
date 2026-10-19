import React from "react";
import {
  useGetPubCoursesQuery,
  useGetUserOrderQuery,
} from "../Features/ApiSlice";
import { Download, PackageOpen, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Purchasehistory = () => {
  const navigate = useNavigate();
  const { data, isLoading: isOrdersLoading } = useGetUserOrderQuery();
  const { data: course, isLoading: isCoursesLoading } = useGetPubCoursesQuery();

  const courseDetails = data?.map((item) =>
    course?.find((c) => c._id === item.courseId),
  );

  const navigateInvoice = (orderId, name, email, courseId, price) => {
    navigate("/invoice", {
      state: {
        data: {
          orderId,
          name,
          email,
          courseId,
          price,
        },
      },
    });
  };

  const isLoading = isOrdersLoading || isCoursesLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm text-gray-500 font-medium">Loading your purchase history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Purchase History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View, track, and download invoices for all your course purchases.
          </p>
        </div>
        <div className="inline-flex items-center px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold self-start md:self-auto shadow-sm">
          Total Orders: {data?.length || 0}
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <PackageOpen className="w-8 h-8" />
            </div>
            <p className="text-gray-900 font-semibold text-lg">
              No purchase history found
            </p>
            <p className="text-gray-500 text-sm mt-1 max-w-sm">
              You haven't purchased any courses yet. Explore our catalog to start learning!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase font-semibold tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Course Name</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Order Date</th>
                  <th className="py-4 px-6 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {data?.map((item, index) => {
                  const matchedCourse = courseDetails?.[index];
                  
                  // Format order date dynamically (falls back cleanly if field differs)
                  const orderDateString = item.createdAt || item.date 
                    ? new Date(item.createdAt || item.date).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) 
                    : "Recently";

                  return (
                    <tr
                      key={item._id || index}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-mono text-xs">
                          {`#ORD-${item._id.toString().slice(-8)}`}
                        </span>
                      </td>
                      
                      <td className="py-4 px-6 font-medium text-gray-900 max-w-xs truncate">
                        {matchedCourse?.name || (
                          <span className="text-gray-400 italic font-normal">
                            Loading course...
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 font-semibold text-gray-900">
                        ${matchedCourse?.price ?? item.price ?? "0.00"}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Paid
                        </span>
                      </td>

                      <td className="py-4 px-6 text-gray-500 text-xs font-medium">
                        {orderDateString}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() =>
                            navigateInvoice(
                              item._id,
                              item.name,
                              item.email,
                              item.courseId,
                              matchedCourse?.price ?? item.price
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition-all shadow-sm cursor-pointer"
                          title="Download Invoice"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Invoice</span>
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