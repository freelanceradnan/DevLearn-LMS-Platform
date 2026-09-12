import React from 'react';
import OverviewChart from '../OverviewChart/OverviewChart';
import Invoices from './../Invoices/Invoices';
import { FiUsers, FiBookOpen, FiShoppingCart } from 'react-icons/fi';

const Overview = () => {
    return (
        <div className="flex gap-6 flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Welcome to DevLearn Dashboard
                    </p>
                </div>
            </div>

            {/* Top Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-2xl shadow-sm text-white flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-pink-100">Total Users</p>
                            <h3 className="text-2xl font-extrabold mt-1">12,500</h3>
                        </div>
                        <div className="p-2.5 bg-white/20 rounded-xl">
                            <FiUsers size={22} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-medium mb-2 text-pink-100">
                            <span>Paid Users: 5,000</span>
                            <span>Unenroll Users: 7,500</span>
                        </div>
                        <div className="w-full bg-black/15 h-2 rounded-full overflow-hidden">
                            <div className="bg-white h-full rounded-full" style={{ width: '40%' }}></div>
                        </div>
                    </div>
                </div>

    
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Courses</p>
                            <h3 className="text-2xl font-extrabold text-gray-800 mt-1">500</h3>
                        </div>
                        <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
                            <FiBookOpen size={22} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-medium mb-2 text-gray-500">
                            <span>Purchased: 400</span>
                            <span>Unpurchased: 100</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full rounded-full" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                </div>

      
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Orders</p>
                            <h3 className="text-2xl font-extrabold text-gray-800 mt-1">1,400</h3>
                        </div>
                        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-500">
                            <FiShoppingCart size={22} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-medium mb-2 text-gray-500">
                            <span>New: 1,200</span>
                            <span>Renewal: 200</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-7 flex flex-col justify-between">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Earning / Analytics</h3>
                        <p className="text-xs text-gray-400">Overview of recent performance metrics</p>
                    </div>
                    <div className="w-full">
                        <OverviewChart />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-5 flex flex-col justify-between">
                    <div>
                        <div className='flex justify-between items-center mb-5'>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Recent Invoices</h3>
                                <p className="text-xs text-gray-400">Latest transactions list</p>
                            </div>
                            <button className='text-xs font-semibold bg-[#1bd484] hover:bg-[#15b36e] text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm'>
                                View All
                            </button>
                        </div>
                        <div className="w-full">
                            <Invoices />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;