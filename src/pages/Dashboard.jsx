import { useState } from "react";
import Modal from "../components/ui/Modal";
import DashboardChart from "../components/ui/DashboardChart";
import DashboardBarChart from "../components/ui/DashboardBarChart";
import DashboardPieChart from "../components/ui/DashboardPieChart";
import DashboardStats from "../components/ui/DashboardStats";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    toast.success(t('Submitted successfully!', { name: formData.name }));
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {t('Dashboard')}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            {t('Welcome back! Here is your overview.')}
          </p>
        </div>
        
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} />
          {t('Add New Entry')}
        </button>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart />
        <DashboardBarChart />
      </div>

      <DashboardPieChart />

      {/* Modal - FIXED: No double wrapper */}
      <Modal 
        isOpen={open} 
        onClose={() => setOpen(false)} 
        title="Submit Your Info"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              {t('Name')}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={t('Enter your name')}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              {t('Email')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={t('Enter your email')}
              dir="ltr" // Email hamesha LTR
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 dark:bg-zinc-700 text-zinc-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600 font-medium transition-colors"
            >
              {t('Cancel')}
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-lg shadow-green-500/30"
            >
              {t('Submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;