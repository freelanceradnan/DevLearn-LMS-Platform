import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  PlusSquare,
  Video,
  Image,
  HelpCircle,
  Grid,
  UserCheck,
  BarChart2,
  TrendingUp,
  PieChart,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const menuGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard },
        { label: 'Users', icon: Users },
        { label: 'Invoices', icon: FileText },
      ],
    },
    {
      group: 'Content',
      items: [
        { label: 'Create Course', icon: PlusSquare },
        { label: 'Live Courses', icon: Video },
        { label: 'Hero', icon: Image },
        { label: 'FAQ', icon: HelpCircle },
        { label: 'Categories', icon: Grid },
      ],
    },
    {
      group: 'Management',
      items: [
        { label: 'Manage Team', icon: UserCheck },
      ],
    },
    {
      group: 'Analytics',
      items: [
        { label: 'Courses Analytics', icon: BarChart2 },
        { label: 'Orders Analytics', icon: TrendingUp },
        { label: 'Users Analytics', icon: PieChart },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-[#FFFFFF] text-zinc-300 flex flex-col fixed top-0 left-0 border-r border-[#CBD0DD] z-20">
      {/* Header */}
      <div className="h-15 flex items-center px-6 border-b border-[#CBD0DD] font-bold text-lg tracking-wider text-black">
        Admin Panel
      </div>

      <nav 
        className="flex-1 overflow-y-auto px-4 py-4 space-y-6 
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-transparent
          hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <p className="px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
              {group.group}
            </p>
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <li key={itemIdx}>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#EFF2F6] hover:text-[#EFF2F6] transition-colors"
                    >
                      <Icon size={18} className="text-[#2d2d35] group-hover:text-white" />
                      <span className='text-[#565663] text-xs'>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-zinc-300">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}