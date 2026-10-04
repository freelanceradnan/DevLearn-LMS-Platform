import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteMentorMutation, useGetMentorQuery } from "../../../Features/ApiSlice";
import toast from "react-hot-toast";

const Mentors = () => {
const navigate=useNavigate()
const {data:AllMentors,isLoading}=useGetMentorQuery()
const [deleteMentor]=useDeleteMentorMutation()
if(isLoading){
  return <div>Loading Now...</div>
}
const deleteHandler=async(id)=>{
try {
  if(!id){
  return toast.error("delete id missing!")
  }
  const result=await deleteMentor(id).unwrap()
  console.log(result)
} catch (error) {
  
}
}
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Mentors
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"></span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Management All Mentors Profile From Here
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-50 active:scale-95 cursor-pointer" onClick={()=>navigate('/admin/mentors/addMentor')}>
        <Plus/>
        Add Mentors
        </button>
      </div>
      <div className="py-2">

         <table className="w-[100%]">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>CategoryId</th>
            <th>Students</th>
            <th>Courses</th>
            <th>Btn</th>
          </tr>
        </thead>
        <tbody>
 {AllMentors?.data?.map((item,index)=>(
      <tr key={index} className="">
       <td><img src={item.avatar.url} alt="" className="w-20"/></td>
       <td>{item.name}</td>
       <td>{item.category}</td>
       <td>{item.students}</td>
       <td>{item.courses}</td>
       <td className="flex gap-2">
        <button className="bg-blue-500">Edit</button>
        <button className="bg-red-500" onClick={()=>deleteHandler(item._id)}>Delete</button>
       </td>
      </tr>
    ))}
        </tbody>
      </table>
   
      </div>
    </div>
  );
};

export default Mentors;
