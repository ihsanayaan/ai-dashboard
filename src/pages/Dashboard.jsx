import { useState } from "react";
import Modal from "../components/ui/Modal";
import DashboardChart from "../components/ui/DashboardChart";
import DashboardBarChart from "../components/ui/DashboardBarChart";
import DashboardPieChart from "../components/ui/DashboardPieChart";
import DashboardStats from "../components/ui/DashboardStats";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    toast.success(`🚀 Submitted: ${formData.name} (${formData.email})`);
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>

      <DashboardChart />
      <DashboardBarChart />
      <DashboardPieChart />
      <DashboardStats />

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md"
      >
        Open Modal Form
      </button>

     <Modal isOpen={open} onClose={() => setOpen(false)}>
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
        Submit Your Info
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-600 text-zinc-900 dark:text-white"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-600 text-zinc-900 dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-200 dark:bg-zinc-600 dark:text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default Dashboard;
