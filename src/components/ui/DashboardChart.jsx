import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 800, revenue: 3200 },
  { name: "Mar", users: 1200, revenue: 4500 },
  { name: "Apr", users: 1500, revenue: 5000 },
  { name: "May", users: 1800, revenue: 5400 },
  { name: "Jun", users: 2000, revenue: 6000 },
];

const DashboardChart = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mt-8">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-white mb-4">
        Monthly Users & Revenue
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
