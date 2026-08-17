import React from 'react';

const UserSecurity = () => {
    return (
      <div className="md:max-w-xl mx-auto md:px-6 space-y-6 w-full py-5 md:py-0">
  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
    <form className="w-full space-y-4">
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
          Enter your old password
        </label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          placeholder="••••••••"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full"
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
          New password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="••••••••"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full"
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm new password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full"
        />
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-md shadow-sm transition-colors mt-4"
      >
        Change Password
      </button>
    </form>
  </div>
</div>
    );
};

export default UserSecurity;