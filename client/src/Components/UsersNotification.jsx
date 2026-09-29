import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetUsersNotificationQuery, useUpdateAllNotificationStatusMutation, useUpdateNotificationStatusMutation } from "../Features/ApiSlice";
import { useSelector } from "react-redux";
import { socket } from "../WebSocket";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
export const UsersNotification = ({state}) => {
  const [ChangeStatus]=useUpdateNotificationStatusMutation()
  const [ChangeAllStatus]=useUpdateAllNotificationStatusMutation()
  const navigate=useNavigate()
  const location=useLocation()
  const [Notifications, SetNotifications] = useState([]);
    const user = useSelector((state) => state.auth.user);
  const { data: AllNotifications } = useGetUsersNotificationQuery();
  //getlivenotification
  useEffect(() => {
    if (!user?._id) return;

    const handleConnect = () => {
      socket.emit("register_user", user._id);
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);

    socket.on("new_notification", (data) => {
      SetNotifications((prev) => [data, ...prev]);
    });
    if (AllNotifications) {
      SetNotifications(AllNotifications.getMyNotifications);
    }
    return () => {
      socket.off("connect", handleConnect);
      socket.off("new_notification");
    };
  }, [user?._id, AllNotifications,location.pathname]);
  const UpdateNotificationStatus=async(itemId)=>{
  try {
    const res=await ChangeStatus(itemId).unwrap()
    console.log(res)
  } catch (error) {
    
  }
  }
  const UpdateAllStatus=async()=>{
 try {
  const res=await ChangeAllStatus().unwrap()
  console.log(res)
 } catch (error) {
  
 }
  }
 const unRead = Notifications?.reduce((sum, item) => sum + (item?.status === 'unread' ? 1 : 0), 0);

  return (
    <div className={` ${!state && `w-full max-w-6xl mx-auto px-4 py-6`}`}>
        <div className="flex gap-2 justify-between py-1 border-b-1 border-t-1 border-[#b3afaf] items-center">
       {Notifications.length>0 &&(
        <>
         <h2 className="font-semibold">Unread ({unRead})</h2>
        <button className="uppercase font-semibold text-[#1b1a1a] hover:bg-[#f8f8fa] p-1" onClick={UpdateAllStatus}>Mark All Read</button>
        </>
       )}
        </div>
        {state? <div>
        {Notifications.length === 0 ? (
        <p className="text-center">No notifications available!</p>
      ) : (
       <div>
       {Notifications.slice(0, 10).map((item, index) => (
  <Link
    key={item._id || index}
    to={item?.data?.redirectUrl}
    className="flex gap-2 hover:bg-[#f1ecec] items-center max-h-30 p-2"
    onClick={()=>UpdateNotificationStatus(item._id)}
  >
    <img src={assets.main_logo} alt="" className="w-4 h-4" />
    <div className="flex-1">
      <p className="font-semibold">{item.message}</p>
      <h2 className="text-sm text-gray-400 flex gap-1">
         <span>{dayjs(item?.createdAt).fromNow()}</span>
        <span>•</span>
        <span>{item?.subject}</span>
      </h2>
    </div>
    {item.status === 'unread' && (
      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
    )}
  </Link>
))}
    <div className="w-full flex items-center justify-center py-2 bg-[#EAECF0] mt-2">
        {Notifications.length>3 &&<button className="uppercase font-semibold" onClick={()=>navigate('/usersNotification')}>See All Notification</button>}
    </div>
       </div>
      )}
    </div>:<div>
        {Notifications.length === 0 ? (
        <p className="text-center">No notifications available!</p>
      ) : (
        Notifications.map((item, index) => (
         <Link onClick={()=>UpdateNotificationStatus(item._id)}
    key={item._id || index}
    to={item?.data?.redirectUrl}
    className="flex gap-2 hover:bg-[#f1ecec] items-center max-h-30 p-2"
  >
    <img src={assets.main_logo} alt="" className="w-4 h-4" />
    <div className="flex-1">
      <p className="font-semibold">{item.message}</p>
     <h2 className="text-xs text-gray-400 flex gap-1">
        <span>{dayjs(item?.createdAt).fromNow()}</span>
        <span>•</span>
        <span>Full Stack Dev</span>
      </h2>
    </div>
    {item.status === 'unread' && (
      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
    )}
  </Link>
        ))
      )}
    </div>}
    </div>
  );
};
