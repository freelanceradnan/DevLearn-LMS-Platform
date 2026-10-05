import { Plus, Trash2, Edit3 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteMentorMutation, useGetMentorQuery } from "../../../Features/ApiSlice";
import toast from "react-hot-toast";

const Mentors = () => {
  const navigate = useNavigate();
  const { data: AllMentors, isLoading } = useGetMentorQuery();
  const [deleteMentor] = useDeleteMentorMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const deleteHandler = async (id) => {
    try {
      if (!id) {
        return toast.error("Delete ID is missing!");
      }
      await deleteMentor(id).unwrap();
      toast.success("Mentor deleted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete mentor");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Mentors
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {AllMentors?.data?.length || 0} Total
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage all mentors profile information from here.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-50 active:scale-95 cursor-pointer"
          onClick={() => navigate('/admin/mentors/addMentor')}
        >
          <Plus className="w-4 h-4" />
          Add Mentors
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Category ID</th>
                <th className="py-4 px-6">Students</th>
                <th className="py-4 px-6">Courses</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {AllMentors?.data?.length > 0 ? (
                AllMentors.data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <img
                        src={item.avatar?.url || "https://via.placeholder.com/150"}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-mono text-xs">
                      {item.category}
                    </td>
                    <td className="py-4 px-6">{item.students}</td>
                    <td className="py-4 px-6">{item.courses}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="inline-flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          onClick={() => navigate(`/admin/mentors/${item._id}`)}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          onClick={() => deleteHandler(item._id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    No mentors found. Click "Add Mentors" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mentors;