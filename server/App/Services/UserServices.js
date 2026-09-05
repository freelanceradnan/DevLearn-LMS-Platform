import dotenv from  'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { User } from "../Models/Users.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';
import { redis } from '../Config/Redis.js';
import course from '../Models/Course.js';

export async function getMyInfo(userId) {
  const user = await redis.get(userId);
  const newUser = JSON.parse(user);
  return { success: true, info: newUser };
}
export async function updateMyInfo(name, email, userId) {
    const user=await User.findById(userId)
    if(email && user){
        const isEmailExists=await User.findOne({email})
        if(isEmailExists){
            throw new Error('email already exists!')
        }
        user.email=email
    }
    if(name && user){
     user.name=name
    }
    await user?.save()
    await redis.set(userId,JSON.stringify(user))
   return {
        success:true,
        user
    }
}
export async function updateMyPassword(userId,oldpassword,newpassword){

const user=await User.findById(userId)
if(user.password==='undefined'){
throw new Error('Invalid user password!')
}

const isMatchPassword = await bcrypt.compare(oldpassword, user.password);
if(!isMatchPassword){
  throw new Error('Old password is not match!')
}
const updatePass=await bcrypt.hash(newpassword,10)
user.password=updatePass
await user.save()
return {success:true}
}
export async function updateMyAvatar(userId, avatar) {
  const user = await User.findById(userId);

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (avatar) {
    // Delete existing avatar from Cloudinary if it exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Upload new image to Cloudinary
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: 'avatars-lms',
      width: 150,
      crop: 'scale',
    });

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await user.save();
  await redis.set(userId, JSON.stringify(user));

  return { success: true, user };
}
export async function getMyAllUsers(){
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return {success:true,users}
}
export async function getMyAllCourse(){
  const courses=await course.find().sort({createdAt:-1}).lean()
  return {success:true,courses}
}
export async function UpdateMyRole(id,role){
   const updatedUser = await User.findByIdAndUpdate(
  id,               
  { $set: { role } },   
  { new: true, runValidators: true } 
).select("-password");
   return {success:true}
}
export async function DeleteMyUser(id){
const isExistsUser=await User.findById(id)
if(!isExistsUser){
throw new Error("User not found!")
}
const user=await User.findByIdAndDelete(id)
const deleteRedis = await redis.del(id);
return {success:true}
}