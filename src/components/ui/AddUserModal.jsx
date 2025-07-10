import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const AddUserModal = ({ isOpen, onClose, onAdd }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Select a role"),
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Add New User</h2>

              <Formik
                initialValues={{ name: "", email: "", role: "" }}
                validationSchema={schema}
                onSubmit={(values, { resetForm }) => {
                  onAdd(values);
                  toast.success("User added!");
                  resetForm();
                  onClose();
                }}
              >
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 dark:text-white">Name</label>
                    <Field
                      name="name"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                      placeholder="Enter name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 dark:text-white">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                      placeholder="Enter email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 dark:text-white">Role</label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    >
                      <option value="">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </Field>
                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-200 dark:bg-zinc-700 dark:text-white rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Add User
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;
