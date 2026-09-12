import React from 'react';

const Invoices = () => {
    const ordersData = [
      {
        orderId: "ORD-2026-9001",
        user: "Sarah Jenkins",
        courseId: "CRS-UIX-101",
        createdAt: "2026-09-12 14:32",
        invoiceUrl: "/invoices/ORD-2026-9001.pdf"
      },
      {
        orderId: "ORD-2026-9002",
        user: "Alex Rivera",
        courseId: "CRS-DEV-404",
        createdAt: "2026-09-11 09:15",
        invoiceUrl: "/invoices/ORD-2026-9002.pdf"
      },
      {
        orderId: "ORD-2026-9003",
        user: "Priya Patel",
        courseId: "CRS-MKT-202",
        createdAt: "2026-09-10 18:45",
        invoiceUrl: "/invoices/ORD-2026-9003.pdf"
      },
      {
        orderId: "ORD-2026-9004",
        user: "Marcus Chen",
        courseId: "CRS-DAT-303",
        createdAt: "2026-09-08 11:20",
        invoiceUrl: "/invoices/ORD-2026-9004.pdf"
      },
      {
        orderId: "ORD-2026-9005",
        user: "Emma Watson",
        courseId: "CRS-AI-505",
        createdAt: "2026-09-07 16:50",
        invoiceUrl: "/invoices/ORD-2026-9005.pdf"
      },
        {
        orderId: "ORD-2026-9001",
        user: "Sarah Jenkins",
        courseId: "CRS-UIX-101",
        createdAt: "2026-09-12 14:32",
        invoiceUrl: "/invoices/ORD-2026-9001.pdf"
      },
      {
        orderId: "ORD-2026-9002",
        user: "Alex Rivera",
        courseId: "CRS-DEV-404",
        createdAt: "2026-09-11 09:15",
        invoiceUrl: "/invoices/ORD-2026-9002.pdf"
      },
      {
        orderId: "ORD-2026-9003",
        user: "Priya Patel",
        courseId: "CRS-MKT-202",
        createdAt: "2026-09-10 18:45",
        invoiceUrl: "/invoices/ORD-2026-9003.pdf"
      },
      
     
    ];

    return (
        <div className="flex flex-col gap-1  bg-slate-50">
            {/* Header Section */}
            {/* <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="text-2xl font-bold text-gray-800 tracking-wider uppercase">Invoice Tracker</p>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">All Available Invoices Here</h2>
            </div> */}

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm font-semibold">
                                <th className="py-4 px-6">Order ID</th>
                                <th className="py-4 px-6">User</th>
                                <th className="py-4 px-6">Course ID</th>
                                {/* <th className="py-4 px-6">Created At</th> */}
                                {/* <th className="py-4 px-6 text-right">Invoice</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {ordersData.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-2 px-1 font-medium text-slate-900">{item.orderId}</td>
                                    <td className="py-2 px-1">{item.user}</td>
                                    <td className="py-2 px-1">
                                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-xs font-medium">
                                            {item.courseId}
                                        </span>
                                    </td>
                                    {/* <td className="py-1 px-6 text-slate-500">{item.createdAt}</td> */}
                                    {/* <td className="py-4 px-6 text-right">
                                        <a 
                                            href={item.invoiceUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all"
                                        >
                                            Download
                                        </a>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoices;