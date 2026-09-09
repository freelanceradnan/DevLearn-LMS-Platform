import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, HelpCircle, Save, Sparkles } from "lucide-react";

const Categories = () => {
const [categories,setCategories]=useState([])
const [item,setItem]=useState("")

const AddCategories=(e)=>{
e.preventDefault()
if(item.trim()==""){
return alert('failed to added!')
}
setCategories((prev)=>[...prev,{name:item}])
}
console.log(categories)
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              FAQ Manager
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
             
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage your store's frequently asked questions and public support responses.
          </p>
        </div>

      
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {/* {isUpdating ? "Saving..." : "Save Changes"} */}
        </button>
      </div>

      <div className="grid gap-8">
      <div>
        <form action="" onSubmit={AddCategories}>
        <div className="flex gap-2">
         <input type="text" name="" id="" className="border" onChange={(e)=>setItem(e.target.value)}/>
         <button className="bg-blue-500 flex px-2 py-1 text-white" type="submit"><Plus/>Add Item</button>
        </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Categories;