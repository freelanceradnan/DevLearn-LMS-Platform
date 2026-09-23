import course from "../Models/Course.js";
import { User } from "../Models/Users.js";
import sendMail from "../Utils/EmailSent.js";
import Notification from "../Models/Notification.js";
import Orders from "../Models/Orders.js";
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function CreateMyOrder(user,course_id,payment_info){

const fullUserData = await User.findById(user?._id);

if (!fullUserData) {
    throw new Error("User not found!");
  }

const hasCourse = fullUserData?.Courses?.some(
    (course) => course?._id?.toString() === course_id
  ) ?? false;
if (hasCourse) {
    throw new Error("You have already purchased this course!");
  }
const fullCourse = await course.findById(course_id);
if (!fullCourse) {
    throw new Error("Course is not available at this moment!");
  }
const data = {
    courseId: fullCourse._id,
    user_id: user._id,
    paymentInfo: payment_info 
  };

const createOrder = await Orders.create(data);
fullCourse.purchased = (fullCourse.purchased || 0) + 1;
await fullCourse.save();
const mailData = {
    _id: fullCourse?._id?.toString().slice(0, 6) ?? 'N/A',
    name: fullCourse?.name ?? 'Course Item',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    price: fullCourse?.price ?? 0
  };

 try {
    const html = await ejs.renderFile(
      path.join(__dirname, "../Utils/Order-Notify.ejs"),
      { order: mailData }
    );

    if (user?.email) {
      await sendMail({
        email: user.email,
        subject: 'Order Confirmation!',
        html
      });
    }
  } catch (error) {
    console.error("Email sending failed:", error.message);
    
  }

fullUserData.Courses.push(course_id);

await fullUserData.save();

await Notification.create({
    user_id: user._id,
    title: "New Order",
    message: `You have a new order for ${fullCourse.name}`
  });
return { success: true, createOrder };
}
export async function GetMyOrder(userid){
  const allUserOrders=await Orders.find({user_id:userid})

  if(allUserOrders){
  return allUserOrders
  }
}