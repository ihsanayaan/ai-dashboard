import { motion, AnimatePresence } from "framer-motion";
import { Home, Settings, Users, DollarSign, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const menuItems = [
    { to: "/", icon: <Home size={20} />, label: t('Dashboard') },
    { to: "/users", icon: <Users size={20} />, label: t('Users') },
    { to: "/settings", icon: <Settings size={20} />, label: t('Settings') },
    { to: "/pricing", icon: <DollarSign size={20} />, label: t('Pricing') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Sidebar - RTL aware */}
          <motion.aside
            initial={{ x: isRTL ? 300 : -300 }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? 300 : -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 h-full w-64 bg-white dark:bg-zinc-800 shadow-lg z-50 
              ${isRTL ? 'right-0' : 'left-0'}`}
          >
            <div className="p-4 flex justify-between items-center border-b dark:border-zinc-700">
              <h2 className="text-lg font-bold text-zinc-800 dark:text-white">
                {t('Menu')}
              </h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <ul className="space-y-2 px-4 mt-4">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {item.icon} 
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;