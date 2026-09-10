import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Save, FolderPlus, Tag } from "lucide-react";
import { useGetAllCategoryQuery, useUpdateCategoryMutation } from "../../../Features/ApiSlice";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState("");
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const {data}=useGetAllCategoryQuery()


//getting all categroies
  useEffect(()=>{
  if(data){
    setCategories(data[0].categories)
  }
  },[data])
  const AddCategories = (e) => {
    e.preventDefault();
    if (item.trim() === "") {
      return toast.error("Please enter a category name!");
    }
    setCategories((prev) => [...prev, { name: item.trim() }]);
    setItem("");
    toast.success("Category added to list");
  };

  const deleteHandler = (delIndex) => {
    const filteredItems = categories.filter((_, index) => index !== delIndex);
    setCategories(filteredItems);
    toast.success("Category removed");
  };

  const UpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await updateCategory(categories ).unwrap();
      if (result?.success) {
        toast.success(result.message || "Categories updated successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update categories");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Category Manager
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {categories.length} Items
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Organize and manage your product or post categories smoothly.
          </p>
        </div>

        <button
          type="button"
          onClick={UpdateCategory}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-50 active:scale-95 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>


      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" /> Active Categories
          </h3>
          
          {categories.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <FolderPlus className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">No categories added yet. Add one below!</p>
            </div>
          ) : (
            <div className="grid gap-2.5 sm:grid-cols-2">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 transition-all hover:border-indigo-200 hover:bg-indigo-50/30"
                >
                  <span className="font-medium text-slate-700 text-sm truncate">
                    {cat.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteHandler(index)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <form onSubmit={AddCategories} className="mt-6 border-t pt-6 border-slate-100">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Add New Category
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={item}
              placeholder="e.g. Electronics, Clothing..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              onChange={(e) => setItem(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categories;