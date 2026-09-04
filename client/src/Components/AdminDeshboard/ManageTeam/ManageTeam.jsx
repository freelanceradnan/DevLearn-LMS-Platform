import { Pencil, Trash2, TriangleAlert, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useGetAllUsersQuery } from '../../../Features/ApiSlice';
import ChangeRole from '../../ChangeRole';

const ManageTeam = () => {
    const {data,isError,isLoading}=useGetAllUsersQuery()
    const [totalData,setTotalData]=useState([])
    const [loading,setLoading]=useState(true)
     const [editModal,setEditModal]=useState(false)
      const [editRole,setEditRole]=useState("")
      const [editId,setEditId]=useState("")
    useEffect(()=>{
    setTotalData(data?.filter((c)=>c.role==='admin'))
    setLoading(false)
    },[data])
     if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
             <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
          <p className="text-sm text-gray-500 flex gap-1 items-center">
           <TriangleAlert size={16} className='text-red-300'/> Manage all the team from here
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          Total: {totalData?.length || 0}
        </span>
      </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
         <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      <th className="px-6 py-4">Users Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Created At</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {totalData?.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="transition-colors hover:bg-gray-50/80"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                              <Users className="h-5 w-5" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-amber-500 font-medium">
                          
                            <span>{item.email || "N/A"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-700">
                         {item.role||"user"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                         
                              {new Date(item.createdAt).toLocaleDateString() ||
                            item.createdAt}
                          </span>
                        </td>
                       
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                                                  aria-label="Edit course"
                                                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition-colors" onClick={()=>{
                                                    setEditModal(true);
                                                    setEditRole(item?.role)
                                                    setEditId(item?._id)
                                                  }}
                                                >
                                                  <Pencil className="h-4 w-4" />
                                                </button>
                            <button
                              aria-label="Delete course"
                              className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        </div>
        {editModal && <ChangeRole editModal={editModal} setEditModal={setEditModal} role={editRole} editId={editId}/>}
        </div>
    );
};

export default ManageTeam;