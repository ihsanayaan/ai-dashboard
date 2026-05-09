import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { X } from "lucide-react";

const EditUserModal = ({ isOpen, onClose, onUpdate, user }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Schema with translations
  const schema = Yup.object().shape({
    name: Yup.string().required(t('Name is required')),
    email: Yup.string().email(t('Invalid email')).required(t('Email is required')),
    role: Yup.string().required(t('Select a role')),
  });

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-2xl">
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {t('Edit User')}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                >
                  <X size={20} />
                </button>
              </div>

              <Formik
                initialValues={{
                  name: user.name,
                  email: user.email,
                  role: user.role,
                }}
                validationSchema={schema}
                onSubmit={(values) => {
                  onUpdate({ ...user, ...values });
                  toast.success(t('User updated successfully!'));
                  onClose();
                }}
              >
                <Form className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      {t('Name')}
                    </label>
                    <Field
                      name="name"
                      className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t('Enter name')}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <ErrorMessage 
                      name="name" 
                      component="div" 
                      className="text-red-500 text-sm mt-1.5" 
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      {t('Email')}
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t('Enter email')}
                      dir="ltr" // Email hamesha LTR
                    />
                    <ErrorMessage 
                      name="email" 
                      component="div" 
                      className="text-red-500 text-sm mt-1.5" 
                    />
                  </div>

                  {/* Role Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      {t('Role')}
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">{t('Select role')}</option>
                      <option value="Admin">{t('Admin')}</option>
                      <option value="Editor">{t('Editor')}</option>
                      <option value="Viewer">{t('Viewer')}</option>
                    </Field>
                    <ErrorMessage 
                      name="role" 
                      component="div" 
                      className="text-red-500 text-sm mt-1.5" 
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 dark:bg-zinc-700 text-zinc-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-600 font-medium transition-colors"
                    >
                      {t('Cancel')}
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-lg shadow-green-500/30"
                    >
                      {t('Update User')}
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

export default EditUserModal;