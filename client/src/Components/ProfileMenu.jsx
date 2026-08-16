import { Bell, CreditCard, Heart, LogOut, MessageSquareHeart, Settings, ShieldX, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Features/AuthSlice';
const ProfileMenu = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [ActiveMenu,setActiveMenu]=useState()
  const ProfileMenuOptions=[
    {name:"Profile Info",link:'/profile/info',icon:<User size={16}/>},
    {name:"User Security",link:'/profile/security',icon:<Settings size={16}/>},
    {name:"Notification Management",link:'/profile/notification',icon:<Bell size={16}/>},
    {name:"Close Account",link:'/profile/closeaccount',icon:<ShieldX size={16}/>}
  ]
   const logout = async () => {
      try {
        const result = await logoutuser().unwrap();
        toast.success("logout success!");
      } catch (error) {
        toast.error("logout failed!");
      } finally {
        dispatch(logoutUser());
        dispatch(ApiSlice.util.resetApiState());
        
      }
    };
    return (
        <div>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Your Account
                </h2>

                {/*Alerts */}
                <div>
                  {/* <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Alerts
                  </p> */}
                  <div className="space-y-1 flex flex-col items-start">
                    {ProfileMenuOptions.map((item,index)=>{
                      const isActive=item.name===ActiveMenu;
                      return (<Link className={`w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 ${isActive?"text-purple-700 bg-purple-200":""} rounded-md transition-colors` }key={index} onClick={()=>setActiveMenu(item.name)} to={item.link}>
                        <span >{item.icon}</span>
                        {item.name}
                      </Link>)
                    }
                      
                    )}
                    <button className='w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors' onClick={()=>logout()}><LogOut size={16}/>Logout</button>
                    {/* <button className="" onClick={()=>navigate('/profile/info')}>
                      <User size={16} /> Profile Info
                    </button>
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors" onClick={()=>navigate('/profile/security')}>
                      <Settings  size={16} /> User Security
                    </button>
                   
                    <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors"onclick>
                      <Bell size={16} /> Notification Management
                    </button>
                     <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <ShieldX size={16} /> 
                      Close Account
                    </button>
                     <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md transition-colors">
                      <LogOut size={16} /> 
                      Logout
                    </button> */}
                  </div>
                </div>

              
               
        </div>
    );
};

export default ProfileMenu;