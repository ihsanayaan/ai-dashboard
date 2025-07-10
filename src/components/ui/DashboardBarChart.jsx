import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 800 },
  { name: "Mar", sales: 600 },
  { name: "Apr", sales: 1200 },
  { name: "May", sales: 1400 },
  { name: "Jun", sales: 1600 },
];

const DashboardBarChart = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mt-8">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-white mb-4">
        Monthly Sales (Bar Chart)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="sales" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;
