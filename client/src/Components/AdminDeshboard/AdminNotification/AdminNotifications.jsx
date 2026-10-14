import React, { useEffect, useState } from 'react';
import { socket } from '../../../WebSocket';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)
const AdminNotifications = () => {
    const [Notifications,setNotifications]=useState([])
    const {admin:user}=useSelector((state)=>state.admin)
useEffect(()=>{
    if(!user?._id) return;
    const handleConnect=()=>{
    socket.emit("register_user",user._id)
    if (user.role === "admin") {
        socket.emit("join_admin_room");
      }
    }
    if(socket.connected){
        handleConnect()
    }
    socket.on("connect",handleConnect)
    
    socket.on("new_notification",(data)=>{
    setNotifications((prev)=>[data,...(prev||[])])
    })

return ()=>{
    socket.off('connect',handleConnect)
    socket.off('new_notification') 
}
    },[user?._id,location.pathname])
    
    return (
        <div>
            <h2>Admin Notifications</h2>
            <div className='py-2 max-w-7xl mx-auto flex flex-col gap-2'>
{Notifications.map((item)=>(
    <div key={item._id} className='bg-blue-100'>
     <h2>{item.title}</h2>
     <p>{item.message}</p>
      <span>{dayjs(item?.createdAt).fromNow()}</span>
    </div>
))}
            </div>
        </div>
    );
};

export default AdminNotifications;