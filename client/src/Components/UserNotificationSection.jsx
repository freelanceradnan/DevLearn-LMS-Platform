import React from 'react';

const UserNotificationSection = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className='text-2xl font-bold text-gray-800'>Manage All Notifications</h2>
        <p className="text-sm text-gray-500 mt-1">Choose how and when you want to be notified.</p>
      </div>

      <form className="space-y-8">
        
        {/* EMAIL NOTIFICATIONS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Manage Email Notifications:</h3>
          
          {/* Your Learning Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Your learning</span>
            <div className="flex items-center gap-2">
             
              <input 
                type="checkbox" 
                name="order" 
                id="email-purchase"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
               <label htmlFor="email-purchase" className="text-sm font-medium text-gray-700 cursor-pointer">
                Purchasing Course:
              </label>
            </div>
          </div>

          {/* Updates and Offerings Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Updates and offerings:</span>
            
            <div className="flex items-center gap-2">
             
              <input 
                type="checkbox" 
                name="order" 
                id="email-comment"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
               <label htmlFor="email-comment" className="text-sm font-medium text-gray-700 cursor-pointer">
                Comments Reply
              </label>
            </div>

            <div className="flex items-center gap-2">
              
              <input 
                type="checkbox" 
                name="order" 
                id="email-review"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
              <label htmlFor="email-review" className="text-sm font-medium text-gray-700 cursor-pointer">
                Review Reply
              </label>
            </div>

            <div className="flex items-center gap-2">
              
              <input 
                type="checkbox" 
                name="order" 
                id="email-marketing"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
              <label htmlFor="email-marketing" className="text-sm font-medium text-gray-700 cursor-pointer">
                Marketing Course
              </label>
            </div>
          </div>
        </div>

        {/* ================= PUSH NOTIFICATIONS ================= */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Manage Push Notifications:</h3>
          
          {/* Your Learning Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Your learning</span>
            <div className="flex items-center gap-2">
             
              <input 
                type="checkbox" 
                name="order" 
                id="push-purchase"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
               <label htmlFor="push-purchase" className="text-sm font-medium text-gray-700 cursor-pointer">
                Purchasing Course:
              </label>
            </div>
          </div>

          {/* Updates and Offerings Section */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Updates and offerings:</span>
            
            <div className="flex items-center gap-2">
             
              <input 
                type="checkbox" 
                name="order" 
                id="push-comment"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
               <label htmlFor="push-comment" className="text-sm font-medium text-gray-700 cursor-pointer">
                Comments Reply
              </label>
            </div>

            <div className="flex items-center gap-2">
             
              <input 
                type="checkbox" 
                name="order" 
                id="push-review"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
               <label htmlFor="push-review" className="text-sm font-medium text-gray-700 cursor-pointer">
                Review Reply
              </label>
            </div>

            <div className="flex items-center gap-2">
              
              <input 
                type="checkbox" 
                name="order" 
                id="push-marketing"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
              <label htmlFor="push-marketing" className="text-sm font-medium text-gray-700 cursor-pointer">
                Marketing Course
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Save
          </button>
        </div>

      </form>
    </div>
    );
};

export default UserNotificationSection;