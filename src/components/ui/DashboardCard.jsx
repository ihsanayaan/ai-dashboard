import { motion } from "framer-motion";

const DashboardCard = ({ icon: Icon, title, value, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-6 flex items-center gap-4"
    >
      <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-full">
        <Icon className="w-6 h-6 text-zinc-800 dark:text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
