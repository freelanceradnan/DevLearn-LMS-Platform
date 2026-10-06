import React, { useEffect, useState } from "react";
import {
    useGetAllPolicyQuery,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useUpdatePolicyMutation,
} from "../../../Features/ApiSlice";
import { toast } from "react-hot-toast";
import { Plus, Trash2, HelpCircle, Save, Sparkles } from "lucide-react";

const Policy = () => {
  const [policyData, setPolicyData] = useState([]);
//   const data=[]
//   const uploadFaq=[]
//   const isLoading=false
//   const isUpdating=false
  const { data, isLoading } = useGetAllPolicyQuery();
  const [updatePolicy, { isLoading: isUpdating }] = useUpdatePolicyMutation();

  const [policyItem, setPolicyItem] = useState({ title: "", description: "" });

  useEffect(() => {
    if (data && data[0]?.policySection) {
      setPolicyData(data[0].policySection);
    }
  }, [data]);
  console.log(data)

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setPolicyItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewItem = (e) => {
    e.preventDefault();
    if (!policyItem.title.trim() || !policyItem.description.trim()) {
      return toast.error("Please fill in both title and description");
    }

    setPolicyData((prev) => [...prev, policyItem]);
    setPolicyItem({ title: "", description: "" });
    toast.success("Item added to draft!");
  };

  const deleteHandler = (delIndex) => {
    const newItem = policyData.filter((_, index) => index !== delIndex);
    setPolicyData(newItem);
  };

  const updateFaq = async () => {
    try {
      await updatePolicy(policyData).unwrap();
      toast.success("FAQ updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update FAQ");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Policy Manager
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700"></span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage your softwares policy for how audience will management your website
          </p>
        </div>

        <button
          type="button"
          disabled={isUpdating}
          onClick={updateFaq}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">
              {/* Active Policy ({faqData.length}) */}
            </h3>
          </div>

          {policyData.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-12 text-center">
              <div className="rounded-full bg-slate-50 p-3 text-slate-400">
                <HelpCircle className="h-6 w-6" />
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600">
                No questions added yet
              </p>
              <p className="text-xs text-slate-400">
                Fill out the form below to add your first FAQ.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {policyData?.map((item, index) => (
                <div
                  key={item._id || index}
                  className="group relative flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/30"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      P{index + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteHandler(index)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    title="Delete question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h3 className="mb-4 text-base font-semibold text-slate-900">
            Add New Policy 
          </h3>
          <form onSubmit={addNewItem} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={policyItem.title}
                onChange={ChangeHandler}
                placeholder="e.g. What is your return policy?"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Description
              </label>
              <textarea
                rows={3}
                name="description"
                value={policyItem.description}
                onChange={ChangeHandler}
                placeholder="e.g. We offer a 30-day no-questions-asked refund policy..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Policy;