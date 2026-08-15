import { Bell, CreditCard, Heart, LogOut, MessageSquareHeart, Settings, User } from 'lucide-react';
import React from 'react';

const ProfileMenu = () => {
    return (
        <div>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Your Account
                </h2>

                {/*Alerts */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Alerts
                  </p>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <Bell size={16} /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <MessageSquareHeart size={16} /> Messages
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <Heart size={16} /> Wishlist
                    </button>
                  </div>
                </div>

                {/* Section 2: Account */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Account
                  </p>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <Settings size={16} /> Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <CreditCard size={16} /> Purchase History
                    </button>
                  </div>
                </div>

                {/* Section 3: Profile */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Profile
                  </p>
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <User size={16} /> Public Profile
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
        </div>
    );
};

export default ProfileMenu;