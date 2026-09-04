import { Trash2, User, X } from 'lucide-react';
import React from 'react';
import { useChangeRoleMutation } from '../Features/ApiSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ChangeRole = ({editModal,setEditModal,role,editId}) => {
   const [updateRole]=useChangeRoleMutation()
   const [selectedRole,setSelectedRole]=useState("")
  
   const ChangeRoleHandler=async()=>{
   try {
    if(selectedRole){
        const result=await updateRole({id:editId,role:selectedRole})
        setEditModal(false)
        toast.success('Role updated success!')
    }
   } catch (error) {
    
   }
   }
    return (
        <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200"
  onClick={() => setEditModal(false)}
>
  <div
    className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all scale-100"
    onClick={(e) => e.stopPropagation()}
  >

    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/80">
      <div className="flex items-center gap-3.5">
        <div className="p-2.5 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-600 dark:text-red-400 ring-1 ring-red-500/10">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-none">
            Change Access Role
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update permissions for this account
          </p>
        </div>
      </div>

      <button
        onClick={() => setEditModal(false)}
        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>


    <div className="p-6 space-y-4">
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Are you sure you want to change the access role? Select a new role from the dropdown below.
      </p>

  
      <div className="relative">
        <select
          defaultValue={role}
          onChange={(e)=>setSelectedRole(e.target.value)}
          className="w-full h-11 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled hidden>Select a role...</option>
          <option value="user" className="bg-white dark:bg-slate-900" disabled={role=="user"}>User</option>
          <option value="admin" className="bg-white dark:bg-slate-900" disabled={role=="admin"}>Admin</option>
        </select>
        
    
        <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-400">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>

  
    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800/80">
      <button
        onClick={() => setEditModal(false)}
        className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        Cancel
      </button>
      <button 
      onClick={ChangeRoleHandler}
        className="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/20 transition-all"
      >
        Confirm
      </button>
    </div>
  </div>
</div>
    );
};

export default ChangeRole;