import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from 'react-i18next';

const DashboardBarChart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Data bhi translate karna padega
  const data = [
    { name: t('Jan'), sales: 400 },
    { name: t('Feb'), sales: 800 },
    { name: t('Mar'), sales: 600 },
    { name: t('Apr'), sales: 1200 },
    { name: t('May'), sales: 1400 },
    { name: t('Jun'), sales: 1600 },
  ];

  // RTL mein data reverse karna padega
  const chartData = isRTL ? [...data].reverse() : data;

  // Arabic number formatting
  const formatNumber = (value) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(value);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mt-8">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-white mb-4">
        {t('Monthly Sales (Bar Chart)')}
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={chartData}
          // RTL ke liye ye 2 props important hain
          layout="horizontal"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isRTL ? "#444" : "#ccc"} 
            horizontal={true}
            vertical={false}
          />
          
          {/* XAxis - RTL mein reverse */}
          <XAxis 
            dataKey="name" 
            stroke="#888"
            reversed={isRTL}
            tick={{ fill: '#888' }}
          />
          
          {/* YAxis - RTL mein right side */}
          <YAxis 
            stroke="#888"
            orientation={isRTL ? "right" : "left"}
            tickFormatter={formatNumber}
            tick={{ fill: '#888' }}
          />
          
          {/* Tooltip - Arabic numbers */}
         <Tooltip 
  formatter={(value) => [formatNumber(value), t('Sales')]}
  labelStyle={{ 
    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    fontWeight: 'bold',
    fontSize: '14px'
  }}
  contentStyle={{ 
    backgroundColor: document.documentElement.classList.contains('dark') ? '#27272a' : '#ffffff',
    border: document.documentElement.classList.contains('dark') ? '1px solid #3f3f46' : '1px solid #e5e7eb',
    borderRadius: '8px',
    textAlign: isRTL ? 'right' : 'left',
    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif'
  }}
  itemStyle={{
    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000',
    fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif'
  }}
  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }}
/>
          
          <Bar 
            dataKey="sales" 
            fill="#6366f1"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;