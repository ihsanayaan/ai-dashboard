import { motion } from "framer-motion";
import { Home, Settings, Users, DollarSign } from "lucide-react"; // ✅ Use correct icon
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-800 shadow-lg z-50"
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-zinc-800 dark:text-white">Menu</h2>
        <button onClick={() => setIsOpen(false)} className="text-black dark:text-white">✖</button>
      </div>
      <ul className="space-y-4 px-6 mt-4">
        <li>
          <Link to="/" className="flex items-center gap-2 text-zinc-700 dark:text-white">
            <Home size={20} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/users" className="flex items-center gap-2 text-zinc-700 dark:text-white">
            <Users size={20} /> Users
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center gap-2 text-zinc-700 dark:text-white">
            <Settings size={20} /> Settings
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="flex items-center gap-2 text-zinc-700 dark:text-white">
            <DollarSign size={20} /> Pricing
          </Link>
        </li>
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
