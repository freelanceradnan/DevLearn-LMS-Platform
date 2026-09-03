import React from 'react';
import { LogOut, X } from 'lucide-react';
import { logoutUser } from '../Features/AuthSlice';
import { useLogoutUserMutation } from '../Features/ApiSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';



export const LogoutModal  = ({OpenLogoutModel,setOpenLogoutModel }) => {
  const dispatch=useDispatch()
  const [logoutuser] = useLogoutUserMutation();
//   if (!isOpen) return null;
 const Logout = async () => {
    try {
      const result = await logoutuser().unwrap();
      if (result) {
       dispatch(logoutUser());
      toast.success('logout done');
      setOpenLogoutModel(false)
      }
     
    } catch (error) {
      toast.error('Logout failed');
      setOpenLogoutModel(false)
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={()=>setOpenLogoutModel(false)}>
     
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all" onClick={(e)=>e.stopPropagation()}>
        
        
        <div className="relative w-full h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-600 dark:text-red-400">
              <LogOut className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Confirm Logout
            </h1>
          </div>
          
          <button 
             onClick={()=>setOpenLogoutModel(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

     
        <div className="p-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Are you sure you want to log out? You will need to re-enter your credentials to access your account again.
          </p>
        </div>

    
        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <button
            onClick={()=>setOpenLogoutModel(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={Logout}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};