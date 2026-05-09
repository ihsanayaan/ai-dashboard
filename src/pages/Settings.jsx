import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Switch from "../components/ui/Switch";
import { useTranslation } from 'react-i18next';
import { Bell, Moon, Sun, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Load from localStorage on mount
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem('notifications')!== 'false';
  });

  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply theme on mount + changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark? "dark" : "light");
  }, [dark]);

  // Save notification preference
  useEffect(() => {
    localStorage.setItem('notifications', notifications.toString());
  }, [notifications]);

  const handleSave = () => {
    toast.success(t('Settings saved successfully!'));
  };

  const settingsItems = [
    {
      id: 'notifications',
      icon: Bell,
      title: t('Enable Notifications'),
      description: t('Receive email and push notifications'),
      value: notifications,
      onChange: () => setNotifications(!notifications)
    },
    {
      id: 'darkMode',
      icon: dark? Moon : Sun,
      title: t('Dark Mode'),
      description: t('Switch between light and dark theme'),
      value: dark,
      onChange: () => setDark(!dark)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          {t('Settings')}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {t('Manage your preferences and account settings')}
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        {settingsItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: isRTL? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
              <Switch
                isOn={item.value}
                handleToggle={item.onChange}
                label={item.title}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/30"
        >
          <Save size={20} />
          {t('Save Changes')}
        </button>
      </div>
    </motion.div>
  );
};

export default Settings;