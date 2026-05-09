import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const DashboardCard = ({ icon: Icon, title, value, delay = 0, prefix = "", suffix = "" }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Number/Currency formatting Arabic ke liye
  const formatValue = (val) => {
    // Agar number hai to format karo
    if (typeof val === 'number') {
      return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(val);
    }
    // Agar already string hai to direct return
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-lg p-6 flex items-center gap-4 transition-shadow"
    >
      {/* Icon - RTL mein auto flip ho jayega flex se */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {t(title)}
        </p>
        
        {/* Value with prefix/suffix support */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {prefix && <span className="ltr:mr-1 rtl:ml-1 text-lg">{prefix}</span>}
          {formatValue(value)}
          {suffix && <span className="ltr:ml-1 rtl:mr-1 text-lg text-gray-500">{suffix}</span>}
        </h3>
      </div>
    </motion.div>
  );
};

export default DashboardCard;