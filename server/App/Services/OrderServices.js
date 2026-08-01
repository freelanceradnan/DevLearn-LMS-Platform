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

const fullUserData=await User.findById(user._id)

if(!user){
throw new Error("User not found!")
}

const hasCourse = fullUserData?.Courses?.some(
  (course) => course?._id?.toString() === course_id
) ?? false;
if(hasCourse){
    throw new Error("Your are already purchase this course!")
}
const fullCourse=await course.findById(course_id)
if(!fullCourse){
throw new Error("Course is not available at this moments!")
}
const data={
    courseId:fullCourse._id,
    user_id:user._id
}

const createOrder=await Orders.create(data)

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

 const html = await ejs.renderFile(
      path.join(__dirname, "../Utils/Order-Notify.ejs"),
      {order:mailData},
    );
try {
if (user?.email) {
    await sendMail({
      email: user.email,
      subject: 'Order Confirmation!',
      html
    });
  }
} catch (error) {
    throw new Error(error.message)
}

fullUserData.Courses.push(course_id)

await fullUserData.save()
//notifications for admin
const notification=await Notification.create({
    user_id:user._id,
    title:"New Order",
    message:`Your have a new Order from ${course.name}`
})
return {success:true,createOrder}
}