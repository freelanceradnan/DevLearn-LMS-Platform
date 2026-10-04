
import { Mentors } from "../Models/Mentors.js"

export const CreateMentorService=async(payload)=>{
    const addMentors=await Mentors.create(payload)
   
    if(!addMentors){
    throw new Error("Failed to added mentors!")
    }
    return {success:true}
}
export const GetMentorService=async()=>{
const data=await Mentors.find({}).lean()
return {success:true,data}
}
export const UpdateMentorService=async(mentorId,data)=>{
const isExists=await Mentors.findById(mentorId)
if(!isExists){
throw new Error("Mentors not found!")
}
const updatedMentors=await Mentors.findByIdAndUpdate(mentorId,{
    $set:{data}
})
if(!updatedMentors){
    throw new Error("Updated Mentors Failed")
}
return{
    success:true
}
}

export const DeleteMentorService=async(mentorId)=>{
const deleteMentors=await Mentors.findByIdAndDelete(mentorId)
if(!deleteMentors){
    throw new Error("delete mentors failed!")
}
return {success:true}
}
