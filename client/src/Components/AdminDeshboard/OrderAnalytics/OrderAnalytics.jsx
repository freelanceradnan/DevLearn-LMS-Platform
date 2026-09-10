import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useOrderAnalyticsQuery } from "../../../Features/ApiSlice";

export default function OrdersAnalytics() {
  const { data, isLoading, isError } = useOrderAnalyticsQuery();
  //dummy data
 const analyticsData = [
  { name: "Page A", count: 4000 },
  { name: "Page B", count: 3000 },
  { name: "Page C", count: 5000 },
  { name: "Page D", count: 1000 },
  { name: "Page E", count: 4000 },
  { name: "Page F", count: 800 },
  { name: "Page G", count: 200 },
];

  const chartData =
    data?.map((item) => ({
      name: item.month,
      count: item.count,
    })) || [];

  if (isLoading) return <div className="text-white p-6">Loading analytics...</div>;
  if (isError) return <div className="text-red-500 p-6">Failed to load analytics data.</div>;

  return (
    <div className="w-full h-[420px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Orders Analytics</h1>
        <p className="text-sm text-gray-400">Last 12 months analytics data</p>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              tickLine={false}
              dy={10}
            />
            <YAxis
              stroke="#6b7280"
              tickLine={false}
              domain={[0, 6000]}
              ticks={[0, 1500, 3000, 4500, 6000]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", borderColor: "#374151" }}
              itemStyle={{ color: "#38bdf8" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#38bdf8"
              fillOpacity={0.1}
              fill="#38bdf8"
              strokeWidth={2}
              dot={{ r: 4, fill: "#38bdf8", stroke: "#ffffff", strokeWidth: 1 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}