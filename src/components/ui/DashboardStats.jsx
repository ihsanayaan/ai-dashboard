import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,204",
    icon: Users,
    change: "+12%",
    isUp: true,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200",
  },
  {
    title: "Revenue",
    value: "$12,345",
    icon: DollarSign,
    change: "-5%",
    isUp: false,
    color: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200",
  },
  {
    title: "Growth",
    value: "97%",
    icon: TrendingUp,
    change: "+9%",
    isUp: true,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white dark:bg-zinc-800 rounded-xl shadow p-5 flex items-center gap-4"
        >
          <div className={`p-3 rounded-full ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <h4 className="text-sm text-zinc-500 dark:text-zinc-300">{stat.title}</h4>
            <p className="text-xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
            <div className="flex items-center text-sm mt-1">
              {stat.isUp ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span className={stat.isUp ? "text-green-500" : "text-red-500"}>
                {stat.change} this month
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
