import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from 'react-i18next';

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const DashboardPieChart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Data translate karo
  const data = [
    { name: t('Free'), value: 30 },
    { name: t('Pro'), value: 50 },
    { name: t('Enterprise'), value: 20 },
  ];

  // Arabic numbers + percentage format
  const formatValue = (value) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(value);
  };

  // Custom label - Arabic % ke sath
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${formatValue((percent * 100).toFixed(0))}%`}
      </text>
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mt-8">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-white mb-4">
        {t('Plan Distribution (Pie Chart)')}
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderCustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={entry.name} 
                fill={COLORS[index % COLORS.length]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          
          {/* Tooltip Arabic */}
          <Tooltip 
            formatter={(value, name) => [formatValue(value), name]}
            labelStyle={{ color: '#000', fontWeight: 'bold' }}
            contentStyle={{ 
              backgroundColor: isRTL ? '#27272a' : '#fff',
              border: '1px solid #444',
              borderRadius: '8px',
              textAlign: isRTL ? 'right' : 'left',
              color: isRTL ? '#fff' : '#000'
            }}
          />
          
          {/* Legend RTL aware */}
          <Legend 
            align={isRTL ? 'right' : 'center'}
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ 
              paddingTop: '20px',
              direction: isRTL ? 'rtl' : 'ltr'
            }}
            formatter={(value) => (
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPieChart;