import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Free", value: 30 },
  { name: "Pro", value: 50 },
  { name: "Enterprise", value: 20 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const DashboardPieChart = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mt-8">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-white mb-4">
        Plan Distribution (Pie Chart)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPieChart;
