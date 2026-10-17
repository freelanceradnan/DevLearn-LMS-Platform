import React, { useEffect, useState } from 'react';
import { socket } from '../../../WebSocket';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useGetAdminNotificationQuery, useUpdateAdminNotificationMutation } from '../../../Features/ApiSlice';
import { assets } from '../../../assets/assets';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

dayjs.extend(relativeTime);

const AdminNotifications = () => {
    const [Notifications, setNotifications] = useState([]);
   
    const [updateStatus] = useUpdateAdminNotificationMutation();
    const { data: AllNotification, isLoading } = useGetAdminNotificationQuery();
    const { admin: user } = useSelector((state) => state.admin);

    useEffect(() => {
        if (!user?._id) return;
        const handleConnect = () => {
            socket.emit("register_user", user._id);
            if (user.role === "admin") {
                socket.emit("join_admin_room");
            }
        };
        if (socket.connected) {
            handleConnect();
        }
        socket.on("connect", handleConnect);
        
        socket.on("new_notification", (data) => {
            setNotifications((prev) => [data, ...(prev || [])]);
        });

        if (AllNotification) {
            setNotifications(AllNotification);
        }

        return () => {
            socket.off('connect', handleConnect);
            socket.off('new_notification');
        };
    }, [user?._id, AllNotification]);

    const updateNotifications = async (id) => {
        try {
            await updateStatus({ notificationId: id }).unwrap();
            // লোকাল স্টেটে স্ট্যাটাস আপডেট করে ইউআই ইন্সট্যান্ট পরিবর্তন করার জন্য
            setNotifications((prev) =>
                prev.map((notif) => (notif._id === id ? { ...notif, status: 'read' } : notif))
            );
        } catch (error) {
            toast.error("Failed to update notification status");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold text-gray-800">Admin Notifications</h1>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Total: {Notifications.length}
                </span>
            </div>

            <div className="flex flex-col gap-1">
                {Notifications.length > 0 ? (
                    Notifications.map((item) => {
                        const isUnread = item.status === 'unread';

                        return (
                            <Link
                                key={item._id}
                                to={item?.data?.redirectUrl || "#"}
                                onClick={() => isUnread && updateNotifications(item._id)}
                                className={`flex items-start justify-between p-2 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                                    isUnread 
                                        ? 'bg-blue-50/70 border-blue-200' 
                                        : 'bg-white border-gray-100 hover:bg-gray-50/50'
                                }`}
                            >
                                <div className="flex items-start gap-1">
                                
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 shrink-0">
                                        <img src={assets.main_logo} alt="logo" className="h-6 w-6 object-contain" />
                                    </div>

                                   
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className={`text-sm font-semibold ${isUnread ? 'text-gray-900 font-bold' : 'text-gray-800'}`}>
                                                {item.title}
                                            </h2>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {item.message}
                                        </p>
                                        <span className="text-[11px] text-gray-400 font-medium mt-1">
                                            {dayjs(item?.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </div>

                                
                                {isUnread && (
                                    <div className="flex items-center h-full pt-2">
                                        <span className="h-2.5 w-2.5 bg-blue-600 rounded-full animate-pulse shadow-sm"></span>
                                    </div>
                                )}
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 font-medium">No notification found!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNotifications;