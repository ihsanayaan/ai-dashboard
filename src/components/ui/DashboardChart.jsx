import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useTranslation } from 'react-i18next';

const DashboardChart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Data translate karo
  const data = [
    { name: t('Jan'), users: 400, revenue: 2400 },
    { name: t('Feb'), users: 800, revenue: 3200 },
    { name: t('Mar'), users: 1200, revenue: 4500 },
    { name: t('Apr'), users: 1500, revenue: 5000 },
    { name: t('May'), users: 1800, revenue: 5400 },
    { name: t('Jun'), users: 2000, revenue: 6000 },
  ];

  // RTL mein data ulta kar do
  const chartData = isRTL ? [...data].reverse() : data;

  // Arabic numbers format
  const formatNumber = (value) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(value);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mt-8">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-white mb-4">
        {t('Monthly Users & Revenue')}
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isRTL ? "#444" : "#ccc"}
            horizontal={true}
            vertical={false}
          />
          
          {/* XAxis RTL flip */}
          <XAxis 
            dataKey="name" 
            stroke="#888"
            reversed={isRTL}
            tick={{ fill: '#888', fontSize: 12 }}
          />
          
          {/* YAxis RTL mein right side */}
          <YAxis 
            stroke="#888"
            orientation={isRTL ? "right" : "left"}
            tickFormatter={formatNumber}
            tick={{ fill: '#888', fontSize: 12 }}
          />
          
         {/* Tooltip Arabic + Fixed Label Color */}
<Tooltip 
  formatter={(value, name) => [
    formatNumber(value), 
    name === 'users' ? t('Users') : t('Revenue')
  ]}
  labelStyle={{ 
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    fontWeight: 'bold',
    fontSize: '14px'
  }}
  contentStyle={{ 
    backgroundColor: document.documentElement.classList.contains('dark') ? '#27272a' : '#fff',
    border: document.documentElement.classList.contains('dark') ? '1px solid #3f3f46' : '1px solid #e5e7eb',
    borderRadius: '8px',
    textAlign: isRTL ? 'right' : 'left',
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif'
  }}
  itemStyle={{
    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
  }}
/>

          {/* Legend add kiya - Professional lagta hai */}
          <Legend 
            align={isRTL ? 'right' : 'left'}
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: '20px' }}
            formatter={(value) => value === 'users' ? t('Users') : t('Revenue')}
          />
          
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6 }}
            name="users"
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#22c55e" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#22c55e' }}
            activeDot={{ r: 6 }}
            name="revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;