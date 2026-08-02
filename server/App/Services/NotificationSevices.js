import Notification from "../Models/Notification.js";
import nodeCron from "node-cron";
export async function getMyNotifications(){
const notifications=await Notification.find().sort({createAt:-1})
return {success:true,notifications}
}
export async function updateMyNotificationStatus(notificationId){
const notification=await Notification.findById(notificationId)
console.log(notificationId)
if(!notification){
throw new Error("Notifications not found!")
}else{
    notification.status?(notification.status="read"):notification?.status
}
await notification.save()
const notifications=await Notification.find().sort({createAt:-1})
return {success:true,notifications}
}
//delete auto notifications 30 days unread
nodeCron.schedule('0 0 * * *', async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const result = await Notification.deleteMany({
      status: 'read',
      createdAt: { $lt: thirtyDaysAgo }
    });

    console.log(`[Cron] Cleanup complete: Deleted ${result.deletedCount} old notifications.`);
  } catch (error) {
    console.error('[Cron Error] Failed to delete old notifications:', error);
  }
}, {
  scheduled: true,
  timezone: "Asia/Dhaka"
});