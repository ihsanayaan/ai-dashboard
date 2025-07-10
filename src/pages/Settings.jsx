import { useState } from "react";
import { motion } from "framer-motion";
import Switch from "../components/ui/Switch";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [dark, setDark] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold text-heading mb-4">Settings</h1>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
          <Switch isOn={notifications} handleToggle={() => setNotifications(!notifications)} />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <Switch
            isOn={dark}
            handleToggle={() => {
              setDark(!dark);
              document.documentElement.classList.toggle("dark", !dark);
              localStorage.setItem("theme", !dark ? "dark" : "light");
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
