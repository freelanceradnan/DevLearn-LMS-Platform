import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', visits: 4200, sales: 1200 },
  { month: 'Feb', visits: 3800, sales: 1450 },
  { month: 'Mar', visits: 5100, sales: 2100 },
  { month: 'Apr', visits: 4600, sales: 1900 },
  { month: 'May', visits: 5900, sales: 2500 },
  { month: 'Jun', visits: 7200, sales: 3100 },
  { month: 'Jan', visits: 4200, sales: 1200 },
  { month: 'Feb', visits: 3800, sales: 1450 },
  { month: 'Mar', visits: 5100, sales: 2100 },
  { month: 'Apr', visits: 4600, sales: 1900 },
  { month: 'May', visits: 5900, sales: 2500 },
  { month: 'Jun', visits: 7200, sales: 3100 }
];

const OverviewChart = () => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      className='bg-[#FDFDFD] '
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="visits" name="Platform Visits" fill="#1BD484"/>
      <Bar dataKey="sales" name="Course Sales" fill="#a6a6c4" />
    </BarChart>
  );
};

export default OverviewChart;