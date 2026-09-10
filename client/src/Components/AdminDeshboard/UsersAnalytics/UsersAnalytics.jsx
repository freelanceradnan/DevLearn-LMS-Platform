import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useUsersAnalyticsQuery } from '../../../Features/ApiSlice';

export const UsersAnalytics = () => {
  const { data, isLoading } = useUsersAnalyticsQuery();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const rawArray = data?.analytics || (Array.isArray(data) ? data : []);

    if (rawArray.length > 0) {
      const filtered = rawArray.map((item) => ({
        month: item.month,
        count: item.count  
      }));
      setChartData(filtered);
    }
  }, [data]);

  if (isLoading) {
    return <p className="text-center py-10">Loading analytics...</p>;
  }

  return (
    <div className="w-full h-[450px] p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Users Analytics</h2>
        <p className="text-sm text-slate-400">Last 12 months analytics data</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1bd484" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1bd484" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <XAxis 
            dataKey="month" 
            tickLine={false} 
            axisLine={{ stroke: '#E2E8F0' }}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />

          <YAxis 
            allowDecimals={false} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />

          <Tooltip 
            cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }}
            contentStyle={{ 
              backgroundColor: '#1E293B', 
              border: 'none', 
              borderRadius: '8px',
              color: '#FFF',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
            }}
          />

          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#1bd484" 
            strokeWidth={3}
            fill="url(#userGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersAnalytics;