import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Pencil, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import AddUserModal from "../components/ui/AddUserModal";
import EditUserModal from "../components/ui/EditUserModal";

const initialUsers = [
  { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Admin" },
  { id: 2, name: "Ayesha Fatima", email: "ayesha@example.com", role: "Editor" },
  { id: 3, name: "Zeeshan Ahmed", email: "zeeshan@example.com", role: "Viewer" },
  { id: 4, name: "Ahmed Ali", email: "ahmed@example.com", role: "Admin" },
  { id: 5, name: "Fatima Khan", email: "fatima@example.com", role: "Editor" },
];

const ITEMS_PER_PAGE = 5;

const Users = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddUser = (newUser) => {
    const id = Date.now();
    setUsers([{ id, ...newUser }, ...users]);
    toast.success(t('User added successfully!'));
    setCurrentPage(1); // Reset to first page
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success(t('User deleted successfully!'));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    toast.success(t('User updated successfully!'));
  };

  // Filter + Search logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Editor': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Viewer': return 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {t('User Management')}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            {t('Manage and organize your users')}
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} />
          {t('Add User')}
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder={t('Search by name or email...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full ltr:pl-10 rtl:pr-10 px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="All">{t('All Roles')}</option>
          <option value="Admin">{t('Admin')}</option>
          <option value="Editor">{t('Editor')}</option>
          <option value="Viewer">{t('Viewer')}</option>
        </select>
      </div>

      {/* Stats */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {t('Showing {{count}} of {{total}} users', { 
          count: paginatedUsers.length, 
          total: filteredUsers.length 
        })}
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-white text-start">
                {t('Name')}
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-white text-start">
                {t('Email')}
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-white text-start">
                {t('Role')}
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-white text-center">
                {t('Actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {paginatedUsers.map((user, idx) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300" dir="ltr">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                    {t(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title={t('Edit')}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title={t('Delete')}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">
              {t('No users found.')}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t('Page {{current}} of {{total}}', { current: currentPage, total: totalPages })}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateUser}
        user={editingUser}
      />
    </motion.div>
  );
};

export default Users;