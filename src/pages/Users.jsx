import { useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import AddUserModal from "../components/ui/AddUserModal";
import EditUserModal from "../components/ui/EditUserModal";

const initialUsers = [
  { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Admin" },
  { id: 2, name: "Ayesha Fatima", email: "ayesha@example.com", role: "Editor" },
  { id: 3, name: "Zeeshan Ahmed", email: "zeeshan@example.com", role: "Viewer" },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (newUser) => {
    const id = Date.now();
    setUsers([{ id, ...newUser }, ...users]);
    toast.success("User added!");
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted!");
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    toast.success("User updated!");
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-heading">User Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-100 dark:bg-zinc-800 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-heading">Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-heading">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-heading">Role</th>
              <th className="px-4 py-3 text-sm font-semibold text-heading">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t dark:border-zinc-800">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-zinc-500 dark:text-zinc-400 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default Users;
