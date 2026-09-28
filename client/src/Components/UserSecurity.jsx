import React from 'react';
import { useState } from 'react';
import { useChangePasswordMutation } from '../Features/ApiSlice';
import toast from 'react-hot-toast';

const UserSecurity = () => {
  const [previousPassword,setPreviousPassword]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [changePassword]=useChangePasswordMutation()
  const ChangePasswordHandler=async(e)=>{
    e.preventDefault()
    try {
     const res= await changePassword({newPassword:confirmPassword,OldPassword:previousPassword}).unwrap()
    if(res.success==true){
    setPreviousPassword("")
    setNewPassword("")
    setConfirmPassword("")
    toast.success(res.message||"Password Reset Success!")
    
    }
    } catch (error) {
     setPreviousPassword("")
    setNewPassword("")
    setConfirmPassword("")
      toast.error(error.data.message||"Password Reset Failed!")
    }
  }
    return (
      <div className="md:max-w-xl mx-auto md:px-6 space-y-6 w-full py-5 md:py-0">
  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
    <form className="w-full space-y-4" onSubmit={ChangePasswordHandler}>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
          Enter your old password
        </label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={previousPassword}
          placeholder="••••••••"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full"
          onChange={(e)=>setPreviousPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
          New password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          name="newPassword"
          placeholder="••••••••"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full"
          onChange={(e)=>setNewPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm new password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          name="confirmPassword"
          placeholder="••••••••"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-full"
          onChange={(e)=>setConfirmPassword(e.target.value)}
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