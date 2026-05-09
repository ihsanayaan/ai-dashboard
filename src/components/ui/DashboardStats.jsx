import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DashboardStats = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Number formatter
  const formatNumber = (num) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(num);
  };

  // Stats array ab function ke andar - taake t() use ho sake
  const stats = [
    {
      title: t('Total Users'),
      value: formatNumber(1204),
      icon: Users,
      change: formatNumber(12),
      isUp: true,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200",
    },
    {
      title: t('Revenue'),
      value: `${isRTL ? '﷼' : '$'} ${formatNumber(12345)}`,
      icon: DollarSign,
      change: formatNumber(5),
      isUp: false,
      color: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200",
    },
    {
      title: t('Growth'),
      value: `${formatNumber(97)}%`,
      icon: TrendingUp,
      change: formatNumber(9),
      isUp: true,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-zinc-800 rounded-xl shadow-md hover:shadow-xl p-5 flex items-center gap-4 transition-all"
        >
          <div className={`p-3 rounded-xl ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
              {stat.title}
            </h4>
            
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {stat.value}
            </p>
            
            <div className="flex items-center text-sm mt-2">
              {stat.isUp ? (
                <TrendingUp 
                  size={16} 
                  className="text-green-500 ltr:mr-1 rtl:ml-1" 
                />
              ) : (
                <TrendingDown 
                  size={16} 
                  className="text-red-500 ltr:mr-1 rtl:ml-1" 
                />
              )}
              <span className={stat.isUp ? "text-green-500" : "text-red-500"}>
                {stat.isUp ? '+' : '-'}{stat.change}% {t('this month')}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;