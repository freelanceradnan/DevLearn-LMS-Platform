import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useCourseAnalyticsQuery } from '../../../Features/ApiSlice';

const CoursesAnalytics = () => {
  const { data, isLoading } = useCourseAnalyticsQuery();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const rawArray = data?.analytics || (Array.isArray(data) ? data : []);

    if (rawArray.length > 0) {
      const formattedData = rawArray.map((item) => ({
        month: item.month,
        uv: item.count,
      }));
      setChartData(formattedData);
    }
  }, [data]);

  if (isLoading) {
    return <p className="text-center py-10">Loading analytics...</p>;
  }

  const maxVal = Math.max(...chartData.map((d) => d.uv), 1);

  return (
    <div className="w-full h-[420px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Course Analytics (Last 12 Months)</h2>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="month" 
            tickLine={false} 
            axisLine={{ stroke: '#E2E8F0' }}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          
          <YAxis 
            allowDecimals={false} 
            domain={[0, maxVal]}
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          
          <Tooltip 
            cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />
          
          <Bar 
            dataKey="uv" 
            minPointSize={8} 
            radius={[6, 6, 0, 0]}
            barSize={32} 
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.uv > 0 ? "#1BD484" : "#E2E8F0"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursesAnalytics;